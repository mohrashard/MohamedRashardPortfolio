import Link from 'next/link';
import Image from 'next/image';
import AuditForm from './AuditForm';
import SocialProofTicker from '../components/SocialProofTicker';
import AvailabilityBadge from '../components/AvailabilityBadge';
import Navbar from '../components/Navbar';
import { Terminal, Zap, Cpu, ShieldCheck, Layers, Clock, Server, ShieldOff, SearchCode, FileCode2, PlaySquare, ChevronRight, Workflow, LayoutTemplate, CheckCircle2, Smartphone, Network, Database, Code2, AlertCircle, Activity, Mail, MapPin, Globe } from 'lucide-react';
import DifferenceSection from './DifferenceSection';
import PipelineSection from './PipelineSection';
import FaqSection from './FaqSection';
import ScrollObserver from './ScrollObserver';
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

// ============================================================
// SEO & GEO OPTIMIZED METADATA
// ============================================================
export const metadata = {
    title: "Mr² Labs | High-Velocity Software Engineering & AI Deployment",
    description: "Mr² Labs is an elite software engineering firm. We architect, secure, and deploy production-grade AI applications and SaaS MVPs in 48-72 hour sprints.",
    keywords: [
        "High-Velocity Software Engineering", "SaaS MVP Deployment", "Custom AI Architecture",
        "Next.js 15 Infrastructure", "Codebase Rescue", "Production-grade",
        "Enterprise-ready", "Fixed-scope engineering", "Database-free architecture",
        "Asynchronous deployment", "White-label engineering", "Mr² Labs"
    ],
    openGraph: {
        title: "Mr² Labs | High-Velocity Software Engineering",
        description: "We architect and ship production-grade MVPs for funded founders in 48-72 hours.",
        url: "https://mr2labs.com/services",
        type: "website",
        images: [{ url: "/mr-squared-logo.png", width: 1200, height: 630, alt: "Mr² Labs — High-Velocity Software Engineering" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Mr² Labs | High-Velocity Software Engineering",
        description: "Production-grade MVPs shipped in 48-72 hours. Elite AI architecture.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: { canonical: "https://www.mr2labs.com/services" },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

// ============================================================
// SERVICES PAGE — Viewer-Arresting Redesign
// ============================================================
export default function Services() {

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Mr² Labs",
            "image": "https://mr2labs.com/mr-squared-logo.png",
            "url": "https://mr2labs.com/services",
            "email": process.env.NEXT_PUBLIC_REPLY_TO_EMAIL,
            "address": { "@type": "PostalAddress", "addressLocality": "Colombo", "addressCountry": "LK" },
            "priceRange": "$$$",
            "description": "An elite software engineering and digital systems firm specializing in rapid 48 to 72-hour MVP deployment, AI architecture, and codebase rescue.",
            "founder": { "@type": "Person", "name": "Mohamed Rashard Rizmi" },
            "areaServed": ["Worldwide"],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "High-Velocity Engineering Deployments",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS MVP Deployment" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom AI Architecture" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Codebase Rescue" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Next.js 15 Infrastructure" } }
                ]
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "How long does it take to deploy an MVP?", "acceptedAnswer": { "@type": "Answer", "text": "We deploy production-grade MVPs in 48 to 72 hours. Production scale is achieved in weeks. Velocity is built into our architecture." } },
                { "@type": "Question", "name": "How much does it cost to engineer a custom AI architecture?", "acceptedAnswer": { "@type": "Answer", "text": "Our firm operates strictly on fixed-price sprints with zero scope creep. Initiate an audit, and our engineers will provide a deterministic proposal." } },
                { "@type": "Question", "name": "Do you deploy for international clients?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Mr² Labs serves startups and enterprises globally, ensuring highly asynchronous, zero-friction engineering partnerships." } },
                { "@type": "Question", "name": "What is the System Architecture Audit?", "acceptedAnswer": { "@type": "Answer", "text": "Our lead engineers analyze your technical debt, identify automation leverage points, and architect a scalable infrastructure path. Completely transparent, deterministic analysis." } }
            ]
        }
    ];

    const caseStudies = [
        {
            title: "Ignite Ed",
            client: "Prominent Creator // EdTech Startup",
            problem: "Required a scalable educational ecosystem capable of natively serving students in Sinhala, Tamil, and English without extended development cycles.",
            built: "Architected a production-ready admin panel in 48 hours and deployed a React Native mobile application utilizing the Gemini API for native trilingual AI processing.",
            result: "Full trilingual ecosystem engineered and production-ready for immediate launch."
        },
        {
            title: "BizFinder AI",
            client: "B2B SaaS Product // Design Agencies",
            problem: "Design agencies were burning hundreds of billable hours manually discovering, qualifying, and managing B2B prospect outreach.",
            built: "Engineered a high-speed, database-free automation pipeline utilizing the Gemini API to autonomously discover and route high-intent decision-makers.",
            result: "Eliminated manual prospecting entirely, replacing it with a zero-touch AI workflow."
        },
        {
            title: "GrabMe",
            client: "Proprietary Platform // Sri Lankan Market",
            problem: "The local market lacked a centralized, high-velocity digital marketplace to reliably connect buyers with vetted home service providers.",
            built: "Architected and deployed Sri Lanka's premiere local home services marketplace (PWA) from raw concept to a live, secured infrastructure.",
            result: "Production MVP deployed and validated within a single 48-hour development sprint."
        },
        {
            title: "Sonic Portal",
            client: "Open Source // Local Infrastructure",
            problem: "High-fidelity TTS and voice enhancement workflows were bottlenecked by expensive, high-latency cloud SaaS subscriptions.",
            built: "Engineered a custom, offline desktop architecture to process advanced AI audio and content creation workflows entirely on local hardware.",
            result: "Achieved zero-latency processing while eliminating external cloud dependencies."
        },
        {
            title: "Bypass",
            client: "Open Source // Content Automation",
            problem: "Video editing for marketing campaigns required tedious, repetitive manual labor that bottlenecked product distribution.",
            built: "Built a fully automated, local AI video editing software pipeline specifically optimized for high-volume content creation and marketing.",
            result: "Scaled marketing output exponentially with zero recurring SaaS costs."
        },
        {
            title: "Alt Cut",
            client: "Proprietary Product // In Development",
            problem: "Video editors are trapped using legacy, subscription-heavy timeline editors that lack context-aware AI integration.",
            built: "Currently engineering an AI-native video editing platform designed to act as the 'Cursor IDE' for video editors.",
            result: "Active alpha engineering phase. Replacing legacy CapCut workflows."
        }
    ];

    const colorMap = {
        blue: { border: "hover:border-[var(--primary)]/40 hover:shadow-blue-900/20", icon: "bg-[var(--primary)]/10 text-blue-400 border-[var(--primary)]/10", tag: "bg-[var(--primary)]/10 text-blue-300 border-[var(--primary)]/20", badge: "bg-[var(--primary)]/20 text-blue-300" },
        purple: { border: "hover:border-purple-500/40 hover:shadow-purple-900/20", icon: "bg-purple-500/10 text-purple-400 border-purple-500/10", tag: "bg-purple-500/10 text-purple-300 border-purple-500/20", badge: "bg-purple-500/20 text-purple-300" },
        cyan: { border: "hover:border-[var(--accent)]/40 hover:shadow-cyan-900/20", icon: "bg-[var(--accent)]/10 text-cyan-400 border-[var(--accent)]/10", tag: "bg-[var(--accent)]/10 text-cyan-300 border-[var(--accent)]/20", badge: "bg-[var(--accent)]/20 text-cyan-300" },
        emerald: { border: "hover:border-emerald-500/40 hover:shadow-emerald-900/20", icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10", tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", badge: "bg-emerald-500/20 text-emerald-300" },
    };

    const pipeline = [
        {
            step: "01",
            title: "Architecture Audit",
            desc: "We analyze your business bottlenecks and map out a high-leverage software or AI architecture. No sales pitches, just technical feasibility.",
            icon: <Terminal size={18} />,
            color: "text-zinc-400 border-white/[0.08] bg-white/[0.02]"
        },
        {
            step: "02",
            title: "Scope Lock & Infrastructure Spin-Up",
            desc: "You receive a fixed-scope blueprint with zero hidden overhead. Once approved, cloud environments, databases, and repositories are initialized immediately.",
            icon: <FileCode2 size={18} />,
            color: "text-zinc-400 border-white/[0.08] bg-white/[0.02]"
        },
        {
            step: "03",
            title: "48-Hour Production Deployment",
            desc: "We bypass corporate lag. Core business logic, UI, and database schemas are engineered and deployed to a live, secure staging URL within 48 to 72 hours.",
            icon: <Zap size={18} />,
            color: "text-[var(--accent)] border-[var(--accent)]/30 bg-[var(--accent)]/10 shadow-[0_0_15px_rgba(56,189,248,0.15)]",
            glow: true
        },
        {
            step: "04",
            title: "Scale & AI Integration",
            desc: "We scale the MVP through rapid, transparent sprints-integrating complex AI workflows, edge functions, and third-party APIs.",
            icon: <Network size={18} />,
            color: "text-zinc-400 border-white/[0.08] bg-white/[0.02]"
        },
        {
            step: "05",
            title: "Handoff & Infrastructure Ops",
            desc: "Production environments go live. We provide clean, strongly-typed code handoffs and continuous telemetry monitoring to ensure zero-latency performance.",
            icon: <ShieldCheck size={18} />,
            color: "text-[var(--primary)] border-[var(--primary)]/30 bg-[var(--primary)]/10"
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#0066FF]/30 overflow-x-hidden">



            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Mr² Labs",
                        "description": "An elite software engineering and digital systems firm specializing in rapid 48 to 72-hour MVP deployment, AI architecture, and codebase rescue.",
                        "url": "https://mr2labs.com/services",
                        "telephone": "",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Colombo",
                            "addressLocality": "Colombo",
                            "addressRegion": "Western Province",
                            "addressCountry": "LK"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "6.9271",
                            "longitude": "79.8612"
                        },
                        "priceRange": "$$$",
                        "openingHours": "Mo-Fr 09:00-18:00",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "High-Velocity Engineering Deployments",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS MVP Deployment" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom AI Architecture" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Codebase Rescue" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Next.js 15 Infrastructure" } }
                            ]
                        },
                        "sameAs": [
                            "https://github.com/mohrashard/",
                            "https://www.linkedin.com/in/mohamedrashard"
                        ]
                    })
                }}
            />
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            {/* ============================================================
                AMBIENT BACKGROUND (New Brand)
            ============================================================ */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
                {/* Subtle blueprint grid */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_40%,transparent_100%)]" />
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[var(--primary)] rounded-full blur-[120px] opacity-[0.05] transform-gpu" />
                <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[100px] opacity-[0.05] transform-gpu" />
            </div>

            <Navbar />

            <main className="relative z-10">
                <ScrollObserver />
                {/* ============================================================
                    PREMIUM HERO SECTION
                ============================================================ */}
                <section className="relative w-full min-h-[95vh] bg-[#050505] overflow-hidden flex flex-col justify-center pt-32 pb-32 border-b border-white/[0.04]">
                    {/* Premium Background Image */}
                    <div className="absolute inset-0 z-0 hero-bg-anim">
                        <Image
                            src="/services-hero-bg.png"
                            alt=""
                            fill
                            priority
                            quality={90}
                            className="object-cover object-center opacity-70"
                            aria-hidden="true"
                        />
                        {/* Gradient to darken top so Navbar stays readable */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/20 to-[#050505]/90" />
                        {/* Darken left/right edges */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />
                        {/* Dampen the bright cyan top-left corner */}
                        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[#050505]/70 [mask-image:radial-gradient(ellipse_80%_80%_at_0%_0%,black_40%,transparent_100%)]" />
                    </div>

                    {/* Concentric Ring Accents */}
                    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none z-10 hero-ring-anim" />
                    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-white/[0.03] border-dashed rounded-full pointer-events-none z-10 hero-ring-anim" />

                    {/* Core Content */}
                    <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 text-center flex flex-col items-center space-y-7 mt-8">

                        {/* Tactical Status Pill */}
                        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 hero-item-1">
                            <AvailabilityBadge />
                            <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                            <div className="hidden sm:flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-zinc-400" style={fontLabel}>
                                <i className="fas fa-terminal text-[var(--accent)]" /> Enterprise Scale. Startup Velocity.
                            </div>
                        </div>

                        {/* Main Command Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-zinc-50 tracking-tight leading-[1.1] sm:leading-[1.02] max-w-4xl hero-item-2" style={fontHeadline}>
                            High-Velocity AI & <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-zinc-50">
                                Software Infrastructure.
                            </span>
                        </h1>

                        {/* 3 Second Hook Subtitle */}
                        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-300 max-w-3xl hero-item-3" style={fontBody}>
                            <span className="text-[var(--primary)] font-semibold">Stop paying for slow agency bloat.</span> Get production-grade SaaS, MVPs, and custom AI workflows engineered and live in 48 to 72 hours.
                        </h2>

                        <p className="text-zinc-400 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-light opacity-90 mx-auto px-2 sm:px-0 hero-item-4" style={fontBody}>
                            We architect scalable systems for founders and technical teams. No endless discovery phases, no Jira boards, just direct execution and live deployments.
                        </p>

                        {/* Primary Action Row */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 pt-2 hero-item-5">
                            <a
                                href="#audit-form"
                                className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[#0055d4] text-white text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(0,102,255,0.5)] hover:shadow-[0_0_60px_rgba(0,102,255,0.7)] hover:-translate-y-0.5"
                                style={fontLabel}
                            >
                                <span>Initiate System Audit</span>
                                <i className="fas fa-arrow-right" />
                            </a>
                            <a
                                href={`mailto:${process.env.NEXT_PUBLIC_REPLY_TO_EMAIL}`}
                                className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:from-white/[0.08] hover:to-white/[0.02] text-zinc-300 hover:text-white text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full backdrop-blur-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                                style={fontLabel}
                            >
                                <i className="fas fa-terminal text-[var(--accent)]" />
                                <span>Request Deployment</span>
                            </a>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
                    {/* Premium Connected Tech Nodes - Replaces old boxes */}
                    <div className="relative z-20 -mt-24 mb-32 max-w-4xl mx-auto px-4 sm:px-8">

                        {/* Connecting Data Line */}
                        <div className="hidden md:block absolute top-[3rem] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent opacity-60 z-0" />
                        <div className="hidden md:block absolute top-[3rem] left-[50%] -translate-x-1/2 w-32 h-[1px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-80 z-0" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
                            {[
                                {
                                    value: "48-72h", label: "MVP Deployment",
                                    icon: <Zap size={24} />,
                                    ringColor: "border-[var(--accent)]/30", hoverRing: "group-hover:border-[var(--accent)]/60",
                                    glowColor: "shadow-[0_0_25px_rgba(56,189,248,0.15)]", iconColor: "text-[var(--accent)]"
                                },
                                {
                                    value: "Weeks", label: "Production Scale",
                                    icon: <Server size={24} />,
                                    ringColor: "border-[var(--primary)]/30", hoverRing: "group-hover:border-[var(--primary)]/60",
                                    glowColor: "shadow-[0_0_25px_rgba(0,102,255,0.15)]", iconColor: "text-[var(--primary)]"
                                },
                                {
                                    value: "10+", label: "Systems Live",
                                    icon: <Cpu size={24} />,
                                    ringColor: "border-zinc-100/20", hoverRing: "group-hover:border-zinc-100/50",
                                    glowColor: "shadow-[0_0_25px_rgba(255,255,255,0.1)]", iconColor: "text-zinc-100"
                                },
                                {
                                    value: "Zero", label: "Agency Overhead",
                                    icon: <ShieldOff size={24} />,
                                    ringColor: "border-[var(--accent)]/30", hoverRing: "group-hover:border-[var(--accent)]/60",
                                    glowColor: "shadow-[0_0_25px_rgba(56,189,248,0.15)]", iconColor: "text-[var(--accent)]"
                                },
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center group cursor-default" data-animate="fade-pop" data-delay={String(i + 1)}>
                                    {/* Tech Ring Node */}
                                    <div className={`relative w-24 h-24 mb-6 rounded-full flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl border ${s.ringColor} ${s.hoverRing} ${s.glowColor} group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-all duration-500 z-10 overflow-hidden`}>

                                        {/* Inner glow base */}
                                        <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.05] transition-colors duration-500" />

                                        {/* Icon */}
                                        <div className={`${s.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                                            {s.icon}
                                        </div>

                                        {/* Futuristic rotating dashed ring */}
                                        <div className="absolute inset-1.5 rounded-full border border-dashed border-white/10 group-hover:rotate-180 group-hover:border-white/30 transition-all duration-[1500ms] ease-out" />
                                    </div>

                                    {/* Stats */}
                                    <div className={`text-3xl font-extrabold text-zinc-50 mb-1.5 drop-shadow-md tracking-tight`} style={fontHeadline}>
                                        {s.value}
                                    </div>
                                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-24">
                        <SocialProofTicker />
                    </div>

                    {/* ============================================================
                    WHAT MAKES ME DIFFERENT — animated client component
                ============================================================ */}
                    <DifferenceSection />



                    {/* ============================================================
                    FREE AI AUDIT BANNER
                ============================================================ */}
                    <section className="mb-24 relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-3xl p-8 sm:p-12 md:p-16 shadow-[0_32px_80px_rgba(0,0,0,0.6)] group" data-animate="slide-up">

                        {/* Premium Ambient Lighting */}
                        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-[var(--primary)]/20 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-screen transition-opacity duration-1000 group-hover:opacity-100 opacity-50" />
                        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-[var(--accent)]/15 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-50" />

                        {/* Subtle Grid Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

                        {/* Glowing orb for CTA focus */}
                        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--primary)]/10 rounded-full blur-[80px] pointer-events-none transition-transform duration-[2000ms] group-hover:scale-110" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                            {/* Left: The Value Proposition */}
                            <div className="flex-1 w-full max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.03] text-zinc-300 text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm backdrop-blur-md" style={fontLabel}>
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                                    </span>
                                    Intake // Diagnostics
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-50 mb-6 tracking-tight leading-[1.05]" style={fontHeadline}>
                                    Request a Technical <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[var(--primary)] to-[var(--accent)]">
                                        Architecture Audit.
                                    </span>
                                </h2>

                                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10" style={fontBody}>
                                    We analyze your operations and deliver a <strong className="text-zinc-200 font-medium">custom architectural breakdown</strong> detailing exactly where modern software and AI can eliminate manual overhead. No pitches. Just a direct blueprint.
                                </p>

                                {/* Diagnostic Delivery Specs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm text-zinc-300">
                                    {[
                                        { icon: <SearchCode size={18} />, text: "Context-aware system analysis" },
                                        { icon: <Clock size={18} />, text: "Blueprint delivered in 48 hours" },
                                        { icon: <FileCode2 size={18} />, text: "Zero obligation to build" },
                                        { icon: <PlaySquare size={18} />, text: "Direct Loom video walkthrough" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group/item cursor-default" style={fontBody}>
                                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[var(--accent)] group-hover/item:scale-110 group-hover/item:bg-white/[0.08] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                                {item.icon}
                                            </span>
                                            <span className="font-medium text-zinc-300 group-hover/item:text-zinc-100 transition-colors duration-300">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: The Execution Trigger */}
                            <div className="flex-shrink-0 w-full lg:w-auto relative group/btn cursor-pointer">
                                {/* Animated rotating border glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] rounded-3xl blur opacity-30 group-hover/btn:opacity-60 transition duration-1000 group-hover/btn:duration-200 animate-tilt"></div>

                                <div className="relative p-2 rounded-[1.5rem] bg-gradient-to-b from-white/[0.12] to-white/[0.02] backdrop-blur-xl border border-white/[0.05]">
                                    <div className="bg-[#050505]/90 rounded-[1.2rem] p-8 md:p-10 flex flex-col items-center w-full lg:w-[360px] shadow-inner">

                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 border border-[var(--primary)]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,102,255,0.2)]">
                                            <Terminal size={28} className="text-[var(--accent)]" />
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 tracking-wide" style={fontHeadline}>System Audit</h3>
                                        <p className="text-zinc-400 text-center text-sm mb-8" style={fontBody}>Complete the technical brief to initiate diagnostic sweep.</p>

                                        <a
                                            href="#audit-form"
                                            className="relative flex items-center justify-center gap-3 w-full px-8 py-4.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-blue-600 text-zinc-50 font-bold text-sm tracking-[0.15em] uppercase hover:from-blue-500 hover:to-[var(--primary)] transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.4)] hover:shadow-[0_0_60px_rgba(0,102,255,0.6)] overflow-hidden"
                                            style={fontLabel}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Initiate Audit
                                                <ChevronRight size={18} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                                            </span>
                                            {/* Shimmer effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                                        </a>

                                        <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest" style={fontLabel}>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* ============================================================
                    SERVICES — AI-first, full grid
                ============================================================ */}
                    <section className="mb-32 relative z-10 px-4 sm:px-6 md:px-0">
                        <div className="max-w-7xl mx-auto">

                            {/* Section Header */}
                            <div className="text-center mb-20 flex flex-col items-center" data-animate="slide-up">
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg border border-white/[0.08] bg-gradient-to-r from-white/[0.05] to-transparent text-zinc-400 text-[10px] font-bold uppercase tracking-[0.25em]" style={fontLabel}>
                                    <Terminal size={14} className="text-[var(--primary)]" />
                                    <span>[ ] Core Capabilities</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-50 mb-6 tracking-tight leading-[1.05]" style={fontHeadline}>
                                    Engineered around <br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[var(--primary)] to-[var(--accent)]">
                                        Production Outcomes.
                                    </span>
                                </h2>

                                <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-[1.1rem] leading-relaxed" style={fontBody}>
                                    We don't sell bloated discovery phases or trendy buzzwords. We architect high-velocity software and AI systems designed to solve exact business bottlenecks.
                                </p>
                            </div>

                            {/* Bento Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                                {/* 01. AI & AUTOMATION (Full Width Hero Card) */}
                                <div className="group relative rounded-[2.5rem] bg-gradient-to-b from-[#0A0A0A]/90 to-[#050505]/90 backdrop-blur-3xl border border-white/[0.08] p-8 md:p-14 overflow-hidden transition-all duration-700 hover:border-[var(--accent)]/30 hover:shadow-[0_20px_80px_rgba(56,189,248,0.15)] md:col-span-2" data-animate="slide-up" data-delay="1">

                                    {/* Ambient Glows */}
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-[2s] group-hover:scale-125 mix-blend-screen" />
                                    <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

                                    {/* Background Tech Accent */}
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-1000 pointer-events-none translate-x-1/4 -translate-y-1/4 group-hover:rotate-12">
                                        <Cpu size={400} className="text-[var(--accent)]" />
                                    </div>

                                    <div className="absolute top-8 right-8 px-4 py-2 rounded-lg text-[10px] bg-white/[0.03] border border-white/[0.08] text-zinc-300 font-bold uppercase tracking-[0.2em] flex items-center gap-2 backdrop-blur-md" style={fontLabel}>
                                        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]" />
                                        Primary Focus
                                    </div>

                                    <div className="relative z-10 flex flex-col md:flex-row gap-10 lg:gap-20">
                                        <div className="flex-1">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--primary)]/5 flex items-center justify-center text-[var(--accent)] mb-8 border border-[var(--accent)]/30 shadow-[inset_0_0_30px_rgba(56,189,248,0.15)] group-hover:scale-110 transition-transform duration-500">
                                                <Workflow size={28} />
                                            </div>

                                            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-50 mb-5 tracking-tight" style={fontHeadline}>
                                                AI-Native Infrastructure
                                            </h2>

                                            <p className="text-zinc-400 leading-relaxed mb-10 text-base sm:text-lg max-w-3xl" style={fontBody}>
                                                Stop paying humans for repetitive tasks. We engineer local models, custom RAG pipelines, and autonomous workflows using Gemini to process data, route leads, and execute logic instantly.
                                            </p>

                                            <div className="grid sm:grid-cols-2 gap-5 mb-10">
                                                {[
                                                    { title: "Custom RAG Pipelines", desc: "AI that queries your proprietary data securely without leaks." },
                                                    { title: "Autonomous Prospecting", desc: "Zero-touch lead qualification and routing systems." },
                                                    { title: "Local Model Deployment", desc: "Zero-latency AI running directly on your own hardware." },
                                                    { title: "Automated Workflows", desc: "Replacing massive SaaS stacks with intelligent scripts." },
                                                ].map((item, i) => (
                                                    <div key={i} className="group/item p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300">
                                                        <div className="text-zinc-100 font-bold text-sm mb-2 group-hover/item:text-[var(--accent)] transition-colors" style={fontHeadline}>{item.title}</div>
                                                        <div className="text-zinc-500 text-xs leading-relaxed group-hover/item:text-zinc-400 transition-colors" style={fontBody}>{item.desc}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.15em]" style={fontLabel}>
                                                {["Python", "Gemini API", "Local LLMs", "LangChain", "Vector DBs"].map((tag, i) => (
                                                    <span key={i} className="px-4 py-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] shadow-[0_0_15px_rgba(56,189,248,0.1)]">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 02. SAAS & WEB DEV */}
                                <div className="group relative rounded-[2.5rem] bg-gradient-to-b from-[#0A0A0A]/90 to-[#050505]/90 backdrop-blur-3xl border border-white/[0.08] p-8 md:p-12 overflow-hidden transition-all duration-700 hover:border-[var(--primary)]/40 hover:shadow-[0_20px_80px_rgba(0,102,255,0.15)] flex flex-col" data-animate="slide-left" data-delay="1">
                                    <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[var(--primary)]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[var(--primary)]/20 transition-colors duration-1000" />
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-1000 pointer-events-none translate-x-1/4 -translate-y-1/4 group-hover:-rotate-12">
                                        <LayoutTemplate size={250} className="text-[var(--primary)]" />
                                    </div>

                                    <div className="relative z-10 flex flex-col flex-grow">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-transparent flex items-center justify-center text-[var(--primary)] mb-8 border border-[var(--primary)]/30 shadow-[inset_0_0_30px_rgba(0,102,255,0.15)] group-hover:scale-110 transition-transform duration-500">
                                            <Server size={26} />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-50 mb-4 tracking-tight" style={fontHeadline}>
                                            High-Velocity SaaS
                                        </h2>
                                        <p className="text-zinc-400 leading-relaxed mb-8 text-sm sm:text-base" style={fontBody}>
                                            Taking raw ideas to live URLs in 48-72 hours. We architect highly secure, edge-optimized Next.js and Supabase platforms built to handle real traffic immediately.
                                        </p>

                                        <ul className="mb-10 space-y-4 flex-grow">
                                            {['B2B SaaS Architectures', 'Two-Sided Marketplaces', 'Admin & Telemetry Dashboards', 'Progressive Web Apps (PWA)'].map((item, i) => (
                                                <li key={i} className="flex items-start gap-4 text-sm text-zinc-300 font-medium group/list" style={fontBody}>
                                                    <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.05] border border-white/[0.1] group-hover/list:border-[var(--primary)] group-hover/list:bg-[var(--primary)]/20 transition-colors">
                                                        <CheckCircle2 size={12} className="text-[var(--primary)]" />
                                                    </span>
                                                    <span className="group-hover/list:text-zinc-100 transition-colors">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2.5 text-[10px] font-bold uppercase tracking-[0.15em] mt-auto" style={fontLabel}>
                                            {["Next.js 15", "Supabase", "Tailwind"].map((t, i) => (
                                                <span key={i} className="px-4 py-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] shadow-[0_0_15px_rgba(0,102,255,0.1)]">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 03. CROSS-PLATFORM MOBILE */}
                                <div className="group relative rounded-[2.5rem] bg-gradient-to-b from-[#0A0A0A]/90 to-[#050505]/90 backdrop-blur-3xl border border-white/[0.08] p-8 md:p-12 overflow-hidden transition-all duration-700 hover:border-zinc-400/30 hover:shadow-[0_20px_80px_rgba(255,255,255,0.05)] flex flex-col" data-animate="slide-right" data-delay="2">
                                    <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000 pointer-events-none translate-x-1/4 -translate-y-1/4 group-hover:rotate-12">
                                        <Smartphone size={250} className="text-zinc-100" />
                                    </div>

                                    <div className="relative z-10 flex flex-col flex-grow">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent flex items-center justify-center text-zinc-100 mb-8 border border-white/[0.15] shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                                            <Smartphone size={26} />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-50 mb-4 tracking-tight" style={fontHeadline}>
                                            Mobile Ecosystems
                                        </h2>
                                        <p className="text-zinc-400 leading-relaxed mb-8 text-sm sm:text-base" style={fontBody}>
                                            Cross-platform mobile applications engineered for both iOS & Android from a single, robust React Native codebase. Native performance without the double headcount.
                                        </p>

                                        <ul className="mb-10 space-y-4 flex-grow">
                                            {['iOS & Android Deployment', 'Offline-First Architectures', 'Complex State Management', 'Hardware / AI Integration'].map((item, i) => (
                                                <li key={i} className="flex items-start gap-4 text-sm text-zinc-300 font-medium group/list" style={fontBody}>
                                                    <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.05] border border-white/[0.1] group-hover/list:border-zinc-400 group-hover/list:bg-white/10 transition-colors">
                                                        <CheckCircle2 size={12} className="text-zinc-400" />
                                                    </span>
                                                    <span className="group-hover/list:text-zinc-100 transition-colors">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2.5 text-[10px] font-bold uppercase tracking-[0.15em] mt-auto" style={fontLabel}>
                                            {["React Native", "Expo", "PostgreSQL"].map((t, i) => (
                                                <span key={i} className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-zinc-300">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 04. STRATEGY & ARCHITECTURE (Full Width Base Card) */}
                                <div className="group relative rounded-[2.5rem] bg-gradient-to-r from-[#0A0A0A] via-[#0D0D0D] to-[#050505] border border-white/[0.08] p-8 md:p-12 overflow-hidden transition-all duration-700 hover:border-white/[0.2] hover:shadow-[0_20px_80px_rgba(255,255,255,0.05)] md:col-span-2 flex flex-col md:flex-row items-center gap-10 justify-between" data-animate="slide-up" data-delay="2">

                                    {/* Scanline effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />

                                    <div className="flex-1 relative z-10">
                                        <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-lg bg-white/[0.03] border border-white/[0.1] text-zinc-300 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md" style={fontLabel}>
                                            <Network size={14} className="text-zinc-400" />
                                            <span>Technical Consulting</span>
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-zinc-50 mb-4 tracking-tight" style={fontHeadline}>
                                            System Architecture & Audits
                                        </h2>
                                        <p className="text-zinc-400 text-base max-w-2xl leading-relaxed" style={fontBody}>
                                            We validate technical feasibility, select the optimal stack, and engineer a ruthless, zero-bloat deployment roadmap before you burn capital on the wrong developers.
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0 w-full md:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                                        {[
                                            { icon: <Database size={18} />, label: "Stack Selection" },
                                            { icon: <Code2 size={18} />, label: "Code Audits" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 cursor-default group/audit">
                                                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-400 group-hover/audit:text-white group-hover/audit:scale-110 transition-all duration-300">
                                                    {item.icon}
                                                </div>
                                                <span className="text-xs font-bold text-zinc-300 group-hover/audit:text-white uppercase tracking-[0.15em] transition-colors" style={fontLabel}>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="mb-32 relative z-10 px-4 sm:px-6 md:px-0">
                        <div className="max-w-6xl mx-auto">

                            {/* Section Header — left-aligned, editorial */}
                            <div className="mb-16 border-b border-white/[0.06] pb-12" data-animate="slide-up">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                    <Terminal size={14} className="text-[var(--primary)]" />
                                    <span>[ ] Deployment Log — {new Date().getFullYear()}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-[1.05] max-w-lg" style={fontHeadline}>
                                        Systems We've <br />Shipped to Production.
                                    </h2>
                                    <p className="text-zinc-500 text-sm max-w-xs leading-relaxed sm:text-right" style={fontBody}>
                                        Every engagement below moved from brief to deployed infrastructure in under 72 hours.
                                    </p>
                                </div>
                            </div>

                            {/* Case Study Table — full-width rows */}
                            <div className="divide-y divide-white/[0.04]">
                                {caseStudies.map((study, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 lg:gap-12 py-10 rounded-2xl px-6 -mx-6 transition-all duration-500 overflow-hidden border border-transparent hover:border-white/[0.04] cursor-default"
                                        data-animate="slide-up"
                                        data-delay={String((idx % 3) + 1)}
                                    >
                                        {/* Premium Ambient Hover Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                                        {/* Col 1: Index + Project Name */}
                                        <div className="relative z-10 flex lg:flex-col gap-5 lg:gap-3">
                                            <span className="text-[11px] font-black text-zinc-600 group-hover:text-[var(--primary)] tracking-[0.2em] tabular-nums transition-colors duration-300" style={fontLabel}>
                                                {String(idx + 1).padStart(2, '0')} //
                                            </span>
                                            <div>
                                                <h3 className="text-xl font-extrabold text-zinc-100 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300" style={fontHeadline}>
                                                    {study.title}
                                                </h3>
                                                <p className="text-[var(--accent)] text-[11px] mt-2 leading-snug font-bold uppercase tracking-widest" style={fontLabel}>
                                                    {study.client}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Col 2: Brief / Built / Outcome stacked */}
                                        <div className="relative z-10 space-y-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500" style={fontLabel}>
                                                        The Bottleneck
                                                    </div>
                                                </div>
                                                <p className="text-zinc-400 text-sm leading-relaxed" style={fontBody}>
                                                    {study.problem}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="w-1 h-1 rounded-full bg-[var(--primary)] group-hover:shadow-[0_0_8px_var(--primary)] transition-shadow" />
                                                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-300 group-hover:text-white transition-colors" style={fontLabel}>
                                                        System Engineered
                                                    </div>
                                                </div>
                                                <p className="text-zinc-200 text-sm leading-relaxed" style={fontBody}>
                                                    {study.built}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Col 3: Outcome + CTA */}
                                        <div className="relative z-10 flex flex-col justify-between gap-6">
                                            <div className="p-5 rounded-xl bg-[#050505] border border-white/[0.04] group-hover:border-[var(--primary)]/30 group-hover:bg-gradient-to-br group-hover:from-[var(--primary)]/10 group-hover:to-transparent transition-all duration-500 shadow-lg">
                                                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 group-hover:text-[var(--primary)] mb-3 transition-colors" style={fontLabel}>
                                                    Production ROI
                                                </div>
                                                <p className="text-zinc-50 text-sm font-semibold leading-relaxed" style={fontHeadline}>
                                                    {study.result}
                                                </p>
                                            </div>

                                            <a
                                                href="#audit-form"
                                                className="group/cta inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-[var(--accent)] transition-colors duration-300 self-start mt-auto"
                                                style={fontLabel}
                                            >
                                                <span>Deploy Similar System</span>
                                                <ChevronRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom trust strip — horizontal rule style */}
                            <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                                <div className="flex flex-wrap gap-x-8 gap-y-3">
                                    {[
                                        "NDA-Protected Engagements",
                                        "48–72h Delivery SLA",
                                        "100% Production Deployments",
                                    ].map((label, i) => (
                                        <span key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700" style={fontLabel}>
                                            {label}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href="#audit-form"
                                    className="flex-shrink-0 group/main inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 group-hover/main:text-white transition-colors" style={fontLabel}>Start an Engagement</span>
                                    <ChevronRight size={12} className="text-zinc-500 group-hover/main:text-white group-hover/main:translate-x-0.5 transition-all" />
                                </a>
                            </div>

                        </div>
                    </section>


                    {/* ============================================================
                    PROCESS — Execution Pipeline (client component)
                ============================================================ */}
                    <PipelineSection />

                    {/* ============================================================
                    WHY WORK WITH ME
                ============================================================ */}
                    <section className="mb-32 relative z-10 px-4 sm:px-6 md:px-0 group">
                        {/* Subtle Ambient Background */}
                        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
                        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

                        <div className="max-w-7xl mx-auto relative z-10">
                            {/* Two-column editorial layout */}
                            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                                {/* Left — Sticky Heading + Live Metrics */}
                                <div className="lg:w-[380px] flex-shrink-0 lg:sticky lg:top-32 h-fit" data-animate="slide-left">

                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                        <Terminal size={14} className="text-[var(--accent)]" />
                                        <span>[ ] The Mr² Standard</span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-50 tracking-tight leading-[1.05] mb-12" style={fontHeadline}>
                                        Immutable <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                                            Guarantees.
                                        </span>
                                    </h2>

                                    {/* Telemetry Metric Blocks */}
                                    <div className="relative space-y-8 pt-8 before:absolute before:inset-y-8 before:left-0 before:w-px before:bg-gradient-to-b before:from-[var(--primary)]/50 before:via-white/10 before:to-transparent pl-8">
                                        {[
                                            { value: "48h", label: "To First Production Deployment" },
                                            { value: "Zero", label: "Hidden Fees, Retainers, or Bloat" },
                                            { value: "100%", label: "Architectures Shipped to Live URLs", pulse: true },
                                        ].map((m, i) => (
                                            <div key={i} className="group/metric relative">
                                                {/* Timeline Node */}
                                                <span className="absolute -left-[37px] top-3 w-2 h-2 rounded-full bg-zinc-800 border border-zinc-600 group-hover/metric:bg-[var(--accent)] group-hover/metric:border-[var(--accent)] group-hover/metric:shadow-[0_0_10px_var(--accent)] transition-all duration-300" />

                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-3xl font-black text-zinc-100 tabular-nums group-hover/metric:text-white transition-colors" style={fontHeadline}>
                                                            {m.value}
                                                        </span>
                                                        {m.pulse && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] animate-pulse" />
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mt-1.5 leading-snug group-hover/metric:text-[var(--primary)] transition-colors" style={fontLabel}>
                                                        {m.label}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right — Interactive Guarantee Cards */}
                                <div className="flex-1 flex flex-col gap-6">
                                    {[
                                        {
                                            index: "01",
                                            title: "Sprint Velocity",
                                            detail: "48–72h Delivery",
                                            desc: "We architect production-ready MVPs in 48-72 hours. We bypass standard agency lag through elite, founder-led engineering and zero-overhead deployment cycles.",
                                            icon: <Zap size={20} />,
                                            color: "text-[var(--accent)]",
                                            hoverGlow: "group-hover:border-[var(--accent)]/30 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] group-hover:from-[var(--accent)]/10"
                                        },
                                        {
                                            index: "02",
                                            title: "Fixed-Scope Execution",
                                            detail: "$0 Surprises",
                                            desc: "Zero hidden retainers. Zero scope creep. You receive a precise technical blueprint and a locked execution cost before a single line of code is written.",
                                            icon: <ShieldCheck size={20} />,
                                            color: "text-zinc-100",
                                            hoverGlow: "group-hover:border-zinc-300/30 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:from-white/5"
                                        },
                                        {
                                            index: "03",
                                            title: "Continuous Telemetry",
                                            detail: "Post-Launch Ops",
                                            desc: "Deployment is just the baseline. We monitor system health, manage infrastructure scaling, and maintain edge performance long after the initial launch.",
                                            icon: <Activity size={20} />,
                                            color: "text-[var(--primary)]",
                                            hoverGlow: "group-hover:border-[var(--primary)]/30 group-hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] group-hover:from-[var(--primary)]/10"
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`group relative p-8 md:p-10 rounded-[2rem] bg-[#0A0A0A]/80 backdrop-blur-md border border-white/[0.04] bg-gradient-to-r from-transparent to-transparent transition-all duration-500 overflow-hidden cursor-default ${item.hoverGlow}`}
                                            data-animate="slide-right"
                                            data-delay={String(idx + 1)}
                                        >
                                            {/* Left Active Bar Indicator */}
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-white to-transparent group-hover:h-1/2 transition-all duration-500 rounded-r" />

                                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">

                                                {/* Icon Block */}
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className={`w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#050505] ${item.color}`}>
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-[10px] font-black text-zinc-600 tracking-[0.2em]" style={fontLabel}>
                                                        [ {item.index} ]
                                                    </span>
                                                </div>

                                                {/* Content Block */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                                        <h3 className="text-xl md:text-2xl font-extrabold text-zinc-50 tracking-tight" style={fontHeadline}>
                                                            {item.title}
                                                        </h3>
                                                        <span className="px-2.5 py-1 rounded border border-white/[0.08] bg-white/[0.03] text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 group-hover:text-zinc-200 transition-colors" style={fontLabel}>
                                                            {item.detail}
                                                        </span>
                                                    </div>
                                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors" style={fontBody}>
                                                        {item.desc}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* ============================================================
                    AUDIT FORM
                ============================================================ */}

                    <section id="audit-form" className="mb-24 max-w-5xl mx-auto relative z-20 scroll-mt-24">
                        <AuditForm />
                    </section>

                    {/* ============================================================
                    FAQ SECTION
                ============================================================ */}
                    <FaqSection />
                    {/* ============================================================
                    FINAL CTA
                ============================================================ */}
                    <section className="mb-24 relative max-w-5xl mx-auto px-4 sm:px-6 md:px-0" data-animate="slide-up">
                        <div className="relative rounded-[2rem] bg-[#050505] border border-white/[0.08] overflow-hidden p-10 md:p-16 lg:p-20 shadow-[0_30px_80px_rgba(0,0,0,0.8)] group">

                            {/* Technical Grid Background */}
                            <div className="absolute inset-0 opacity-[0.15]"
                                style={{
                                    backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)"
                                }}
                            />

                            {/* Dynamic Ambient Glows */}
                            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[100px] pointer-events-none group-hover:opacity-100 transition-opacity duration-700 opacity-50 mix-blend-screen" />
                            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-[80px] pointer-events-none group-hover:opacity-100 transition-opacity duration-700 opacity-50 mix-blend-screen" />

                            <div className="relative z-10 flex flex-col items-center text-center">

                                {/* Status Label */}
                                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded border border-white/[0.1] bg-white/[0.03] text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md" style={fontLabel} data-animate="slide-up" data-delay="1">
                                    <Terminal size={14} className="text-[var(--accent)]" />
                                    <span>[ ] System Status: Ready For Deployment</span>
                                </div>

                                {/* Core Command Headline */}
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-zinc-50 leading-[1.1]" style={fontHeadline} data-animate="slide-up" data-delay="2">
                                    Bypass the lag.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                                        Initiate Architecture.
                                    </span>
                                </h2>

                                {/* Sub-copy */}
                                <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed" style={fontBody} data-animate="slide-up" data-delay="3">
                                    Stop burning capital on endless discovery phases. Request a technical diagnostic, and we will map out exactly how your custom Next.js and AI infrastructure can be live in 48 to 72 hours.
                                </p>

                                {/* Action Row */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16" data-animate="slide-up" data-delay="4">
                                    <a
                                        href="#audit-form"
                                        className="group/btn relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded bg-[var(--primary)] text-zinc-50 font-bold text-xs tracking-[0.15em] uppercase hover:bg-[#0055d4] transition-all duration-300 shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:shadow-[0_0_50px_rgba(0,102,255,0.5)] hover:-translate-y-0.5 overflow-hidden"
                                        style={fontLabel}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Request Diagnostic
                                            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </a>

                                    <a
                                        href={`mailto:${process.env.NEXT_PUBLIC_REPLY_TO_EMAIL}`}
                                        className="group/mail inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded border border-white/[0.1] bg-white/[0.02] text-zinc-300 font-bold text-xs tracking-[0.15em] uppercase hover:bg-white/[0.05] hover:text-white hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md"
                                        style={fontLabel}
                                    >
                                        <Mail size={16} className="text-zinc-500 group-hover/mail:text-zinc-300 transition-colors" />
                                        <span>Direct Link</span>
                                    </a>
                                </div>

                                {/* System Metadata Footer */}
                                <div className="w-full max-w-2xl pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-x-8 gap-y-4" data-animate="fade" data-delay="5">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest" style={fontLabel}>
                                        <MapPin size={12} className="text-zinc-500" />
                                        Base: Colombo, LK
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest" style={fontLabel}>
                                        <Globe size={12} className="text-zinc-500" />
                                        Coverage: Global
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest" style={fontLabel}>
                                        <Terminal size={12} className="text-zinc-500" />
                                        Stack: Next.js // AI
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}