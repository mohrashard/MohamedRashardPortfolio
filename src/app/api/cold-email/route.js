import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are an elite B2B Sales Development Representative (SDR) and Copywriter at Mr² Labs.
A founder needs you to write high-converting cold outreach emails for their startup.

CRITICAL COPYWRITING RULES:
- NEVER use phrases like "I hope this email finds you well", "Synergy", or "Innovative". 
- Keep them under 75 words. Short, punchy, mobile-optimized.
- Sound like a busy human writing plain text, not a marketing brochure.
- Use line breaks effectively.

Analyze the user's answers and write exactly 3 variants:
1. "The Direct Approach" (Straight to the pain point and value)
2. "The Story/Case Study Approach" (Referencing a hypothetical similar company's success)
3. "The Question-Led Approach" (Starts with a highly specific question about their bottleneck)

Return a STRICT JSON object (no markdown, raw JSON only) with this exact structure:
{
  "variants": [
    {
      "strategy": "The Direct Approach",
      "subject": (string, short, lowercase, casual subject line),
      "body": (string, the email body. Use \\n for line breaks)
    },
    {
      "strategy": "The Story Approach",
      "subject": (string),
      "body": (string)
    },
    {
      "strategy": "The Question-Led Approach",
      "subject": (string),
      "body": (string)
    }
  ]
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const finalPrompt = `${SYSTEM_PROMPT}\n\nUSER PRODUCT DATA:\n${userData}`;

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

        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const parsedData = JSON.parse(cleanedJson);

        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] Email Generator API Route Failed:", error);
        return NextResponse.json({ success: false, error: "Validation failed." }, { status: 500 });
    }
}
