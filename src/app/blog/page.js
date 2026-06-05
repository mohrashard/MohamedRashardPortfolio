import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { getSortedPostsData } from '../../lib/posts';
import ScrollReveal from './components/ScrollReveal';
import AvailabilityBadge from '../components/AvailabilityBadge';
import { Terminal } from 'lucide-react';
export const metadata = {
    title: "Engineering Insights | Mr² Labs",
    description: "Expert insights on High-Velocity Software Engineering, AI architectures, and SaaS MVP deployment by the lead engineers at Mr² Labs.",
    keywords: [
        "High-Velocity Software Engineering",
        "SaaS MVP Deployment",
        "Custom AI Architecture",
        "Next.js 15 Infrastructure",
        "Codebase Rescue",
        "Mr² Labs Engineering",
        "B2B SaaS Development",
        "White-label engineering"
    ],
    openGraph: {
        title: "Engineering Insights | Mr² Labs",
        description: "Expert insights on High-Velocity Software Engineering, AI architectures, and SaaS MVP deployment from Mr² Labs.",
        url: "https://mr2labs.com/blog",
        type: "website",
        images: [
            {
                url: "/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs Engineering Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Engineering Insights | Mr² Labs",
        description: "High-velocity engineering insights and AI architecture.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: {
        canonical: "https://www.mr2labs.com/blog",
    },
};

export default function Blog() {
    const allPostsData = getSortedPostsData();

    // Helper to format dates consistently
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Structured Data for Blog List
    const jsonLdBlog = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Mr² Labs Engineering Insights",
        "description": "Insights on High-Velocity Software Engineering, AI architecture, and SaaS deployment.",
        "url": "https://mr2labs.com/blog",
        "publisher": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "logo": {
                "@type": "ImageObject",
                "url": "https://mr2labs.com/mr-squared-logo.png"
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
            />

            {/* Background Decoration - Matched to Home Page */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
                <Image
                    src="/blog-hero-bg-v2.png"
                    alt=""
                    fill
                    priority
                    quality={90}
                    className="object-cover object-center opacity-60"
                    aria-hidden="true"
                />
                {/* Darken the edges so content stays readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

                {/* Structural Engineering Blueprint Grid Lines */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]" />

                {/* Concentric Ring Accents */}
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.025] rounded-full pointer-events-none z-0" />
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.035] border-dashed rounded-full pointer-events-none z-0" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">

                {/* Header */}
                <header className="pt-8 pb-16 md:pt-16 md:pb-44 flex flex-col items-center justify-center text-center">

                    <ScrollReveal delay={0}>
                        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8">
                            <AvailabilityBadge />
                            <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                            <div className="hidden sm:flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-zinc-400">
                                <Terminal size={10} className="text-[var(--accent)]" />
                                ENGINEERING INSIGHTS. AI INNOVATION.
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-white drop-shadow-sm">
                            Insights on <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300">
                                Tech & Innovation
                            </span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Deep dives into software architecture, AI integration, and the future of high-performance web development. Discover actionable engineering strategies to build, scale, and optimize world-class SaaS products.
                        </p>
                    </ScrollReveal>
                </header>

                {/* All Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                    {allPostsData.map((post, index) => (
                        <ScrollReveal key={post.id} delay={(index % 3) * 0.15} className="h-full">
                            <Link
                                href={`/blog/${post.id}`}
                                className={`group relative flex flex-col h-full bg-[#050505]/80 backdrop-blur-xl border border-white/[0.08] rounded-[2rem] overflow-hidden hover:border-[var(--primary)]/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,102,255,0.15)] transition-all duration-500`}
                            >
                                {/* Glowing ambient hover effect inside card */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className={`relative w-full aspect-video overflow-hidden`}>
                                    <Image
                                        src={post.image || '/services-tech.png'}
                                        alt={post.title || "Blog Post Image"}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                                    {/* Glassmorphic internal border for depth */}
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-t-[2rem]" />
                                </div>

                                <div className={`p-8 md:p-10 flex flex-col flex-grow z-10 bg-gradient-to-t from-[#050505] to-transparent`}>
                                    <div className="flex flex-wrap items-center gap-3 mb-5">
                                        <span className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-md shadow-sm">
                                            {post.category || "Article"}
                                        </span>
                                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {formatDate(post.date)}
                                        </span>
                                    </div>
                                    <h3 className={`font-black text-white mb-4 group-hover:text-[var(--accent)] transition-colors leading-tight tracking-tight text-2xl line-clamp-2`}>
                                        {post.title}
                                    </h3>
                                    <p className={`text-slate-400 text-sm md:text-base font-light leading-relaxed mb-8 line-clamp-3`}>
                                        {post.excerpt || post.description}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center text-xs uppercase tracking-widest font-bold text-slate-400 group-hover:text-white transition-colors w-full">
                                        Read Article
                                        <svg className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-500 text-[var(--primary)] group-hover:text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

            </main>
        </div>
    );
}
