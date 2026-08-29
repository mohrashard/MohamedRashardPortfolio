"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "var(--font-inter), 'Inter', sans-serif" };
const fontLabel = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

export default function Footer() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isEmbedQuery = searchParams?.get('embed') === 'true';
    const [isIframe, setIsIframe] = useState(false);

    React.useEffect(() => {
        try {
            if (window.self !== window.top) {
                setIsIframe(true);
            }
        } catch (e) {
            setIsIframe(true);
        }
    }, []);

    if (pathname?.startsWith('/admin') || isEmbedQuery || isIframe) return null;
    return <FooterContent />;
}

function FooterContent() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    // ── Parallax: track this section's scroll progress ──────────
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"],   // start when top hits bottom of viewport
    });
    // Slide from 60% (hidden below cutout) → 22% (final overlap) as section enters
    const wordmarkY = useTransform(scrollYProgress, [0, 1], ["60%", "22%"]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/blueprint-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error('Failed to submit');

            setStatus('success');
            setEmail('');
        } catch (error) {
            setStatus('error');
        }
    };

return (
    <footer className="w-full bg-[#030303] pt-12 pb-6 px-4 sm:px-6 relative z-10">
        <div className="relative w-full max-w-[1400px] mx-auto rounded-[2rem] sm:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">

            {/* ── Top Negative Cutout Section ── */}
            <div ref={sectionRef} className="bg-[var(--primary)] pt-24 sm:pt-32 px-6 sm:px-12 flex flex-col justify-end relative overflow-hidden" style={{ minHeight: '30vh' }}>

                {/* Tiny top labels */}
                <div className="absolute top-8 left-8 text-[#0A0A0A]/80 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                    System Architecture
                </div>
                <div className="absolute top-8 right-8 text-[#0A0A0A]/80 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] hidden sm:block" style={fontLabel}>
                    Built for Scale
                </div>

                {/* Massive Typography - Parallax Scroll Reveal */}
                <motion.h1
                    className="text-[18vw] lg:text-[230px] font-black tracking-tighter text-[#0A0A0A] text-center w-full whitespace-nowrap select-none"
                    style={{ ...fontHeadline, lineHeight: 0.75, translateY: wordmarkY }}
                >
                    Mr² Labs
                </motion.h1>
            </div>

            {/* ── Bottom Content Section ── */}
            <div className="bg-[#0A0A0A] px-8 sm:px-16 pt-20 sm:pt-24 pb-12 relative z-10 border-t-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Left Brand/CTA Column (Span 5) */}
                    <div className="lg:col-span-5 flex flex-col">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3" style={fontHeadline}>
                            Engineered with precision.<br />
                            Built to scale.
                        </h3>
                        <p className="text-zinc-400 text-sm mb-12 max-w-sm leading-relaxed" style={fontBody}>
                            We don't just build MVPs; we engineer production-ready systems that outlast the hype.
                        </p>

                        {/* Newsletter / Action */}
                        <div className="mt-auto">
                            <label className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest block mb-3" style={fontLabel}>
                                Get the 72-Hour MVP Blueprint (PDF)
                            </label>

                            {status === 'success' ? (
                                <div className="flex items-center gap-2 max-w-sm mb-8 h-[52px] bg-green-500/10 border border-green-500/30 rounded-xl px-4 text-green-400 text-sm font-bold">
                                    <i className="fas fa-check-circle"></i> Blueprint sent to inbox!
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col max-w-sm mb-8 relative">
                                    <div className="flex items-center gap-2 h-[52px]">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="type your email"
                                            className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 h-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--primary)] transition-colors"
                                            style={fontBody}
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            aria-label="Get Blueprint PDF"
                                            className="bg-[var(--primary)] text-white px-6 h-full rounded-xl font-bold hover:bg-[#0055d4] transition-colors flex items-center justify-center shrink-0 disabled:opacity-70"
                                        >
                                            <span className="sr-only">Get Blueprint PDF</span>
                                            {status === 'loading' ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                <i className="fas fa-arrow-right"></i>
                                            )}
                                        </button>
                                    </div>
                                    {status === 'error' && (
                                        <p className="text-red-400 text-[10px] mt-2 absolute -bottom-5"><i className="fas fa-exclamation-triangle"></i> Error. Try again.</p>
                                    )}
                                </form>
                            )}
                            {/* Socials */}
                            <div className="flex gap-5">
                                <a href="https://x.com/mrr_labs" target="_blank" rel="noopener noreferrer" aria-label="X Twitter" className="text-zinc-400 hover:text-white text-lg transition-transform hover:scale-110"><span className="sr-only">X Twitter</span><i className="fab fa-twitter"></i></a>
                                <a href="https://www.linkedin.com/in/mohamedrashard" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 hover:text-[#0077b5] text-lg transition-transform hover:scale-110"><span className="sr-only">LinkedIn</span><i className="fab fa-linkedin-in"></i></a>
                                <a href="https://github.com/mohrashard/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-white text-lg transition-transform hover:scale-110"><span className="sr-only">GitHub</span><i className="fab fa-github"></i></a>
                                <a href="https://web.facebook.com/profile.php?id=61575921543570" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-zinc-400 hover:text-[#1877F2] text-lg transition-transform hover:scale-110"><span className="sr-only">Facebook</span><i className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/mrr_labs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-400 hover:text-[#E1306C] text-lg transition-transform hover:scale-110"><span className="sr-only">Instagram</span><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns (Span 7) */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-8 pt-2 lg:pl-10">

                        {/* Col 1 */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-zinc-100 font-bold text-sm mb-2" style={fontHeadline}>Navigation</h4>
                            <Link href="/" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Home</Link>
                            <Link href="/services" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Services</Link>
                            <Link href="/labs" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Labs</Link>
                            <Link href="/digital-assets" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Digital Assets</Link>
                            <Link href="/blog" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Blog</Link>
                            <Link href="/case-studies" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Case Studies</Link>
                            <Link href="/testimonials" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Testimonials</Link>
                        </div>

                        {/* Col 2 */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-zinc-100 font-bold text-sm mb-2" style={fontHeadline}>Support</h4>
                            <a href={`mailto:${process.env.NEXT_PUBLIC_REPLY_TO_EMAIL}`} className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>{process.env.NEXT_PUBLIC_REPLY_TO_EMAIL}</a>
                            <Link href="/services#audit-form" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Request Audit</Link>
                            <Link href="/privacy" className="text-zinc-400 hover:text-[var(--primary)] text-[13px] font-medium transition-colors" style={fontBody}>Privacy Policy</Link>
                        </div>

                        {/* Col 3 */}
                        <div className="flex flex-col gap-5 col-span-2 sm:col-span-1">
                            <h4 className="text-zinc-100 font-bold text-sm mb-2" style={fontHeadline}>Operations</h4>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-zinc-400 text-[13px] font-medium" style={fontBody}>Colombo, Sri Lanka</span>
                                <span className="text-zinc-400 text-[13px] font-medium" style={fontBody}>UTC +5:30</span>
                            </div>
                            <span className="text-zinc-300 text-[12px] font-bold mt-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] w-fit" style={fontBody}>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Accepting new builds
                            </span>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center md:text-left" style={fontLabel}>
                        &copy; {currentYear} Mr² Labs. Rooted in code, engineered for scale.
                    </p>
                    <p className="text-zinc-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest flex items-center gap-2" style={fontLabel}>
                        Design & Build by <span className="text-white">MRR</span>
                    </p>
                </div>

            </div>
        </div>
    </footer>
    );
}
