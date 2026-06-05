import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

// Initialize SDKs
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

// System prompt enforcing strict JSON output
const SYSTEM_PROMPT = `You are an elite Technical Systems Architect analyzing a business for AI automation readiness.
Analyze the user's answers and return a STRICT JSON object (no markdown formatting, no backticks, just raw JSON) with this exact structure:
{
  "score": (number 1-100),
  "verdict": (string, 1 short punchy sentence about their readiness),
  "opportunities": [
    {
      "title": (string, specific automation name),
      "impact": (string, "High", "Medium", or "Low"),
      "description": (string, 2 sentences explaining how AI solves their bottleneck)
    }
  ] // exactly 3 opportunities
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        // Format answers for the prompt
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const finalPrompt = `${SYSTEM_PROMPT}\n\nUSER DATA:\n${userData}`;

        let jsonText = "";

        // ── 1. PRIMARY: Try Gemini API ───────────────────────────────
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(finalPrompt);
            jsonText = result.response.text();
            console.log("[SYSTEM] Executed via Gemini API");
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...", geminiError);

            // ── 2. FALLBACK: Try Groq API ────────────────────────────
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userData }
                ],
                model: "llama-3.1-8b-instant", // Fast, reliable fallback
                temperature: 0.2,
            });
            jsonText = completion.choices[0]?.message?.content || "";
            console.log("[SYSTEM] Executed via Groq API");
        }

        // Clean the output (LLMs sometimes wrap JSON in markdown backticks)
        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const parsedData = JSON.parse(cleanedJson);

        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] API Route Failed:", error);
        return NextResponse.json(
            { success: false, error: "System diagnostic failed. Please try again." },
            { status: 500 }
        );
    }
}
