CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES outreach_leads(id) ON DELETE SET NULL,
  company_name TEXT,
  domain TEXT,
  contact_email TEXT NOT NULL,
  contact_name TEXT,
  booked_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 15,
  google_event_id TEXT,
  meet_link TEXT,
  status TEXT DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON bookings 
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON bookings 
  FOR ALL TO service_role USING (true);
