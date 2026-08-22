import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are an elite Meta-Prompt Engineer. 
A user will tell you what they want an AI to do. Your job is to write the ULTIMATE, highly-structured system prompt that they can copy/paste into ChatGPT/Claude to get the best possible result.

Your generated prompt MUST include:
1. A clear role/persona (e.g., "Act as an elite Next.js developer...")
2. Specific context, constraints, and tonal guidelines.
3. A required output format (e.g., "Return only valid JSON" or "Use markdown with specific headings").

Return ONLY the raw prompt text. Do not include quotes around it, do not include intro/outro text like "Here is your prompt:". Just the prompt itself.`;

export async function POST(req) {
    try {
        const { request: userRequest } = await req.json();

        const textOutput = await executeWaterfallAi(SYSTEM_PROMPT, userRequest, { isJson: false });
        return NextResponse.json({ success: true, prompt: textOutput.trim() });
    } catch (error) {
        console.error("[SYSTEM ERROR] Crafter API Failed:", error);
        return NextResponse.json({ success: false, error: "Generation failed." }, { status: 500 });
    }
}
