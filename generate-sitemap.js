const fs = require("fs");
const path = require("path");

// Base URL of your site
const BASE_URL = "https://mohamedrashard.vercel.app";

// Static pages
const staticPages = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/services", changefreq: "monthly", priority: 0.8 },
  { url: "/services/web-apps", changefreq: "monthly", priority: 0.7 },
  { url: "/services/frontend-websites", changefreq: "monthly", priority: 0.7 },
  { url: "/services/mobile-apps", changefreq: "monthly", priority: 0.7 },
  { url: "/services/ai-solutions", changefreq: "monthly", priority: 0.7 },
  { url: "/blog", changefreq: "weekly", priority: 0.6 },
];

// Directory containing Markdown posts
const postsDirectory = path.join(__dirname, "public", "posts");

// Get all Markdown files
const postFiles = fs.readdirSync(postsDirectory).filter(file => file.endsWith(".md"));

// Map posts to URLs
const blogPosts = postFiles.map((file) => {
  const slug = file.replace(".md", "");
  return {
    url: `/blog/${slug}`,
    changefreq: "monthly",
    priority: 0.5,
  };
});

// Combine static and blog pages
const allPages = [...staticPages, ...blogPosts];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

// Save sitemap.xml in public folder
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemap);

console.log("✅ Sitemap generated successfully!");
