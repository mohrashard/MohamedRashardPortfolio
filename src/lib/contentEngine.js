import { Groq } from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import googleTrends from 'google-trends-api';

// ============================================================================
// PROVIDER INTEGRATIONS (OpenAI-Compatible & Native SDKs)
// ============================================================================
async function callGroq(systemPrompt, userPrompt, model, jsonMode) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        model: model,
        response_format: jsonMode ? { type: "json_object" } : undefined,
        temperature: 0.2,
    });
    return completion.choices[0].message.content;
}

async function callOpenRouter(systemPrompt, userPrompt, model, jsonMode) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: jsonMode ? { type: "json_object" } : undefined,
            temperature: 0.2,
        })
    });
    if (!response.ok) throw new Error(`OpenRouter Error: ${await response.text()}`);
    const data = await response.json();
    return data.choices[0].message.content;
}

async function callGemini(systemPrompt, userPrompt, model, jsonMode) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const genModel = genAI.getGenerativeModel({ 
        model: model,
        systemInstruction: systemPrompt 
    });
    
    const config = { temperature: 0.2 };
    if (jsonMode) config.responseMimeType = "application/json";
    
    const result = await genModel.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: config
    });
    return result.response.text();
}

async function callMistral(systemPrompt, userPrompt, model, jsonMode) {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: jsonMode ? { type: "json_object" } : undefined,
            temperature: 0.2,
        })
    });
    if (!response.ok) throw new Error(`Mistral Error: ${await response.text()}`);
    const data = await response.json();
    return data.choices[0].message.content;
}


// ============================================================================
// WATERFALL ENGINE
// Order: 1) Groq, 2) OpenRouter, 3) Gemini, 4) Mistral
// ============================================================================
const WATERFALL_PROVIDERS = [
    { 
        name: 'Gemini', 
        call: callGemini, 
        models: { 
            node1: 'gemini-2.5-flash',    // Free tier hybrid reasoning
            node2: 'gemini-2.5-pro'      // Flagship reasoning & writing
        } 
    },
    { 
        name: 'Groq', 
        call: callGroq, 
        models: { 
            node1: 'openai/gpt-oss-120b', // Flagship reasoning for strategy
            node2: 'openai/gpt-oss-20b'   // High-speed writing model
        } 
    },
    { 
        name: 'OpenRouter', 
        call: callOpenRouter, 
        models: { 
            node1: 'z-ai/glm-5.2:free',   // Highest quality reasoning score
            node2: 'openrouter/free'      // Auto-router for safe survival against rotations
        } 
    },
    { 
        name: 'Mistral', 
        call: callMistral, 
        models: { 
            node1: 'mistral-medium-latest', // Mid-tier reasoning
            node2: 'mistral-small-latest'  // Fast writing
        } 
    }
];

