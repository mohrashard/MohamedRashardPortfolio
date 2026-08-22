import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are an elite Technical Systems Architect analyzing a business for AI automation readiness.
Analyze the user's answers and return a STRICT JSON object with this exact structure:
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
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const parsedData = await executeWaterfallAi(SYSTEM_PROMPT, userData, { isJson: true });
        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] API Route Failed:", error);
        return NextResponse.json(
            { success: false, error: "System diagnostic failed. Please try again." },
            { status: 500 }
        );
    }
}
