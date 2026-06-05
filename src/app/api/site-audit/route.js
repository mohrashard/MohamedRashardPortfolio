import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req) {
    try {
        const { answers } = await req.json();
        let targetUrl = answers["Enter your website URL to audit:"] || "";
        
        if (!targetUrl.startsWith('http')) {
            targetUrl = `https://${targetUrl}`;
        }

        // ── 1. SERVER-SIDE FETCH & PARSE ─────────────────────
        let html = "";
        let isSuccess = false;
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const response = await fetch(targetUrl, { 
                method: 'GET', 
                signal: controller.signal,
                headers: { 'User-Agent': 'Mr2Labs-SEO-Bot/1.0' }
            });
            clearTimeout(timeoutId);
            isSuccess = response.ok;
            if (isSuccess) {
                html = await response.text();
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }

        if (!isSuccess || !html) {
             return NextResponse.json({ success: false, error: "Failed to fetch or parse the URL. Ensure the site is live and allows bots." }, { status: 400 });
        }

        // Lightweight Regex Parsers to bypass expensive headless browsers
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i) || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*>/i);
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        
        const title = titleMatch ? titleMatch[1].trim() : "Missing";
        const description = descMatch ? descMatch[1].trim() : "Missing";
        
        // Clean H1 tags
        let h1 = "Missing";
        if (h1Match) {
            h1 = h1Match[1].replace(/<[^>]*>?/gm, '').trim(); // Remove inner HTML tags
            if (h1.length > 60) h1 = h1.substring(0, 60) + "...";
        }

        // Grade Calculation
        let score = 100;
        if (title === "Missing") score -= 30;
        else if (title.length < 30 || title.length > 70) score -= 15;
        
        if (description === "Missing") score -= 30;
        else if (description.length < 100 || description.length > 170) score -= 15;
        
        if (h1 === "Missing") score -= 20;

        let grade = "F";
        if (score >= 90) grade = "A";
        else if (score >= 80) grade = "B";
        else if (score >= 60) grade = "C";
        else if (score >= 40) grade = "D";

        // ── 2. AI ARCHITECT VERDICT ──────────────────────────
        const SYSTEM_PROMPT = `You are a Technical SEO Architect at Mr² Labs.
The user tested their website: ${targetUrl}.
Metrics:
- Title: ${title} (${title.length} chars)
- Meta Description: ${description} (${description.length} chars)
- Primary H1 Tag: ${h1}
- Technical Score: ${score}/100

Write a STRICT JSON object (no markdown) analyzing this SEO architecture:
{
  "verdict": (string, 2 punchy sentences critiquing their current metadata structure. Be ruthless if it's bad. E.g. "Your missing H1 destroys organic taxonomy" or "Solid metadata foundation but lacks keyword density."),
  "recommendation": (string, 1 technical sentence on how Mr² Labs would architect their next generation SEO/GEO strategy)
}`;

        let jsonText = "";

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(SYSTEM_PROMPT);
            jsonText = result.response.text();
        } catch (geminiError) {
            console.warn("Gemini Error, using Groq", geminiError);
            const completion = await groq.chat.completions.create({
                messages: [{ role: "system", content: SYSTEM_PROMPT }],
                model: "llama-3.1-8b-instant",
                temperature: 0.2,
            });
            jsonText = completion.choices[0]?.message?.content || "";
        }

        const cleanedJson = jsonText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const aiData = JSON.parse(cleanedJson);

        return NextResponse.json({ 
            success: true, 
            data: {
                metrics: { targetUrl, title, description, h1, grade, score },
                architecture: aiData
            } 
        });

    } catch (error) {
        console.error("[SYSTEM ERROR]", error);
        return NextResponse.json({ success: false, error: "Calculation failed." }, { status: 500 });
    }
}
