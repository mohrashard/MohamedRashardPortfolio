import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, reportResult, answers } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const competitorsList = reportResult.competitors.map(c => c.name).join(', ');

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Competitor Analyzer', 
        email, 
        pain_point: `Competitors identified: ${competitorsList}`, 
        urgency: 'Market Research Phase', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Competitor Research' 
    }]);

    // Send the Blueprint email via Resend
    let competitorHtml = reportResult.competitors.map(c => `
        <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <h4 style="color: #0066ff; margin: 0 0 8px 0; font-size: 18px;">${c.name}</h4>
            <p style="color: #a1a1aa; margin: 0 0 8px 0; font-size: 14px;"><strong>Model:</strong> ${c.pricing_model}</p>
            <p style="color: #ffffff; margin: 0 0 8px 0; font-size: 14px;"><strong>Vulnerability:</strong> ${c.core_weakness}</p>
            <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 12px; color: #10b981; font-size: 14px;">
                <strong>Gap to Exploit:</strong> ${c.gap_to_exploit}
            </div>
        </div>
    `).join('');

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `🎯 Market Gap Report: Exploiting your competitors`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Tactical Market Report</h2>
          <p style="color: #a1a1aa;">Here is the intelligence brief on your competitors and their specific vulnerabilities.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <p style="color: #ffffff; font-style: italic; margin-bottom: 24px;">"${reportResult.market_verdict}"</p>
            ${competitorHtml}
          </div>

          <p style="color: #a1a1aa;">You know the gap. Now you need the product. We architect and deploy high-velocity MVPs designed to exploit exactly these weaknesses in 48-72 hours.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book MVP Deployment</a>
        </div>
      `,
    });

    if (emailError) {
      console.error('[RESEND ERROR - CLIENT]:', emailError);
    }

    // Notify You
    const { error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `🕵️♂️ NEW MARKET LEAD: Researching against ${competitorsList}`,
      html: `<p>Email: ${email}</p><pre>${JSON.stringify(answers, null, 2)}</pre>`
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
