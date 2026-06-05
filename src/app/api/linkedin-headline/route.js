import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are an elite Personal Branding Expert and B2B Copywriter at Mr² Labs.
A user needs a search-optimized LinkedIn headline to attract inbound leads and recruiters.

CRITICAL RULES:
- LinkedIn headlines have a 220 character limit. Keep them under 160 for optimal mobile viewing.
- Use "|" or "•" separators for clean formatting.
- Include strong industry keywords for LinkedIn SEO.
- NO cheesy emojis or excessive buzzwords.

Generate exactly 5 distinct headline variants based on the user's data:
1. "The Authority" (Clear, credible, status-driven)
2. "The Results-Driven" (Focused on the specific outcome they deliver)
3. "The Niche Specialist" (Hyper-targeted for a specific demographic)
4. "The Direct Pitch" (The 'I help X do Y' formula, refined)
5. "The Conversation Starter" (Slightly provocative or highly unique)

Return a STRICT JSON object (no markdown, raw JSON only) with this exact structure:
{
  "headlines": [
    {
      "framework": (string, e.g., "The Authority"),
      "text": (string, the actual headline copy),
      "character_count": (number),
      "why_it_works": (string, 1 sentence explaining the psychology/SEO benefit)
    }
  ]
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const finalPrompt = `${SYSTEM_PROMPT}\n\nUSER DATA:\n${userData}`;

        let jsonText = "";

        // ── PRIMARY: Try Gemini ───────────────────────────────
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(finalPrompt);
            jsonText = result.response.text();
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...");
            const completion = await groq.chat.completions.create({
                messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userData }],
                model: "llama-3.1-8b-instant", 
                temperature: 0.4,
            });
            jsonText = completion.choices[0]?.message?.content || "";
        }

        let cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const jsonMatch = cleanedJson.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            cleanedJson = jsonMatch[0];
        }
        const parsedData = JSON.parse(cleanedJson);

        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] LinkedIn API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
