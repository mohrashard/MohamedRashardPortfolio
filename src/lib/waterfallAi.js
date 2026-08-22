import { Groq } from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ── 1. Provider Implementations ──────────────────────────────────────────────

async function callGemini(systemPrompt, userPrompt, model, isJson) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY missing");
    
    // Support both GoogleGenerativeAI SDK and direct HTTP fetch fallback
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const genModel = genAI.getGenerativeModel({ 
            model: model,
            systemInstruction: systemPrompt 
        });
        
        const config = { temperature: 0.2 };
        if (isJson) config.responseMimeType = "application/json";
        
        const result = await genModel.generateContent({
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            generationConfig: config
        });
        return result.response.text();
    } catch (sdkError) {
        // Direct REST API Fallback
        const cleanModel = model.startsWith('models/') ? model : `models/${model}`;
        const url = `https://generativelanguage.googleapis.com/v1beta/${cleanModel}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: [{ parts: [{ text: userPrompt }] }],
                generationConfig: {
                    temperature: 0.2,
                    responseMimeType: isJson ? "application/json" : undefined
                }
            })
        });
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Gemini API Error (${model}): ${errText}`);
        }
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }
}

async function callGroq(systemPrompt, userPrompt, model, isJson) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY missing");
    
    try {
        const groq = new Groq({ apiKey });
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: model,
            response_format: isJson ? { type: "json_object" } : undefined,
            temperature: 0.2,
        });
        return completion.choices[0]?.message?.content || "";
    } catch (sdkError) {
        // Direct REST API Fallback
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                response_format: isJson ? { type: "json_object" } : undefined,
                temperature: 0.2,
            })
        });
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Groq API Error (${model}): ${errText}`);
        }
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "";
    }
}

async function callOpenRouter(systemPrompt, userPrompt, model, isJson) {
    const apiKey = process.env.OPEN_ROUTER_API_KEY;
    if (!apiKey) throw new Error("OPEN_ROUTER_API_KEY missing");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mr2labs.com",
            "X-Title": "Mr² Labs AI Engine"
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: isJson ? { type: "json_object" } : undefined,
            temperature: 0.2,
        })
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter Error (${model}): ${errText}`);
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
}

async function callMistral(systemPrompt, userPrompt, model, isJson) {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) throw new Error("MISTRAL_API_KEY missing");

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: isJson ? { type: "json_object" } : undefined,
            temperature: 0.2,
        })
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Mistral Error (${model}): ${errText}`);
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
}

// ── 2. Waterfall Tier Pipeline Definition ────────────────────────────────────
// Order required: 1st Gemini -> 2nd Groq -> 3rd OpenRouter -> 4th Mistral
const WATERFALL_TIERS = [
    {
        provider: 'Gemini',
        call: callGemini,
        models: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.5-flash-lite', 'gemini-3.5-flash']
    },
    {
        provider: 'Groq',
        call: callGroq,
        models: ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.6-27b']
    },
    {
        provider: 'OpenRouter',
        call: callOpenRouter,
        models: ['openrouter/free', 'z-ai/glm-5.2:free']
    },
    {
        provider: 'Mistral',
        call: callMistral,
        models: ['mistral-small-latest', 'mistral-medium-latest', 'open-mistral-7b']
    }
];

// ── 3. Main Exported Execution Function ─────────────────────────────────────
export async function executeWaterfallAi(systemPrompt, userPrompt, { isJson = true } = {}) {
    let lastError = null;

    for (const tier of WATERFALL_TIERS) {
        for (const model of tier.models) {
            try {
                console.log(`[Waterfall AI] Attempting ${tier.provider} (${model})...`);
                let rawText = await tier.call(systemPrompt, userPrompt, model, isJson);

                if (!rawText || !rawText.trim()) {
                    throw new Error(`Received empty text from ${tier.provider} (${model})`);
                }

                let cleaned = rawText.trim();
                if (cleaned.startsWith('```json')) {
                    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
                } else if (cleaned.startsWith('```markdown')) {
                    cleaned = cleaned.replace(/^```markdown\s*/i, '').replace(/\s*```$/i, '');
                } else if (cleaned.startsWith('```')) {
                    cleaned = cleaned.replace(/^```\s*/i, '').replace(/\s*```$/i, '');
                }

                if (isJson) {
                    const parsed = JSON.parse(cleaned);
                    console.log(`[Waterfall AI] ✅ ${tier.provider} (${model}) succeeded!`);
                    return parsed;
                } else {
                    console.log(`[Waterfall AI] ✅ ${tier.provider} (${model}) succeeded!`);
                    return cleaned;
                }
            } catch (err) {
                console.warn(`[Waterfall AI] ⚠️ ${tier.provider} (${model}) failed:`, err.message);
                lastError = err;
            }
        }
    }

    throw new Error(`🚨 All Waterfall AI providers failed. Last error: ${lastError?.message || 'Unknown'}`);
}
