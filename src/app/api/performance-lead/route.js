import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, domain, lostRevenue } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const painData = `Domain: ${domain}. Lost Revenue: $${lostRevenue}.`;

    // Insert into Supabase
    const { error: dbError } = await supabase.from('leads').insert([{ 
        name: 'Performance Audit', 
        email, 
        pain_point: painData, 
        urgency: lostRevenue > 10000 ? 'High' : 'Medium', 
        budget: 'N/A', 
        website: domain, 
        outcome: 'Performance Audit Tool' 
    }]);
    
    if (dbError) {
      console.error('[SUPABASE ERROR]:', dbError.message);
      return NextResponse.json({ error: 'Failed to record lead in database' }, { status: 500 });
    }

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `⚡ Performance Alert: Architecture review for ${domain}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Performance Architecture Report</h2>
          <p style="color: #a1a1aa;">Your DOM and CDN architecture for <strong>${domain}</strong> is leaking revenue.</p>
          
          <div style="background-color: #220000; padding: 20px; border-radius: 8px; border: 1px solid #ff3333; margin: 20px 0;">
            <h3 style="color: #ff3333;">Projected Lost Revenue: $${lostRevenue}</h3>
            <p style="color: #a1a1aa;">Our automated systems have flagged DOM bloat and CDN misconfigurations that are actively slowing down your time-to-interactive.</p>
          </div>

          <p style="color: #a1a1aa;">Stop burning cash on bad architecture. Book a technical review to patch this.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://mr2labs.com/book/direct'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Performance Call</a>
        </div>
      `,
    });

    if (emailError) console.error('[RESEND ERROR]', emailError);

    const { error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `🚨 NEW PERFORMANCE LEAD: ${domain}`,
      html: `<p>Email: ${email}</p><p>Data: ${painData}</p>`
    });

    if (adminError) console.error('[RESEND ERROR]', adminError);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
