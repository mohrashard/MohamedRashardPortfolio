import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, runwayResult } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const m = runwayResult.metrics;
    const painData = `Runway: ${m.standardRunwayMonths}mo. Bleeding $${m.agencyOverhead}/mo on agencies. Could gain ${m.monthsGained}mo.`;

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Runway Calculator', 
        email, 
        pain_point: painData, 
        urgency: m.standardRunwayMonths < 6 ? 'Critical (Under 6mo Runway)' : 'High', 
        budget: `Cash: $${m.cash}`, 
        website: 'N/A', 
        outcome: 'Runway Calculator' 
    }]);

    // Send the Blueprint email via Resend
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `📈 How to add ${m.monthsGained} months to your startup runway`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Runway Extension Strategy</h2>
          <p style="color: #a1a1aa;">You currently have <strong>${m.standardRunwayMonths} months</strong> of survival left.</p>
          <p style="color: #a1a1aa;">By eliminating your $${m.agencyOverhead}/mo agency bloat and switching to fixed-scope sprints, you immediately add <strong>${m.monthsGained} months</strong> to your runway and save <strong>$${Number(m.capitalSavedAnnually).toLocaleString()}</strong> this year.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <h3 style="color: #0066ff; margin-top: 0;">Strategic Verdict</h3>
            <p style="color: #a1a1aa; line-height: 1.6; margin-bottom: 0;">${runwayResult.strategy.strategic_verdict}</p>
          </div>

          ${runwayResult.strategy.execution_plan ? runwayResult.strategy.execution_plan.map(plan => `
            <div style="background-color: #0A0A0A; padding: 16px 20px; border-radius: 8px; border: 1px solid #222; margin-bottom: 12px;">
              <h4 style="color: #fff; margin-top: 0; margin-bottom: 8px; font-size: 15px;">${plan.phase}</h4>
              <p style="color: #a1a1aa; font-size: 14px; margin: 0; line-height: 1.5;">${plan.action}</p>
            </div>
          `).join('') : ''}

          <p style="color: #a1a1aa;">Stop burning capital on slow development. Let's scope your next release to ship in 72 hours.</p>
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
      subject: `🚨 NEW RUNWAY LEAD: ${m.standardRunwayMonths}mo left`,
      html: `<p>Email: ${email}</p><p>Data: ${painData}</p>`
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
