import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are a ruthless Market Intelligence Analyst at Mr² Labs. 
A founder is bringing you a new startup idea. Your job is to map out the competitive landscape and find the exact vulnerabilities they can exploit to win.

Provide exactly 3 real-world, direct competitors (or the closest existing alternatives if it is highly niche). 

Return a STRICT JSON object with this exact structure:
{
  "market_verdict": (string, 1 punchy sentence summarizing current market state and overarching opportunity),
  "competitors": [
    {
      "name": (string, actual company name),
      "description": (string, max 10 words on what they actually do),
      "pricing_model": (string, e.g., "High-ticket enterprise SaaS", "Freemium ($15/mo)"),
      "core_weakness": (string, max 10 words on their specific flaw),
      "gap_to_exploit": (string, max 10 words on exactly how to beat them)
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
        console.error("[SYSTEM ERROR] Competitor Research API Failed:", error);
        return NextResponse.json({ success: false, error: "Market analysis failed." }, { status: 500 });
    }
}
