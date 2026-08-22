import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

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
        
Your job is to architect a high-velocity automated solution. Favor tools like Make.com, Zapier, custom Python scripts, Supabase, and Gemini/Groq APIs.

Return a STRICT JSON object with this structure:
{
  "solution_title": (string, punchy title like "Automated Webhook -> CRM Pipeline"),
  "architecture": (string, 2 sentences explaining the exact tech/APIs used to automate this),
  "payback_period": (string, estimated time for the automation to pay for itself, e.g., "14 Days")
}`;

        const aiStrategy = await executeWaterfallAi(SYSTEM_PROMPT, "Generate automation architecture", { isJson: true });

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
