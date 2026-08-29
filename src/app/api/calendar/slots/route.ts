import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Weekly working windows (UTC timestamps)
const AVAILABILITY: Record<string, string[]> = {
  monday: [
    '05:30', // 11:00 AM IST — UAE/Europe
    '06:30', // 12:00 PM IST — UK/Europe  
    '07:30', // 1:00 PM IST  — UK/Europe
    '14:30', // 8:00 PM IST  — US East/Canada
    '15:30', // 9:00 PM IST  — US East/Central
    '16:30', // 10:00 PM IST — US All zones
  ],
  tuesday: [
    '05:30',
    '06:30',
    '14:30',
    '15:30',
    '16:30',
  ],
  wednesday: [
    '06:30',
    '07:30',
    '15:30',
    '16:30',
  ],
  thursday: [
    '05:30',
    '06:30',
    '07:30',
    '14:30',
    '15:30',
    '16:30',
    '17:30', // 11:00 PM IST — US West
  ],
  friday: [
    '05:30',
    '06:30',
    '14:30',
    '15:30',
  ],
  saturday: [
    '06:30', // light availability
    '07:30',
    '14:30',
  ],
  sunday: [],
};
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2Client;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date'); // Format: YYYY-MM-DD
  if (!date) return NextResponse.json({ error: 'date query parameter required' }, { status: 400 });

  // ✅ Fix: use UTC day to avoid timezone shift bug
  const dayOfWeek = DAYS[new Date(`${date}T00:00:00Z`).getUTCDay()];
  const configuredSlots = AVAILABILITY[dayOfWeek] || [];

  if (configuredSlots.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  try {
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const dayStart = new Date(`${date}T00:00:00Z`).toISOString();
    const dayEnd = new Date(`${date}T23:59:59Z`).toISOString();

    const eventsRes = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: dayStart,
      timeMax: dayEnd,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busyRanges = (eventsRes.data.items || [])
      .filter(event => event.status !== 'cancelled' && event.transparency !== 'transparent')
      .map(event => {
        // All-day event blocks the whole day
        if (!event.start?.dateTime) {
          return {
            start: new Date(`${date}T00:00:00Z`).getTime(),
            end:   new Date(`${date}T23:59:59Z`).getTime(),
          };
        }
        
        // Safely parse start and end times, falling back gracefully
        const startTime = new Date(event.start.dateTime).getTime();
        // Some events might not have an end time, assume 1 hour duration as fallback
        const endTime = event.end?.dateTime ? new Date(event.end.dateTime).getTime() : startTime + (60 * 60 * 1000);
        
        return {
          start: startTime,
          end: endTime,
        };
      });

    // Filter slots colliding with busy ranges
    const freeSlots = configuredSlots.filter(slot => {
      const slotStart = new Date(`${date}T${slot}:00Z`).getTime();
      const slotEnd = slotStart + 15 * 60 * 1000;

      return !busyRanges.some(busy => slotStart < busy.end && slotEnd > busy.start);
    });

    return NextResponse.json({ slots: freeSlots });
  } catch (err: any) {
    console.error('Error fetching calendar availability:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch slots' }, { status: 500 });
  }
}
