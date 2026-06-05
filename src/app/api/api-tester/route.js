import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req) {
    try {
        const { answers } = await req.json();
        
        let targetUrl = answers["Enter the public API endpoint URL (GET request):"] || "";
        const useCase = answers["What is this API primarily used for? (e.g., Mobile App, Internal Dashboard)"] || "General Use";

        if (!targetUrl.startsWith('http')) {
            targetUrl = `https://${targetUrl}`;
        }

        // ── 1. EXECUTE SERVER-SIDE PING ──────────────────────
        let latency = 0;
        let statusCode = 500;
        let sizeBytes = 0;
        let isSuccess = false;
        
        const startTime = performance.now();
        try {
            // Using AbortController to prevent hanging on dead URLs (8s timeout)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch(targetUrl, { 
                method: 'GET', 
                signal: controller.signal,
                headers: { 'User-Agent': 'Mr2Labs-API-Tester/1.0' }
            });
            
            const endTime = performance.now();
            clearTimeout(timeoutId);
            
            latency = Math.round(endTime - startTime);
            statusCode = response.status;
            isSuccess = response.ok;
            
            const payload = await response.text();
            sizeBytes = new Blob([payload]).size;
        } catch (fetchError) {
            const endTime = performance.now();
            latency = Math.round(endTime - startTime);
            statusCode = fetchError.name === 'AbortError' ? 408 : 503; // Timeout or Unavailable
        }

        // Calculate Performance Grade
        let grade = "F";
        if (isSuccess) {
            if (latency < 200) grade = "A";
            else if (latency < 500) grade = "B";
            else if (latency < 1000) grade = "C";
            else if (latency < 2000) grade = "D";
        }

        // ── 2. AI ARCHITECT VERDICT ──────────────────────────
        const SYSTEM_PROMPT = `You are a Senior Infrastructure Engineer at Mr² Labs.
The user tested an API for this use case: "${useCase}".
Here are the hard metrics for the endpoint (${targetUrl}):
- Status: ${statusCode}
- Latency: ${latency}ms
- Payload Size: ${(sizeBytes / 1024).toFixed(2)} KB
- Computed Grade: ${grade}

Write a STRICT JSON object (no markdown, raw JSON only) evaluating this performance.
{
  "verdict": (string, 2 punchy sentences. If it's slow, tell them they need edge caching/better DB indexing. If it's fast, commend the infrastructure),
  "recommendation": (string, 1 technical sentence on how Mr² Labs would architect/improve this for production scale)
}`;

        let jsonText = "";

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(SYSTEM_PROMPT);
            jsonText = result.response.text();
        } catch (geminiError) {
            console.warn("[SYSTEM] Gemini Failed, falling back to Groq...");
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
                metrics: { targetUrl, useCase, latency, statusCode, sizeBytes, grade },
                architecture: aiData
            } 
        });

    } catch (error) {
        console.error("[SYSTEM ERROR] API Tester Failed:", error);
        return NextResponse.json({ success: false, error: "Calculation failed." }, { status: 500 });
    }
}
