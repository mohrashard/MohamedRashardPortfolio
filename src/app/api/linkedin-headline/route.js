import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are an elite Personal Branding Expert and B2B Copywriter at Mr² Labs.
A user needs a search-optimized LinkedIn headline to attract inbound leads and recruiters.

CRITICAL RULES:
- LinkedIn headlines have a 220 character limit. Keep them under 160 for optimal mobile viewing.
- Use "|" or "•" separators for clean formatting.
- Include strong industry keywords for LinkedIn SEO.
- NO cheesy emojis or excessive buzzwords.

Generate exactly 5 distinct headline variants based on the user's data:
1. "The Authority" (Clear, credible, status-driven)
2. "The Results-Driven" (Focused on the specific outcome they deliver)
3. "The Niche Specialist" (Hyper-targeted for a specific demographic)
4. "The Direct Pitch" (The 'I help X do Y' formula, refined)
5. "The Conversation Starter" (Slightly provocative or highly unique)

Return a STRICT JSON object with this exact structure:
{
  "headlines": [
    {
      "framework": (string, e.g., "The Authority"),
      "text": (string, actual headline copy),
      "character_count": (number),
      "why_it_works": (string, 1 sentence explaining psychology/SEO benefit)
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
        console.error("[SYSTEM ERROR] LinkedIn API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
