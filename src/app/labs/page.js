

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import ScrollObserver from '../services/ScrollObserver';
import AvailabilityBadge from '../components/AvailabilityBadge';
import {
    Terminal, ArrowLeft, BookOpen, Calculator, Target, Layers,
    TrendingDown, Lightbulb, Globe, Mail, Activity, Search,
    Crosshair, DollarSign, FileText, UserCircle, ChevronRight, Zap, TrendingUp, Github
} from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

export const metadata = {
    title: "Engineering Utilities & AI Tools | Mr² Labs",
    description: "Production-grade calculators, estimators, and AI utilities engineered by Mr² Labs. Deploy scalable architectures in 48-72 hours.",
    keywords: [
        "Mr² Labs",
        "High-Velocity Software Engineering",
        "AI Automation Tools",
        "MVP Cost Estimator",
        "Tech Stack Recommender",
        "SaaS MVP Deployment",
        "Startup Execution Utilities",
        "Codebase Rescue"
    ],
    openGraph: {
        title: "Open Source Utilities | Mr² Labs",
        description: "Free, production-grade engineering tools for founders. Calculate MVP costs, validate ideas, and audit your tech stack.",
        url: "https://mr2labs.com/labs",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Mr² Labs Engineering Tools" }],
    },
    alternates: {
        canonical: "https://www.mr2labs.com/labs",
    },
};

