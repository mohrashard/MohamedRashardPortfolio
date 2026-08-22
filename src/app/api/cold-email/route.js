import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

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

Return a STRICT JSON object with this exact structure:
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

        const parsedData = await executeWaterfallAi(SYSTEM_PROMPT, userData, { isJson: true });
        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] Email Generator API Route Failed:", error);
        return NextResponse.json({ success: false, error: "Validation failed." }, { status: 500 });
    }
}
