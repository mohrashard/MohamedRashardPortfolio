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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Insert into Supabase (mocking the fields we aren't collecting for a simple lead capture)
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ 
        name: 'Blueprint Download', 
        email, 
        pain_point: 'Wants MVP Blueprint', 
        urgency: 'N/A', 
        budget: 'N/A', 
        website: 'N/A', 
        outcome: 'Lead Magnet' 
      }]);

    if (dbError) {
      console.error('Supabase error:', dbError.message);
      // We don't necessarily fail here if DB drops, still send the email
    }

    // Send the Blueprint PDF link via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Mohamed | Mr² Labs <labs@mohamedrashard.dev>',
      reply_to: 'mohrashard@gmail.com',
      to: email,
      subject: '📦 Your 72-Hour MVP Blueprint - Mr² Labs',
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
                    <td style="background-color: #050505; padding: 30px 40px; text-align: left; border-bottom: 2px solid #a855f7;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Mr² <span style="color: #a855f7;">Labs</span></h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 40px; text-align: left;">
                      <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 700;">Here is your 72-Hour MVP Blueprint 🚀</h2>
                      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                        Thanks for requesting the blueprint. As promised, here is the exact framework I use to ship working products in 3 days.
                      </p>
                      
                      <div style="text-align: center; margin-bottom: 32px;">
                        <a href="https://www.mohamedrashard.dev/72-Hour-MVP-Blueprint.pdf" style="display: inline-block; padding: 16px 32px; background-color: #a855f7; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 16px;">
                          Download PDF Blueprint
                        </a>
                      </div>

                      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                        If you ever hit a roadblock building your MVP, or just want an expert to build it for you properly from day one, just reply to this email.
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
      from: 'Mr² Labs Bot <labs@mohamedrashard.dev>',
      to: 'mohrashard@gmail.com',
      subject: `📥 NEW LEAD: Blueprint Download`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color: #a855f7;">New Blueprint Download</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p>This lead was captured via the Labs / Lead Magnet page and has been added to Supabase.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Blueprint sent.' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
