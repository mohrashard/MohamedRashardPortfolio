import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, jdResult, answers } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const roleTitle = answers["What role are you hiring for? (e.g., Founding Full Stack Engineer)"] || jdResult.role_title;

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'JD Generator', 
        email, 
        pain_point: `Hiring for: ${roleTitle}`, 
        urgency: 'Active Search (Needs Dev)', 
        budget: jdResult.salary_range, 
        website: 'N/A', 
        outcome: 'JD Generator' 
    }]);

    // Send the Blueprint email via Resend
    let listHtml = (title, items) => `
        <h4 style="color: #38bdf8; margin: 16px 0 8px 0; font-size: 16px;">${title}</h4>
        <ul style="color: #ffffff; font-size: 14px; padding-left: 16px; margin-top: 0;">
            ${items.map(i => `<li style="margin-bottom: 6px;">${i}</li>`).join('')}
        </ul>
    `;

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `📄 Your Technical Job Description for ${roleTitle}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">${jdResult.role_title}</h2>
          <p style="color: #10b981; font-weight: bold; font-family: monospace;">Est. Market Salary: ${jdResult.salary_range}</p>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <p style="color: #a1a1aa; font-size: 15px; font-style: italic;">"${jdResult.the_pitch}"</p>
            ${listHtml("What You Will Do", jdResult.what_you_will_do)}
            ${listHtml("The Tech Stack", jdResult.the_stack)}
            ${listHtml("Requirements", jdResult.requirements)}
          </div>

          <div style="background: rgba(0, 102, 255, 0.1); border-left: 4px solid #0066ff; padding: 20px; margin-top: 30px;">
              <h3 style="color: #0066ff; margin-top: 0;">Need this built right now?</h3>
              <p style="color: #a1a1aa;">The average technical hiring cycle takes 3 months. In that time, Mr² Labs can architect, build, and deploy your entire MVP in a 72-hour sprint.</p>
              <p style="color: #a1a1aa;">While you search for the right full-time hire, let us ship your v1.</p>
              <br>
              <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book MVP Deployment</a>
          </div>
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
      subject: `🔥 HOT LEAD: Looking to hire ${roleTitle}`,
      html: `<p>Email: ${email}</p><p>This person needs software built NOW but doesn't have an engineer.</p><pre>${JSON.stringify(answers, null, 2)}</pre>`
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
