import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
const resend = new Resend(process.env.RESEND_API_KEY || '');

/**
 * Centralized utility to handle Lead Capture (Supabase Insert + Resend Notifications)
 * This eliminates the AI duplication across 13+ separate API routes.
 */
export async function processLead({ 
    email, 
    leadName, 
    painPoint, 
    urgency = 'High', 
    budget = 'N/A', 
    website = 'N/A', 
    outcome = '', 
    emailSubject, 
    emailHtml, 
    adminSubject 
}) {
    if (!email) {
        return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    try {
        // 1. Database Insertion with Error Boundary
        const { error: dbError } = await supabase.from('leads').insert([{ 
            name: leadName, 
            email, 
            pain_point: painPoint, 
            urgency, 
            budget, 
            website, 
            outcome 
        }]);

        if (dbError) {
            console.error('[SUPABASE ERROR]:', dbError.message);
            return NextResponse.json({ error: 'Failed to record lead in database' }, { status: 500 });
        }

        // 2. Client Auto-Reply Email
        if (emailSubject && emailHtml) {
            const { error: emailError } = await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL || 'hello@mr2labs.com',
                reply_to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
                to: email,
                subject: emailSubject,
                html: emailHtml,
            });

            if (emailError) {
                console.error('[RESEND ERROR - CLIENT]:', emailError);
                return NextResponse.json({ error: emailError.message }, { status: 500 });
            }
        }

        // 3. Internal Admin Notification
        const { error: adminError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'hello@mr2labs.com',
            to: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
            subject: adminSubject || `🚨 NEW LEAD: ${leadName}`,
            html: `<p><strong>Email:</strong> ${email}</p><p><strong>Data:</strong> ${painPoint}</p>`
        });

        if (adminError) {
            console.error('[RESEND ERROR - ADMIN]:', adminError);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('[LEAD HANDLER API ERROR]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
