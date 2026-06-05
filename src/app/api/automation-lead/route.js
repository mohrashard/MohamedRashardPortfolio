import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, calcResult } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const painData = `Losing $${calcResult.metrics.yearlyCost}/yr (${calcResult.metrics.yearlyHours} hrs) on: ${calcResult.metrics.taskName}`;

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Automation Calculator', 
        email, 
        pain_point: painData, 
        urgency: 'High (Bleeding Capital)', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Automation Calculator' 
    }]);

    // Send the Blueprint email via Resend
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `🚨 Stop wasting $${calcResult.metrics.yearlyCost} on ${calcResult.metrics.taskName}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Your Automation Architecture</h2>
          <p style="color: #a1a1aa;">You are currently burning <strong>$${calcResult.metrics.yearlyCost}</strong> and <strong>${calcResult.metrics.yearlyHours} hours</strong> every year on manual processes.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <h3 style="color: #0066ff;">Proposed Architecture: ${calcResult.strategy.solution_title}</h3>
            <p style="color: #a1a1aa;">${calcResult.strategy.architecture}</p>
            <p style="color: #10b981; font-weight: bold;">Estimated Payback Period: ${calcResult.strategy.payback_period}</p>
          </div>

          <p style="color: #a1a1aa;">Ready to stop bleeding capital? Let's deploy this automation this week.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Deployment Call</a>
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
      subject: `💰 NEW LEAD: Burning $${calcResult.metrics.yearlyCost}/yr`,
      html: `<p>Email: ${email}</p><p>Issue: ${painData}</p>`
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
