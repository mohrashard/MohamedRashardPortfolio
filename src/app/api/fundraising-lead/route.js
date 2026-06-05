import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, score, verdict, badgeColor, gaps, answers } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Fundraising Scorecard', 
        email, 
        pain_point: `Score: ${score}/100. Gaps: ${gaps.length}`, 
        urgency: score > 55 ? 'High (Raising Soon)' : 'Building Phase', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Fundraising Readiness' 
    }]);

    // Format gaps for email
    let gapsHtml = gaps.length > 0 
        ? gaps.map(gap => `<li style="margin-bottom: 8px;"><strong>${gap.question}</strong><br/><em>Action: You scored 0 here. You need to fix this before pitching.</em></li>`).join('')
        : "<li>You crushed the fundamentals. Your gaps are minimal.</li>";

    // Send the Breakdown email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `📊 Your Detailed Fundraising Score Breakdown (${score}/100)`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Fundraising Diagnostic Report</h2>
          <p style="color: #a1a1aa;">You scored <strong>${score} out of 100</strong>.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <h3 style="color: ${badgeColor}; margin-top: 0;">Verdict</h3>
            <p style="color: #ffffff; font-weight: bold;">${verdict.title}</p>
            <p style="color: #a1a1aa;">${verdict.message}</p>
          </div>

          <h3 style="color: #fff;">Your Critical Gaps (Scored 0):</h3>
          <ul style="color: #f43f5e; font-size: 14px; padding-left: 16px;">
            ${gapsHtml}
          </ul>

          <div style="background: rgba(0, 102, 255, 0.1); border-left: 4px solid #0066ff; padding: 20px; margin-top: 30px;">
              <p style="color: #a1a1aa; margin: 0;">The single fastest way to move your score up is a live product investors can click. If the technical build is the bottleneck, that is exactly what Mr² Labs solves. Reply to this email and tell me what you are building, or book a call below.</p>
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
      subject: `💸 NEW FUNDING LEAD: Scored ${score}/100`,
      html: `<p>Email: ${email}</p><p>Score: ${score}</p><pre>${JSON.stringify(answers, null, 2)}</pre>`
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
