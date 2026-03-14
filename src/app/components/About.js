import React from 'react';
import Link from 'next/link';

export default function About() {
    const stats = [
        { value: "48hrs", label: "MVP Launch", icon: "fas fa-bolt", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
        { value: "10+", label: "AI Projects", icon: "fas fa-robot", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
        { value: "1st", label: "Class Honours", icon: "fas fa-graduation-cap", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
        { value: "3", label: "Languages", icon: "fas fa-earth-asia", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    ];

    const expertiseAreas = [
        {
            icon: "fas fa-robot",
            title: "AI Integration",
            desc: "I embed intelligence into products - chatbots trained on your data, prediction engines, NLP pipelines, and automation that runs while you sleep.",
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        },
        {
            icon: "fas fa-layer-group",
            title: "Full-Stack Engineering",
            desc: "End-to-end product ownership. From database architecture to pixel-perfect UI. Next.js, React, Node.js, Python - whatever the job needs.",
            color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        },
        {
            icon: "fas fa-bolt",
            title: "Speed to Market",
            desc: "I ship MVPs in 48 to 72 hours. Not as a gimmick - as a discipline. Tight scope, fast execution, real users in days instead of months.",
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        },
        {
            icon: "fas fa-chart-line",
            title: "Systems Thinking",
            desc: "I architect for scale from day one. The difference between an app that breaks at 100 users and one that handles 100,000 is decisions made in hour one.",
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        },
    ];

    const credentials = [
        {
            icon: "fas fa-graduation-cap",
            title: "B.Sc. (Hons) Software Engineering",
            sub: "Cardiff Metropolitan University",
            badge: "First Class Honours",
            badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
            year: "2026",
            featured: true,
        },
        {
            icon: "fas fa-certificate",
            title: "Diploma in Computing",
            sub: "ICBT Campus, Colombo",
            badge: null,
            year: "2022",
            featured: false,
        },
        {
            icon: "fas fa-school",
            title: "G.C.E. Advanced Level",
            sub: "Private Candidate",
            badge: null,
            year: "2024",
            featured: false,
        },
    ];

    return (
        <section
            id="about"
            className="relative py-24 px-6 md:px-12 overflow-hidden bg-[#050505] border-t border-white/5"
            itemScope
            itemType="https://schema.org/Person"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── SECTION LABEL + HEADLINE ── */}
                <div className="mb-16 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <i className="fas fa-user-astronaut"></i> About
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight leading-[1.1]">
                        Not just a developer.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">An engineer who ships.</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        I am <strong className="text-white font-semibold" itemProp="name">Mohamed Rashard</strong> - a full-stack AI engineer based in <strong className="text-white font-semibold" itemProp="addressLocality">Colombo, Sri Lanka</strong>,
                        building intelligent products for startups and businesses across the US, UK, Canada, and Australia.
                        I hold a <strong className="text-white font-semibold">First Class Honours degree in Software Engineering</strong> and I specialize at the intersection of AI and product velocity - shipping MVPs in 48 hours and production-grade products in weeks.
                    </p>
                </div>

                {/* ── STAT WALL ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {stats.map((s, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${s.bg} hover:-translate-y-1 transition-transform cursor-default`}>
                            <i className={`${s.icon} text-2xl ${s.color} mb-4 block`}></i>
                            <div className={`text-3xl md:text-4xl font-black ${s.color} mb-1 tracking-tight`}>
                                {s.value}
                            </div>
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── MAIN GRID: narrative + credentials ── */}
                <div className="grid lg:grid-cols-5 gap-12 mb-20">
                    {/* LEFT - expertise narrative (3 cols) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div>
                            <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                                <i className="fas fa-crosshairs text-blue-500"></i> What makes me different
                            </h3>
                            <div className="space-y-4 text-slate-400 leading-relaxed font-light text-lg">
                                <p>
                                    Most developers are cautious. They over-architect, over-estimate, and under-deliver on time.
                                    I operate differently. My obsession is <strong className="text-white font-medium">speed without cutting corners</strong> -
                                    shipping a working, testable product fast so founders can validate with real users before investing in the full build.
                                </p>
                                <p>
                                    I graduated with <strong className="text-white font-medium">First Class Honours in Software Engineering</strong> from
                                    Cardiff Metropolitan University in 2026. But my real education has been building AI tools
                                    from scratch - lead discovery engines, disease prediction platforms, mental wellness systems -
                                    and learning exactly where theory meets the messiness of production.
                                </p>
                                <p>
                                    I work with clients in the <strong className="text-white font-medium">US, UK, Canada, and Australia</strong> who
                                    are tired of agencies that take months and developers who ghost after deposits.
                                    I am async-friendly, transparent on scope, and personally involved in every project from
                                    first message to post-launch.
                                </p>
                            </div>
                        </div>

                        {/* Language fluency */}
                        <div className="pt-8 border-t border-white/5">
                            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <i className="fas fa-comments text-slate-600"></i> Languages
                            </h4>
                            <div className="space-y-5">
                                {[
                                    { lang: "English", note: "Professional working proficiency" },
                                    { lang: "Tamil", note: "Native" },
                                    { lang: "Sinhala", note: "Native" },
                                ].map((l, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-bold text-slate-300">{l.lang}</span>
                                            <span className="text-xs text-blue-400 font-medium">{l.note}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Global availability note */}
                        <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex flex-col sm:flex-row items-start gap-5">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-earth-americas text-blue-400 text-xl"></i>
                            </div>
                            <div>
                                <p className="text-base font-bold text-white mb-2">Globally available. Async-first.</p>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    Based in Colombo, Sri Lanka (UTC+5:30). I respond within 4 hours during my working day
                                    and within 12 hours globally. Every project gets direct communication - no account managers,
                                    no middlemen.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - credentials (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                            <i className="fas fa-medal text-cyan-500"></i> Credentials
                        </h3>
                        {credentials.map((c, i) => (
                            <div key={i}
                                className={`relative p-6 rounded-2xl border transition-all hover:-translate-y-1 ${c.featured
                                    ? 'border-cyan-500/30 bg-gradient-to-br from-[#0a192f] to-[#050505] shadow-[0_0_30px_rgba(6,182,212,0.1)]'
                                    : 'border-white/5 bg-[#0a0a0a] hover:border-white/10'
                                    }`}>
                                {c.featured && (
                                    <div className="absolute top-4 right-4">
                                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                                            <i className="fas fa-trophy mr-1.5"></i>Top Result
                                        </span>
                                    </div>
                                )}
                                <div className="flex gap-4 items-start">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.featured
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                        : 'bg-white/5 text-slate-500 border border-white/5'
                                        }`}>
                                        <i className={`${c.icon} text-xl`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0 pt-1">
                                        <h4 className={`font-bold text-base leading-snug mb-1.5 ${c.featured ? 'text-white' : 'text-slate-300'}`}>
                                            {c.title}
                                        </h4>
                                        <p className="text-sm text-slate-500 mb-4">{c.sub}</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                                                {c.year}
                                            </span>
                                            {c.badge && (
                                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${c.badgeColor}`}>
                                                    {c.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* CTA card */}
                        <div className="mt-8 p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-[#050505]">
                            <p className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                                <i className="fas fa-magnifying-glass text-blue-400"></i> Not sure if it's a fit?
                            </p>
                            <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                                Claim a free AI Opportunity Audit. I will personally review your business
                                and send you a Loom video within 48 hours showing exactly where AI can help.
                                No pitch. No obligation.
                            </p>
                            <Link href="/services#audit-form"
                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 rounded-xl text-white font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all group">
                                Get My Free Audit
                                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── EXPERTISE GRID ── */}
                <div className="border-t border-white/5 pt-16">
                    <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-3">
                        <i className="fas fa-cube text-slate-600"></i> Core Expertise
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {expertiseAreas.map((area, i) => (
                            <div key={i}
                                className={`p-6 rounded-2xl border bg-[#0a0a0a] hover:-translate-y-1 transition-all ${area.color.split(' ').slice(1).join(' ')}`}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${area.color}`}>
                                    <i className={`${area.icon} text-xl`}></i>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-3 tracking-tight">
                                    {area.title}
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    {area.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}