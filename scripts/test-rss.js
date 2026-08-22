const fetchRedditTop = async () => {
    const selectedSubs = ['SaaS'];
    const items = [];
    for (const sub of selectedSubs) {
        const url = 'https://www.reddit.com/r/' + sub + '/top/.rss?t=week';
        console.log('Fetching', url);
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        if (!res.ok) {
            console.log('not ok:', res.status);
            continue;
        }
        const xml = await res.text();
        console.log('XML length:', xml.length);
        
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        let match;
        while ((match = entryRegex.exec(xml)) !== null) {
            const entry = match[1];
            const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(entry);
            const linkMatch = /<link rel="alternate" href="([^"]+)"/.exec(entry);
            const contentMatch = /<content type="html">([\s\S]*?)<\/content>/.exec(entry);
            
            if (titleMatch && linkMatch && contentMatch) {
                items.push(titleMatch[1]);
            } else {
                console.log('regex missed something', !!titleMatch, !!linkMatch, !!contentMatch);
            }
        }
    }
    return items;
};

fetchRedditTop().then(console.log);
