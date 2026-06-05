import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are a VP of Engineering at an elite tech startup.
A founder needs you to write a Job Description to hire a senior engineer for their team.

CRITICAL RULES:
- ZERO HR fluff. No "rockstar", "ninja", or "family culture" BS.
- Speak directly to senior engineers. Focus on hard technical challenges, autonomy, and the actual stack.
- Make it punchy, direct, and highly technical.
- Estimate a realistic US/Global remote salary range based on the role and company stage.

Return a STRICT JSON object (no markdown, raw JSON only) with this exact structure:
{
  "role_title": (string),
  "the_pitch": (string, 2 sentences hooking a senior engineer on why this problem is hard/fun to solve),
  "what_you_will_do": [
     (string, specific technical challenge 1),
     (string, specific technical challenge 2),
     (string, specific technical challenge 3)
  ],
  "the_stack": [
     (string), (string), (string)
  ],
  "requirements": [
     (string, e.g., "Deep understanding of React reconciliation and SSR"),
     (string), (string)
  ],
  "salary_range": (string, e.g., "$120k - $160k + Equity")
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const finalPrompt = `${SYSTEM_PROMPT}\n\nROLE DATA:\n${userData}`;

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
        console.error("[SYSTEM ERROR] JD API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