export async function executeWithWaterfall(systemPrompt, userPrompt, taskType) {
    let lastError = null;
    
    for (const provider of WATERFALL_PROVIDERS) {
        console.log(`[Waterfall] Attempting ${provider.name} with model ${provider.models[taskType]} for ${taskType}...`);
        try {
            const isJson = (taskType === 'node1');
            const model = provider.models[taskType];
            
            let rawContent = await provider.call(systemPrompt, userPrompt, model, isJson);
            
            if (isJson) {
                // Defensive cleanup for LLMs that still wrap JSON in markdown blockquotes
                if (rawContent.startsWith('\`\`\`json')) {
                    rawContent = rawContent.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
                } else if (rawContent.startsWith('\`\`\`')) {
                    rawContent = rawContent.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
                }
                const parsed = JSON.parse(rawContent);
                console.log(`[Waterfall] ✅ ${provider.name} succeeded!`);
                return parsed;
            } else {
                // Defensive cleanup for Markdown writing
                if (rawContent.startsWith('\`\`\`markdown')) {
                    rawContent = rawContent.replace(/^\`\`\`markdown\n/, '').replace(/\n\`\`\`$/, '');
                } else if (rawContent.startsWith('\`\`\`')) {
                    rawContent = rawContent.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
                }
                console.log(`[Waterfall] ✅ ${provider.name} succeeded!`);
                return rawContent.trim();
            }
        } catch (error) {
            console.warn(`[Waterfall] ⚠️ ${provider.name} failed:`, error.message);
            lastError = error;
            // The loop will simply continue to the next provider
        }
    }
    
    throw new Error(`🚨 All providers in the waterfall failed. Last error: ${lastError.message}`);
}


// ============================================================================
// EXPORTED ENGINE FUNCTIONS
// ============================================================================

export async function generateEditorialBrief(rawInput) {
    const systemPrompt = `You are the Editor-in-Chief and Technical Content Strategist for an elite full-stack engineering and Next.js agency. Your goal is to evaluate raw technical discussions and determine if they represent a high-value commercial pain point.

EVALUATION RUBRIC (Score 1-10):
1. Pain Urgency: Is this causing revenue loss, high bounce rates, or downtime?
2. Budget Authority: Is the asker a decision-maker (Founder/CTO) vs. a hobbyist?
3. Solution Alignment: Can this be solved with Next.js, PWAs, or backend automation?
4. Evergreen Search Value: Will people search for this for the next 12-24 months?

INSTRUCTIONS:
1. Analyze the provided user input (raw forum thread or question).
2. Calculate the scores based on the rubric.
3. If the average score is below 7.5, output {"status": "rejected", "reason": "..."}.
4. If the average score is 7.5 or higher, generate a complete editorial brief. Ensure you provide reasoning for the score and estimate the monthly search volume/impressions based on the topic.

OUTPUT FORMAT:
You must respond in pure, minified JSON. Do not include markdown formatting or conversational text.
{
  "status": "approved",
  "scores": { "pain": 8, "budget": 7, "alignment": 9, "evergreen": 8 },
  "score_reasoning": "High pain point for technical founders losing revenue to slow load times. High budget authority.",
  "estimated_search_volume": "10,000 - 50,000 monthly impressions",
  "brief": {
    "target_keyword": "Next.js core web vitals optimization",
    "proposed_slug": "nextjs-core-web-vitals-optimization",
    "target_audience": "CTOs and Technical Founders",
    "core_objection": "Next.js app router is too slow on initial load",
    "category": "Performance",
    "suggested_h2s": [
      "Diagnosing the TTFB Bottleneck in App Router",
      "Server Components vs. Client Components: The Trade-off",
      "Implementing Stale-While-Revalidate (SWR) Architectures"
    ]
  }
}`;

    return await executeWithWaterfall(systemPrompt, `Evaluate this market input:\n\n${rawInput}`, 'node1');
}

export async function generateTechnicalDraft(brief) {
    const systemPrompt = `You are a Senior Full-Stack Engineer and Technical Writer. Your task is to write a highly technical, SEO/GEO-optimized blog post based on the provided enriched editorial brief. 

GUARDRAILS (STRICTLY ENFORCED):
- NO fluff or AI slop. Banned phrases: "In today's fast-paced digital world," "Let's dive in," "In conclusion," "A game-changer."
- Lead with the answer. Put a definitive, italicized summary block at the top of every H2 section to capture AI search engine snippets.
- Use the Problem-Agitation-Solution (PAS) framework.
- Include at least one Mermaid.js diagram illustrating the architecture or data flow.
- Include at least one copy-pasteable, type-safe Next.js/React code snippet.

DEMAND INTEGRATION (CRITICAL):
- The user prompt will include an array of "LIVE GOOGLE DEMAND" queries. You MUST use these exact queries verbatim as your \`## H2\` or \`### H3\` subheaders. Do not reword them. 
- Dedicate the final section of the article to a "Frequently Asked Questions" block that explicitly answers the "BREAKOUT VIRALITY TOPICS".

FAQ SCHEMA INJECTION:
- At the very bottom of the Markdown file, append a raw HTML \`<script type="application/ld+json">\` block containing valid Schema.org \`FAQPage\` JSON-LD.
- Map the exact questions and concise answers from your FAQ section directly into this JSON-LD block to capture rich snippets. Ensure it is perfectly formatted JSON.

FRONTMATTER REQUIREMENTS:
The output MUST begin with standard YAML frontmatter exactly matching this schema. Do not deviate.
---
title: "[Compelling, non-clickbait title using the target_keyword]"
date: [Current Date in YYYY-MM-DD format]
description: "[150 character technical summary]"
image: "/posts/[proposed_slug].png"
category: "[From brief]"
tags: ["[search_seed]", "Engineering"]
---

OUTPUT:
Return ONLY the raw Markdown file starting with the \`---\` frontmatter block. No conversational preamble.`;

    const userPrompt = `
BRIEF DATA:
Target Keyword: ${brief.target_keyword}
Search Seed: ${brief.search_seed || brief.target_keyword}
Proposed Slug: ${brief.proposed_slug}
Category: ${brief.category || 'Engineering'}
Core Problem to Address: ${brief.core_objection}

LIVE GOOGLE DEMAND (Use these EXACTLY as H2/H3 headers):
${(brief.user_expectations || []).map(query => `- ${query}`).join('\n')}

BREAKOUT VIRALITY TOPICS (Answer these in the FAQ section):
${(brief.breakout_keywords || []).map(keyword => `- ${keyword}`).join('\n')}
`;

    return await executeWithWaterfall(systemPrompt, userPrompt, 'node2');
}

// ============================================================================
// GOOGLE SEARCH VALIDATION LAYER (Node 1.5)
// ============================================================================
export async function getCreatorSearchInsights(targetKeyword) {
    console.log(`[Validation Layer] Fetching live Google data for: ${targetKeyword}`);
    
    try {
        // 1. Get "Expectations" (Autocomplete)
        const suggestUrl = `http://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(targetKeyword)}`;
        const suggestRes = await fetch(suggestUrl);
        const suggestData = await suggestRes.json();
        const expectations = suggestData[1]; // Array of actual user searches

        // 2. Get Search Frequency 
        const interestData = await googleTrends.interestOverTime({ keyword: targetKeyword });
        const parsedInterest = JSON.parse(interestData);
        const timeline = parsedInterest.default.timelineData;
        const currentFrequencyScore = timeline.length > 0 ? timeline[timeline.length - 1].value[0] : 0; // 0-100 score

        // 3. Get Virality (Rising Queries)
        const relatedData = await googleTrends.relatedQueries({ keyword: targetKeyword });
        const parsedRelated = JSON.parse(relatedData);
        const risingTopics = parsedRelated.default.rankedList[1]?.rankedKeyword?.map(k => k.query) || [];

        return {
            status: currentFrequencyScore > 15 ? "approved" : "rejected_low_volume",
            frequencyScore: currentFrequencyScore,
            viralityKeywords: risingTopics.slice(0, 3), // Top 3 breakout topics
            userExpectations: expectations.slice(0, 5) // Top 5 autocomplete predictions
        };
    } catch (error) {
        console.error("[Validation Layer] Error fetching insights:", error);
        return { 
            status: "error",
            frequencyScore: 0,
            viralityKeywords: [],
            userExpectations: []
        };
    }
}
