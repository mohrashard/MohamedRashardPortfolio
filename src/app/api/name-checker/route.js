import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

async function checkDomainAvailability(domain) {
    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const data = await response.json();
        
        // Status 3 (NXDOMAIN) means the domain does not exist -> Available
        if (data.Status === 3) return true;
        return false; 
    } catch (error) {
        console.error(`DNS check failed for ${domain}:`, error);
        return false; 
    }
}

export async function POST(req) {
    try {
        const { answers } = await req.json();

        const idea = answers["In one or two sentences, describe your startup idea or product."] || "";
        const keywords = answers["Any specific keywords, prefixes, or vibes? (Optional. Press Enter to skip)"] || "None";

        const SYSTEM_PROMPT = `You are an elite Brand Strategist at Mr² Labs.
The user is building this startup: "${idea}". 
Keywords/Vibes requested: "${keywords}".
        
Your goal is to generate exactly 5 highly-brandable startup names. 

CRITICAL PSYCHOLOGY STRATEGY:
You MUST provide a mix of "ideal but taken" names and "unique and available" names. 

Generate exactly 5 names following this exact breakdown:
1. TWO (2) Single Dictionary Words: These should be powerful, short 1-word nouns or verbs (e.g., "Nexus", "Aura", "Peak").
2. THREE (3) Unique Compounds/Portmanteaus: Unique multi-word or abstract combinations (e.g., "CobaltStack", "KapturHQ", "VelvetData").

Return a STRICT JSON object with this structure:
{
  "names": [
    {
      "name": (string, brand name),
      "reasoning": (string, 1 punchy sentence why this name works)
    }
  ]
}`;

        const aiData = await executeWaterfallAi(SYSTEM_PROMPT, "Generate brand names", { isJson: true });

        // ── EXECUTE DNS REGISTRY CHECKS ──────────────────────
        const enrichedNames = await Promise.all(aiData.names.map(async (item) => {
            const cleanName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');

            const [com, dev, io] = await Promise.all([
                checkDomainAvailability(`${cleanName}.com`),
                checkDomainAvailability(`${cleanName}.dev`),
                checkDomainAvailability(`${cleanName}.io`)
            ]);

            return {
                ...item,
                domain: cleanName,
                available: { com, dev, io }
            };
        }));

        return NextResponse.json({
            success: true,
            data: enrichedNames
        });

    } catch (error) {
        console.error("[SYSTEM ERROR] Name Checker API Failed:", error);
        return NextResponse.json({ success: false, error: "Calculation failed." }, { status: 500 });
    }
}
