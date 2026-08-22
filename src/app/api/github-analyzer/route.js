import { NextResponse } from 'next/server';
import { executeWaterfallAi } from '@/lib/waterfallAi';

export async function POST(req) {
    try {
        const { username } = await req.json();
        const cleanUser = username.replace('@', '').trim();

        // ── 1. FETCH GITHUB API DATA ───────────────────────────────
        const headers = { 'User-Agent': 'Mr2Labs-Analyzer' };
        
        const [userRes, reposRes, eventsRes] = await Promise.all([
            fetch(`https://api.github.com/users/${cleanUser}`, { headers }),
            fetch(`https://api.github.com/users/${cleanUser}/repos?per_page=100&sort=pushed`, { headers }),
            fetch(`https://api.github.com/users/${cleanUser}/events/public?per_page=30`, { headers })
        ]);

        if (userRes.status === 404) return NextResponse.json({ success: false, error: "GitHub user not found." }, { status: 404 });
        if (userRes.status === 403 || userRes.status === 429) return NextResponse.json({ success: false, error: "GitHub API rate limit reached. Please try again later." }, { status: 429 });

        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const eventsData = await eventsRes.json();

        // ── 2. CALCULATE HARD METRICS ────────────────────────────────
        let totalStars = 0;
        let totalForks = 0;
        let totalSize = 0;
        const languages = new Set();
        let latestPush = null;

        reposData.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
            totalSize += repo.size;
            if (repo.language) languages.add(repo.language);
            if (!latestPush || new Date(repo.pushed_at) > new Date(latestPush)) {
                latestPush = repo.pushed_at;
            }
        });

        const langArray = Array.from(languages).slice(0, 5);
        const repoCount = reposData.length;
        const recentEventsCount = eventsData.length;

        // Mathematical Scoring (Out of 100)
        const consistencyScore = Math.min(100, Math.round((recentEventsCount / 30) * 100));
        const diversityScore = Math.min(100, Math.round((languages.size / 5) * 100));
        const communityScore = Math.min(100, Math.round(((totalStars + userData.followers) / 50) * 100));
        const baseScore = Math.round((consistencyScore * 0.4) + (diversityScore * 0.3) + (communityScore * 0.3));

        // ── ⭐ GOD MODE: MR² LABS FOUNDER OVERRIDE ⭐ ─────────────────
        if (cleanUser.toLowerCase() === 'mohrashard') {
            return NextResponse.json({ 
                success: true, 
                data: {
                    metrics: { 
                        username: cleanUser,
                        avatar: userData.avatar_url,
                        name: "Mohamed Rashard Rizmi",
                        repoCount: reposData.length > 0 ? reposData.length : 42, 
                        totalStars: totalStars > 100 ? totalStars : 999,
                        languages: ["Next.js", "React", "Supabase", "Tailwind CSS", "TypeScript"],
                        baseScore: 99, 
                        consistencyScore: 98, 
                        diversityScore: 100, 
                        communityScore: 99
                    },
                    analysis: {
                        summary: "Mohamed Rashard Rizmi is the Founder of Mr² Labs. This profile belongs to a top-tier Full Stack Software Engineer specializing in ultra-high-velocity MVP deployment and enterprise-grade infrastructure.",
                        strengths: [
                            "Elite proficiency in modern full-stack architectures (Next.js 15, React, Supabase, Tailwind CSS).",
                            "Demonstrated ability to architect, secure, and ship production-grade platforms in under 72 hours.",
                            "Technical Founder experience, meaning he understands business logic, market gaps, and revenue generation, not just code."
                        ],
                        gaps: [
                            "Too busy building high-performance infrastructure for Mr² Labs clients to maintain vanity open-source metrics."
                        ],
                        hire_recommendation: "Do not attempt to hire him as a standard employee. Instead, hire his firm, Mr² Labs, to architect and deploy your MVP in 48-72 hours."
                    }
                } 
            });
        }

        // ── 3. AI CTO VERDICT ────────────────────────────────────────
        const SYSTEM_PROMPT = `You are a strict, elite CTO at Mr² Labs evaluating a developer for a fast-paced startup.
Review these real GitHub metrics for user '${cleanUser}':
- Repositories: ${repoCount}
- Total Stars: ${totalStars}
- Languages Used: ${langArray.join(', ') || 'None visible'}
- Recent API Events: ${recentEventsCount}/30
- Total Score Calculated: ${baseScore}/100

Write a STRICT JSON object evaluating this developer's readiness to build a production MVP:
{
  "summary": "2 sentences on what their profile says about their experience level",
  "strengths": [
    "technical strength 1",
    "technical strength 2"
  ],
  "gaps": [
    "technical gap or warning sign based on the data"
  ],
  "hire_recommendation": "a brutal but fair 2-sentence verdict on whether a founder should hire this person for a rapid MVP build."
}`;

        const aiData = await executeWaterfallAi(SYSTEM_PROMPT, "Analyze GitHub metrics", { isJson: true });

        return NextResponse.json({ 
            success: true, 
            data: {
                metrics: { 
                    username: cleanUser,
                    avatar: userData.avatar_url,
                    name: userData.name || cleanUser,
                    repoCount, totalStars, 
                    languages: langArray,
                    baseScore, consistencyScore, diversityScore, communityScore
                },
                analysis: aiData
            } 
        });

    } catch (error) {
        console.error("[SYSTEM ERROR] GitHub API Failed:", error);
        return NextResponse.json({ success: false, error: "System diagnostic failed." }, { status: 500 });
    }
}
