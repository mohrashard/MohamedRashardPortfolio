import Link from 'next/link';
import Image from 'next/image';
import AuditForm from './AuditForm';
import SocialProofTicker from '../components/SocialProofTicker';
import AvailabilityBadge from '../components/AvailabilityBadge';

// ============================================================
// SEO & GEO OPTIMIZED METADATA
// ============================================================
export const metadata = {
    title: "AI & Software Engineering Services | Mr² Labs — Mohamed Rashard",
    description: "Hire Mohamed Rashard (Mr² Labs) to build AI-powered tools, SaaS platforms, and custom web apps. MVPs launched in 48-72 hours. Based in Colombo, Sri Lanka. Serving startups & businesses globally.",
    keywords: [
        "Mr² Labs", "Mohamed Rashard Rizmi", "Mohamed Rashard developer",
        "AI developer Sri Lanka", "software engineer Colombo", "web developer Sri Lanka",
        "hire AI developer", "freelance AI engineer", "custom AI development",
        "AI chatbot development", "custom SaaS development", "Next.js developer for hire",
        "React developer freelance", "MVP development startup", "AI automation developer",
        "machine learning integration", "OpenAI GPT integration", "full stack developer hire",
        "build AI tool for my business", "automate business with AI", "AI workflow automation",
        "custom web app developer", "startup software development", "build SaaS platform",
        "MVP in 48 hours", "rapid MVP development"
    ],
    openGraph: {
        title: "MVP in 48-72 Hours. Main Product in Weeks. | Mr² Labs",
        description: "Custom AI tools, SaaS platforms & web apps. I ship faster than any agency. Based in Sri Lanka, working globally. Claim your free AI Opportunity Audit.",
        url: "https://www.mohamedrashard.dev/services",
        type: "website",
        images: [{ url: "/mr-squared-logo.png", width: 1200, height: 630, alt: "Mr² Labs — AI & Software Engineering" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "MVP in 48-72 Hours. Main Product in Weeks. | Mr² Labs",
        description: "Custom AI tools, SaaS platforms & web apps. I ship faster than any agency.",
        images: ["/mr-squared-logo.png"],
    },
    alternates: { canonical: "https://www.mohamedrashard.dev/services" },
};

// ============================================================
// SERVICES PAGE — Viewer-Arresting Redesign
// ============================================================
export default function Services() {

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Mr² Labs",
            "image": "https://www.mohamedrashard.dev/mr-squared-logo.png",
            "url": "https://www.mohamedrashard.dev/services",
            "email": "mohrashard@gmail.com",
            "address": { "@type": "PostalAddress", "addressLocality": "Colombo", "addressCountry": "LK" },
            "priceRange": "$$",
            "description": "AI-powered web applications, custom SaaS platforms, and intelligent automation tools. MVPs launched in 48-72 hours for startups worldwide.",
            "founder": { "@type": "Person", "name": "Mohamed Rashard Rizmi" },
            "areaServed": ["Worldwide"],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI & Software Engineering Services",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & Machine Learning Integration" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical Consulting" } },
                ]
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "How long does it take to build an MVP?", "acceptedAnswer": { "@type": "Answer", "text": "I launch MVPs in 48 to 72 hours. The full product ships in weeks, not months. Speed is built into my process." } },
                { "@type": "Question", "name": "How much does it cost to build a custom AI tool?", "acceptedAnswer": { "@type": "Answer", "text": "Project costs vary based on scope. Book a free consultation and I will give you a clear, no-obligation estimate within 24 hours." } },
                { "@type": "Question", "name": "Do you work with international clients?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Based in Colombo, Sri Lanka, I work with startups and businesses globally across US, Europe, Middle East, and Southeast Asia." } },
                { "@type": "Question", "name": "What is the free AI Opportunity Audit?", "acceptedAnswer": { "@type": "Answer", "text": "I personally review your business, identify where AI could save you time or increase revenue, and record a short Loom video with my findings. Completely free, no strings attached." } },
            ]
        }
    ];

    const caseStudies = [
        {
            title: "BizFinder AI",
            client: "A marketing founder targeting B2B businesses limit by manual outreach.",
            problem: "They were spending over 5 hours a week manually finding and qualifying leads.",
            built: "I built BizFinder AI in 48 hours to automatically discover and qualify leads using the Gemini API.",
            result: "5 hours saved every week allowing them to focus purely on closing.",
            color: "blue",
            icon: "fas fa-search-dollar"
        },
        {
            title: "LiverLens",
            client: "A private healthcare clinic needing better triaging for hepatology patients.",
            problem: "Doctors were spending too much time manually calculating disease risk factors from raw data.",
            built: "I built LiverLens, a secure React + Flask platform powered by a custom XGBoost AI model.",
            result: "92% prediction accuracy, saving 15 minutes per patient evaluation.",
            color: "purple",
            icon: "fas fa-heartbeat"
        },
        {
            title: "Mentora",
            client: "A digital health startup aiming to scale their wellness coaching program globally.",
            problem: "Coaches simply couldn't manually analyze thousands of daily behavior data points per user.",
            built: "I built an AI engine that analyzes digital patterns to generate personalized wellness recommendations at scale.",
            result: "Scaled rapidly to 1,000+ users with zero additional coaching headcount.",
            color: "cyan",
            icon: "fas fa-brain"
        },
        {
            title: "Tasknet",
            client: "A service provider marketplace needing a seamless two-sided matching platform.",
            problem: "Buyers couldn't seamlessly discover, vet, and book reliable service providers in real-time.",
            built: "I built a customized full-stack collaborative platform with a tailored matching algorithm.",
            result: "300% increase in successful local service matches within the first month.",
            color: "emerald",
            icon: "fas fa-network-wired"
        }
    ];

    const colorMap = {
        blue: { border: "hover:border-blue-500/40 hover:shadow-blue-900/20", icon: "bg-blue-500/10 text-blue-400 border-blue-500/10", tag: "bg-blue-500/10 text-blue-300 border-blue-500/20", badge: "bg-blue-500/20 text-blue-300" },
        purple: { border: "hover:border-purple-500/40 hover:shadow-purple-900/20", icon: "bg-purple-500/10 text-purple-400 border-purple-500/10", tag: "bg-purple-500/10 text-purple-300 border-purple-500/20", badge: "bg-purple-500/20 text-purple-300" },
        cyan: { border: "hover:border-cyan-500/40 hover:shadow-cyan-900/20", icon: "bg-cyan-500/10 text-cyan-400 border-cyan-500/10", tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20", badge: "bg-cyan-500/20 text-cyan-300" },
        emerald: { border: "hover:border-emerald-500/40 hover:shadow-emerald-900/20", icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10", tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", badge: "bg-emerald-500/20 text-emerald-300" },
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* JSON-LD */}
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            {/* ============================================================
                AMBIENT BACKGROUND
            ============================================================ */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050505] to-[#0a1120] opacity-95" />
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[80px] opacity-40 transform-gpu" />
                <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[80px] opacity-30 transform-gpu" />
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[60px] opacity-20" />
                {/* Subtle grid */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                        backgroundSize: "60px 60px"
                    }}
                />
            </div>

            {/* ============================================================
                NAVIGATION — exact same as original
            ============================================================ */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <i className="fas fa-home text-slate-400 group-hover:text-white transition-all" />
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Home</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/blog" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Blog</span>
                        <i className="fas fa-book-open text-slate-400 group-hover:text-white transition-all" />
                    </Link>
                    <Link href="/labs" className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Labs</span>
                        <i className="fas fa-flask text-slate-400 group-hover:text-white transition-all" />
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">

                {/* ============================================================
                    HERO — Speed is the differentiator
                ============================================================ */}
                <header className="mb-20">

                    {/* Top identity bar */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative w-20 h-20 mb-6 rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:shadow-[0_0_60px_rgba(59,130,246,0.55)] hover:scale-105 transition-all duration-500">
                            <Image src="/mr-squared-logo.png" alt="Mr² Labs — Mohamed Rashard" fill className="object-cover" />
                        </div>
                        <AvailabilityBadge />
                    </div>

                    {/* The killer claim */}
                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 tracking-tight leading-[0.9] uppercase">
                            <span className="block text-white">I Launch</span>
                            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                                MVPs in
                            </span>
                            <span className="relative inline-block">
                                <span className="relative z-10 text-white">48</span>
                                <span className="text-slate-500">-</span>
                                <span className="relative z-10 text-white">72</span>
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Hours.</span>
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto mb-3">
                            The full product ships in <strong className="text-white font-bold">weeks</strong>, not months.
                            Custom <strong className="text-white">AI tools</strong>, <strong className="text-white">SaaS platforms</strong>, and <strong className="text-white">intelligent automation</strong> built to move as fast as your ambition.
                        </p>
                        <p className="text-sm text-slate-600 mb-12">
                            Based in Colombo, Sri Lanka. Trusted by clients across the US, Europe, Middle East and Southeast Asia.
                        </p>

                        {/* Speed stats bar */}
                        <div className="grid grid-cols-2 md:inline-grid md:grid-cols-4 mx-auto w-full md:w-auto mb-12 rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
                            {[
                                { value: "48-72hr", label: "MVP Launch", icon: "fas fa-bolt", color: "text-yellow-400", borders: "border-b border-r md:border-b-0 border-white/8" },
                                { value: "Weeks", label: "Full Product", icon: "fas fa-rocket", color: "text-cyan-400", borders: "border-b md:border-r md:border-b-0 border-white/8" },
                                { value: "10+", label: "AI Builds Shipped", icon: "fas fa-microchip", color: "text-blue-400", borders: "border-r border-white/8" },
                                { value: "100%", label: "Client Satisfaction", icon: "fas fa-check-circle", color: "text-emerald-400", borders: "" },
                            ].map((s, i) => (
                                <div key={i} className={`px-3 sm:px-6 py-4 text-center hover:bg-white/[0.04] transition-colors ${s.borders}`}>
                                    <i className={`${s.icon} ${s.color} text-lg mb-1 block`} />
                                    <div className={`text-lg sm:text-xl font-black ${s.color}`}>{s.value}</div>
                                    <div className="text-[10px] sm:text-xs text-slate-600 font-semibold uppercase tracking-tight sm:tracking-wider mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Dual CTA */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#audit-form"
                                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <i className="fas fa-search text-base" />
                                <span>Claim Free AI Audit</span>
                                <i className="fas fa-arrow-right text-sm opacity-70 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="mailto:mohrashard@gmail.com"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-base hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                            >
                                <i className="fas fa-paper-plane text-blue-400" />
                                <span>Start a Project</span>
                            </a>
                        </div>
                    </div>
                </header>

                <div className="mb-24 -mt-10">
                    <SocialProofTicker />
                </div>

                {/* ============================================================
                    WHAT MAKES ME DIFFERENT — Speed + Proof block
                ============================================================ */}
                <section className="mb-24">
                    <div className="relative rounded-[2.5rem] border border-blue-500/15 bg-gradient-to-br from-blue-950/30 via-[#070b14] to-cyan-950/20 overflow-hidden">

                        {/* Large decorative icon */}
                        <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none select-none">
                            <i className="fas fa-bolt" style={{ fontSize: "28rem", lineHeight: 1 }} />
                        </div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
                            {/* Left: The speed claim */}
                            <div className="p-10 md:p-14">
                                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                                    <i className="fas fa-bolt" />
                                    Why I Am Different
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                    Where Others Ship in Months,<br />
                                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                        I Ship in Hours.
                                    </span>
                                </h2>
                                <p className="text-slate-400 text-base leading-relaxed mb-6">
                                    I have built the systems, the instincts, and the discipline to take a raw idea from zero to a live, working MVP in 48 to 72 hours. The full product follows in weeks. No agency overhead. No slow committees. Just direct, high-speed execution.
                                </p>
                                <ul className="space-y-3 text-sm">
                                    {[
                                        { icon: "fas fa-bolt", text: "MVP live in 48-72 hours, not 3 months", color: "text-yellow-400" },
                                        { icon: "fas fa-rocket", text: "Full product in weeks with agile sprints", color: "text-cyan-400" },
                                        { icon: "fas fa-user-tie", text: "You work directly with me, not an account manager", color: "text-blue-400" },
                                        { icon: "fas fa-microchip", text: "AI-first thinking on every project I touch", color: "text-purple-400" },
                                        { icon: "fas fa-hand-holding-usd", text: "Fixed-scope pricing, zero surprise invoices", color: "text-emerald-400" },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <i className={`${item.icon} ${item.color} w-4 text-center flex-shrink-0`} />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right: Timeline visual */}
                            <div className="p-10 md:p-14">
                                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                    <i className="fas fa-stream" />
                                    My Delivery Timeline
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { phase: "Hour 0", label: "Kick-off Call", desc: "Scope locked, build begins immediately", color: "border-cyan-500/40 bg-cyan-500/5", badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                                        { phase: "48-72 Hrs", label: "MVP is Live", desc: "A real, working product on a real URL", color: "border-yellow-500/40 bg-yellow-500/5", badge: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
                                        { phase: "Weeks", label: "Full Product", desc: "Complete feature set, polished and deployed", color: "border-blue-500/40 bg-blue-500/5", badge: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                                        { phase: "Ongoing", label: "Post-Launch Support", desc: "I stay on to make sure it runs flawlessly", color: "border-emerald-500/40 bg-emerald-500/5", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${item.color} transition-colors`}>
                                            <span className={`flex-shrink-0 mt-0.5 px-2.5 py-1 rounded-lg text-xs font-black border ${item.badge}`}>{item.phase}</span>
                                            <div>
                                                <div className="text-white font-bold text-sm mb-0.5">{item.label}</div>
                                                <div className="text-slate-500 text-xs">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================
                    FREE AI AUDIT BANNER
                ============================================================ */}
                <section className="mb-24 relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-purple-950/30 p-8 md:p-12">
                    <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none">
                        <i className="fas fa-robot" style={{ fontSize: "20rem", lineHeight: 1 }} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                                <i className="fas fa-award" />
                                Free, No Credit Card Needed
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                Get Your Free<br />
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Opportunity Audit</span>
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed mb-2">
                                I will personally review your business and record a short Loom video showing <strong className="text-white">exactly where AI could save you time and money</strong>, specific to how your business works.
                            </p>
                            <p className="text-slate-500 text-sm mb-6">No generic advice. No pitch. A real, actionable audit delivered within 48 hours.</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                                {[
                                    { icon: "fas fa-user-check", text: "Personalized to your business" },
                                    { icon: "fas fa-clock", text: "Delivered in 48hrs" },
                                    { icon: "fas fa-handshake", text: "Zero obligation" },
                                    { icon: "fas fa-video", text: "Loom video walkthrough" },
                                ].map((item, i) => (
                                    <span key={i} className="flex items-center gap-2">
                                        <i className={`${item.icon} text-cyan-500 text-xs`} />
                                        {item.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-auto">
                            <a
                                href="#audit-form"
                                className="group flex items-center justify-center gap-3 w-full md:w-64 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-lg hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <i className="fas fa-search group-hover:scale-110 transition-transform" />
                                <span>Get My Free Audit</span>
                            </a>
                            <p className="text-center text-xs text-slate-500 mt-3">Takes 2 minutes to fill out</p>
                        </div>
                    </div>
                </section>

                {/* ============================================================
                    SERVICES — AI-first, full grid
                ============================================================ */}
                <section className="mb-24">
                    <div className="text-center mb-14">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            What I Build
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Services Built Around{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Your Outcomes</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Not tech stacks. Not buzzwords. Real tools that solve real problems in your business.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* AI — HERO SERVICE (full width, featured) */}
                        <div className="group relative bg-[#0a0a0a] border border-purple-500/20 rounded-[2rem] p-8 md:p-12 overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 md:col-span-2">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity pointer-events-none">
                                <i className="fas fa-brain" style={{ fontSize: "18rem", lineHeight: 1, color: "#a855f7" }} />
                            </div>
                            <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                                <i className="fas fa-award text-[10px]" />
                                Most Popular
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20">
                                    <i className="fas fa-robot text-3xl" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">AI & Machine Learning</h2>
                                <p className="text-slate-300 leading-relaxed mb-6 text-lg max-w-3xl">
                                    Your business is losing time on tasks AI can handle automatically. I build <strong className="text-white">chatbots that qualify leads</strong>, systems that <strong className="text-white">automate repetitive workflows</strong>, and analytics that <strong className="text-white">predict what your customers will do next</strong>.
                                </p>
                                <p className="text-slate-500 text-sm mb-8">A solution built specifically for how <em>you</em> work, not a generic SaaS subscription.</p>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    {[
                                        { icon: "fas fa-comments", title: "Custom AI Chatbots", desc: "Trained on your data, answers customers 24/7" },
                                        { icon: "fas fa-filter", title: "Lead Qualification", desc: "AI screens and scores inbound leads automatically" },
                                        { icon: "fas fa-cogs", title: "Workflow Automation", desc: "Eliminate repetitive tasks with intelligent pipelines" },
                                        { icon: "fas fa-chart-line", title: "Predictive Analytics", desc: "Forecast trends before they happen" },
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 transition-colors">
                                            <i className={`${item.icon} text-purple-400 text-xl mb-2 block`} />
                                            <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                                            <div className="text-slate-500 text-xs">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["Python", "OpenAI API", "TensorFlow", "LangChain", "Gemini API", "FastAPI"].map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/10 text-purple-400">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Web Dev */}
                        <div className="group relative bg-[#0a0a0a] border border-white/8 rounded-[2rem] p-8 md:p-10 overflow-hidden hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.06] group-hover:opacity-[0.13] transition-opacity pointer-events-none">
                                <i className="fas fa-laptop-code" style={{ fontSize: "12rem", lineHeight: 1, color: "#3b82f6" }} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-7 border border-blue-500/20">
                                    <i className="fas fa-globe text-2xl" />
                                </div>
                                <h2 className="text-2xl font-black text-white mb-3">Custom Web Development</h2>
                                <p className="text-slate-400 leading-relaxed mb-5 text-sm">
                                    Scalable, SEO-optimized web applications and SaaS platforms built with <strong className="text-white">Next.js</strong> and <strong className="text-white">React</strong>. Fast, robust, and built to grow with your business.
                                </p>
                                <ul className="mb-7 space-y-2.5">
                                    {['SaaS Platforms', 'E-commerce Solutions', 'Enterprise Dashboards', 'Progressive Web Apps'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <i className="fas fa-check-circle text-blue-500 text-sm flex-shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2 text-xs font-mono">
                                    {["React", "Next.js", "Node.js", "TypeScript"].map((t, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/10 text-blue-400">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Technical Consulting */}
                        <div className="group relative bg-[#0a0a0a] border border-white/8 rounded-[2rem] p-8 md:p-10 overflow-hidden hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.06] group-hover:opacity-[0.13] transition-opacity pointer-events-none">
                                <i className="fas fa-lightbulb" style={{ fontSize: "12rem", lineHeight: 1, color: "#f59e0b" }} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-7 border border-amber-500/20">
                                    <i className="fas fa-comments text-2xl" />
                                </div>
                                <h2 className="text-2xl font-black text-white mb-3">Technical Consulting</h2>
                                <p className="text-slate-400 leading-relaxed mb-5 text-sm">
                                    Not sure how to build your idea? I will validate your concept, choose the right tech stack, and give you a <strong className="text-white">clear roadmap to launch</strong> before you spend a dollar on development.
                                </p>
                                <ul className="mb-7 space-y-2.5">
                                    {['Project Feasibility Analysis', 'Tech Stack Selection', 'Architecture Planning', 'Code Reviews & Audits'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <i className="fas fa-check-circle text-amber-500 text-sm flex-shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2 text-xs font-mono">
                                    {["MERN", "SQL/NoSQL", "Cloud", "API Strategy"].map((t, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-400">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className="group relative bg-[#0a0a0a] border border-white/8 rounded-[2rem] p-8 md:p-10 overflow-hidden hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.06] group-hover:opacity-[0.13] transition-opacity pointer-events-none">
                                <i className="fas fa-mobile-alt" style={{ fontSize: "12rem", lineHeight: 1, color: "#10b981" }} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-7 border border-emerald-500/20">
                                    <i className="fas fa-mobile-screen text-2xl" />
                                </div>
                                <h2 className="text-2xl font-black text-white mb-3">Mobile App Development</h2>
                                <p className="text-slate-400 leading-relaxed mb-5 text-sm">
                                    Cross-platform iOS & Android apps built with <strong className="text-white">React Native</strong>. One codebase, native performance, shipped to both app stores.
                                </p>
                                <ul className="mb-7 space-y-2.5">
                                    {['iOS & Android Apps', 'Cross-Platform Solutions', 'App Store Deployment', 'Responsive UI/UX'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <i className="fas fa-check-circle text-emerald-500 text-sm flex-shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2 text-xs font-mono">
                                    {["React Native", "Expo", "Firebase"].map((t, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-400">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="group relative bg-[#0a0a0a] border border-white/8 rounded-[2rem] p-8 md:p-10 overflow-hidden hover:border-pink-500/40 hover:shadow-2xl hover:shadow-pink-900/20 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.06] group-hover:opacity-[0.13] transition-opacity pointer-events-none">
                                <i className="fas fa-paint-brush" style={{ fontSize: "12rem", lineHeight: 1, color: "#ec4899" }} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-7 border border-pink-500/20">
                                    <i className="fas fa-layer-group text-2xl" />
                                </div>
                                <h2 className="text-2xl font-black text-white mb-3">Frontend & Landing Pages</h2>
                                <p className="text-slate-400 leading-relaxed mb-5 text-sm">
                                    High-converting landing pages, portfolios, and marketing websites. <strong className="text-white">Pixel-perfect, fast-loading, and designed to turn visitors into clients.</strong>
                                </p>
                                <ul className="mb-7 space-y-2.5">
                                    {['Personal Portfolios', 'Business Landing Pages', 'Marketing Websites', 'Interactive UI/UX'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <i className="fas fa-check-circle text-pink-500 text-sm flex-shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2 text-xs font-mono">
                                    {["Tailwind CSS", "Framer Motion", "React"].map((t, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/10 text-pink-400">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ============================================================
                    FEATURED PROJECTS
                ============================================================ */}
                <section className="mb-24">
                    <div className="text-center mb-14">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            Proof of Work
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Real Projects. Real Results.</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">A curated selection of high-impact builds that show what is possible.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {caseStudies.map((study, idx) => {
                            const c = colorMap[study.color];
                            return (
                                <div key={idx} className={`group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden ${c.border} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
                                    <div className="p-8 md:p-10 flex flex-col h-full">
                                        <h3 className="text-3xl font-black mb-8 text-white group-hover:text-blue-400 transition-colors flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${c.icon} shadow-lg`}>
                                                <i className={`${study.icon} text-xl`}></i>
                                            </div>
                                            {study.title}
                                        </h3>
                                        
                                        <div className="space-y-4 mb-8 text-slate-300 flex-grow text-[15px] leading-relaxed">
                                            <p><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-building text-slate-500 w-5"></i> Client:</strong> {study.client}</p>
                                            <p><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-exclamation-triangle text-slate-500 w-5"></i> Problem:</strong> {study.problem}</p>
                                            <p><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-hammer text-slate-500 w-5"></i> Built:</strong> {study.built}</p>
                                            <p className="pt-2"><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-bolt text-slate-500 w-5"></i> Result:</strong> <span className={`${c.tag} border-none bg-transparent px-0 font-bold`}>{study.result}</span></p>
                                        </div>
                                        
                                        <div className="mt-auto pt-6 border-t border-white/5">
                                            <a href="#audit-form" className={`group/btn inline-flex items-center gap-2 font-bold transition-all ${c.tag} bg-transparent border-none px-0 hover:brightness-125`}>
                                                Want something like this? Claim your free audit. 
                                                <i className="fas fa-arrow-right text-xs ml-1 transition-transform group-hover/btn:translate-x-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ============================================================
                    PROCESS — How it works
                ============================================================ */}
                <section className="mb-24 max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            How It Works
                        </div>
                        <h2 className="text-4xl font-black">From Idea to Live in Days, Not Months</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { step: "01", title: "Free AI Audit / Discovery Call", desc: "We talk about your business, goals, and where AI or custom software can make the biggest impact. Free, no obligation.", icon: "fas fa-search", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                            { step: "02", title: "Clear Proposal and Scope", desc: "You get a detailed proposal with exact deliverables, timeline, and fixed price. No surprises.", icon: "fas fa-file-alt", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                            { step: "03", title: "Rapid MVP Build (48-72 Hours)", desc: "I build and ship a working MVP in 48 to 72 hours. You can see, test, and share a real product immediately.", icon: "fas fa-bolt", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
                            { step: "04", title: "Full Product in Weeks", desc: "Agile sprints deliver the complete feature set. You see real progress every step, not just at the end.", icon: "fas fa-code", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
                            { step: "05", title: "Launch and Support", desc: "Go live. I stay on for post-launch support to make sure everything runs smoothly.", icon: "fas fa-rocket", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-white/[0.025] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center ${item.color}`}>
                                    <i className={`${item.icon} text-lg`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs font-mono text-slate-700 font-bold">{item.step}</span>
                                        <h3 className="text-base font-black text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================================
                    WHY WORK WITH ME
                ============================================================ */}
                <section className="max-w-5xl mx-auto mb-24">
                    <h2 className="text-3xl md:text-4xl font-black text-center mb-12">Why Clients Choose Mr² Labs</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {[
                            { title: "Unprecedented Speed", desc: "MVPs in 48-72 hours. Full products in weeks. I have built the systems and instincts to execute faster than any agency.", icon: "fas fa-tachometer-alt", color: "text-blue-400 bg-blue-500/15" },
                            { title: "Transparent Pricing", desc: "Fixed-scope proposals. No hidden fees, no scope creep surprises. You know exactly what you are getting before we start.", icon: "fas fa-hand-holding-usd", color: "text-emerald-400 bg-emerald-500/15" },
                            { title: "Post-Launch Support", desc: "I do not build and disappear. I stay on to ensure your product runs smoothly long after launch.", icon: "fas fa-life-ring", color: "text-purple-400 bg-purple-500/15" },
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-colors">
                                <div className={`w-14 h-14 mx-auto rounded-2xl ${item.color} flex items-center justify-center mb-5`}>
                                    <i className={`${item.icon} text-xl`} />
                                </div>
                                <h3 className="text-lg font-black text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================================
                    AUDIT FORM
                ============================================================ */}
                <section className="mb-24 max-w-5xl mx-auto relative z-20">
                    <AuditForm />
                </section>

                {/* ============================================================
                    FAQ SECTION
                ============================================================ */}
                <section className="mb-24 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            FAQ
                        </div>
                        <h2 className="text-4xl font-black">Common Questions</h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            { q: "Can you really launch an MVP in 48-72 hours?", a: "Yes. I have built the systems, templates, and workflows that let me go from scope to live product in 48 to 72 hours. It is a real, working product on a real URL that you can share and test immediately. The full production-grade product follows in the weeks after." },
                            { q: "How much does a custom AI tool cost?", a: "It depends on scope and complexity. Most projects range from a small fixed fee for simple chatbots to larger budgets for full SaaS platforms. Book a free call and you will get a clear, no-obligation estimate within 24 hours." },
                            { q: "How long does it take to build the full product after MVP?", a: "Typically a few weeks, depending on scope. I use agile sprints so you see real progress every week, not just at the end." },
                            { q: "Do you work with international clients?", a: "Yes. I work with startups and businesses globally across the US, Europe, Middle East, and Southeast Asia. All communication is async-friendly and I am available across time zones." },
                            { q: "What makes you different from other developers?", a: "Speed without sacrificing quality. I specialize at the intersection of AI and web, I work lean with no agency overhead, and I am personally involved in every project from kick-off to post-launch." },
                            { q: "What is the free AI Opportunity Audit?", a: "I personally review your business processes, identify where AI could save you time or money, and record a Loom video walkthrough with my findings. It is completely free, no strings attached." },
                        ].map((item, i) => (
                            <details key={i} className="group p-6 rounded-2xl bg-white/[0.025] border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                                <summary className="flex items-center justify-between font-black text-white text-base list-none">
                                    <span>{item.q}</span>
                                    <i className="fas fa-chevron-down text-slate-500 group-open:rotate-180 transition-transform text-sm flex-shrink-0 ml-4" />
                                </summary>
                                <p className="text-slate-400 mt-4 leading-relaxed text-sm">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* ============================================================
                    FINAL CTA
                ============================================================ */}
                <section className="text-center bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-[3rem] p-12 md:p-20 border border-blue-500/20 relative overflow-hidden">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    />
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[60px]" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                            <i className="fas fa-award" />
                            Free, No Catch
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Your MVP Could Be<br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Live in 72 Hours.
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-3">
                            Start with a free AI Opportunity Audit. I will show you exactly where AI can save you time and money, personalized to your business, delivered within 48 hours.
                        </p>
                        <p className="text-slate-500 text-sm mb-10">No pitch. No obligation. Just a genuinely useful audit.</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#audit-form"
                                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xl hover:shadow-[0_0_60px_rgba(37,99,235,0.55)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <i className="fas fa-search group-hover:scale-110 transition-transform" />
                                <span>Get My Free AI Audit</span>
                            </a>
                            <a
                                href="mailto:mohrashard@gmail.com"
                                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white/5 border border-white/20 text-white font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                <i className="fas fa-envelope text-blue-400" />
                                <span>Email Me Directly</span>
                            </a>
                        </div>

                        <p className="text-slate-600 text-xs mt-8">
                            Based in Colombo, Sri Lanka · Working globally · mohrashard@gmail.com
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}