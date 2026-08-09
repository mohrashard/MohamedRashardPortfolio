import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ScrollObserver from '../services/ScrollObserver';
import VideoPlayer from './VideoPlayer';
import AvailabilityBadge from '../components/AvailabilityBadge';

export const metadata = {
    title: "Testimonials | Mr² Labs - Real Founders, Real Results",
    description: "Hear from founders who worked with Mr² Labs. Platform delivered in 48 hours. See what clients say.",
    openGraph: {
        title: "Testimonials | Mr² Labs - Real Founders, Real Results",
        description: "Hear from founders who worked with Mr² Labs. Platform delivered in 48 hours. See what clients say.",
        url: "https://mr2labs.com/testimonials",
        siteName: "Mr² Labs",
        images: [
            {
                url: "https://mr2labs.com/og/testimonials.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs - Testimonials",
            }
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Testimonials | Mr² Labs - Real Founders, Real Results",
        description: "Hear from founders who worked with Mr² Labs. Platform delivered in 48 hours. See what clients say.",
        images: ["https://mr2labs.com/og/testimonials.png"],
        creator: "@mr2labs",
    },
    alternates: { canonical: "https://mr2labs.com/testimonials" },
};

export default function TestimonialsPage() {
    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mr² Labs",
        "url": "https://mr2labs.com",
        "review": [
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Ahmed H. Ifthikar" },
                "reviewBody": "Mr² Labs delivered our entire platform in 48 hours. The speed, clarity, and quality were beyond what we expected.",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                }
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Sajid" },
                "reviewBody": "They understood our vision instantly and turned it into a product that our users love. Highly recommend Mr² Labs!",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                }
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "2",
            "bestRating": "5"
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#0066FF]/30 pt-[120px] pb-24 overflow-x-hidden relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--primary)]/10 blur-[150px] rounded-full"></div>
                <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full"></div>
            </div>

            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-16" data-animate="slide-up">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
                        <AvailabilityBadge />
                        <span className="hidden sm:block text-zinc-700 text-xs">•</span>
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-400 font-mono">
                            <span className="text-[var(--primary)] mr-1">&gt;_</span> REAL FOUNDERS. PROVEN IMPACT.
                        </span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black tracking-tight leading-[1.05] font-['Plus_Jakarta_Sans',sans-serif] mb-6">
                        <span className="text-white block">Real People.</span>
                        <span className="text-[var(--accent)] block mt-2">Real Results.</span>
                    </h1>
                    <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-lg mx-auto font-['Inter',sans-serif] leading-relaxed">
                        We don&apos;t just promise. We build, ship, and deliver impact.
                    </p>
                </div>

                {/* Metrics Row */}
                <div className="w-full max-w-4xl mx-auto mb-20 relative" data-animate="fade">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5 blur-[50px] rounded-full pointer-events-none"></div>
                    
                    <div className="relative bg-[#050505]/40 backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"></div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
                            {/* For mobile, we need a bottom border on the top two items. Using standard border utility since divide-y can be tricky in grids. */}
                            {[
                                { value: '48', suffix: 'h', label: 'Fastest MVP', borderB: 'border-b border-white/[0.05] md:border-b-0' },
                                { value: '14', suffix: 'd', label: 'Average Build', borderB: 'border-b border-white/[0.05] md:border-b-0' },
                                { value: '3', suffix: '', label: 'Platforms Live', borderB: '' },
                                { value: '0', prefix: '$', label: 'Marketing Spent', borderB: '' }
                            ].map((metric, i) => (
                                <div key={i} className={`p-8 md:p-10 text-center flex flex-col justify-center items-center group relative overflow-hidden ${metric.borderB}`}>
                                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                    <div className="text-4xl md:text-5xl font-black font-['Plus_Jakarta_Sans',sans-serif] mb-3 tracking-tighter">
                                        {metric.prefix && <span className="text-zinc-600 mr-1 font-light">{metric.prefix}</span>}
                                        <span className="bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text drop-shadow-sm">{metric.value}</span>
                                        {metric.suffix && <span className="text-[var(--primary)] ml-1 text-2xl md:text-3xl">{metric.suffix}</span>}
                                    </div>
                                    <div className="text-zinc-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase group-hover:text-zinc-300 transition-colors duration-300">
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Client Success Story (Video) */}
                <div className="w-full relative rounded-3xl border border-[var(--primary)]/20 bg-[#0A0A0A]/50 backdrop-blur-sm p-6 sm:p-8 md:p-10 mb-20 flex flex-col md:flex-row gap-8 sm:gap-12 items-center overflow-hidden group shadow-[0_0_40px_rgba(0,102,255,0.08)]" data-animate="slide-up" data-delay="1">
                    {/* Subtle glow background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    <div className="flex-1 relative z-10 w-full md:w-auto">
                        <p className="text-[var(--accent)] text-xs font-bold tracking-[0.15em] uppercase mb-4">
                            Client Success Story
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8 font-['Plus_Jakarta_Sans',sans-serif]">
                            See how we helped Turn an Idea into a <span className="text-[var(--accent)]">Real Product</span>.
                        </h2>
                        
                        <div className="flex items-center gap-4 cursor-pointer group/btn w-fit">
                            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--accent)] group-hover/btn:bg-[var(--primary)]/20 group-hover/btn:scale-110 transition-all duration-300">
                                <i className="fa-solid fa-play ml-1"></i>
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm tracking-wide">WATCH VIDEO</p>
                                <p className="text-zinc-500 text-xs">0:50 min</p>
                            </div>
                        </div>

                        {/* Product Context Note */}
                        <div className="mt-10 pt-8 border-t border-white/[0.08] relative">
                            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[var(--primary)]/50 to-transparent"></div>
                            
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center p-0.5 border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                    <img src="/igniteed.webp" alt="Ignite Ed Logo" className="w-full h-full object-contain rounded-sm" />
                                </div>
                                <span className="text-white font-bold text-[13px] tracking-wide">Ignite Ed</span>
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase border border-[var(--primary)]/30 text-[var(--accent)] bg-[var(--primary)]/10">EdTech</span>
                            </div>
                            
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-['Inter',sans-serif] mb-6">
                                A comprehensive platform designed to help students discover their strengths and fix their weaknesses, powered by seamless AI integrations.
                            </p>

                            <Link href="/case-studies/ignite-ed" className="inline-flex items-center gap-2 text-[var(--primary)] text-sm font-bold tracking-widest uppercase hover:text-[var(--accent)] transition-colors group/link">
                                Read Full Case Study <i className="fa-solid fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Cinematic Video Container (Iman Gadzhi Style) */}
                    <div className="w-full md:flex-1 relative z-10 group/video mt-6 md:mt-0">
                        {/* Ambient Background Glow */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-[2rem] blur-xl opacity-20 group-hover/video:opacity-40 transition-opacity duration-700"></div>
                        
                        {/* Premium Gradient Frame */}
                        <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform transition-transform duration-500 group-hover/video:-translate-y-1 group-hover/video:scale-[1.01]">
                            
                            {/* Video Wrapper */}
                            <div className="rounded-2xl overflow-hidden bg-black relative">
                                {/* Subtle Inner Highlight */}
                                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none z-10"></div>
                                
                                <VideoPlayer src="/review2.mp4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="flex items-center gap-6 w-full mb-16 opacity-70" data-animate="fade">
                    <div className="h-px bg-gradient-to-r from-transparent to-zinc-700 flex-1"></div>
                    <span className="text-[var(--primary)] text-xs font-bold tracking-[0.2em] uppercase">
                        What Clients Say
                    </span>
                    <div className="h-px bg-gradient-to-l from-transparent to-zinc-700 flex-1"></div>
                </div>

                {/* Testimonial Cards */}
                <div className="w-full flex flex-col gap-6 mb-24">
                    
                    {/* Ahmed Card */}
                    <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 relative group hover:border-[var(--primary)]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,102,255,0.05)]" data-animate="slide-up" data-delay="1">
                        <div className="absolute left-6 top-6 sm:left-8 sm:top-8 text-[var(--accent)] text-5xl leading-none opacity-40 font-serif font-black">&ldquo;</div>
                        
                        <div className="w-20 h-20 shrink-0 mt-8 sm:mt-0 z-10">
                            <img src="/ahmed.jpg" alt="Ahmed" className="w-full h-full object-cover rounded-full border border-white/10" />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center relative z-10 mt-2 sm:mt-0 pt-6 sm:pt-0">
                            <p className="text-zinc-300 text-[15px] sm:text-[17px] leading-relaxed mb-6 font-['Inter',sans-serif]">
                                Mr² Labs delivered our entire platform in 48 hours. The speed, clarity, and quality were beyond what we expected.
                            </p>
                            <div className="flex justify-between items-end mt-auto">
                                <div>
                                    <h4 className="text-white font-bold text-[15px]">Ahmed H. Ifthikar</h4>
                                    <p className="text-zinc-500 text-xs mt-0.5 tracking-wide">Founder of Batpeida & Co-founder of Ignite Ed</p>
                                </div>
                                <div className="flex gap-2">
                                    <a href="https://www.linkedin.com/in/ahmedh-ifthikar-b09656243/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors border border-white/[0.05]">
                                        <i className="fa-brands fa-linkedin-in text-sm"></i>
                                    </a>
                                    <a href="https://www.instagram.com/ifthikarahmedh_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white transition-all border border-white/[0.05]">
                                        <i className="fa-brands fa-instagram text-sm"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sajid Card */}
                    <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 relative group hover:border-[var(--primary)]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,102,255,0.05)]" data-animate="slide-up" data-delay="2">
                        <div className="absolute left-6 top-6 sm:left-8 sm:top-8 text-[var(--accent)] text-5xl leading-none opacity-40 font-serif font-black">&ldquo;</div>
                        
                        <div className="w-20 h-20 shrink-0 mt-8 sm:mt-0 z-10">
                            <img src="/sajid.jpg" alt="Sajid" className="w-full h-full object-cover rounded-full border border-white/10" />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center relative z-10 mt-2 sm:mt-0 pt-6 sm:pt-0">
                            <p className="text-zinc-300 text-[15px] sm:text-[17px] leading-relaxed mb-6 font-['Inter',sans-serif]">
                                They understood our vision instantly and turned it into a product that our users love. Highly recommend Mr² Labs!
                            </p>
                            <div className="flex justify-between items-end mt-auto">
                                <div>
                                    <h4 className="text-white font-bold text-[15px]">Sajid</h4>
                                    <p className="text-zinc-500 text-xs mt-0.5 tracking-wide">Entrepreneur & Founder of Ignite Ed</p>
                                </div>
                                <a href="https://www.instagram.com/msm__sajid/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white transition-all border border-white/[0.05]">
                                    <i className="fa-brands fa-instagram text-sm"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder Card */}
                    <Link href="/services#audit-form" className="bg-[#050505] border border-dashed border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center gap-5 group hover:border-[var(--primary)]/50 transition-all duration-300 hover:bg-[var(--primary)]/[0.02]" data-animate="slide-up" data-delay="3">
                        <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:border-[var(--primary)]/30">
                            <i className="fa-solid fa-plus text-zinc-600 group-hover:text-[var(--primary)] transition-colors"></i>
                        </div>
                        <div className="text-center sm:text-left">
                            <h4 className="text-zinc-400 font-bold text-[16px] group-hover:text-white transition-colors">Your Story Could Be Next</h4>
                            <p className="text-zinc-600 text-[13px] mt-1 font-['Inter',sans-serif]">Book an audit and let's build something extraordinary.</p>
                        </div>
                    </Link>

                </div>



            </div>
            
            <ScrollObserver />
        </main>
    );
}
