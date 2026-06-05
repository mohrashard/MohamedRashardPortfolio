import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, gitResult } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const m = gitResult.metrics;
    const a = gitResult.analysis;

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'GitHub Analyzer', 
        email, 
        pain_point: `Evaluated dev: ${m.username}. Score: ${m.baseScore}/100`, 
        urgency: 'Active Search (Evaluating Devs)', 
        budget: 'N/A', 
        website: `github.com/${m.username}`, 
        outcome: 'GitHub Analyzer' 
    }]);

    // Send the Blueprint email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `🧑💻 Technical Evaluation Report: ${m.username}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Developer Assessment</h2>
          <p style="color: #a1a1aa;">Here is the deep-dive technical assessment for GitHub user <strong>${m.username}</strong>.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <h3 style="color: #38bdf8; margin-top: 0;">CTO Summary</h3>
            <p style="color: #ffffff;">${a.summary}</p>
            
            <h4 style="color: #10b981; margin-top: 20px;">Strengths:</h4>
            <ul style="color: #a1a1aa; font-size: 14px;">${a.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
            
            <h4 style="color: #f43f5e; margin-top: 20px;">Identified Gaps:</h4>
            <ul style="color: #a1a1aa; font-size: 14px;">${a.gaps.map(g => `<li>${g}</li>`).join('')}</ul>
            
            <hr style="border-color: #333; margin: 20px 0;" />
            <h3 style="color: #ffffff;">Hiring Verdict:</h3>
            <p style="color: #a1a1aa; font-style: italic;">"${a.hire_recommendation}"</p>
          </div>

          <div style="background: rgba(0, 102, 255, 0.1); border-left: 4px solid #0066ff; padding: 20px; margin-top: 30px;">
              <h3 style="color: #0066ff; margin-top: 0;">Don't gamble your MVP on an unknown hire.</h3>
              <p style="color: #a1a1aa;">Hiring the wrong developer will burn months of runway. If you need a senior architect to build your MVP right the first time, Mr² Labs ships production-ready applications in 72 hours.</p>
              <br>
              <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book MVP Deployment</a>
          </div>
        </div>
      `,
    });

    // Notify You
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `👀 NEW LEAD: Evaluating Dev ${m.username}`,
      html: `<p>Email: ${email}</p><p>Dev Score: ${m.baseScore}</p>`
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
