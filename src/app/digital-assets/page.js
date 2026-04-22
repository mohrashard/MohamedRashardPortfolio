import Link from 'next/link';
import Image from 'next/image';
import { assets } from './data';
import TrustBar from '../components/TrustBar';
import DigitalAssetsClient from './DigitalAssetsClient';

export const metadata = {
    title: "Digital Assets Marketplace",
    description: "Premium Digital Assets by Mr² Labs. Download engineered Next.js templates, AI SaaS tools, and Python scripts. Powered by Mohamed Rashad Rizmi, Sri Lanka.",
    keywords: [
        "Mr² Labs Store",
        "Mohamed Rashard Digital Assets",
        "Next.js Templates Sri Lanka",
        "AI SaaS Source Code",
        "Python Automation Scripts",
        "Developer Marketplace Colombo",
        "Premium Source Code",
        "Web App Templates",
        "React Native UI Kits"
    ],
    openGraph: {
        title: "Digital Assets Marketplace | Mr² Labs",
        description: "Accelerate your development with professionally engineered templates, AI tools, and automation scripts from Mr² Labs.",
        url: "https://www.mohamedrashard.dev/digital-assets",
        type: "website",
        images: [
            {
                url: "/mr-squared-logo.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs Assets",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Digital Assets Marketplace | Mr² Labs",
        description: "Premium Developer Assets from Sri Lanka.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: {
        canonical: "https://www.mohamedrashard.dev/digital-assets",
    },
};

export default function DigitalAssets() {
    // Structured Data for the Marketplace
    const jsonLdMarketplace = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Mr² Labs Digital Assets",
        "description": "A curated collection of high-quality code templates, AI tools, and scripts.",
        "url": "https://www.mohamedrashard.dev/digital-assets",
        "provider": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Colombo",
                "addressCountry": "Sri Lanka"
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-purple-500/30 overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMarketplace) }}
            />

            {/* Background Decoration: Gradient Vibes - Optimized with Hardware Acceleration */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-orange-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-700 transform-gpu will-change-transform"></div>
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-b from-cyan-500/10 via-blue-600/20 to-purple-600/20 rounded-full blur-[80px] mix-blend-screen animate-pulse duration-1000 transform-gpu will-change-transform"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[900px] h-[500px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[100px] mix-blend-screen transform-gpu will-change-transform"></div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-10 blur-[100px] rounded-full transform-gpu"
                    style={{ background: 'conic-gradient(from 0deg, transparent, #a855f7, #ec4899, transparent)' }}>
                </div>

                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04]"></div>
            </div>

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/labs" className="group flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <i className="fas fa-arrow-left text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all"></i>
                    <span className="hidden md:inline text-sm font-semibold text-slate-300 group-hover:text-white">Back to Labs</span>
                </Link>
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/blog" className="group flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all duration-300">
                        <span className="hidden md:inline text-sm font-semibold text-slate-300 group-hover:text-white">Read Blogs</span>
                        <i className="fas fa-book-open text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                    </Link>

                    <div className="relative group">
                        <Link href="/services" className="group flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                            <span className="hidden md:inline text-sm font-semibold text-slate-300 group-hover:text-white">Hire Me</span>
                            <i className="fas fa-handshake text-slate-400 group-hover:text-white transition-all"></i>
                        </Link>
                        <div className="absolute top-full right-0 mt-4 w-64 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none">
                            <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0f0f0f] border-t border-l border-white/10 transform rotate-45"></div>
                            <div className="relative z-10 text-center">
                                <p className="text-xs font-bold text-white mb-1">Start Your Own Tech Company?</p>
                                <p className="text-slate-400 text-[11px] leading-relaxed">
                                    Don't just buy templates. <span className="text-purple-400">Hire me</span> to build your custom SaaS or Dream Project from scratch.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href="/" className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <i className="fas fa-home"></i>
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                {/* Marketplace Header */}
                <header className="mb-20 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6 hover:scale-105 transition-transform duration-500 rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]">
                        <Image src="/mr-squared-logo.png" alt="Mr² Labs" fill className="object-cover" />
                    </div>
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest">
                        Digital Marketplace
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        Premium Assets to <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">Accelerate Your Workflow</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        High-quality <strong className="text-white">Source Code</strong>, <strong className="text-white">Templates</strong>, and <strong className="text-white">AI Tools</strong> engineered to save you time and help you build faster.
                    </p>
                </header>

                <div className="mb-16 -mt-8">
                    <TrustBar />
                </div>

                <DigitalAssetsClient initialAssets={assets} />
            </main>
        </div>
    );
}
