import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { analyzeAndRankTopic } from '../src/lib/unifiedPipeline.js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fetchLobstersTop() {
    try {
        console.log(`📡 Fetching Lobste.rs API...`);
        const tags = ['web', 'programming', 'ai'];
        const items = [];
        for (const tag of tags) {
            const url = `https://lobste.rs/t/${tag}.json`;
            const res = await fetch(url, {
                headers: { 'User-Agent': 'mr2labs-scout/1.0' }
            });
            if (!res.ok) continue;
            const articles = await res.json();
            
            for (const article of articles) {
                items.push({
                    url: article.url || article.comments_url,
                    type: 'lobsters',
                    rawContent: `TITLE: ${article.title}\n\nBODY:\n${article.description || 'No description'}\n\nTAGS: ${article.tags.join(', ')}\nCOMMENTS URL: ${article.comments_url}`
                });
            }
        }
        return items;
    } catch (e) {
        console.error("⚠️ Failed to fetch Lobste.rs:", e.message);
        return [];
    }
}


async function fetchDevToTop(timeFilter = 'day') {
    const topDays = timeFilter === 'day' ? 1 : timeFilter === 'week' ? 7 : 30;
    try {
        const allTags = [
            'saas', 'webdev', 'startup', 'nextjs', 'react',
            'ai', 'machinelearning', 'indiehackers', 'programming'
        ];
        
        const shuffleArray = (arr) => {
            let res = [...arr];
            for (let i = res.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [res[i], res[j]] = [res[j], res[i]];
            }
            return res;
        };
        
        // DEV.to allows querying one tag at a time easily. Let's pick 3 tags.
        const selectedTags = shuffleArray(allTags).slice(0, 3);
        console.log(`📡 Fetching DEV.to API from tags: ${selectedTags.join(', ')}`);
        
        const items = [];
        
        for (const tag of selectedTags) {
            // Fetch top articles for the tag for the last N days
            const url = `https://dev.to/api/articles?tag=${tag}&top=${topDays}&per_page=10`;
            const res = await fetch(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            
            if (!res.ok) continue;
            const articles = await res.json();
            
            for (const article of articles) {
                let fullBody = article.description || '';
                try {
                    const fullRes = await fetch(`https://dev.to/api/articles/${article.id}`, {
                        headers: { 'User-Agent': 'mr2labs-scout/1.0' }
                    });
                    if (fullRes.ok) {
                        const full = await fullRes.json();
                        fullBody = full.body_markdown || full.body_html?.replace(/<[^>]+>/g, '') || article.description;
                    }
                } catch (e) { /* fallback to description */ }
                
                items.push({
                    url: article.url,
                    type: 'devto',
                    rawContent: `TITLE: ${article.title}\n\nBODY:\n${fullBody}\n\nTAGS: ${article.tag_list?.join(', ') || article.tags}`
                });
            }
        }
        
        return items;
    } catch (e) {
        console.error("⚠️ Failed to fetch DEV.to API:", e.message);
        return [];
    }
}

async function fetchHNTop() {
    const hnNicheKeywords = [
        'Show HN', 'saas', 'mvp', 'nextjs', 'supabase',
        'ai agent', 'llm', 'automation',
        'founder', 'indie hacker', 'bootstrapped',
        'full stack', 'rapid', 'ship'
    ];

    let links = [];
    console.log("📡 Fetching HN threads via Algolia API...");
    for (const keyword of hnNicheKeywords) {
        try {
            const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(keyword)}&tags=story&numericFilters=points>10`);
            if (res.ok) {
                const data = await res.json();
                data.hits.forEach(hit => {
                    links.push({
                        url: `https://news.ycombinator.com/item?id=${hit.objectID}`,
                        type: 'hn'
                    });
                });
            }
        } catch(e) {
            console.error("Failed HN Algolia fetch for", keyword, e);
        }
    }
    return [...new Set(links)]; // deduplicate
}

