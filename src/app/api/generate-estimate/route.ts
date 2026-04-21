import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { EstimateData } from '@/types/pseo';
import fs from 'fs';
import path from 'path';

// Initialize clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

interface EstimateRequest {
    idea: string;
    slug: string;
    baseFeatures: string[];
    email?: string;
    estimateData?: EstimateData;
}

export async function POST(req: NextRequest) {
    try {
        const body: EstimateRequest = await req.json();
        const { idea, slug, baseFeatures, email, estimateData } = body;

        // ─────────────────────────────────────────────────────────
        // PHASE B: Lead Capture + Email (email present in body)
        // ─────────────────────────────────────────────────────────
        if (email && estimateData) {
            // 1. Save lead to Supabase
            const { error: dbError } = await supabase
                .from('estimator_leads')
                .insert([{ email, slug, idea, estimate_data: estimateData, created_at: new Date().toISOString() }]);

            if (dbError) {
                console.error(`[SUPABASE_INSERT_FAILED] Lead capture failed for ${email} (${slug}):`, dbError);
            }

            // 2. Build premium personalized email
            // Compute Mr² Labs price
            const averageCost = (estimateData.agencyCostMin + estimateData.agencyCostMax) / 2;
            const mr2Price = estimateData.isSimpleBuild 
                ? Math.round((averageCost * 0.25) / 100) * 100 
                : Math.round((averageCost * 0.1) / 500) * 500;
            const mr2PriceFormatted = `$${mr2Price.toLocaleString()}`;

            const complexityColor = (c: string) => c === 'High' ? '#ef4444' : c === 'Medium' ? '#f59e0b' : '#22c55e';

            const featuresHtml = estimateData.features.map(f => `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                            <span style="font-size:13px; font-weight:700; color:#0f172a;">${f.name}</span>
                            <span style="font-size:10px; font-weight:800; padding:2px 8px; border-radius:20px; background:${complexityColor(f.complexity)}20; color:${complexityColor(f.complexity)}; border:1px solid ${complexityColor(f.complexity)}40;">${f.complexity}</span>
                        </div>
                        <p style="margin:0; font-size:12px; color:#475569; line-height:1.5;">${f.description}</p>
                    </td>
                </tr>
            `).join('');

            const phasesHtml = estimateData.agencyPhases.map(p => `
                <tr>
                    <td style="padding:8px 12px; font-size:13px; color:#1e293b; border-bottom:1px solid #e2e8f0;">${p.phase}</td>
                    <td style="padding:8px 12px; font-size:13px; color:#475569; border-bottom:1px solid #e2e8f0; text-align:center;">${p.duration}</td>
                    <td style="padding:8px 12px; font-size:13px; font-weight:700; color:#dc2626; border-bottom:1px solid #e2e8f0; text-align:right;">${p.cost}</td>
                </tr>
            `).join('');

            const coreFeaturesHtml = estimateData.mr2Labs.coreFeatures.map(f => `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                    <tr>
                        <td width="20" style="vertical-align:top; font-size:14px; font-weight:800; color:#22c55e; padding-top:2px;">✓</td>
                        <td style="font-size:14px; color:#f8fafc; line-height:1.5;">${f}</td>
                    </tr>
                </table>
            `).join('');

            const skippedHtml = estimateData.mr2Labs.skippedForMVP.map(f => `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                    <tr>
                        <td width="20" style="vertical-align:top; font-size:14px; color:#64748b; padding-top:2px;">→</td>
                        <td style="font-size:14px; color:#94a3b8; line-height:1.5; text-decoration:line-through;">${f}</td>
                    </tr>
                </table>
            `).join('');

            const techStackHtml = estimateData.techStack.map(t => `<span style="display:inline-block; margin:3px; padding:4px 10px; border-radius:20px; background:#f1f5f9; font-size:11px; font-weight:600; color:#334155;">${t}</span>`).join('');

            // ─────────────────────────────────────────────────────────
            // 2. BUILD PREMIUM EBM (EMAIL) & SEND
            // ─────────────────────────────────────────────────────────
            let attachments: any[] = [];

            if (!estimateData.isSimpleBuild) {
                const pdfPath = path.join(process.cwd(), 'public', '72-Hour-MVP-Blueprint.pdf');
                try {
                    if (fs.existsSync(pdfPath)) {
                        const pdfBuffer = fs.readFileSync(pdfPath);
                        attachments = [{
                            filename: '72-Hour-MVP-Blueprint.pdf',
                            content: pdfBuffer.toString('base64'),
                        }];
                        console.log('📎 PDF Blueprint attached to email');
                    }
                } catch (err) {
                    console.error('❌ Failed to read blueprint PDF:', err);
                }
            }

            try {
                const { data, error: emailError } = await resend.emails.send({
                    from: fromEmail,
                    replyTo: process.env.REPLY_TO_EMAIL,
                    to: email,
                    subject: `🚀 Your ${estimateData.appName} Blueprint — Mr² Labs`,
                    attachments,
                    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;">

  <!-- HEADER -->
  <tr><td style="background-color:#050505;padding:28px 36px;border-radius:16px 16px 0 0;border-bottom:2px solid #2563eb;">
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Mr² <span style="color:#3b82f6;">Labs</span></h1>
    <p style="margin:6px 0 0;color:#64748b;font-size:12px;">${estimateData.isSimpleBuild ? 'Premium Website Studio' : '72-Hour MVP Sprint Studio'}</p>
  </td></tr>

  <!-- HERO -->
  <tr><td style="background:#fff;padding:36px 36px 24px;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:0.1em;">Your Personalized CTO Report</p>
    <h2 style="margin:0 0 12px;color:#0f172a;font-size:24px;font-weight:800;line-height:1.2;">${estimateData.appName}</h2>
    <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">${estimateData.summary}</p>
  </td></tr>

  <!-- TECH STACK -->
  <tr><td style="background:#fff;padding:0 36px 28px;">
    <p style="margin:0 0 10px;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Tech Stack Required</p>
    <div>${techStackHtml}</div>
  </td></tr>

  <!-- FEATURES -->
  <tr><td style="background:#f8fafc;padding:24px 36px;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
    <p style="margin:0 0 16px;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Feature Breakdown</p>
    <table width="100%" cellpadding="0" cellspacing="0">${featuresHtml}</table>
  </td></tr>

  <!-- AGENCY SHOCK -->
  <tr><td style="background:#fff;padding:28px 36px;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:800;color:#dc2626;text-transform:uppercase;letter-spacing:0.1em;">⚠ Traditional Agency Quote</p>
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:20px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:13px;color:#475569;">Total Cost</span>
        <span style="font-size:22px;font-weight:800;color:#dc2626;">$${estimateData.agencyCostMin.toLocaleString()} – $${estimateData.agencyCostMax.toLocaleString()}</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:13px;color:#475569;">Timeline</span>
        <span style="font-size:16px;font-weight:700;color:#1e293b;">${estimateData.timelineMinWeeks}–${estimateData.timelineMaxWeeks} Weeks</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:13px;color:#475569;">Team Size</span>
        <span style="font-size:16px;font-weight:700;color:#1e293b;">${estimateData.engineersMin}–${estimateData.engineersMax} Engineers</span>
      </div>
    </div>
    <p style="margin:0 0 12px;font-size:11px;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.1em;">Phase Breakdown</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <tr style="background:#f8fafc;"><th style="padding:8px 12px;font-size:10px;text-align:left;color:#64748b;font-weight:700;text-transform:uppercase;">Phase</th><th style="padding:8px 12px;font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;text-align:center;">Time</th><th style="padding:8px 12px;font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;text-align:right;">Cost</th></tr>
      ${phasesHtml}
    </table>
  </td></tr>

  <!-- MR2 LABS PRICING + PLAN -->
  <tr><td style="background:linear-gradient(135deg,#050505,#0f172a);padding:32px 36px;border-top:2px solid #2563eb;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:800;color:#3b82f6;text-transform:uppercase;letter-spacing:0.1em;">⚡ The Mr² Labs Approach</p>

    <!-- Pricing highlight -->
    <div style="background:#0f2040;border:1px solid #2563eb50;border-radius:12px;padding:20px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:8px;">
        <div>
          <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;font-weight:700;letter-spacing:0.08em;">${estimateData.isSimpleBuild ? 'Full Build Starts from' : 'MVP Starts from'}</p>
          <p style="margin:0;font-size:30px;font-weight:900;color:#ffffff;letter-spacing:-1px;">${mr2PriceFormatted}</p>
        </div>
        <span style="padding:6px 14px;background:#22c55e20;border:1px solid #22c55e40;border-radius:8px;font-size:13px;font-weight:800;color:#22c55e;">${estimateData.isSimpleBuild ? 'Fast Delivery ✓' : '72 Hours ✓'}</span>
      </div>
      <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">vs. traditional agency <span style="text-decoration:line-through;color:#64748b;">$${estimateData.agencyCostMin.toLocaleString()}–$${estimateData.agencyCostMax.toLocaleString()}</span></p>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid #ffffff10;">
        <p style="margin:0;font-size:12px;color:#94a3b8;">🛡 ${estimateData.isSimpleBuild ? 'High-converting full product' : 'Working MVP or your money back'}</p>
      </div>
    </div>

    <!-- Approach -->
    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin-bottom:20px;">
      <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.7;">${estimateData.mr2Labs.approach}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="${estimateData.isSimpleBuild ? '100%' : '50%'}" style="vertical-align:top;padding-right:10px;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:800;color:#22c55e;text-transform:uppercase;letter-spacing:0.1em;">We Build Now</p>
          <ul style="margin:0;padding:0;">${coreFeaturesHtml}</ul>
        </td>
        ${!estimateData.isSimpleBuild ? `
        <td width="50%" style="vertical-align:top;padding-left:10px;border-left:1px solid #ffffff10;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Saved for V2</p>
          <ul style="margin:0;padding:0;">${skippedHtml}</ul>
        </td>
        ` : ''}
      </tr>
    </table>
  </td></tr>

  <!-- FOUNDER PARTNERSHIP PROMISE -->
  <tr><td style="background:#f8fafc;padding:28px 36px;border-top:1px solid #e2e8f0;">
    <p style="margin:0 0 12px;font-size:11px;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:0.1em;">🤝 Post-Launch Partnership</p>
    <p style="margin:0 0 20px;font-size:15px;color:#1e293b;line-height:1.7;">${estimateData.isSimpleBuild 
        ? "We don't just hand over a site and disappear. We ensure your website is fully optimized for SEO, speed, and conversions. You get complete ownership, ongoing scaling support, and a high-performance foundation built to grow."
        : "After the MVP, we <strong>validate it together</strong> with real users and real feedback. Once you have traction, we build the <strong>final product from 0 to 1</strong>. When it's done, <strong>you own 100% of it</strong>."}</p>
  </td></tr>

  ${!estimateData.isSimpleBuild ? `
  <!-- BONUS PDF CALLOUT -->
  <tr><td style="background:#f1f5f9;padding:24px 36px;border-top:1px solid #e2e8f0;">
    <p style="margin:0 0 8px;font-size:11px;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:0.1em;">🎁 Bonus Included</p>
    <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.6;">I've attached my <strong>72-Hour MVP Blueprint PDF</strong> to this email. Even if we don't work together, I want you to have the exact framework I use to ship products in 3 days. Take the idea and run with it!</p>
  </td></tr>
  ` : ''}

  <!-- CTA -->
  <tr><td style="background:#fff;padding:32px 36px;text-align:center;border-radius:0 0 16px 16px;">
    <p style="margin:0 0 20px;font-size:15px;color:#334155;line-height:1.6;">Ready to move forward? Let's spend 15 minutes scoping this out before you commit to anything.</p>
    <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL}" style="display:inline-block;padding:16px 36px;background:#2563eb;color:#fff;text-decoration:none;font-weight:800;border-radius:10px;font-size:15px;letter-spacing:-0.3px;">Book a Free 15-Min Call →</a>
    <hr style="border:0;border-top:1px solid #e2e8f0;margin:28px 0;">
    <p style="margin:0 0 4px;color:#0f172a;font-size:14px;font-weight:700;">Mohamed Rashard</p>
    <p style="margin:0 0 10px;color:#64748b;font-size:12px;">Founder, Mr² Labs · Software Engineer</p>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color:#2563eb;font-size:12px;text-decoration:none;">mohamedrashard.dev</a>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="text-align:center;padding:16px;color:#94a3b8;font-size:11px;">
    © ${new Date().getFullYear()} Mr² Labs · Colombo, Sri Lanka · Working Globally
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
                    `
                });

                if (emailError) {
                    console.error(`[RESEND_FAILED] Blueprint email failed for ${email}:`, emailError);
                } else {
                    console.log('✅ Blueprint email sent:', data?.id);
                }
            } catch (err: any) {
                console.error(`[RESEND_FAILED] Resend SDK Crash for ${email}:`, err.message);
            }

            // 3. INTERNAL NOTIFICATION (TO FOUNDER)
            // ─────────────────────────────────────────────────────────
            try {
                const adminTechStack = estimateData.techStack.join(', ');

                await resend.emails.send({
                    from: fromEmail,
                    to: process.env.REPLY_TO_EMAIL,
                    subject: `🔥 [LEAD] ${estimateData.appName} - ${email}`,
                    html: `
                        <div style="font-family:sans-serif; line-height:1.6; color:#1e293b; max-width:600px;">
                            <h2 style="color:#2563eb; margin-bottom:4px;">New High-Intent Lead Captured! 🚀</h2>
                            <p style="font-size:14px; color:#64748b; margin-top:0;">Source: Cost Estimator Funnel</p>
                            
                            <div style="background:#f1f5f9; padding:20px; border-radius:12px; margin:20px 0;">
                                <p style="margin:0 0 10px;"><strong>Founder Email:</strong> <a href="mailto:${email}">${email}</a></p>
                                <p style="margin:0 0 10px;"><strong>App Name:</strong> ${estimateData.appName}</p>
                                <p style="margin:0;"><strong>User Idea:</strong><br/><em>"${idea}"</em></p>
                            </div>

                            <h3 style="border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Technical Intelligence (AI Generated)</h3>
                            <p><strong>Proposed Stack:</strong> ${adminTechStack}</p>
                            <p><strong>Traditional Quote:</strong> $${estimateData.agencyCostMin.toLocaleString()} - $${estimateData.agencyCostMax.toLocaleString()}</p>
                            <p><strong>Mr² Labs Estimate:</strong> ${mr2PriceFormatted}</p>
                            
                            <p><strong>What to Build (MVP Core):</strong></p>
                            <ul>
                                ${estimateData.mr2Labs.coreFeatures.map(f => `<li>${f}</li>`).join('')}
                            </ul>

                            <p><strong>Strategic Approach:</strong><br/>${estimateData.mr2Labs.approach}</p>

                            <div style="margin-top:30px; padding-top:20px; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8;">
                                Logged in Supabase (estimator_leads) · Lead Source: ${slug}
                            </div>
                        </div>
                    `
                });
            } catch (adminErr) {
                console.error('❌ Founder Notification Failed:', adminErr);
            }

            return NextResponse.json({
                success: true,
                blueprint: {
                    mrLabsPrice: "Contact for custom quote",
                    sprintDuration: "72 hours",
                    guarantee: "Working MVP or your money back"
                }
            });
        }

        // ─────────────────────────────────────────────────────────
        // PHASE A: AI Analysis — Gemini 2.5 Flash → Groq Fallback
        // ─────────────────────────────────────────────────────────
        const geminiApiKey = process.env.GEMINI_API_KEY;
        const groqApiKey = process.env.GROQ_API_KEY;

        const prompt = `
You are a senior CTO and expert software architect. A founder has described their app idea below.
Analyze it and return ONLY a valid JSON object — no markdown, no backticks, no explanation.

App Idea: "${idea}"
Reference Slug: "${slug}"
Base Features Context: ${JSON.stringify(baseFeatures)}

Return this EXACT JSON structure (fill in all fields):
{
  "appName": "A catchy 2-4 word name for this specific app",
  "summary": "One crisp sentence describing what this app actually does and who it's for",
  "isSimpleBuild": false,
  "features": [
    { "name": "Feature Name", "description": "One sentence technical description", "complexity": "Low" },
    { "name": "Feature Name", "description": "One sentence technical description", "complexity": "Medium" },
    { "name": "Feature Name", "description": "One sentence technical description", "complexity": "High" },
    { "name": "Feature Name", "description": "One sentence technical description", "complexity": "Medium" },
    { "name": "Feature Name", "description": "One sentence technical description", "complexity": "High" }
  ],
  "techStack": [
    "Target Framework (e.g. Next.js or WordPress)",
    "Secondary Tech",
    "Third Tech",
    "Fourth Tech",
    "Fifth Tech"
  ],
  "agencyCostMin": 18000,
  "agencyCostMax": 55000,
  "timelineMinWeeks": 8,
  "timelineMaxWeeks": 20,
  "engineersMin": 2,
  "engineersMax": 5,
  "agencyPhases": [
    { "phase": "Discovery & Architecture", "duration": "1–2 weeks", "cost": "$3,000–$8,000" },
    { "phase": "UI/UX Design", "duration": "2–3 weeks", "cost": "$4,000–$10,000" },
    { "phase": "Core Development", "duration": "6–10 weeks", "cost": "$8,000–$28,000" },
    { "phase": "QA & Testing", "duration": "1–2 weeks", "cost": "$2,000–$5,000" },
    { "phase": "Deployment & Handoff", "duration": "1 week", "cost": "$1,000–$4,000" }
  ],
  "mr2Labs": {
    "sprintTime": "72 hours",
    "approach": "A 2-3 sentence strategic explanation of HOW you will build this specific app rapidly by stripping it to its core value proposition. Be specific to the idea.",
    "coreFeatures": [
      "The single most important feature that proves the concept",
      "Second essential feature that creates the core user loop",
      "Third feature needed for a real usable MVP"
    ],
    "skippedForMVP": [
      "A bloat feature that can wait",
      "Another nice-to-have that slows down launch",
      "An advanced feature for v2"
    ]
  }
}

Rules:
- CRITICAL: Detect if the project is a Simple Website (Portfolio, WordPress, Landing page) or a complex app (SaaS, Mobile App, AI). Set "isSimpleBuild" to true if it is a simple website.
- CRITICAL: Scale the tech stack based on project complexity!
  - If isSimpleBuild is true: ALWAYS recommend WordPress, WooCommerce, or Shopify. DO NOT over-engineer. Cost should be low ($2,000 - $8,000) and timeline short (1-2 weeks).
  - If it is a SaaS, AI tool, or Complex Web App: Use the premium Mr² Labs ecosystem: Next.js 15 App Router, React, Node.js, Python, Flask, PostgreSQL (Supabase).
  - For AI/ML specific tasks: Use Hugging Face, XGBoost, or Gemini API or OpenAI, Claude ETC.
  - For Mobile Apps: Use React Native / Expo.
- BE HIGHLY SPECIFIC in the stack. Example: "WordPress with Elementor", or "Node.js with Express", not just "CMS" or "Backend".
- agencyCostMin/Max must be realistic 2026 agency rates appropriate for the scope.
- features array must have exactly 5 items.
- coreFeatures must have 3-4 items.
- skippedForMVP must have 3-4 items.
- complexity values must be exactly "Low", "Medium", or "High"
- Return ONLY the JSON object, nothing else
        `;

        // ── Helper: parse and validate AI output ──
        const parseAiOutput = (raw: string): EstimateData => {
            const cleaned = raw.trim()
                .replace(/^```json\n?/, '').replace(/^```\n?/, '').replace(/\n?```$/, '');
            return JSON.parse(cleaned);
        };

        let aiContent = '';

        // 1️⃣ Try Gemini with fallback options
        if (geminiApiKey) {
            // Models to try in order of preference. 2.5 is latest, 2.0 and 1.5-latest are fallbacks.
            const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest'];
            
            for (const model of models) {
                try {
                    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
                    const geminiResponse = await fetch(geminiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
                        })
                    });

                    if (geminiResponse.ok) {
                        const geminiData = await geminiResponse.json();
                        aiContent = geminiData.candidates[0].content.parts[0].text;
                        console.log(`✅ Gemini ${model} responded`);
                        break; 
                    } else {
                        const errStatus = geminiResponse.status;
                        const errText = await geminiResponse.text();
                        console.warn(`⚠️ Gemini ${model} unavailable (${errStatus})`, errText);
                        
                        // Continue if it's Busy (503), Rate Limited (429), or Not Found (404 - wrong name/version)
                        if (errStatus === 503 || errStatus === 429 || errStatus === 404) {
                            continue;
                        } else {
                            break; 
                        }
                    }
                } catch (err) {
                    console.error(`❌ Gemini ${model} fetch crash:`, err);
                }
            }
        }

        // 2️⃣ Fallback: Groq Llama 3.3 70B (Preserved as requested)
        if (!aiContent && groqApiKey) {
            console.log('🔄 Using Groq fallback...');
            const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.2,
                    stream: false
                })
            });

            if (groqResponse.ok) {
                const groqData = await groqResponse.json();
                aiContent = groqData.choices[0].message.content;
                console.log('✅ Groq fallback responded');
            } else {
                const errText = await groqResponse.text();
                console.error('❌ Groq fallback also failed:', errText);
            }
        }

        if (!aiContent) {
            return NextResponse.json({ error: 'All AI engines are currently unavailable. Please try again shortly.' }, { status: 503 });
        }

        try {
            const parsedData: EstimateData = parseAiOutput(aiContent);
            return NextResponse.json(parsedData);
        } catch (parseError) {
            console.error('JSON parse failed. AI output:', aiContent);
            return NextResponse.json({ error: 'AI response formatting error' }, { status: 500 });
        }

    } catch (err: any) {
        console.error('Global API Error:', err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