export default function Labs() {
    // ── Tool Data Arrays ─────────────────────────────────────────
    const leadGenTools = [
        { title: "Fundraising Readiness Scorecard", desc: "Calculate your exact venture readiness score before pitching VC or Angel investors.", icon: <TrendingUp size={20} />, href: "/labs/fundraising-readiness" },
        { title: "AI Readiness Scorer", desc: "Calculate your exact automation potential and get a custom implementation roadmap.", icon: <Target size={20} />, href: "/labs/ai-readiness" },
        { title: "Tech Stack Recommender", desc: "Input your product requirements. Get a production-grade stack blueprint instantly.", icon: <Layers size={20} />, href: "/labs/stack-picker" },
        { title: "Process Automation Calculator", desc: "Quantify exactly how much capital you burn on manual data entry per year.", icon: <Calculator size={20} />, href: "/labs/automation-calculator" },
        { title: "Startup Idea Validator", desc: "AI-driven scoring across market size, feasibility, and competition.", icon: <Lightbulb size={20} />, href: "/labs/idea-validator" },
        { title: "Runway Calculator", desc: "Calculate burn rate and see the exact capital gained by eliminating agency overhead.", icon: <TrendingDown size={20} />, href: "/labs/runway-calculator" },
    ];

    const utilityTools = [
        { title: "Startup Name & Domain Checker", desc: "Generate names and verify .com/.dev availability in real-time.", icon: <Globe size={20} />, href: "/labs/name-checker" },
        { title: "Cold Email Generator", desc: "Direct, high-converting outreach variants generated for your specific audience.", icon: <Mail size={20} />, href: "/labs/cold-email" },
        { title: "API Response Time Tester", desc: "Ping endpoints and analyze latency, uptime, and payload efficiency.", icon: <Activity size={20} />, href: "/labs/api-tester" },
        { title: "Website SEO & Performance Audit", desc: "Deep technical analysis of metadata, tags, and indexing configurations.", icon: <Search size={20} />, href: "/labs/site-audit" },
        { title: "Competitor Research Tool", desc: "Identify direct competitors, pricing models, and specific market vulnerabilities.", icon: <Crosshair size={20} />, href: "/labs/competitor-research" },
    ];

    const generatorTools = [
        { title: "SaaS Pricing Page Generator", desc: "Output highly-optimized pricing tiers and copy tailored to your product.", icon: <DollarSign size={20} />, href: "/labs/pricing-generator" },
        { title: "Tech Job Description Generator", desc: "Attract senior engineering talent with highly specific, stack-aware JDs.", icon: <FileText size={20} />, href: "/labs/jd-generator" },
        { title: "GitHub Developer Analyzer", desc: "Analyze any GitHub profile to calculate developer scores and assess tech hiring readiness.", icon: <Github size={20} />, href: "/labs/github-analyzer" },
        { title: "LinkedIn Headline Generator", desc: "Search-optimized profile headlines designed for founders and operators.", icon: <UserCircle size={20} />, href: "/labs/linkedin-headline" },
        { title: "AI Prompt Library", desc: "50+ tested prompt structures for technical founders, operators, and marketers.", icon: <Terminal size={20} />, href: "/labs/prompt-library" },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative overflow-x-hidden selection:bg-[var(--primary)]/30">

            {/* GEO & SEO Semantic Data Payload */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Mr² Labs Engineering Utilities",
                        "description": "A collection of free, open-source utilities and AI tools for startup founders and operators.",
                        "provider": {
                            "@type": "Organization",
                            "name": "Mr² Labs",
                            "founder": {
                                "@type": "Person",
                                "name": "Mohamed Rashard Rizmi"
                            },
                            "location": "Colombo, Sri Lanka"
                        },
                        "hasPart": [
                            {
                                "@type": "SoftwareApplication",
                                "name": "MVP Cost Estimator",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "AI Readiness Scorer",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Tech Stack Recommender",
                                "applicationCategory": "DeveloperApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Process Automation Calculator",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Startup Idea Validator",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Runway Calculator",
                                "applicationCategory": "FinanceApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Startup Name & Domain Checker",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Cold Email Generator",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "API Response Time Tester",
                                "applicationCategory": "DeveloperApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Website SEO & Performance Audit",
                                "applicationCategory": "DeveloperApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Competitor Research Tool",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "SaaS Pricing Page Generator",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "Tech Job Description Generator",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "LinkedIn Headline Generator",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web"
                            },
                            {
                                "@type": "SoftwareApplication",
                                "name": "AI Prompt Library",
                                "applicationCategory": "DeveloperApplication",
                                "operatingSystem": "Web"
                            }
                        ]
                    })
                }}
            />

            <ScrollObserver />
            <Navbar />

            {/* Premium Background Image */}
            <div className="fixed inset-0 z-0 hero-bg-anim pointer-events-none">
                <Image
                    src="/labs-hero-bg.png"
                    alt=""
                    fill
                    priority
                    quality={90}
                    className="object-cover object-center opacity-40"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none z-10 hero-ring-anim" />
            <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] border border-white/[0.03] border-dashed rounded-full pointer-events-none z-10 hero-ring-anim" />
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />



            <div className="max-w-7xl mx-auto relative z-10 pt-40 pb-24 px-6 md:px-12">

                {/* ── Section 1: Hero ────────────────────────────────────── */}
                <header className="mb-24 text-center flex flex-col items-center">
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 hero-item-1">
                        <AvailabilityBadge />
                        <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                        <div className="hidden sm:flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-zinc-400" style={fontLabel}>
                            <Terminal size={10} className="text-[var(--accent)]" />
                            [ ] OPEN SOURCE UTILITIES
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.05] hero-item-2" style={fontHeadline}>
                        Production-Grade Utilities for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                            Scaling Enterprises.
                        </span>
                    </h1>

                    <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed hero-item-3" style={fontBody}>
                        Open-source telemetry, system calculators, and AI infrastructure utilities engineered by Mr² Labs. Deployed to accelerate enterprise execution. Zero execution overhead. Zero sign-up required.
                    </p>
                </header>

                {/* ── Section 2: Featured Hero Tool ───────────────────────── */}
                <div className="mb-24" data-animate="slide-up">
                    <Link href="/cost-to-build" className="group block relative rounded-[2rem] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.08] hover:border-[var(--primary)]/40 hover:shadow-[0_20px_60px_rgba(0,102,255,0.15)] transition-all duration-500 overflow-hidden p-8 md:p-14">
                        {/* Hover Ray Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                    <Zap size={12} /> Priority Utility
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-50 mb-4 tracking-tight" style={fontHeadline}>MVP Cost Estimator</h2>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl" style={fontBody}>
                                    Input your raw idea. Our AI analyzes the technical requirements and outputs a complete architectural breakdown, standard agency cost comparison, and a strict 72-hour execution plan.
                                </p>
                                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-[var(--primary)] transition-colors" style={fontLabel}>
                                    <span>[ Launch Estimator ]</span>
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            <div className="hidden md:flex w-40 h-40 flex-shrink-0 rounded-full border border-white/[0.06] bg-[#050505] items-center justify-center relative shadow-inner">
                                <div className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:rotate-180 transition-transform duration-[3000ms] ease-out" />
                                <Calculator size={40} className="text-zinc-500 group-hover:text-[var(--primary)] transition-colors duration-500" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* ── Section 3: Diagnostic & Intake (Lead Gen) ───────────── */}
                <div className="mb-20">
                    <h3 className="text-xl font-extrabold text-zinc-50 mb-8 flex items-center gap-3" style={fontHeadline} data-animate="slide-up">
                        <Activity size={20} className="text-[var(--accent)]" /> System Diagnostics
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {leadGenTools.map((tool, i) => (
                            <ToolCard key={i} tool={tool} delay={String((i % 3) + 1)} />
                        ))}
                    </div>
                </div>

                {/* ── Section 4: Architecture Utilities ───────────────────── */}
                <div className="mb-20">
                    <h3 className="text-xl font-extrabold text-zinc-50 mb-8 flex items-center gap-3" style={fontHeadline} data-animate="slide-up">
                        <Terminal size={20} className="text-[var(--primary)]" /> Architecture Utilities
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {utilityTools.map((tool, i) => (
                            <ToolCard key={i} tool={tool} delay={String((i % 3) + 1)} />
                        ))}
                    </div>
                </div>

                {/* ── Section 5: Generators & Assets ──────────────────────── */}
                <div className="mb-24">
                    <h3 className="text-xl font-extrabold text-zinc-50 mb-8 flex items-center gap-3" style={fontHeadline} data-animate="slide-up">
                        <Layers size={20} className="text-zinc-300" /> Generators & Assets
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {generatorTools.map((tool, i) => (
                            <ToolCard key={i} tool={tool} delay={String((i % 3) + 1)} />
                        ))}
                    </div>
                </div>

                {/* ── Section 6: Final Execution CTA ──────────────────────── */}
                <div className="relative rounded-[2rem] bg-[#0A0A0A]/80 border border-white/[0.08] p-10 md:p-16 text-center shadow-2xl overflow-hidden" data-animate="slide-up">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary)]/5 pointer-events-none" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-50 mb-4 tracking-tight" style={fontHeadline} data-animate="slide-up" data-delay="1">
                        Architecture Verified.
                    </h2>
                    <p className="text-zinc-400 text-sm mb-10 max-w-lg mx-auto" style={fontBody} data-animate="slide-up" data-delay="2">
                        Transition from theoretical modeling to production execution. Mr² Labs deploys deterministic, enterprise-ready infrastructure in 48-72 hours.
                    </p>
                    <div data-animate="slide-up" data-delay="3">
                        <Link href="/services#audit-form" className="inline-flex items-center gap-3 px-8 py-4 rounded bg-[var(--primary)] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:-translate-y-0.5" style={fontLabel}>
                            <span> Request Technical Audit </span>
                            <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

