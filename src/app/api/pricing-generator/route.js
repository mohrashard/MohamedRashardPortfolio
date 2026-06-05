import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are an elite SaaS Monetization Strategist and Copywriter at Mr² Labs.
A founder needs a high-converting, 3-tier pricing page for their new product.

Analyze their inputs and architect a standard SaaS pricing model (e.g., Starter, Pro, Enterprise/Scale).
- Set realistic, psychological price points based on their target audience (e.g., 19, 49, 149 or 99, 299, Custom).
- Distribute their features logically across the tiers to encourage upselling.
- Write punchy, conversion-focused copy.

Return a STRICT JSON object (no markdown, raw JSON only) with this exact structure:
{
  "page_headline": (string, punchy main headline),
  "page_subheadline": (string, 1 sentence subheadline),
  "tiers": [
    {
      "name": (string, e.g., "Starter"),
      "price": (string, just the number, or "Custom"),
      "billing_cycle": (string, e.g., "/mo" or ""),
      "description": (string, 1 short sentence who this is for),
      "features": [
         (string, short feature name),
         (string, feature 2),
         (string, feature 3)
      ],
      "cta_text": (string, e.g., "Start Free Trial"),
      "is_popular": (boolean, make exactly ONE tier true, usually the middle one)
    }
  ]
}

Ensure there are EXACTLY 3 objects in the tiers array.`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const finalPrompt = `${SYSTEM_PROMPT}\n\nPRODUCT DATA:\n${userData}`;

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
                temperature: 0.3,
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
        console.error("[SYSTEM ERROR] Pricing API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
