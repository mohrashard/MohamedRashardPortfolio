import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

// Weekly working windows (UTC timestamps)
const AVAILABILITY: Record<string, string[]> = {
  monday:    ['03:30', '04:30', '08:30', '09:30'], // 9am, 10am, 2pm, 3pm IST
  tuesday:   ['03:30', '04:30', '08:30'],
  wednesday: ['03:30', '04:30', '08:30'],
  thursday:  ['03:30', '04:30', '08:30', '09:30'],
  friday:    ['03:30', '04:30'],
  saturday:  [],
  sunday:    [],
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

  const dayOfWeek = DAYS[new Date(date).getDay()];
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
    });

    const busyRanges = (eventsRes.data.items || []).map(event => ({
      start: new Date(event.start?.dateTime || event.start?.date || '').getTime(),
      end: new Date(event.end?.dateTime || event.end?.date || '').getTime(),
    }));

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
