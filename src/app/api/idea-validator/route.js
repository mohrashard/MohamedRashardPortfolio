import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are a ruthless but brilliant Technical VC and Systems Architect at Mr² Labs. 
A founder is pitching you a startup idea. Your job is to evaluate it honestly, leaning heavily on technical feasibility and market reality.

Analyze the user's answers and return a STRICT JSON object with this exact structure:
{
  "score": (number 1-100),
  "verdict": (string, 2 punchy sentences summarizing overall viability and biggest risk),
  "dimensions": [
    { "name": "Market Size", "score": (number 1-100), "feedback": (string, 1 specific sentence) },
    { "name": "Technical Feasibility", "score": (number 1-100), "feedback": (string, 1 specific sentence highlighting what tech is needed) },
    { "name": "Competition", "score": (number 1-100), "feedback": (string, 1 specific sentence about competitive threats) },
    { "name": "Monetization", "score": (number 1-100), "feedback": (string, 1 specific sentence about revenue logic) }
  ]
}`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const parsedData = await executeWaterfallAi(SYSTEM_PROMPT, userData, { isJson: true });
        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] Idea Validator API Route Failed:", error);
        return NextResponse.json({ success: false, error: "Validation failed." }, { status: 500 });
    }
}
