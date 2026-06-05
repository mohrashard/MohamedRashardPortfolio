import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, pricingResult, answers } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const productName = answers["What is the name of your product?"] || "Startup";

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'Pricing Generator', 
        email, 
        pain_point: `Generated pricing for: ${productName}`, 
        urgency: 'Launch Phase', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Pricing Generator' 
    }]);

    // Format tiers for email
    let tiersHtml = pricingResult.tiers.map(t => `
        <td style="padding: 20px; border: 1px solid #333; vertical-align: top; width: 33%;">
            <h4 style="color: ${t.is_popular ? '#0066ff' : '#ffffff'}; margin: 0 0 8px 0;">${t.name}</h4>
            <h2 style="color: #ffffff; margin: 0 0 8px 0; font-size: 24px;">$${t.price}<span style="font-size: 14px; color: #a1a1aa;">${t.billing_cycle}</span></h2>
            <p style="color: #a1a1aa; font-size: 12px;">${t.description}</p>
            <ul style="color: #ffffff; font-size: 12px; padding-left: 16px;">
                ${t.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </td>
    `).join('');

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `💰 Your SaaS Pricing Strategy for ${productName}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Monetization Strategy</h2>
          <p style="color: #a1a1aa;">Here is the optimized pricing structure our AI generated for your product.</p>
          
          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; background: #111; border-collapse: collapse;">
            <tr>${tiersHtml}</tr>
          </table>

          <p style="color: #a1a1aa;">Having the pricing strategy is step one. Having the infrastructure to actually bill users is step two. If you need Stripe integrated and this pricing page coded into your Next.js app, we can deploy it in 24 hours.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Deployment Call</a>
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
      subject: `💳 NEW LAUNCH LEAD: Pricing generated for ${productName}`,
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
