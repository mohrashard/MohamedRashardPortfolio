import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        // 1. Extract and Calculate Hard Math (Assuming 250 working days/year)
        const taskName = answers["What is the specific manual task? (e.g., Copying leads from email to CRM)"] || "Manual Task";
        const timesPerDay = parseFloat(answers["How many times per day does your team do this?"]) || 0;
        const minutesPerTask = parseFloat(answers["How many minutes does it take each time?"]) || 0;
        const hourlyRate = parseFloat(answers["What is the average hourly rate of the person doing this? ($)"]) || 0;

        const dailyMinutes = timesPerDay * minutesPerTask;
        const yearlyHours = (dailyMinutes * 250) / 60;
        const yearlyCost = yearlyHours * hourlyRate;

        // 2. Build Prompt for the AI Architect
        const SYSTEM_PROMPT = `You are an elite Technical Systems Architect at Mr² Labs specializing in business workflow automation.
The user is wasting $${yearlyCost.toFixed(2)} and ${yearlyHours.toFixed(0)} hours per year on this manual task: "${taskName}".
        
Your job is to architect a high-velocity automated solution. Favor tools like Make.com, Zapier, custom Python scripts, Supabase, and the Gemini API.

Return a STRICT JSON object (no markdown, no backticks, raw JSON only) with this structure:
{
  "solution_title": (string, punchy title like "Automated Webhook -> CRM Pipeline"),
  "architecture": (string, 2 sentences explaining the exact tech/APIs used to automate this),
  "payback_period": (string, estimated time for the automation to pay for itself, e.g., "14 Days")
}`;

        let jsonText = "";

        // ── PRIMARY: Try Gemini ───────────────────────────────
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Fast live model
            const result = await model.generateContent(SYSTEM_PROMPT);
            jsonText = result.response.text();
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...", geminiError);
            // ── FALLBACK: Try Groq ────────────────────────────
            const completion = await groq.chat.completions.create({
                messages: [{ role: "system", content: SYSTEM_PROMPT }],
                model: "llama-3.1-8b-instant",
                temperature: 0.2,
            });
            jsonText = completion.choices[0]?.message?.content || "";
        }

        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const aiStrategy = JSON.parse(cleanedJson);

        // 3. Return Combined Math + AI Data
        return NextResponse.json({ 
            success: true, 
            data: {
                metrics: {
                    yearlyCost: yearlyCost.toFixed(2),
                    yearlyHours: yearlyHours.toFixed(0),
                    taskName: taskName
                },
                strategy: aiStrategy
            } 
        });

    } catch (error) {
        console.error("[SYSTEM ERROR] Calculator API Failed:", error);
        return NextResponse.json({ success: false, error: "Calculation failed." }, { status: 500 });
    }
}