// ── Reusable Tool Card Component ──────────────────────────────────────────
function ToolCard({ tool, delay = "1" }) {
    return (
        <Link
            href={tool.href}
            className="group relative flex flex-col p-7 rounded-2xl bg-[#0A0A0A]/80 backdrop-blur-md border border-white/[0.04] hover:border-[var(--primary)]/30 hover:bg-gradient-to-br hover:from-white/[0.04] hover:to-transparent transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(0,102,255,0.15)] h-full"
            data-animate="fade-pop"
            data-delay={delay}
        >

            {/* Top accent line that fades in on hover */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Ambient radial glow on hover */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 w-12 h-12 mb-6 rounded-xl border border-white/[0.08] bg-[#050505] flex items-center justify-center text-zinc-500 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/10 transition-all duration-500 shadow-inner">
                {tool.icon}
            </div>

            <h4 className="relative z-10 text-base font-extrabold text-zinc-100 mb-3 group-hover:text-white tracking-tight transition-colors" style={fontHeadline}>
                {tool.title}
            </h4>

            <p className="relative z-10 text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8 flex-grow group-hover:text-zinc-300 transition-colors" style={fontBody}>
                {tool.desc}
            </p>

            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.04] group-hover:border-[var(--primary)]/20 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-[var(--primary)] transition-colors" style={fontLabel}>
                    <span>Execute Tool</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-all duration-500">
                    <ChevronRight size={12} className="text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-0.5" />
                </div>
            </div>
        </Link>
    );
}