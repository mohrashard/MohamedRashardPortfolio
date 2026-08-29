import { google } from 'googleapis';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2Client;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead_id, date, slot, name, email, company, domain, notes } = body;

    if (!date || !slot || !email || !name) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 });
    }

    const startTime = new Date(`${date}T${slot}:00Z`);
    const endTime = new Date(startTime.getTime() + 15 * 60 * 1000);

    const auth = getOAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    // 1. Create Google Calendar Event with Google Meet
    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `MR² Labs Strategy Session — ${company || domain || name}`,
        description: `Strategy session with ${name}.\nWebsite: ${domain || 'N/A'}\nNotes: ${notes || 'None provided'}\nLead ID: ${lead_id || 'N/A'}`,
        start: { dateTime: startTime.toISOString() },
        end: { dateTime: endTime.toISOString() },
        attendees: [
          { email: email },
          { email: 'rashard@mr2labs.com' },
        ],
        conferenceData: {
          createRequest: {
            requestId: `meet-${lead_id || Date.now()}-${Math.random().toString(36).substring(7)}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    const meetLink = event.data.hangoutLink || event.data.conferenceData?.entryPoints?.[0]?.uri || '';
    const googleEventId = event.data.id || '';

    // 2. Log to Supabase
    await supabase.from('bookings').insert({
      lead_id: lead_id || null,
      company_name: company || null,
      domain: domain || null,
      contact_email: email,
      contact_name: name,
      booked_at: startTime.toISOString(),
      duration_minutes: 15,
      google_event_id: googleEventId,
      meet_link: meetLink,
      notes: notes || null,
    });

    const formattedTimeET = startTime.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // 3. Send Confirmation Email to Prospect
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'rashard@outreach.mr2labs.com',
      to: email,
      subject: `Confirmed: Strategy Session (${formattedTimeET} ET)`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 540px; margin: 0 auto; color: #111;">
          <h2 style="font-size: 20px; font-weight: 600;">Strategy Call Confirmed</h2>
          <p>Hey ${name},</p>
          <p>Your session is locked in. Here are the details:</p>
          
          <div style="background: #f7f7f8; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Time:</strong> ${formattedTimeET} Eastern</p>
            <p style="margin: 0;"><strong>Google Meet:</strong> <a href="${meetLink}" style="color: #2563eb;">${meetLink}</a></p>
          </div>

          <p>We will walk through our findings for <strong>${domain || 'your business'}</strong> and discuss implementation options.</p>
          <p style="margin-top: 24px; color: #666; font-size: 14px;">— Rashard<br>MR² Labs</p>
        </div>
      `,
    });

    // 4. Send Instant Alert to You
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'rashard@outreach.mr2labs.com',
      to: 'rashard@mr2labs.com',
      subject: `⚡ New Booking: ${company || name} (${domain || email})`,
      html: `
        <p><strong>${name}</strong> from <strong>${company || 'N/A'}</strong> scheduled a call.</p>
        <p><strong>Time:</strong> ${startTime.toISOString()}</p>
        <p><strong>Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Domain:</strong> ${domain}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
      `,
    });

    return NextResponse.json({ success: true, meetLink });
  } catch (err: any) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: err.message || 'Failed to complete booking' }, { status: 500 });
  }
}
