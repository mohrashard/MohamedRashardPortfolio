"use server";

import * as cheerio from 'cheerio';

export async function analyzeConversion(domain: string) {
    try {
        const url = domain.startsWith('http') ? domain : `https://${domain}`;
        
        // Setup timeout using AbortController
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html'
            },
            signal: controller.signal,
            next: { revalidate: 0 }
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
            return { success: false, error: 'Failed to fetch the website.' };
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // 1. Lead Leakage (mailto: links)
        const mailtoLinks: string[] = [];
        $('a[href^="mailto:"]').each((_, el) => {
            const href = $(el).attr('href');
            if (href) mailtoLinks.push(href.replace('mailto:', ''));
        });

        // 2. Missing <form> tags
        const hasForm = $('form').length > 0;

        // 3. Missing OpenGraph Image (Social Share)
        const ogImage = $('meta[property="og:image"]').attr('content') || $('meta[name="og:image"]').attr('content') || null;
        
        const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || 'No Title Found';
        const ogDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || 'No description found for this page.';

        // 4. Missing PWA Manifest
        const manifest = $('link[rel="manifest"]').attr('href') || null;

        return {
            success: true,
            data: {
                mailtoLinks,
                hasForm,
                ogImage,
                ogTitle,
                ogDescription,
                manifest,
                url
            }
        };

    } catch (error: any) {
        return { success: false, error: error.message || 'An error occurred during analysis.' };
    }
}
