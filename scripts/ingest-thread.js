import fs from 'fs';
import path from 'path';

async function fetchReddit(url) {
    // Strip query parameters and trailing slashes to cleanly append .json
    let jsonUrl = url.split('?')[0];
    if (jsonUrl.endsWith('/')) jsonUrl = jsonUrl.slice(0, -1);
    if (!jsonUrl.endsWith('.json')) jsonUrl += '.json';

    console.log(`📡 Fetching Reddit data from: ${jsonUrl}`);
    
    // Reddit blocks generic User-Agents, so we spoof a standard browser request
    const response = await fetch(jsonUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    });

    if (!response.ok) {
        throw new Error(`Reddit API failed with status: ${response.status}`);
    }

    const data = await response.json();
    const postData = data[0].data.children[0].data;
    const title = postData.title;
    const selftext = postData.selftext;

    let output = `TITLE: ${title}\n\nBODY (Core Objection):\n${selftext || 'No body text.'}\n\n--- TOP COMMENTS ---\n`;

    const commentsData = data[1].data.children;
    const topComments = commentsData.slice(0, 5);
    
    topComments.forEach((comment, index) => {
        if (comment.kind === 't1' && comment.data.body) {
            output += `\n[Comment ${index + 1}]:\n${comment.data.body}\n`;
        }
    });

    return output;
}

async function fetchHackerNews(url) {
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get('id');
    
    if (!id) {
        throw new Error("Could not extract item ID from Hacker News URL (e.g., ?id=12345)");
    }

    console.log(`📡 Fetching Hacker News item ID: ${id}`);
    
    // Fetch the main item
    const itemResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    if (!itemResponse.ok) throw new Error("Failed to fetch Hacker News main item.");
    
    const itemData = await itemResponse.json();
    
    let output = `TITLE: ${itemData.title || 'No Title'}\n\nBODY (Core Objection):\n${itemData.text || 'No body text.'}\n\n--- TOP COMMENTS ---\n`;
    
    // Fetch up to the top 5 top-level comments
    if (itemData.kids && itemData.kids.length > 0) {
        const topKids = itemData.kids.slice(0, 5);
        
        for (let i = 0; i < topKids.length; i++) {
            const commentId = topKids[i];
            const commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
            
            if (commentResponse.ok) {
                const commentData = await commentResponse.json();
                if (commentData && commentData.text && !commentData.deleted && !commentData.dead) {
                    output += `\n[Comment ${i + 1}]:\n${commentData.text}\n`;
                }
            }
        }
    }
    
    return output;
}

async function main() {
    const url = process.argv[2];
    
    if (!url) {
        console.error("🚨 Error: Please provide a Reddit or Hacker News URL as an argument.");
        console.error("Usage: node scripts/ingest-thread.js <URL>");
        process.exit(1);
    }

    try {
        let rawContent = "";
        
        if (url.includes('reddit.com')) {
            rawContent = await fetchReddit(url);
        } else if (url.includes('news.ycombinator.com')) {
            rawContent = await fetchHackerNews(url);
        } else {
            console.error("🚨 Error: Unsupported URL. Please provide a Reddit (reddit.com) or Hacker News (news.ycombinator.com) link.");
            process.exit(1);
        }
        
        const outputPath = path.resolve(process.cwd(), 'raw-input.txt');
        fs.writeFileSync(outputPath, rawContent, 'utf8');
        
        console.log(`\n✅ Success! Market data ingested and saved to: ${outputPath}`);
        console.log(`You can now run your generation script to process this data!`);
        
    } catch (error) {
        console.error("🚨 Ingestion failed:", error);
        process.exit(1);
    }
}

main();
