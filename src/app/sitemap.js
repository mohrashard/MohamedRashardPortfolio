import { getSortedPostsData } from '../lib/posts';
import { assets } from './digital-assets/data';

export default function sitemap() {
    const baseUrl = 'https://www.mohamedrashard.dev';

    // 1. Static Routes — priority and changeFrequency tuned per page importance
    const staticRoutes = [
        { path: '',                 changeFrequency: 'weekly',  priority: 1.0 },
        { path: '/services',        changeFrequency: 'weekly',  priority: 0.9 },
        { path: '/digital-assets',  changeFrequency: 'weekly',  priority: 0.85 },
        { path: '/blog',            changeFrequency: 'weekly',  priority: 0.8 },
        { path: '/labs',            changeFrequency: 'monthly', priority: 0.7 },
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

    return [...staticRoutes, ...posts, ...digitalAssets];
}
