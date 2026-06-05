import { getSortedPostsData } from '../lib/posts';
import { assets } from './digital-assets/data';
import pseoData from '../data/pseo-slugs.json';

export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mr2labs.com';

    // 1. Static Routes — priority and changeFrequency tuned per page importance
    const staticRoutes = [
        { path: '',                 changeFrequency: 'weekly',  priority: 1.0 },
        { path: '/services',        changeFrequency: 'daily',   priority: 1.0 },
        { path: '/cost-to-build',   changeFrequency: 'weekly',  priority: 0.9 },
        { path: '/digital-assets',  changeFrequency: 'weekly',  priority: 0.85 },
        { path: '/blog',            changeFrequency: 'weekly',  priority: 0.8 },
        { path: '/labs',            changeFrequency: 'monthly', priority: 0.8 },
        { path: '/labs/ai-readiness', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/api-tester', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/automation-calculator', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/cold-email', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/competitor-research', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/fundraising-readiness', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/github-analyzer', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/idea-validator', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/jd-generator', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/linkedin-headline', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/name-checker', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/pricing-generator', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/prompt-library', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/runway-calculator', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/site-audit', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/labs/stack-picker', changeFrequency: 'monthly', priority: 0.7 },
    ].map(({ path, changeFrequency, priority }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }));

    // 2. Dynamic Blog Posts
    const posts = getSortedPostsData().map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 3. Dynamic Digital Asset detail pages
    const digitalAssets = assets.map((asset) => ({
        url: `${baseUrl}/digital-assets/${asset.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 4. Dynamic pSEO Cost-to-Build pages
    const costToBuildPages = pseoData.map((project) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/cost-to-build/${project.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.9,
    }));

    return [...staticRoutes, ...posts, ...digitalAssets, ...costToBuildPages];
}
