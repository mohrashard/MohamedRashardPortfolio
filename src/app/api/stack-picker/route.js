import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

const SYSTEM_PROMPT = `You are an elite Technical Systems Architect at Mr² Labs. Your job is to recommend the perfect tech stack for a founder's MVP. 
Your recommendations MUST lean heavily toward modern, high-velocity, serverless architectures. 
- For web/SaaS: Next.js (React), Tailwind CSS, Supabase (PostgreSQL).
- For mobile: React Native/Expo.
- For AI: Python, FastAPI, or direct Gemini API integration.
- For infrastructure: Vercel or Edge networks.

Analyze the user's answers and return a STRICT JSON object with this exact structure:
{
  "frontend": { "name": (string, e.g., "Next.js"), "reason": (string, 1 short sentence why) },
  "backend": { "name": (string, e.g., "Supabase (PostgreSQL)"), "reason": (string, 1 short sentence why) },
  "infrastructure": { "name": (string, e.g., "Vercel Edge"), "reason": (string, 1 short sentence why) },
  "verdict": (string, 2 sentences explaining why this stack fits their use case and timeline),
  "complexity": (string, "Low", "Medium", or "High")
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
        console.error("[SYSTEM ERROR] Stack Picker API Route Failed:", error);
        return NextResponse.json(
            { success: false, error: "System diagnostic failed. Please try again." },
            { status: 500 }
        );
    }
}
