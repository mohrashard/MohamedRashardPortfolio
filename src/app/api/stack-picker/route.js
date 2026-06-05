import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an elite Technical Systems Architect at Mr² Labs. Your job is to recommend the perfect tech stack for a founder's MVP. 
Your recommendations MUST lean heavily toward modern, high-velocity, serverless architectures. 
- For web/SaaS: Heavily favor Next.js (React), Tailwind CSS, and Supabase (PostgreSQL).
- For mobile: Favor React Native/Expo.
- For AI: Favor Python, FastAPI, or direct Gemini API integration.
- For infrastructure: Favor Vercel or Edge networks.

Analyze the user's answers and return a STRICT JSON object (no markdown formatting, no backticks, just raw JSON) with this exact structure:
{
  "frontend": { "name": (string, e.g., "Next.js"), "reason": (string, 1 short sentence why) },
  "backend": { "name": (string, e.g., "Supabase (PostgreSQL)"), "reason": (string, 1 short sentence why) },
  "infrastructure": { "name": (string, e.g., "Vercel Edge"), "reason": (string, 1 short sentence why) },
  "verdict": (string, 2 sentences explaining why this entire stack perfectly fits their specific use case and timeline),
  "complexity": (string, "Low", "Medium", or "High")
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
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
            console.log("[SYSTEM] Stack Picker Executed via Gemini API");
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...", geminiError);

            // ── 2. FALLBACK: Try Groq API ────────────────────────────
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userData }
                ],
                model: "llama-3.1-8b-instant", 
                temperature: 0.2,
            });
            jsonText = completion.choices[0]?.message?.content || "";
            console.log("[SYSTEM] Stack Picker Executed via Groq API");
        }

        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const parsedData = JSON.parse(cleanedJson);

        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] Stack Picker API Route Failed:", error);
        return NextResponse.json(
            { success: false, error: "System diagnostic failed. Please try again." },
            { status: 500 }
        );
    }
}
