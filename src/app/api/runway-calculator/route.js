import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        // 1. Extract and Calculate Hard Math
        const cash = parseFloat(answers["What is your current total cash in bank? ($)"]) || 0;
        const totalBurn = parseFloat(answers["What is your total monthly burn rate? ($)"]) || 0;
        const agencyOverhead = parseFloat(answers["How much of that monthly burn goes to agency retainers or slow contractors? ($)"]) || 0;

        // Prevent division by zero
        const safeBurn = totalBurn > 0 ? totalBurn : 1;
        const optimizedBurn = (totalBurn - agencyOverhead) > 0 ? (totalBurn - agencyOverhead) : 1;

        const standardRunwayMonths = (cash / safeBurn).toFixed(1);
        const optimizedRunwayMonths = (cash / optimizedBurn).toFixed(1);
        const monthsGained = (optimizedRunwayMonths - standardRunwayMonths).toFixed(1);
        const capitalSavedAnnually = (agencyOverhead * 12).toFixed(2);

        // 2. Build Prompt for the AI Strategist
        const SYSTEM_PROMPT = `You are an elite Technical Systems Architect and VC Advisor at Mr² Labs.
The user is a startup founder. They currently have $${cash} in the bank.
Their burn rate is $${totalBurn}/month, giving them ${standardRunwayMonths} months of runway.
They are burning $${agencyOverhead}/month on slow agency retainers/contractors.
If they cut this overhead, they gain ${monthsGained} months of survival and save $${capitalSavedAnnually} a year.
        
Your job is to architect a ruthless, zero-bloat capital efficiency strategy. 
Advise them to drop the agency, utilize Mr² Labs' high-velocity 48-72h fixed-scope sprints, and lean on AI architecture to scale without headcount.

Return a STRICT JSON object (no markdown, no backticks, raw JSON only) with this structure:
{
  "strategic_verdict": (string, 2 punchy, hard-hitting sentences about their current runway danger and the immediate fix),
  "execution_plan": [
    { "phase": "Phase 1: Stop The Bleed", "action": (string, specific advice on cutting the retainer/overhead) },
    { "phase": "Phase 2: High-Velocity Deploy", "action": (string, specific advice on using rapid sprints to ship features faster than the agency did) },
    { "phase": "Phase 3: Scale via Infrastructure", "action": (string, specific advice on letting AI and Serverless tech replace future headcount) }
  ]
}`;

        let jsonText = "";

        // ── PRIMARY: Try Gemini ───────────────────────────────
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(SYSTEM_PROMPT);
            jsonText = result.response.text();
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...");
            // ── FALLBACK: Try Groq ────────────────────────────
            const completion = await groq.chat.completions.create({
                messages: [{ role: "system", content: SYSTEM_PROMPT }],
                model: "llama-3.1-8b-instant",
                temperature: 0.2,
            });
            jsonText = completion.choices[0]?.message?.content || "";
        }

        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const aiStrategy = JSON.parse(cleanedJson);

        // 3. Return Combined Math + AI Data
        return NextResponse.json({ 
            success: true, 
            data: {
                metrics: {
                    cash, totalBurn, agencyOverhead, standardRunwayMonths, optimizedRunwayMonths, monthsGained, capitalSavedAnnually
                },
                strategy: aiStrategy
            } 
        });

    } catch (error) {
        console.error("[SYSTEM ERROR] Runway API Failed:", error);
        return NextResponse.json({ success: false, error: "Calculation failed." }, { status: 500 });
    }
}
