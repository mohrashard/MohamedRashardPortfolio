import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    // Insert lead into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Prompt Library Vault Unlock', 
        email, 
        pain_point: 'Unlocking 50+ Prompt Master Vault', 
        urgency: 'N/A', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Prompt Library' 
    }]);

    // Send Registration Confirmation via Resend
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: '⚡ AI Prompt Crafter Access Unlocked',
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Prompt Crafter Access Granted</h2>
          <p style="color: #a1a1aa;">Your email has been successfully registered. You now have full access to our Custom AI Prompt Crafter.</p>
          <p style="color: #a1a1aa;">You can use the generator to engineer elite, production-grade meta-prompts anytime without needing to register again.</p>
          
          <div style="background-color: #111; padding: 25px; border-radius: 12px; border: 1px solid #333; margin: 25px 0; text-align: center;">
            <a href="https://mr2labs.com/labs/prompt-library#crafter" style="display: inline-block; padding: 14px 28px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Access the Prompt Crafter
            </a>
          </div>

          <p style="color: #a1a1aa;">Prompting is powerful, but automated execution is where leverage lives. If you want these prompt systems engineered directly into your application codebase or custom AI workflows, let's connect.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="color: #38bdf8; text-decoration: none; font-weight: bold;">Book an AI Workflow Integration Call →</a>
        </div>
      `,
    });

    if (emailError) {
      console.error('[RESEND ERROR - CLIENT]:', emailError);
    }

    // Internal notification
    const { error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `⚡ VAULT UNLOCK: New Prompt Library Lead`,
      html: `<p><strong>Email:</strong> ${email} just unlocked the 50+ master prompt workspace.</p>`
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
