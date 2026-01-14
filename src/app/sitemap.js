import { getSortedPostsData } from '../lib/posts';
import { assets } from './digital-assets/data';

export default function sitemap() {
    const baseUrl = 'https://www.mohamedrashard.dev';

    // 1. Static Routes
    const routes = [
        '',
        '/about',
        '/skills',
        '/projects',
        '/contact',
        '/services',
        '/labs',
        '/digital-assets',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Blog Posts
    const posts = getSortedPostsData().map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // 3. Dynamic Digital Assets
    const digitalAssets = assets.map((asset) => ({
        url: `${baseUrl}/digital-assets/${asset.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...routes, ...posts, ...digitalAssets];
}