async function scrapeThread(url) {
    if (url.includes('news.ycombinator.com')) {
        const id = new URL(url).searchParams.get('id');
        const itemResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (!itemResponse.ok) return null;
        const itemData = await itemResponse.json();
        
        const cleanText = (str) => {
            if (!str) return '';
            return str
                .replace(/<p>/g, '\n\n')
                .replace(/<[^>]+>/g, '')
                .replace(/&#x2F;/g, '/')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&#x27;/g, "'");
        };
        
        let output = `TITLE: ${itemData.title || ''}\n\nBODY:\n${cleanText(itemData.text)}\n\n--- COMMENTS ---\n`;
        if (itemData.kids && itemData.kids.length > 0) {
            for (let i = 0; i < Math.min(itemData.kids.length, 5); i++) {
                const commentRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemData.kids[i]}.json`);
                if (commentRes.ok) {
                    const commentData = await commentRes.json();
                    if (commentData && commentData.text && !commentData.deleted) {
                        output += `\n[Comment ${i + 1}]:\n${cleanText(commentData.text)}\n`;
                    }
                }
            }
        }
        return output;
    }
    return null;
}

async function main() {
    const timeFilter = process.argv[2] || 'day'; // day, week, month
    console.log(`🚀 Starting Autonomous Scout (Filter: Top of the ${timeFilter})`);



    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    let hnLinks = shuffle(await fetchHNTop());
    let devtoLinks = shuffle(await fetchDevToTop(timeFilter));
    let lobstersLinks = shuffle(await fetchLobstersTop());
    
    // Interleave them so we pull from both fairly
    const allLinks = [];
    const maxLength = Math.max(hnLinks.length, devtoLinks.length, lobstersLinks.length);
    for (let i = 0; i < maxLength; i++) {
        if (devtoLinks[i]) allLinks.push(devtoLinks[i]);
        if (lobstersLinks[i]) allLinks.push(lobstersLinks[i]);
        if (hnLinks[i]) allLinks.push(hnLinks[i]);
    }

    console.log(`📡 Found ${hnLinks.length} HN threads, ${devtoLinks.length} DEV.to threads, and ${lobstersLinks.length} Lobste.rs threads to evaluate.`);

    let hnApproved = 0;
    let devtoApproved = 0;
    let lobstersApproved = 0;
    
    for (const item of allLinks) {
        // Enforce quota: 2 HN, 2 DEV.to, 2 Lobste.rs (max 6 total)
        if (hnApproved >= 2 && devtoApproved >= 2 && lobstersApproved >= 2) {
            console.log(`✅ Reached quota of 2 HN, 2 DEV.to, and 2 Lobste.rs ideas! Shutting down scout.`);
            break;
        }

        const isHN = item.type === 'hn';
        const isDevTo = item.type === 'devto';
        const isLobsters = item.type === 'lobsters';

        // Skip if this source has already hit its quota
        if (isHN && hnApproved >= 2) continue;
        if (isDevTo && devtoApproved >= 2) continue;
        if (isLobsters && lobstersApproved >= 2) continue;

        // Check if we already evaluated this URL to prevent duplicates
        const { data: existing } = await supabase
            .from('content_ideas')
            .select('id')
            .eq('source_url', item.url)
            .single();
            
        if (existing) {
            console.log(`⏭️ Skipping (already in DB): ${item.url}`);
            continue;
        }

        console.log(`\n🔍 Scouting: ${item.url}`);
        
        let rawContent = '';
        if (isDevTo || isLobsters) {
            rawContent = item.rawContent; // Already pulled from API!
        } else {
            rawContent = await scrapeThread(item.url);
        }
        
        if (!rawContent) {
            console.log(`⚠️ Failed to scrape. Skipping.`);
            continue;
        }

        // ==========================================
        // PRE-FLIGHT NICHE FILTER (Saves LLM Tokens)
        // ==========================================
        const lowerContent = rawContent.toLowerCase();
        const nicheKeywords = [
            // Stack / Tech
            'nextjs', 'next.js', 'react', 'supabase', 'typescript',
            'tailwind', 'prisma', 'vercel', 'postgresql', 'stripe',
            'framer motion', 'trpc', 'drizzle', 'shadcn',
            
            // AI / LLM Layer
            'llm', 'openai', 'claude', 'anthropic', 'gpt',
            'ai agent', 'ai workflow', 'langchain', 'rag',
            'vector database', 'embeddings', 'ai automation',
            'n8n', 'zapier', 'make.com',
            
            // Product Type
            ' mvp', 'saas', 'web app', 'mobile app', 'dashboard',
            'admin panel', 'chrome extension', 'api integration',
            'waitlist', 'landing page', 'full stack',
            
            // Client / Business Stage
            'startup', 'founder', 'indie hacker', 'bootstrapped',
            'pre-seed', 'early stage', 'solopreneur', 'side project',
            'product studio', 'dev agency', 'software agency',
            
            // Pain Points / Buying Intent
            'hire developer', 'offshore dev', 'build for me',
            'no-code alternative', 'too slow to build', 'technical cofounder',
            'outsource development', 'product development agency',
            'rapid prototyping', 'build fast', 'ship fast',
            
            // Broader AI terms
            ' ai ', 'machine learning', 'automation', 'agent',
            'generative ai', 'agentic', 'ai tools', 'ai startup'
        ];
        
        const hasNicheKeyword = nicheKeywords.some(kw => lowerContent.includes(kw));
        
        if (!hasNicheKeyword) {
            console.log(`🛑 Pre-flight Rejected: Topic is entirely outside MR² Labs niche (No web/AI/app keywords found).`);
            
            // Save to DB as rejected so we don't scrape it again tomorrow
            await supabase.from('content_ideas').insert([{
                raw_source: rawContent.substring(0, 2000) + '...',
                source_url: item.url,
                intent_score: 0,
                editorial_brief: { rejection_reason: "Pre-flight Regex Failed: Not in MR² Labs Niche" },
                status: 'rejected'
            }]);
            continue;
        }

        try {
            const result = await analyzeAndRankTopic(rawContent);
            
            const isApproved = result.status === 'approved_high_demand' || result.status === 'backlog';
            let brief = {};
            
            if (isApproved) {
                brief = result.data;
                if (result.status === 'approved_high_demand') {
                    if (isHN) hnApproved++;
                    if (isDevTo) devtoApproved++;
                    if (isLobsters) lobstersApproved++;
                    console.log(`🌟 APPROVED_HIGH_DEMAND! Opportunity Score: ${result.opportunity_score}/100 [HN: ${hnApproved}/2, DEV.to: ${devtoApproved}/2, Lobste.rs: ${lobstersApproved}/2]`);
                } else {
                    console.log(`🌟 BACKLOG! Opportunity Score: ${result.opportunity_score}/100 [HN: ${hnApproved}/2, DEV.to: ${devtoApproved}/2, Lobste.rs: ${lobstersApproved}/2]`);
                }
            } else {
                console.log(`❌ REJECTED: ${result.reason}`);
                brief = { rejection_reason: result.reason };
            }

            // Store EVERY idea (both approved and rejected)
            await supabase.from('content_ideas').insert([{
                raw_source: rawContent.substring(0, 5000) + (rawContent.length > 5000 ? '...' : ''),
                source_url: item.url,
                intent_score: result.opportunity_score || 0, // Storing Opportunity Score here so UI sorts correctly
                editorial_brief: brief,
                status: isApproved ? 'pending' : 'rejected'
            }]);

        } catch (err) {
            console.error(`⚠️ Evaluation failed for ${item.url}:`, err.message);
        }
    }
    
    console.log(`\n🏁 Scout run finished! Found ${hnApproved} HN ideas, ${devtoApproved} DEV.to ideas, and ${lobstersApproved} Lobste.rs ideas.`);
}

main();
