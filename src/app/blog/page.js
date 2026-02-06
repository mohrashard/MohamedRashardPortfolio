import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '../../lib/posts';

export const metadata = {
    title: "Tech Blog & Software Insights",
    description: "Expert articles on Web Development, AI, and SaaS Architecture by Mr² Labs (Colombo, Sri Lanka). Insights from Mohamed Rashad Rizmi.",
    keywords: [
        "Mr² Labs Blog",
        "Software Development Blog Sri Lanka",
        "AI Tech Insights Colombo",
        "Next.js Tutorials",
        "Mohamed Rashard Tech Blog",
        "SaaS Development Guide",
        "React Trends 2026",
        "Freelance Developer Insights"
    ],
    openGraph: {
        title: "Tech Blog | Mr² Labs",
        description: "Expert articles on Web Development, AI, and SaaS Architecture from Mr² Labs in Colombo.",
        url: "https://www.mohamedrashard.dev/blog",
        type: "website",
        images: [
            {
                url: "/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tech Blog | Mr² Labs",
        description: "Engineering insights from Sri Lanka.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: {
        canonical: "https://www.mohamedrashard.dev/blog",
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
        "name": "Mr² Labs Tech Blog",
        "description": "Insights on Web Development, AI, and Innovation.",
        "url": "https://www.mohamedrashard.dev/blog",
        "author": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi"
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
            />

            {/* Space Background Decoration - Optimized */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020205]">
                {/* Stars (CSS Pattern) */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    backgroundPosition: '0 0, 25px 25px',
                    opacity: 0.1
                }}></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1.5px, transparent 1.5px), radial-gradient(rgba(255,255,255,0.8) 1.5px, transparent 1.5px)',
                    backgroundSize: '120px 120px',
                    backgroundPosition: '0 0, 60px 60px',
                    opacity: 0.15,
                }}></div>

                {/* Nebula Glows - GPU Accelerated */}
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[5000ms] transform-gpu will-change-transform"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[7000ms] transform-gpu will-change-transform"></div>
                <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[6000ms] transform-gpu will-change-transform"></div>
            </div>

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <i className="fas fa-arrow-left text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all"></i>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Home</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/labs" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Visit Labs</span>
                        <i className="fas fa-flask text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                    </Link>

                    {/* Hire Button */}
                    <div className="relative group">
                        <Link href="/services" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                            <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Hire Me</span>
                        </Link>
                        {/* Tooltip */}
                        <div className="absolute top-full right-0 mt-4 w-64 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none">
                            <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0f0f0f] border-t border-l border-white/10 transform rotate-45"></div>
                            <div className="relative z-10 text-center">
                                <p className="text-xs font-bold text-white mb-1">Building a Product?</p>
                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                    Need a <span className="text-blue-400">Custom Solution</span>? I can help you architect and build your next big idea.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">

                {/* Header */}
                <header className="mb-20">
                    <div className="relative w-24 h-24 mb-6 opacity-90 hover:opacity-100 transition-opacity rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                        <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                    </div>
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        Knowledge Hub
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        Insights on <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Tech & Innovation</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
                        Deep dives into software architecture, AI integration, and the future of web development.
                    </p>
                </header>

                {/* All Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPostsData.map((post) => (
                        <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={post.image || '/services-tech.png'}
                                    alt={post.title || "Blog Post Image"}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                                    {post.category || "Article"}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <span className="text-xs font-bold text-slate-500 mb-3 block">{formatDate(post.date)}</span>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6">
                                    {post.excerpt || post.description}
                                </p>
                                <div className="mt-auto pt-6 border-t border-white/5 flex text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                                    Read more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </main>
        </div>
    );
}
