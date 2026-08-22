import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        // 1. Extract and Calculate Hard Math
        const cash = parseFloat(answers["What is your current total cash in bank? ($)"]) || 0;
        const totalBurn = parseFloat(answers["What is your total monthly burn rate? ($)"]) || 0;
        const agencyOverhead = parseFloat(answers["How much of that monthly burn goes to agency retainers or slow contractors? ($)"]) || 0;

        const safeBurn = totalBurn > 0 ? totalBurn : 1;
        const optimizedBurn = (totalBurn - agencyOverhead) > 0 ? (totalBurn - agencyOverhead) : 1;

        const standardRunwayMonths = (cash / safeBurn).toFixed(1);
        const optimizedRunwayMonths = (cash / optimizedBurn).toFixed(1);
        const monthsGained = (optimizedRunwayMonths - standardRunwayMonths).toFixed(1);
        const capitalSavedAnnually = (agencyOverhead * 12).toFixed(2);

        // 2. Build Prompt for the AI Strategist
        const SYSTEM_PROMPT = `You are an elite Technical Systems Architect and VC Advisor at Mr² Labs.
The user is a startup founder with $${cash} in bank.
Their burn rate is $${totalBurn}/month (${standardRunwayMonths} months runway).
They are burning $${agencyOverhead}/month on agency retainers/contractors.
Cutting this overhead gains ${monthsGained} months of survival and saves $${capitalSavedAnnually}/yr.
        
Architect a ruthless, zero-bloat capital efficiency strategy. 
Advise them to drop the agency, utilize Mr² Labs' high-velocity 48-72h fixed-scope sprints, and lean on AI architecture to scale without headcount.

Return a STRICT JSON object with this structure:
{
  "strategic_verdict": (string, 2 punchy sentences about current runway danger and immediate fix),
  "execution_plan": [
    { "phase": "Phase 1: Stop The Bleed", "action": (string, advice on cutting retainer/overhead) },
    { "phase": "Phase 2: High-Velocity Deploy", "action": (string, advice on rapid sprints) },
    { "phase": "Phase 3: Scale via Infrastructure", "action": (string, advice on AI and Serverless tech) }
  ]
}`;

        const aiStrategy = await executeWaterfallAi(SYSTEM_PROMPT, "Generate capital efficiency plan", { isJson: true });

        return NextResponse.json({ 
            success: true, 
            data: {
                metrics: {
                    cash, totalBurn, agencyOverhead, standardRunwayMonths, optimizedRunwayMonths, monthsGained, capitalSavedAnnually
                },
                strategy: aiStrategy
            } 
        });

    } catch (error) {
        console.error("[SYSTEM ERROR] Runway API Failed:", error);
        return NextResponse.json({ success: false, error: "Calculation failed." }, { status: 500 });
    }
}
