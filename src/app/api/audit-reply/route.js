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
    // Ensure Row Level Security (RLS) policies on the 'leads' table allow inserts
    const { error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name: nameAndBusiness,
          email,
          pain_point: painPoint,
          urgency,
          budget,
          website,
          outcome,
        },
      ]);

    if (dbError) {
      console.error('Supabase error:', dbError.message);
      return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
    }

    // 3. Send automated email via Resend
    // Important: Domain mohamedrashard.dev must be verified in Resend settings
    // 3. Send automated email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Mr² Labs <labs@mohamedrashard.dev>', // Your new official sender
      reply_to: 'mohrashard@gmail.com', // Routes their replies to your personal inbox
      to: email,
      subject: '⚡ Audit Request Received - Mr² Labs',
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
          <p>Got it. I will personally review your business and send you a Loom audit within 48 hours.</p>
          <p>If you have any urgent questions in the meantime, reply to this email directly.</p>
          <br/>
          <p>Speak soon,<br/>Mohamed Rashard<br/><strong>Mr² Labs</strong></p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError.message);
      // We don't necessarily want to fail the whole request if only the email fails, 
      // since the lead is already saved in Supabase.
      return NextResponse.json({
        success: true,
        message: 'Lead saved, but confirmation email failed to send.'
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: 'Audit request received.' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}