import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { email, testResult } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const m = testResult.metrics;
    const painData = `URL: ${m.targetUrl}. Latency: ${m.latency}ms. Grade: ${m.grade}. Use Case: ${m.useCase}`;

    // Insert into Supabase
    await supabase.from('leads').insert([{ 
        name: 'API Tester', 
        email, 
        pain_point: painData, 
        urgency: m.grade === 'D' || m.grade === 'F' ? 'High (Poor Performance)' : 'Low', 
        budget: 'N/A', 
        website: m.targetUrl, 
        outcome: 'API Tester' 
    }]);

    // Send the Blueprint email via Resend
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      to: email,
      subject: `⚡ Your API Performance Report: Grade ${m.grade}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #fff; padding: 40px;">
          <h2 style="color: #fff;">Endpoint Telemetry Report</h2>
          <p style="color: #a1a1aa;">Here are the performance metrics for <strong>${m.targetUrl}</strong>.</p>
          
          <ul style="color: #ffffff; margin-bottom: 24px;">
            <li><strong>Latency:</strong> ${m.latency}ms</li>
            <li><strong>Status:</strong> ${m.statusCode}</li>
            <li><strong>Grade:</strong> ${m.grade}</li>
          </ul>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 20px 0;">
            <h3 style="color: #0066ff;">Architectural Verdict</h3>
            <p style="color: #a1a1aa;">${testResult.architecture.verdict}</p>
            <p style="color: #38bdf8; font-weight: bold;">${testResult.architecture.recommendation}</p>
          </div>

          <p style="color: #a1a1aa;">If you need to optimize this infrastructure or build a high-performance frontend to consume it, let's talk.</p>
          <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mohrashard/30min'}" style="display: inline-block; padding: 12px 24px; background: #0066ff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Architecture Call</a>
        </div>
      `,
    });

    if (emailError) {
      console.error('[RESEND ERROR - CLIENT]:', emailError);
      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    // Notify You
    const { error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
      subject: `🔌 NEW API LEAD: Tested ${m.targetUrl} (${m.latency}ms)`,
      html: `<p>Email: ${email}</p><p>Data: ${painData}</p>`
    });

    if (adminError) {
      console.error('[RESEND ERROR - ADMIN]:', adminError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
