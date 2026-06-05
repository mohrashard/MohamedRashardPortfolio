import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const resendApiKey = process.env.RESEND_API_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(resendApiKey);

export async function POST(request) {
  try {
    const { email, stackResult, answers } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ 
        name: 'Tech Stack Recommendation', 
        email, 
        pain_point: `Complexity: ${stackResult?.complexity}. Stack: ${stackResult?.frontend?.name} / ${stackResult?.backend?.name}. Answers: ${JSON.stringify(answers)}`, 
        urgency: 'N/A', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Stack Picker Scorer' 
      }]);

    if (dbError) {
      console.error('Supabase error:', dbError.message);
    }

    // Send the Blueprint email via Resend
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: '⚡ Your Custom Tech Stack Blueprint - Mr² Labs',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0A0A0A; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
                  
                  <tr>
                    <td style="background-color: #020202; padding: 30px 40px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05);">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Mr² <span style="color: #0066ff;">Labs</span></h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 40px; text-align: left;">
                      <h2 style="margin-top: 0; color: #ffffff; font-size: 20px; font-weight: 700;">Here is your Tech Stack Blueprint</h2>
                      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                        Thanks for providing your product requirements. Our Senior Architect AI has designed the optimal stack to launch your MVP with high velocity and scale.
                      </p>

                      ${stackResult ? `
                        <div style="background-color: #111111; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                            <h4 style="color: #ffffff; font-size: 16px; margin: 0 0 8px 0;">Frontend: ${stackResult.frontend.name}</h4>
                            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">${stackResult.frontend.reason}</p>
                            
                            <h4 style="color: #ffffff; font-size: 16px; margin: 0 0 8px 0;">Backend: ${stackResult.backend.name}</h4>
                            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">${stackResult.backend.reason}</p>
                            
                            <h4 style="color: #ffffff; font-size: 16px; margin: 0 0 8px 0;">Infrastructure: ${stackResult.infrastructure.name}</h4>
                            <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0;">${stackResult.infrastructure.reason}</p>
                        </div>
                        <br/>
                      ` : ''}
                      
                      <div style="text-align: center; margin-bottom: 32px;">
                        <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 16px 32px; background-color: #0066ff; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 16px;">
                          Book a Deployment Call
                        </a>
                      </div>

                      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                        If you need this exact architecture engineered for your startup, let's discuss how we can deploy these systems in 48-72 hours.
                      </p>

                      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin-bottom: 32px;">

                      <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 4px 0; color: #ffffff; font-size: 16px; font-weight: 700;">Mohamed Rashard Rizmi</p>
                            <p style="margin: 0 0 16px 0; color: #71717a; font-size: 14px;">Software Engineer & Founder</p>
                            <a href="https://mr2labs.com" style="color: #0066ff; text-decoration: none; font-size: 14px; font-weight: 500;">mr2labs.com</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError.message);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // INTERNAL NOTIFICATION TO YOU
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `🔥 NEW LEAD: Stack Picker - ${stackResult?.frontend?.name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color: #0066ff;">New Stack Architecture Lead</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Complexity:</strong> ${stackResult?.complexity}</p>
          <hr/>
          <h3>Answers:</h3>
          <pre style="background: #f4f4f5; padding: 16px; border-radius: 8px;">${JSON.stringify(answers, null, 2)}</pre>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Blueprint sent and lead captured.' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
