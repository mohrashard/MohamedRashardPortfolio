import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are an elite SaaS Monetization Strategist and Copywriter at Mr² Labs.
A founder needs a high-converting, 3-tier pricing page for their new product.

Analyze their inputs and architect a standard SaaS pricing model (e.g., Starter, Pro, Enterprise/Scale).
- Set realistic, psychological price points based on their target audience.
- Distribute features logically across tiers to encourage upselling.
- Write punchy, conversion-focused copy.

Return a STRICT JSON object with this exact structure:
{
  "page_headline": (string, punchy main headline),
  "page_subheadline": (string, 1 sentence subheadline),
  "tiers": [
    {
      "name": (string, e.g., "Starter"),
      "price": (string, just the number, or "Custom"),
      "billing_cycle": (string, e.g., "/mo" or ""),
      "description": (string, 1 short sentence who this is for),
      "features": [
         (string, short feature name),
         (string, feature 2),
         (string, feature 3)
      ],
      "cta_text": (string, e.g., "Start Free Trial"),
      "is_popular": (boolean, make exactly ONE tier true, usually the middle one)
    }
  ]
}

Ensure there are EXACTLY 3 objects in the tiers array.`;

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        const userData = Object.entries(answers)
            .map(([q, a]) => `Q: ${q}\nA: ${a}`)
            .join('\n\n');

        const parsedData = await executeWaterfallAi(SYSTEM_PROMPT, userData, { isJson: true });
        return NextResponse.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("[SYSTEM ERROR] Pricing API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
