"use client";

import React, { useState } from 'react';
import { EstimateData, Feature } from '@/types/pseo';

interface EstimatorFormProps {
    appTitle: string;
    baseFeatures: string[];
    slug: string;
}

const complexityBadge = (c: Feature['complexity']) => {
    const map = {
        High: 'bg-red-500/15 text-red-400 border-red-500/30',
        Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        Low: 'bg-green-500/15 text-green-400 border-green-500/30',
    };
    return map[c] || map['Medium'];
};

export default function EstimatorForm({ appTitle, baseFeatures, slug }: EstimatorFormProps) {
    const [stage, setStage] = useState(1);
    const [idea, setIdea] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);
    const [estimateData, setEstimateData] = useState<EstimateData | null>(null);
    const [email, setEmail] = useState('');
    const [isUnlocking, setIsUnlocking] = useState(false);

    const statusMessages = [
        "Analyzing your idea...",
        "Identifying technical requirements...",
        "Calculating API dependencies...",
        "Comparing agency market rates...",
        "Building your cost breakdown..."
    ];

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAnalyzing(true);
        setProgress(30);
        setStatusIndex(0);

        // Slow climb to 85%
        const climbInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 85) return 85;
                return prev + 1.83;
            });
        }, 100);

        // Rotate messages
        const statusInterval = setInterval(() => {
            setStatusIndex(prev => (prev + 1) % statusMessages.length);
        }, 800);

        try {
            const res = await fetch('/api/generate-estimate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea, slug, baseFeatures }),
            });
            if (!res.ok) throw new Error('API error');
            const data: EstimateData = await res.json();
            
            clearInterval(climbInterval);
            clearInterval(statusInterval);
            setProgress(100);
            
            // Short delay to show 100%
            setTimeout(() => {
                setEstimateData(data);
                setStage(2);
            }, 400);
        } catch {
            clearInterval(climbInterval);
            clearInterval(statusInterval);
            setProgress(100);
            
            setTimeout(() => {
                // Fallback mock so UI never breaks during development
                setEstimateData({
                    appName: 'SmartApp Pro',
                    summary: 'An AI-powered application based on your described idea, built for rapid market validation.',
                    isSimpleBuild: false,
                    features: [
                        { name: 'AI Core Engine', description: 'Custom LLM pipeline for intelligent processing', complexity: 'High' },
                        { name: 'User Authentication', description: 'OAuth2 + magic link flow with RLS', complexity: 'Low' },
                        { name: 'Real-time Dashboard', description: 'Live data visualization with websockets', complexity: 'Medium' },
                        { name: 'API Integrations', description: 'Third-party data source connectors', complexity: 'Medium' },
                        { name: 'Admin Panel', description: 'Internal management and analytics interface', complexity: 'High' },
                    ],
                    techStack: [
                        'Next.js 15', 
                        'Tailwind CSS', 
                        'Supabase Edge Functions', 
                        'PostgreSQL (Supabase)', 
                        'OpenAI API'
                    ],
                    agencyCostMin: 22000,
                    agencyCostMax: 48000,
                    timelineMinWeeks: 8,
                    timelineMaxWeeks: 18,
                    engineersMin: 2,
                    engineersMax: 4,
                    agencyPhases: [
                        { phase: 'Discovery & Architecture', duration: '1–2 weeks', cost: '$3,000–$8,000' },
                        { phase: 'UI/UX Design', duration: '2–3 weeks', cost: '$4,000–$10,000' },
                        { phase: 'Core Development', duration: '4–10 weeks', cost: '$10,000–$24,000' },
                        { phase: 'QA & Testing', duration: '1–2 weeks', cost: '$3,000–$5,000' },
                        { phase: 'Deployment & Handoff', duration: '1 week', cost: '$2,000–$4,000' },
                    ],
                    mr2Labs: {
                        sprintTime: '72 hours',
                        approach: 'I strip away everything that isn\'t core user value. Instead of spending weeks on design systems, I use battle-tested component libraries and ship a working, authenticated, AI-powered product in 3 days.',
                        coreFeatures: ['AI analysis engine with real user input', 'Authentication + user dashboard', 'Core data processing loop'],
                        skippedForMVP: ['Advanced admin panel', 'Custom analytics reporting', 'White-label features'],
                    },
                });
                setStage(2);
            }, 400);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReveal = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUnlocking(true);
        try {
            await fetch('/api/generate-estimate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, idea, slug, estimateData, baseFeatures }),
            });
        } catch (_) {}
        setTimeout(() => { setIsUnlocking(false); setStage(3); }, 1000);
    };

    return (
        <div className="flex flex-col w-full p-[1px] rounded-[32px] bg-gradient-to-b from-blue-500/30 to-white/5 shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)]">
            <div className="bg-[#080808] rounded-[31px] p-6 md:p-8 relative overflow-hidden flex flex-col gap-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full pointer-events-none" />

                {/* ── STAGE 1: IDEA INPUT ── */}
                {stage === 1 && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="mb-6">
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">CTO Intelligence Report</p>
                            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Describe Your App</h3>
                            <p className="text-sm text-slate-400">Plain English. Our AI will reverse-engineer the full architecture, costs, and a rapid build plan.</p>
                        </div>

                        {/* Analysis Progress UI */}
                        {isAnalyzing && (
                            <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex justify-between items-end mb-2">
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest animate-pulse">
                                        {statusMessages[statusIndex]}
                                    </p>
                                    <p className="text-[10px] font-mono text-slate-500">{Math.round(progress)}%</p>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleAnalyze} className={`flex flex-col gap-5 transition-opacity duration-500 ${isAnalyzing ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.15em]">Your idea</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={idea}
                                    onChange={e => setIdea(e.target.value)}
                                    placeholder={`e.g. "A marketplace where local photographers sell Lightroom presets, with AI-generated preview mockups for buyers before purchase..."`}
                                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all resize-none text-sm leading-relaxed"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isAnalyzing || idea.trim().length < 15}
                                className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl disabled:opacity-40 transition-all transform hover:-translate-y-0.5 hover:shadow-blue-500/40"
                            >
                                {isAnalyzing ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Processing Architecture...</span></>
                                ) : (
                                    <><span>Analyze My App</span><i className="fas fa-bolt text-yellow-400 group-hover:scale-125 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* ── STAGE 2: SHOCK + GATE ── */}
                {stage === 2 && estimateData && (
                    <div className="animate-in slide-in-from-right-8 fade-in duration-500 flex flex-col gap-6">

                        {/* App Identity */}
                        <div className="pb-5 border-b border-white/5">
                            <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">Analysis Complete</p>
                            <h3 className="text-2xl font-black text-white mb-1">{estimateData.appName}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{estimateData.summary}</p>
                        </div>

                        {/* Tech Stack Tags */}
                        <div>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Required Stack</p>
                            <div className="flex flex-wrap gap-1.5">
                                {estimateData.techStack.map((t: string, i: number) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-semibold">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Feature Complexity</p>
                            <div className="flex flex-col gap-2">
                                {estimateData.features.map((f, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <span className={`mt-0.5 shrink-0 px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${complexityBadge(f.complexity)}`}>{f.complexity}</span>
                                        <div>
                                            <p className="text-xs font-bold text-white mb-0.5">{f.name}</p>
                                            <p className="text-[11px] text-slate-500 leading-relaxed">{f.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Traditional Agency Shock */}
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-red-500/30 to-transparent">
                            <div className="p-5 bg-[#130a0a] rounded-[15px] border border-red-500/20">
                                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    Traditional Agency Estimate
                                </p>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="text-center p-3 rounded-xl bg-black/40">
                                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-wider mb-1">Total Cost</p>
                                        <p className="text-sm font-black text-red-400 leading-tight">${estimateData.agencyCostMin.toLocaleString()}<br/>– ${estimateData.agencyCostMax.toLocaleString()}</p>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-black/40">
                                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-wider mb-1">Timeline</p>
                                        <p className="text-sm font-black text-red-400 leading-tight">{estimateData.timelineMinWeeks}–{estimateData.timelineMaxWeeks}<br/>Weeks</p>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-black/40">
                                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-wider mb-1">Team</p>
                                        <p className="text-sm font-black text-red-400 leading-tight">{estimateData.engineersMin}–{estimateData.engineersMax}<br/>Engineers</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    {estimateData.agencyPhases.map((p, i) => (
                                        <div key={i} className="flex justify-between text-[11px] py-1.5 border-t border-white/5">
                                            <span className="text-slate-400">{p.phase}</span>
                                            <span className="text-slate-500">{p.duration} · <span className="text-red-400 font-semibold">{p.cost}</span></span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* BLURRED GATE */}
                        <div className="relative rounded-2xl overflow-hidden">
                            {/* Ghost content beneath blur */}
                            <div className="p-5 bg-gradient-to-br from-blue-950/60 to-indigo-950/40 border border-blue-500/20 select-none pointer-events-none blur-sm">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">⚡ Mr² Labs — 72hr Sprint</p>
                                <div className="space-y-2 mb-4">
                                    {[0, 1, 2].map(i => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-green-500/20" />
                                            <div className={`h-3 bg-white/20 rounded ${i === 0 ? 'w-48' : i === 1 ? 'w-36' : 'w-40'}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="h-16 bg-white/5 rounded-xl" />
                            </div>

                            {/* Overlay Gate */}
                            <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-3">
                                    <i className="fas fa-lock text-blue-400 text-sm" />
                                </div>
                                <h4 className="text-base font-black text-white mb-1">Unlock the 72hr Blueprint</h4>
                                <p className="text-xs text-slate-400 mb-5 max-w-[220px] leading-relaxed">See exactly how we build this in 72 hours and at what price.</p>
                                <form onSubmit={handleReveal} className="w-full space-y-2">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="founder@startup.com"
                                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-sm transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isUnlocking}
                                        className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.15em] transition-all hover:bg-blue-500 disabled:opacity-50"
                                    >
                                        {isUnlocking ? 'Sending Blueprint...' : 'Reveal the Plan →'}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                )}

                {/* ── STAGE 3: REVEAL ── */}
                {stage === 3 && estimateData && (() => {
                    // Compute Mr² Labs price
                    const averageCost = (estimateData.agencyCostMin + estimateData.agencyCostMax) / 2;
                    const mr2Price = estimateData.isSimpleBuild 
                        ? Math.round((averageCost * 0.25) / 100) * 100 
                        : Math.round((averageCost * 0.1) / 500) * 500;
                    const mr2PriceFormatted = `$${mr2Price.toLocaleString()}`;

                    return (
                    <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 flex flex-col gap-6">

                        {/* Confirmation Banner */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/15 border border-green-500/25">
                            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                                <i className="fas fa-check text-sm text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white leading-tight">Blueprint Sent!</p>
                                <p className="text-[11px] text-slate-300">Full report delivered to <span className="text-green-400 font-semibold">{email}</span></p>
                            </div>
                        </div>

                        {/* PRICING CARD */}
                        <div className="relative p-1 rounded-2xl bg-gradient-to-br from-blue-500/40 via-indigo-500/20 to-transparent">
                            <div className="absolute -top-3 left-5">
                                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30">Mr² Labs Price</span>
                            </div>
                            <div className="p-5 pt-7 bg-[#080f1e] rounded-[15px]">
                                <div className="flex items-end justify-between mb-1">
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">{estimateData.isSimpleBuild ? 'Full Build Starts from' : 'MVP Starts from'}</p>
                                        <p className="text-4xl font-black text-white tracking-tight">{mr2PriceFormatted}</p>
                                        <p className="text-[11px] text-slate-400 mt-1">
                                            vs. traditional <span className="text-red-400 line-through">${estimateData.agencyCostMin.toLocaleString()}–${estimateData.agencyCostMax.toLocaleString()}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-black">72 Hours</span>
                                        <p className="text-[10px] text-slate-500 mt-1">Delivered</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                                    <i className="fas fa-shield-alt text-blue-400 text-xs" />
                                    <p className="text-[11px] text-slate-300">{estimateData.isSimpleBuild ? 'High-converting full product' : 'Working MVP or your money back'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Tags (Revealed) */}
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Required Tech Architecture</p>
                            <div className="flex flex-wrap gap-1.5">
                                {estimateData.techStack.map((t: string, i: number) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 font-semibold">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Mr² Labs Sprint Plan */}
                        <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/8">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">⚡ {estimateData.isSimpleBuild ? 'Fast Implementation Plan' : 'The 72hr Sprint Plan'}</p>
                            </div>
                            <p className="text-sm text-slate-200 leading-relaxed mb-5">{estimateData.mr2Labs.approach}</p>

                            <div className={`grid ${estimateData.isSimpleBuild ? 'grid-cols-1' : 'grid-cols-2'} gap-5`}>
                                <div>
                                    <p className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-3">We Build Now</p>
                                    <ul className="space-y-2">
                                        {estimateData.mr2Labs.coreFeatures.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <i className="fas fa-check text-green-400 mt-0.5 text-[10px] shrink-0" />
                                                <span className="text-xs text-slate-200 leading-snug">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {!estimateData.isSimpleBuild && (
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Saved for V2</p>
                                    <ul className="space-y-2">
                                        {estimateData.mr2Labs.skippedForMVP.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <i className="fas fa-arrow-right text-slate-600 mt-0.5 text-[10px] shrink-0" />
                                                <span className="text-xs text-slate-500 leading-snug">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                        </div>

                        {/* Founder Partnership Promise */}
                        <div className="p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">🤝 {estimateData.isSimpleBuild ? 'Post-Launch Partnership' : 'The Full Journey — Not Just the MVP'}</p>
                            <p className="text-sm text-slate-200 leading-relaxed mb-4">
                                {estimateData.isSimpleBuild 
                                    ? "We don't just launch a site and disappear. We optimize for speed and conversions. You get complete ownership and a high-performance foundation built to grow."
                                    : "We don't hand you the code and disappear. After the MVP we validate it together — real users, real feedback. Then when you're ready, we build the final product from 0 to 1, acting as your technical co-founder."}
                            </p>
                            {!estimateData.isSimpleBuild && (
                            <div className="grid grid-cols-3 gap-2 text-center">
                                {[
                                    { icon: 'fa-rocket', label: 'Sprint MVP', sub: '72 hours' },
                                    { icon: 'fa-chart-line', label: 'Validate', sub: 'Real users' },
                                    { icon: 'fa-code', label: 'Build V2', sub: 'You own it all' },
                                ].map((item, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <i className={`fas ${item.icon} text-blue-400 mb-2 text-sm`} />
                                        <p className="text-[11px] font-bold text-white">{item.label}</p>
                                        <p className="text-[10px] text-slate-500">{item.sub}</p>
                                    </div>
                                ))}
                            </div>
                            )}
                        </div>

                        {/* How It Works */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Steps</p>
                            {[
                                { n: '1', title: 'Book a Free 15-Min Call', desc: "We scope, align, and confirm your fixed sprint price. Zero commitment required." },
                                { n: '2', title: 'Fixed Invoice — No Hourly Billing', desc: 'One flat rate. You know exactly what you pay before a single line of code.' },
                                { n: '3', title: estimateData.isSimpleBuild ? 'Website Live Fast' : 'MVP Live in 72 Hours', desc: 'Working code, deployed. Your idea becomes real. You own 100% of it.' },
                            ].map(step => (
                                <div key={step.n} className="flex gap-3 group">
                                    <div className="w-7 h-7 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">{step.n}</div>
                                    <div className="pt-0.5">
                                        <p className="text-sm font-bold text-white mb-0.5">{step.title}</p>
                                        <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => window.open(process.env.NEXT_PUBLIC_CALENDLY_URL, '_blank')}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all transform hover:-translate-y-0.5 hover:shadow-white/30"
                        >
                            <span>Book Free 15-Min Strategy Call</span>
                            <i className="fas fa-calendar-check opacity-60" />
                        </button>

                        <div className="text-center">
                            <p className="text-[10px] text-slate-600 mb-3 font-light">Not ready to chat? Take the blueprint with you.</p>
                            <button
                                onClick={() => window.open('/72-Hour-MVP-Blueprint.pdf', '_blank')}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-transparent border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-[0.15em] transition-all hover:border-blue-500/40 hover:text-blue-300 hover:bg-blue-500/5"
                            >
                                <i className="fas fa-file-arrow-down text-blue-400" />
                                <span>Download Sample Blueprint PDF</span>
                            </button>
                        </div>

                    </div>
                    );
                })()}
            </div>

            <div className="py-3 text-center">
                <p className="text-[9px] text-slate-700 uppercase font-black tracking-[0.3em]">Trusted by venture-backed founders worldwide</p>
            </div>
        </div>
    );
}
