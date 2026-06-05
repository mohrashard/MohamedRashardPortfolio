import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, valResult, answers } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const ideaData = `Score: ${valResult.score}/100. Verdict: ${valResult.verdict}`;

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Idea Validator', 
        email, 
        pain_point: ideaData, 
        urgency: 'Validation Phase', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Idea Validator' 
    }]);

    // Send the Blueprint email via Resend
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `📊 Your Startup Viability Score: ${valResult.score}/100`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Startup Validation Report</h2>
          <p style="color: #a1a1aa;">Our AI architect scored your concept a <strong>${valResult.score}/100</strong>.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <h3 style="color: #0066ff; margin-top: 0;">Architectural Verdict</h3>
            <p style="color: #a1a1aa; line-height: 1.6; margin-bottom: 0;">${valResult.verdict}</p>
          </div>

          ${valResult.dimensions ? valResult.dimensions.map(dim => `
            <div style="background-color: #0A0A0A; padding: 16px 20px; border-radius: 8px; border: 1px solid #222; margin-bottom: 12px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
                <tr>
                  <td align="left">
                    <span style="color: #fff; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">${dim.name}</span>
                  </td>
                  <td align="right">
                    <span style="color: ${dim.score >= 80 ? '#34d399' : dim.score >= 50 ? '#fbbf24' : '#fb7185'}; font-weight: bold; font-size: 14px;">${dim.score}/100</span>
                  </td>
                </tr>
              </table>
              <p style="color: #a1a1aa; font-size: 14px; margin: 0; line-height: 1.5;">${dim.feedback}</p>
            </div>
          `).join('') : ''}

          <p style="color: #a1a1aa;">If you are ready to take this from an idea to a live product in 48-72 hours, let's talk.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Scoping Call</a>
        </div>
      `,
    });

    if (emailError) {
      console.error('[RESEND ERROR - CLIENT]:', emailError);
      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    // Notify You
    const { error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `💡 NEW IDEA LEAD: Scored ${valResult.score}/100`,
      html: `<p>Email: ${email}</p><p>Verdict: ${ideaData}</p><pre>${JSON.stringify(answers, null, 2)}</pre>`
    });

    if (adminError) {
      console.error('[RESEND ERROR - ADMIN]:', adminError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
