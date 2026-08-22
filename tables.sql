-- Create the leads table
CREATE TABLE leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    pain_point TEXT NOT NULL,
    urgency TEXT NOT NULL,
    budget TEXT NOT NULL,
    website TEXT NOT NULL,
    outcome TEXT -- This is your optional 'What would it mean...' question
);

-- Enable Row Level Security (RLS) on the table to protect it
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous form submissions from your API/users
CREATE POLICY "Allow anonymous inserts" ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

-- (Optional) Create a policy to allow you (an authenticated admin) to read the leads from the dashboard or another app
CREATE POLICY "Allow authenticated reads" ON public.leads
FOR SELECT
TO authenticated
USING (true);

CREATE TABLE IF NOT EXISTS public.leads (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    pain_point  TEXT,
    urgency     TEXT,
    budget      TEXT,
    website     TEXT,
    outcome     TEXT
);
-- 2. Add an index on email for fast lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
-- 3. Add an index on created_at so you can sort by newest first easily
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
-- 4. Enable Row Level Security (RLS) — important for security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- 5. Allow your SERVICE_ROLE key (used in API routes) to do everything
--    (service_role bypasses RLS by default — this is correct behavior for server-side inserts)
-- 6. OPTIONAL: deny public/anon reads so lead data stays private
--    (only your Service Role key from the API can read/write)
CREATE POLICY "Deny anon read" ON public.leads
    FOR SELECT
    TO anon
    USING (false);

 CREATE TABLE IF NOT EXISTS public.estimator_leads (
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    email         TEXT NOT NULL,
    slug          TEXT NOT NULL,
    idea          TEXT,
    estimate_data JSONB
);

CREATE INDEX IF NOT EXISTS estimator_leads_email_idx ON public.estimator_leads (email);
CREATE INDEX IF NOT EXISTS estimator_leads_created_at_idx ON public.estimator_leads (created_at DESC);

ALTER TABLE public.estimator_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny anon read" ON public.estimator_leads
    FOR SELECT TO anon USING (false);

CREATE POLICY "Allow anonymous inserts" ON public.estimator_leads
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON public.estimator_leads
    FOR SELECT TO authenticated USING (true);

-- Create a simple table for the keepalive ping
create table if not exists keepalive (
  id bigint primary key generated always as identity,
  last_ping timestamp with time zone default now()
);

-- Insert a single row so the cron job has something to read
insert into keepalive (last_ping) values (now());

-- ==========================================
-- CONTENT ENGINE TABLES
-- ==========================================

CREATE TABLE IF NOT EXISTS public.content_ideas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    raw_source TEXT NOT NULL,
    source_url TEXT,
    intent_score INT NOT NULL,
    editorial_brief JSONB NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL 
);

-- Index for fast sorting by score and filtering by status
CREATE INDEX IF NOT EXISTS content_ideas_status_idx ON public.content_ideas (status);
CREATE INDEX IF NOT EXISTS content_ideas_score_idx ON public.content_ideas (intent_score DESC);

-- Enable RLS
ALTER TABLE public.content_ideas ENABLE ROW LEVEL SECURITY;

-- Deny public access (Only Admin/Service Role should access this)
CREATE POLICY "Deny anon access" ON public.content_ideas
    FOR ALL TO anon USING (false);

-- Allow authenticated admins to read/update ideas
CREATE POLICY "Allow authenticated full access" ON public.content_ideas
    FOR ALL TO authenticated USING (true) WITH CHECK (true);