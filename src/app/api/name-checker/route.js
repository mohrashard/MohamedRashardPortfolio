import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import dns from 'dns';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
const resolveDns = dns.promises.resolve4;

// High-speed DNS check using Google's DNS-over-HTTPS API
// Bypasses local network restrictions (ECONNREFUSED) that fail native Node dns.
async function checkDomainAvailability(domain) {
    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const data = await response.json();
        
        // Status 3 (NXDOMAIN) means the domain does not exist -> Available
        if (data.Status === 3) return true;
        
        // Status 0 (NOERROR) means it resolved to something -> Taken
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
This teaches the founder that single dictionary words are impossible to get, pushing them toward creative compounds.

Generate exactly 5 names following this exact breakdown:
1. TWO (2) Single Dictionary Words: These should be powerful, short, obvious 1-word nouns or verbs (e.g., "Nexus", "Aura", "Peak", "Vanguard"). We know these are 100% taken. That is the point.
2. THREE (3) Unique Compounds/Portmanteaus: These MUST be highly unique, multi-word or abstract combinations with a mathematical certainty of being unregistered (e.g., "CobaltStack", "KapturHQ", "VelvetData", "TrustPilot").

Return a STRICT JSON object (no markdown, raw JSON only) with this structure:
{
  "names": [
    {
      "name": (string, the brand name),
      "reasoning": (string, 1 punchy sentence why this name works and fits the vibe)
    }
  ]
}`;

        let jsonText = "";

        // ── PRIMARY: Try Gemini ───────────────────────────────
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: SYSTEM_PROMPT }] }],
                generationConfig: { temperature: 0.9, topP: 0.95 }
            });
            jsonText = result.response.text();
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...");
            const completion = await groq.chat.completions.create({
                messages: [{ role: "system", content: SYSTEM_PROMPT }],
                model: "llama-3.1-8b-instant",
                temperature: 0.9, // Higher temp for maximum creativity
            });
            jsonText = completion.choices[0]?.message?.content || "";
        }

        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const aiData = JSON.parse(cleanedJson);

        // ── EXECUTE DNS REGISTRY CHECKS ──────────────────────
        const enrichedNames = await Promise.all(aiData.names.map(async (item) => {
            const cleanName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');

            // Run DNS checks in parallel for maximum speed
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
