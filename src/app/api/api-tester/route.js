import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

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
            statusCode = fetchError.name === 'AbortError' ? 408 : 503;
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

Write a STRICT JSON object evaluating this performance:
{
  "verdict": (string, 2 punchy sentences. If slow, tell them they need edge caching/better DB indexing. If fast, commend infrastructure),
  "recommendation": (string, 1 technical sentence on how Mr² Labs would architect/improve this for production scale)
}`;

        const aiData = await executeWaterfallAi(SYSTEM_PROMPT, "Analyze API metrics", { isJson: true });

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
