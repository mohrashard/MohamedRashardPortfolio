import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize clients once outside the handler for better performance
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const resendApiKey = process.env.RESEND_API_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(resendApiKey);

export async function POST(request) {
  try {
    const { nameAndBusiness, email, painPoint, urgency, budget, website, outcome } = await request.json();

    // 1. Strict Validation
    if (!nameAndBusiness || !email || !painPoint || !urgency || !budget || !website) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // 2. Insert into Supabase
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ name: nameAndBusiness, email, pain_point: painPoint, urgency, budget, website, outcome }]);

    if (dbError) {
      console.error('Supabase error:', dbError.message);
      return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }

    // 3. Send PREMIUM automated email via Resend to the Client
    const { error: emailError } = await resend.emails.send({
      from: 'Mohamed | Mr² Labs <labs@mohamedrashard.dev>',
      reply_to: 'mohrashard@gmail.com',
      to: email,
      subject: '⚡ Audit Request Received - Mr² Labs',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                  
                  <tr>
                    <td style="background-color: #050505; padding: 30px 40px; text-align: left; border-bottom: 2px solid #2563eb;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Mr² <span style="color: #3b82f6;">Labs</span></h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 40px; text-align: left;">
                      <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 700;">Audit Request Secured ⚡</h2>
                      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                        Got it. I've successfully received your request and I'm diving into your business details right now.
                      </p>
                      
                      <div style="background-color: #f1f5f9; border-left: 4px solid #3b82f6; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                        <p style="margin: 0; color: #334155; font-size: 15px; font-weight: 500;">
                          ⏱️ <strong>Next Step:</strong> I will personally review your infrastructure and send you a custom Loom video audit within the next 48 hours.
                        </p>
                      </div>

                      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                        If you have any urgent questions or additional context you want me to consider before I record the video, just reply directly to this email.
                      </p>

                      <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 32px;">

                      <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 4px 0; color: #0f172a; font-size: 16px; font-weight: 700;">Mohamed Rashard Rizmi</p>
                            <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">Software Engineer & Founder</p>
                            <a href="https://www.mohamedrashard.dev" style="color: #2563eb; text-decoration: none; font-size: 14px; font-weight: 500;">mohamedrashard.dev</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin-top: 20px;">
                  <tr>
                    <td style="text-align: center; color: #94a3b8; font-size: 12px;">
                      © ${new Date().getFullYear()} Mr² Labs. Based in Colombo, working globally.
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

    // 4. Internal Notification to YOU
    const { error: notifyError } = await resend.emails.send({
      from: 'Mr² Labs Bot <labs@mohamedrashard.dev>',
      to: 'mohrashard@gmail.com',
      subject: `🚨 NEW LEAD: ${nameAndBusiness}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color: #2563eb;">New AI Audit Request 🚀</h2>
          <p><strong>Name/Business:</strong> ${nameAndBusiness}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Pain Point:</strong> ${painPoint}</p>
          <p><strong>Urgency:</strong> ${urgency}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Website:</strong> ${website}</p>
          <p><strong>Desired Outcome:</strong> ${outcome}</p>
        </div>
      `,
    });

    if (notifyError) console.error('Internal notification failed:', notifyError.message);

    if (emailError) {
      console.error('Resend error:', emailError.message);
      return NextResponse.json({ success: true, message: 'Lead saved, but confirmation email failed to send.' }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: 'Audit request received.' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}