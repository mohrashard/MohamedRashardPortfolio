import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SpaceBackground from './components/SpaceBackground';

export const metadata = {
    title: "Labs - Innovation Hub",
    description: "The Innovation Hub of Mr² Labs (Mohamed Rashard Rizmi). Explore experimental AI projects, futuristic web apps, and digital experiments from Colombo.",
    keywords: [
        "Mr² Labs",
        "Innovation Hub Colombo",
        "AI Experiments Sri Lanka",
        "Future Tech Labs",
        "Mohamed Rashard Rizmi",
        "Web Development Experiments",
        "Digital Innovation"
    ],
    openGraph: {
        title: "Labs - Innovation Hub | Mr² Labs",
        description: "Explore the future of tech at Mr² Labs. Experimental AI, Web 3.0, and Digital Innovation from Colombo, Sri Lanka.",
        url: "https://www.mohamedrashard.dev/labs",
        type: "website",
        images: [
            {
                url: "/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs Innovation",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Labs - Innovation Hub | Mr² Labs",
        description: "Innovation and Experiments by Mohamed Rashard Rizmi.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: {
        canonical: "https://www.mohamedrashard.dev/labs",
    },
};

export default function Labs() {
    // Structured Data for SEO
    const jsonLdBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.mohamedrashard.dev/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Labs",
            "item": "https://www.mohamedrashard.dev/labs"
        }]
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans relative overflow-x-hidden selection:bg-blue-500/30">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
            />

            <SpaceBackground />

            {/* Top Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <i className="fas fa-arrow-left text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all"></i>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Back</span>
                </Link>

                <Link href="/blog" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 backdrop-blur-md hover:border-white/20 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all duration-300">
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Read Blog</span>
                    <i className="fas fa-book-open text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                </Link>
            </nav>

            <div className="max-w-7xl mx-auto relative z-10 pt-32 pb-20 px-6 md:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                {/* Header */}
                <header className="mb-20 text-center relative">
                    <div className="relative w-24 h-24 mx-auto mb-6 hover:scale-105 transition-transform duration-500 rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                        <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                    </div>
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        Innovation Hub
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">The</span> <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">Labs</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        The intersection of professional <strong className="text-blue-400 font-medium">engineering services</strong> and viral <strong className="text-purple-400 font-medium">digital assets</strong>. Hire a developer or download the future.
                    </p>
                </header>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Services Box */}
                    <Link href="/services" className="group relative block h-[450px] md:h-[550px] perspective-1000">
                        <div className="absolute inset-0 bg-blue-600/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] group-hover:border-blue-500/50 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]">
                            {/* Background Image */}
                            <div className="absolute inset-0 transform transition-transform duration-1000 group-hover:scale-110">
                                <Image
                                    src="/services-tech.png"
                                    alt="Web Development and AI Services"
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 will-change-transform"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full p-8 md:p-12">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 backdrop-blur-xl flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-500/10">
                                        <i className="fas fa-code text-2xl"></i>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:border-blue-500/20 transition-all">
                                        Hire Me
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <h2 className="text-4xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tight">Services</h2>
                                    <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light border-l-2 border-blue-500/30 pl-4">
                                        The doorway to <strong className="text-white">hiring a top-tier developer</strong>. Commission <strong className="text-white">Custom Web Apps</strong>, <strong className="text-white">AI Integration</strong>, and <strong className="text-white">SaaS Solutions</strong> tailored to your business.
                                    </p>

                                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                                        <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 group-hover:after:w-full after:transition-all after:duration-500">Hire Developer</span>
                                        <i className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform duration-300 text-blue-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Digital Assets Box */}
                    <Link href="/digital-assets" className="group relative block h-[450px] md:h-[550px] perspective-1000">
                        <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 will-change-opacity"></div>

                        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] group-hover:border-purple-500/50 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] will-change-transform">
                            {/* Background Image */}
                            <div className="absolute inset-0 transform transition-transform duration-1000 group-hover:scale-110">
                                <Image
                                    src="/digital-assets.png"
                                    alt="Digital Assets, Templates and Scripts"
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 will-change-transform"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full p-8 md:p-12">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 backdrop-blur-xl flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-purple-500/10">
                                        <i className="fas fa-cubes text-2xl"></i>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/20 transition-all">
                                        Marketplace
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <h2 className="text-4xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors tracking-tight">Digital Assets</h2>
                                    <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light border-l-2 border-purple-500/30 pl-4">
                                        The <strong className="text-white">Digital Assets Marketplace</strong>. Browse and purchase premium <strong className="text-white">SaaS Apps</strong>, <strong className="text-white">Templates</strong>, and <strong className="text-white">AI Tools</strong> to accelerate your projects or business.
                                    </p>

                                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                                        <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-purple-400 group-hover:after:w-full after:transition-all after:duration-500">Visit Marketplace</span>
                                        <i className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform duration-300 text-purple-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
