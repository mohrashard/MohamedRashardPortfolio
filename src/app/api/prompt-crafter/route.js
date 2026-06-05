import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are an elite Meta-Prompt Engineer. 
A user will tell you what they want an AI to do. Your job is to write the ULTIMATE, highly-structured system prompt that they can copy/paste into ChatGPT/Claude to get the best possible result.

Your generated prompt MUST include:
1. A clear role/persona (e.g., "Act as an elite Next.js developer...")
2. Specific context, constraints, and tonal guidelines.
3. A required output format (e.g., "Return only valid JSON" or "Use markdown with specific headings").

Return ONLY the raw prompt text. Do not include quotes around it, do not include intro/outro text like "Here is your prompt:". Just the prompt itself.`;

export async function POST(req) {
    try {
        const { request: userRequest } = await req.json();
        const finalPrompt = `${SYSTEM_PROMPT}\n\nUSER REQUEST: ${userRequest}`;

        let textOutput = "";

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(finalPrompt);
            textOutput = result.response.text();
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...");
            const completion = await groq.chat.completions.create({
                messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userRequest }],
                model: "llama-3.1-8b-instant", 
                temperature: 0.3,
            });
            textOutput = completion.choices[0]?.message?.content || "";
        }

        return NextResponse.json({ success: true, prompt: textOutput.trim() });
    } catch (error) {
        console.error("[SYSTEM ERROR] Crafter API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
