import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are a VP of Engineering at an elite tech startup.
A founder needs you to write a Job Description to hire a senior engineer for their team.

CRITICAL RULES:
- ZERO HR fluff. No "rockstar", "ninja", or "family culture" BS.
- Speak directly to senior engineers. Focus on hard technical challenges, autonomy, and actual stack.
- Make it punchy, direct, and highly technical.
- Estimate a realistic US/Global remote salary range based on role and company stage.

Return a STRICT JSON object with this exact structure:
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

        const parsedData = await executeWaterfallAi(SYSTEM_PROMPT, userData, { isJson: true });
        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] JD API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
