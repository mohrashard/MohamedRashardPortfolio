'use server'

import { createClient } from '@supabase/supabase-js';
import { generateTechnicalDraft, getCreatorSearchInsights } from '@/lib/contentEngine';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function getPendingIdeas() {
    const { data, error } = await supabase
        .from('content_ideas')
        .select('*')
        .in('status', ['pending', 'drafted'])
        .order('intent_score', { ascending: false });
        
    if (error) {
        console.error("Error fetching ideas:", error);
        return [];
    }
    return data;
}

export async function getRecentActivity() {
    const { data, error } = await supabase
        .from('content_ideas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
        
    if (error) {
        console.error("Error fetching activity:", error);
        return [];
    }
    return data;
}

export async function validateIdeaInsights(keyword) {
    return await getCreatorSearchInsights(keyword);
}

export async function draftPostAction(ideaId, searchInsights = null) {
    try {
        const { data: idea, error } = await supabase
            .from('content_ideas')
            .select('editorial_brief')
            .eq('id', ideaId)
            .single();
            
        if (error) throw new Error("Could not find idea");
        
        const fullBrief = { ...idea.editorial_brief };
        if (searchInsights) {
            fullBrief.searchInsights = searchInsights;
        }

        // Use Node 2 to generate the draft
        const markdown = await generateTechnicalDraft(fullBrief);
        
        // Update status in Supabase and also save the search insights to the brief
        await supabase
            .from('content_ideas')
            .update({ 
                status: 'drafted',
                editorial_brief: fullBrief 
            })
            .eq('id', ideaId);
            
        return { success: true, markdown };
    } catch (error) {
        console.error("Draft generation failed:", error);
        return { success: false, error: error.message };
    }
}

export async function runScoutAction(timeframe) {
    const { exec } = require('child_process');
    
    // Run the node script in the background
    // Using --env-file=.env.local for local dev
    const cmd = `node --env-file=.env.local scripts/autonomous-scout.js ${timeframe}`;
    
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Scout exec error: ${error}`);
            return;
        }
        console.log(`Scout output: ${stdout}`);
    });
    
    // We return immediately so the UI doesn't hang waiting for the LLMs
    return { success: true, message: "Autonomous Scout started in the background!" };
}
