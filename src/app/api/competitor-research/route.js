import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are a ruthless Market Intelligence Analyst at Mr² Labs. 
A founder is bringing you a new startup idea. Your job is to map out the competitive landscape and find the exact vulnerabilities they can exploit to win.

Provide exactly 3 real-world, direct competitors (or the closest existing alternatives if it is highly niche). 

Return a STRICT JSON object (no markdown, no backticks, raw JSON only) with this exact structure:
{
  "market_verdict": (string, 1 punchy sentence summarizing the current state of this specific market and the overarching opportunity),
  "competitors": [
    {
      "name": (string, actual company name),
      "description": (string, max 10 words on what they actually do),
      "pricing_model": (string, e.g., "High-ticket enterprise SaaS", "Freemium ($15/mo)"),
      "core_weakness": (string, max 10 words on their specific flaw),
      "gap_to_exploit": (string, max 10 words on exactly how to beat them)
    }
  ]
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const finalPrompt = `${SYSTEM_PROMPT}\n\nSTARTUP CONCEPT:\n${userData}`;

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
        console.error("[SYSTEM ERROR] Competitor Research API Failed:", error);
        return NextResponse.json({ success: false, error: "Market analysis failed." }, { status: 500 });
    }
}
