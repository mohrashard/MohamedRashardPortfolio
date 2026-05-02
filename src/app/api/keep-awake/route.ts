import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  // ── Authorization ─────────────────────────────────────────────────────────
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Supabase client ───────────────────────────────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ── Keepalive ping ────────────────────────────────────────────────────────
  try {
    const { error } = await supabase
      .from('keepalive')
      .update({ last_ping: new Date().toISOString() })
      .eq('id', 1);

    if (error) {
      console.error('[keep-awake] Supabase error:', error.message);
      return NextResponse.json(
        { error: 'Failed to update keepalive table', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Supabase 'keepalive' table updated successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error('[keep-awake] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
