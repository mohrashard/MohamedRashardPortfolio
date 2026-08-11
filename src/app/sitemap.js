import { getSortedPostsData } from '../lib/posts';
import { assets } from './digital-assets/data';
import pseoData from '../data/pseo-slugs.json';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mr2labs.com";

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/services",
    "/case-studies",
    "/case-studies/ignite-ed",
    "/case-studies/grabme",
    "/testimonials",
    "/labs",
    "/blog",
    "/privacy",
    "/cost-to-build",
    "/digital-assets"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" || route === "/labs" ? "weekly" : "monthly",
    priority: route === "" ? 1 : (route === "/services" || route === "/case-studies") ? 0.9 : route === "/privacy" ? 0.3 : 0.8,
  }));

  // 2. Dynamic Blog Posts
  const posts = getSortedPostsData().map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 3. Dynamic Digital Assets
  const digitalAssets = assets.map((asset) => ({
    url: `${baseUrl}/digital-assets/${asset.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Dynamic Cost-to-Build pages
  const costToBuildPages = pseoData.map((project) => ({
    url: `${baseUrl}/cost-to-build/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...posts, ...digitalAssets, ...costToBuildPages];
}
