import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, namesResult } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const topName = namesResult[0]?.name || "Startup";

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Name & Domain Checker', 
        email, 
        pain_point: `Generated names including: ${topName}`, 
        urgency: 'Ideation Phase', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Name Checker' 
    }]);

    // Send the Blueprint email via Resend
    let namesHtml = namesResult.map(n => `
        <div style="margin-bottom: 16px;">
            <h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 18px;">${n.name}</h4>
            <p style="color: #a1a1aa; margin: 0 0 8px 0; font-size: 14px;">${n.reasoning}</p>
            <p style="color: #a855f7; margin: 0; font-size: 12px; font-family: monospace;">
                .com: ${n.available.com ? '✅' : '❌'} | .dev: ${n.available.dev ? '✅' : '❌'} | .io: ${n.available.io ? '✅' : '❌'}
            </p>
        </div>
    `).join('');

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `✨ Your Startup Brand Names & Domains`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Brand Generation Report</h2>
          <p style="color: #a1a1aa;">Here are the startup names our AI generated for you, along with their live domain availability.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            ${namesHtml}
          </div>

          <p style="color: #a1a1aa;">Found a name you love? Let's take it from an idea to a live MVP in 72 hours.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #a855f7; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Scope Your MVP</a>
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
      subject: `🚀 NEW IDEA LEAD: Looking at name "${topName}"`,
      html: `<p>Email: ${email}</p>`
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
