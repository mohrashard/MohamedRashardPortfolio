import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, emailResult, answers } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const targetAudience = answers["Who is your exact target customer? (e.g., CFOs at mid-sized logistics companies)"] || "Unknown Target";

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Cold Email Generator', 
        email, 
        pain_point: `Targeting: ${targetAudience}.`, 
        urgency: 'Outreach Phase', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Cold Email Generator' 
    }]);

    // Send the Blueprint email via Resend
    let variantsHtml = emailResult.variants.map(v => `
        <div style="margin-bottom: 24px;">
            <h4 style="color: #0066ff; margin: 0 0 4px 0; font-size: 16px;">${v.strategy}</h4>
            <p style="color: #ffffff; margin: 0 0 8px 0; font-weight: bold;">Subject: ${v.subject}</p>
            <div style="color: #a1a1aa; font-size: 14px; white-space: pre-wrap; background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px;">${v.body}</div>
        </div>
    `).join('');

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `📧 Your High-Converting Cold Email Templates`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Outreach Generation Report</h2>
          <p style="color: #a1a1aa;">Here are the 3 cold email variants our AI drafted specifically for your product.</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            ${variantsHtml}
          </div>

          <p style="color: #a1a1aa;">Getting replies is great, but do you have the infrastructure to handle the traffic? If you need a landing page or app built before your outreach campaign scales, let's talk.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #000; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Architecture Call</a>
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
      subject: `🎯 NEW OUTREACH LEAD: Targeting ${targetAudience}`,
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
