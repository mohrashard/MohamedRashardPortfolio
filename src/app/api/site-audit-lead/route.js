import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, testResult } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const m = testResult.metrics;
    const painData = `URL: ${m.targetUrl}. Score: ${m.score}. Grade: ${m.grade}.`;

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'SEO Audit', 
        email, 
        pain_point: painData, 
        urgency: m.grade === 'D' || m.grade === 'F' ? 'High' : 'Low', 
        budget: 'N/A', 
        website: m.targetUrl, 
        outcome: 'SEO Audit Tool' 
    }]);

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `🔎 Your SEO Technical Report: Grade ${m.grade}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">SEO Telemetry Report</h2>
          <p style="color: #a1a1aa;">Here are the metadata metrics for <strong>${m.targetUrl}</strong>.</p>
          
          <ul style="color: #ffffff; margin-bottom: 24px;">
            <li><strong>Technical Grade:</strong> ${m.grade} (${m.score}/100)</li>
            <li><strong>Title:</strong> ${m.title}</li>
            <li><strong>Description:</strong> ${m.description}</li>
            <li><strong>Primary H1:</strong> ${m.h1}</li>
          </ul>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <h3 style="color: #0066ff;">Architectural Verdict</h3>
            <p style="color: #a1a1aa;">${testResult.architecture.verdict}</p>
            <p style="color: #0066ff; font-weight: bold;">${testResult.architecture.recommendation}</p>
          </div>

          <p style="color: #a1a1aa;">Organic traffic is the lifeblood of B2B SaaS. If your architecture is failing, let's fix it.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Architecture Call</a>
        </div>
      `,
    });

    if (emailError) console.error('[RESEND ERROR]', emailError);

    const { error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `📈 NEW SEO LEAD: Tested ${m.targetUrl}`,
      html: `<p>Email: ${email}</p><p>Data: ${painData}</p>`
    });

    if (adminError) console.error('[RESEND ERROR]', adminError);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
