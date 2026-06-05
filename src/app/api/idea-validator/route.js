import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are a ruthless but brilliant Technical VC and Systems Architect at Mr² Labs. 
A founder is pitching you a startup idea. Your job is to evaluate it honestly, leaning heavily on technical feasibility and market reality.

Analyze the user's answers and return a STRICT JSON object (no markdown, no backticks, raw JSON only) with this exact structure:
{
  "score": (number 1-100),
  "verdict": (string, 2 punchy sentences summarizing the overall viability and biggest risk),
  "dimensions": [
    { "name": "Market Size", "score": (number 1-100), "feedback": (string, 1 specific sentence) },
    { "name": "Technical Feasibility", "score": (number 1-100), "feedback": (string, 1 specific sentence highlighting what tech is needed) },
    { "name": "Competition", "score": (number 1-100), "feedback": (string, 1 specific sentence about competitive threats) },
    { "name": "Monetization", "score": (number 1-100), "feedback": (string, 1 specific sentence about their revenue logic) }
  ]
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const finalPrompt = `${SYSTEM_PROMPT}\n\nFOUNDER PITCH:\n${userData}`;

        let jsonText = "";

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(finalPrompt);
            jsonText = result.response.text();
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...");
            const completion = await groq.chat.completions.create({
                messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userData }],
                model: "llama-3.1-8b-instant", 
                temperature: 0.2,
            });
            jsonText = completion.choices[0]?.message?.content || "";
        }

        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const parsedData = JSON.parse(cleanedJson);

        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] Idea Validator API Route Failed:", error);
        return NextResponse.json({ success: false, error: "Validation failed." }, { status: 500 });
    }
}
