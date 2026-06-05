"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, TrendingUp, Lock, Unlock, AlertTriangle, ShieldCheck } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

// ── Master Quiz Logic ───────────────────────────────────────
const QUIZ_DATA = [
    { section: "Problem & Market", q: "Have you interviewed at least 20 potential customers about this problem?", options: [ { text: "Yes, more than 20", points: 10 }, { text: "Yes, between 10 and 20", points: 6 }, { text: "Yes, fewer than 10", points: 3 }, { text: "No", points: 0 } ] },
    { section: "Problem & Market", q: "Can you describe your target market size with data to back it up?", options: [ { text: "Yes, with specific data sources", points: 8 }, { text: "Yes, roughly", points: 4 }, { text: "Not yet", points: 0 } ] },
    { section: "Problem & Market", q: "Is the problem you are solving one that people are actively spending money to fix right now?", options: [ { text: "Yes, existing paid solutions", points: 7 }, { text: "People pay for workarounds", points: 5 }, { text: "No direct spending yet", points: 0 } ] },
    { section: "Traction", q: "Do you have a live product that real users have touched?", options: [ { text: "Yes, live with paying customers", points: 15 }, { text: "Yes, live with free users", points: 10 }, { text: "Waitlist or landing page only", points: 5 }, { text: "No product yet", points: 0 } ] },
    { section: "Traction", q: "What is your current Monthly Recurring Revenue (MRR)?", options: [ { text: "Over $5,000 MRR", points: 15 }, { text: "$1,000 to $5,000 MRR", points: 10 }, { text: "Under $1,000 MRR", points: 5 }, { text: "Pre-revenue", points: 0 } ] },
    { section: "Team", q: "Does your founding team have direct experience in the industry you are disrupting?", options: [ { text: "Yes, deep domain expertise", points: 8 }, { text: "Somewhat related experience", points: 4 }, { text: "No direct experience", points: 0 } ] },
    { section: "Team", q: "Does your team have a technical co-founder or senior developer?", options: [ { text: "Yes, full-time technical co-founder", points: 7 }, { text: "Yes, contracted senior developer", points: 4 }, { text: "No technical person yet", points: 0 } ] },
    { section: "Team", q: "Have any of your founders successfully built and sold a company before?", options: [ { text: "Yes", points: 5 }, { text: "No", points: 0 } ] },
    { section: "Preparedness", q: "Do you have a pitch deck ready?", options: [ { text: "Yes, reviewed by at least one investor", points: 6 }, { text: "Yes, first draft", points: 3 }, { text: "No", points: 0 } ] },
    { section: "Preparedness", q: "Do you know your target raise amount and what you will spend it on?", options: [ { text: "Yes, detailed allocation ready", points: 5 }, { text: "Roughly", points: 2 }, { text: "No", points: 0 } ] },
    { section: "Preparedness", q: "Do you have warm introductions to at least 5 relevant investors?", options: [ { text: "Yes, 5 or more", points: 4 }, { text: "1 to 4 warm intros", points: 2 }, { text: "No warm intros yet", points: 0 } ] },
    { section: "Product & Defensibility", q: "Can you explain why your solution cannot be easily copied in one sentence?", options: [ { text: "Yes, clear defensible moat", points: 4 }, { text: "Somewhat", points: 2 }, { text: "Not really", points: 0 } ] },
    { section: "Product & Defensibility", q: "Have you shipped a new product feature or meaningful update in the last 30 days?", options: [ { text: "Yes", points: 3 }, { text: "No", points: 0 } ] },
    { section: "Product & Defensibility", q: "Do you have at least one case study or success story from a real customer?", options: [ { text: "Yes, documented with metrics", points: 3 }, { text: "Yes, anecdotal", points: 1 }, { text: "No", points: 0 } ] },
    { section: "Momentum", q: "Have you had any investor conversations in the last 90 days?", options: [ { text: "Yes, term sheet or serious discussions", points: 5 }, { text: "Yes, introductory calls", points: 2 }, { text: "No", points: 0 } ] }
];

const TERMINAL_STEPS = [
    "Evaluating market validation parameters...",
    "Calculating MRR and traction velocity...",
    "Assessing team domain expertise...",
    "Analyzing defensibility moats...",
    "Computing final venture readiness score..."
];

export default function FundraisingReadiness() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | calculating | score | unlocked
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [terminalStep, setTerminalStep] = useState(0);

    // Calc score
    const totalScore = answers.reduce((acc, curr) => acc + curr.points, 0);

    // Get Verdict
    const getVerdict = () => {
        if (totalScore <= 30) return {
            title: "Pre-Fundraising Stage",
            badge: "bg-rose-500", border: "border-rose-500/30", text: "text-rose-400",
            label: "Focus on traction first.",
            message: "Most investors at pre-seed and seed want to see evidence that real people have the problem and will pay to solve it. Your priority right now is not a pitch deck — it is getting 10 paying customers or 500 engaged waitlist signups.",
            hook: "The fastest way to move from this score to the next band is a live product users can react to. Mr² Labs ships that in 72 hours."
        };
        if (totalScore <= 55) return {
            title: "Early Stage",
            badge: "bg-orange-500", border: "border-orange-500/30", text: "text-orange-400",
            label: "Getting there.",
            message: "You have validated the problem and have early signs of traction. The gap between you and a fundable round is proof that this works at a slightly larger scale. Focus on more customer conversations and a strong case study.",
            hook: "Your biggest unlock right now is a product investors can actually click. If you are still building, that is the bottleneck holding your score back."
        };
        if (totalScore <= 75) return {
            title: "Fundable",
            badge: "bg-blue-500", border: "border-blue-500/30", text: "text-blue-400",
            label: "Investor-ready with gaps.",
            message: "You have the fundamentals. Most investors will take a meeting at this stage. Your focus now is tightening the story — a cleaner pitch deck, sharper market sizing, and at least one metric that shows momentum month over month.",
            hook: "Investors at this stage will ask to see the product in the first meeting. If your demo is not polished, that is the first thing to fix."
        };
        return {
            title: "Strong Position",
            badge: "bg-emerald-500", border: "border-emerald-500/30", text: "text-emerald-400",
            label: "Go raise.",
            message: "Your fundamentals are strong. You should be in active investor conversations right now. Focus on creating competitive tension in your process.",
            hook: "At this stage, speed of execution is your signal to investors that you are the team that ships. If there is anything technical you need to move faster, that is where we come in."
        };
    };

    const verdict = getVerdict();
    const gaps = answers.filter(a => a.points === 0);

    useEffect(() => {
        if (status === "calculating") {
            const interval = setInterval(() => {
                setTerminalStep(prev => (prev < TERMINAL_STEPS.length - 1 ? prev + 1 : prev));
            }, 600);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleOptionSelect = (option) => {
        const newAnswers = [...answers, { question: QUIZ_DATA[step].q, answer: option.text, points: option.points }];
        setAnswers(newAnswers);

        if (step < QUIZ_DATA.length - 1) {
            setStep(step + 1);
        } else {
            executeDiagnostic();
        }
    };

    const executeDiagnostic = () => {
        setStatus("calculating");
        setTerminalStep(0);
        setTimeout(() => { setStatus("score"); }, 3500);
    };

    const handleUnlock = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        try {
            await fetch('/api/fundraising-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, score: totalScore, verdict, badgeColor: verdict.badge, gaps, answers })
            });
            setStatus("unlocked");
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
    };

    const progress = ((step) / QUIZ_DATA.length) * 100;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden">
            
            {/* Ambient Background */}
            <div className="fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className={`fixed bottom-[10%] left-[10%] w-[500px] h-[500px] ${status === 'score' || status === 'unlocked' ? verdict.badge.replace('bg-', 'bg-').replace('500', '500/10') : 'bg-[var(--primary)]/5'} rounded-full blur-[150px] pointer-events-none mix-blend-screen transition-all duration-1000`} />

            <div className="max-w-3xl mx-auto relative z-10">
                <Link href="/labs" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl">
                    
                    {/* Header */}
                    <div className="p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <TrendingUp size={12} /> Venture Capital Diagnostic
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                Fundraising Scorecard
                            </h1>
                        </div>
                        {status === "idle" && (
                            <div className="w-full md:w-48 text-right">
                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3 flex justify-between" style={fontLabel}>
                                    <span>{QUIZ_DATA[step].section}</span>
                                    <span>{step + 1} / {QUIZ_DATA.length}</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                    <div className="h-full bg-[var(--primary)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                        
                        {/* STATE 1: Questions */}
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                                <h2 className="text-xl md:text-2xl font-medium text-white mb-10 leading-relaxed" style={fontHeadline}>
                                    {QUIZ_DATA[step].q}
                                </h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {QUIZ_DATA[step].options.map((opt, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleOptionSelect(opt)}
                                            className="w-full p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:border-[var(--primary)]/50 transition-all text-left text-zinc-200 text-sm md:text-base font-medium group"
                                            style={fontBody}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{opt.text}</span>
                                                <ChevronRight size={16} className="text-zinc-500 group-hover:text-[var(--primary)] transform group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STATE 2: Calculating */}
                        {status === "calculating" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <Activity size={40} className="text-[var(--accent)] animate-pulse mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl">
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100' : 'opacity-0'}`}>
                                                <span className="text-[var(--primary)]">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-[var(--primary)]/60'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STATE 3: Score Reveal (Gated Breakdown) */}
                        {status === "score" && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full text-center">
                                
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.1] text-white text-[10px] font-bold uppercase tracking-widest mb-8">
                                    <div className={`w-2 h-2 rounded-full ${verdict.badge} animate-pulse`} />
                                    Diagnostic Complete
                                </div>

                                {/* Big Score Display */}
                                <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className={`${verdict.text} transition-all duration-1000 ease-out`} strokeDasharray="283" strokeDashoffset={283 - (283 * totalScore) / 100} strokeLinecap="round" />
                                    </svg>
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl font-black text-white tabular-nums tracking-tighter">{totalScore}</span>
                                        <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mt-1" style={fontLabel}>/ 100</span>
                                    </div>
                                </div>

                                <h2 className="text-3xl font-extrabold text-white mb-2" style={fontHeadline}>{verdict.title}</h2>
                                <p className={`text-sm font-bold uppercase tracking-widest ${verdict.text} mb-8`} style={fontLabel}>{verdict.label}</p>

                                {/* Lead Capture Box */}
                                <div className="p-8 rounded-[2rem] bg-[#050505] border border-white/[0.08] shadow-2xl relative overflow-hidden group max-w-md mx-auto text-left">
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${verdict.badge.replace('bg-', 'bg-').replace('500', '500/10')} rounded-full blur-[50px] pointer-events-none`} />
                                    
                                    <div className="flex items-center gap-3 mb-4">
                                        <Lock size={18} className="text-[var(--accent)]" />
                                        <h4 className="text-lg font-bold text-white" style={fontHeadline}>Unlock your breakdown.</h4>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-6" style={fontBody}>
                                        See exactly which areas are holding your score back and the specific actions required to fix each one.
                                    </p>
                                    
                                    <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                                        <input 
                                            type="email" 
                                            placeholder="founder@startup.com" 
                                            required value={email} onChange={(e) => setEmail(e.target.value)} 
                                            className="w-full px-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white focus:border-[var(--primary)] outline-none transition-all text-sm" 
                                        />
                                        <button type="submit" disabled={isSending || !email} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-[var(--primary)] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                            {isSending ? <><Activity size={16} className="animate-spin" /> Unlocking...</> : <><Unlock size={16} /> Reveal Gaps</>}
                                        </button>
                                    </form>
                                </div>

                            </div>
                        )}

                        {/* STATE 4: Unlocked Breakdown */}
                        {status === "unlocked" && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full text-left">
                                
                                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/[0.05]">
                                    <div>
                                        <div className={`text-[10px] font-bold uppercase tracking-widest ${verdict.text} mb-2`} style={fontLabel}>Final Score: {totalScore}/100</div>
                                        <h2 className="text-3xl font-extrabold text-white" style={fontHeadline}>{verdict.title}</h2>
                                    </div>
                                    <div className={`w-16 h-16 rounded-full border-4 ${verdict.border} flex items-center justify-center ${verdict.text} font-black text-2xl`}>
                                        {totalScore}
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] mb-10">
                                    <p className="text-zinc-300 leading-relaxed text-sm md:text-base" style={fontBody}>{verdict.message}</p>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2" style={fontHeadline}>
                                    <AlertTriangle size={18} className="text-rose-500" /> Critical Gaps (Scored 0)
                                </h3>
                                
                                {gaps.length > 0 ? (
                                    <div className="space-y-4 mb-12">
                                        {gaps.map((gap, i) => (
                                            <div key={i} className="p-5 rounded-xl bg-[#050505] border border-rose-500/20 border-l-4 border-l-rose-500">
                                                <p className="text-sm font-bold text-zinc-200 mb-2">{gap.question}</p>
                                                <p className="text-xs text-rose-400 uppercase tracking-widest font-bold" style={fontLabel}>Action required before pitching.</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 rounded-xl bg-[#050505] border border-emerald-500/20 border-l-4 border-l-emerald-500 flex items-center gap-3 mb-12">
                                        <ShieldCheck size={20} className="text-emerald-500" />
                                        <p className="text-sm font-medium text-emerald-100">You crushed the fundamentals. You have no zero-score gaps.</p>
                                    </div>
                                )}

                                {/* The Mr2 Labs Hook */}
                                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/30 text-center">
                                    <Zap size={24} className="text-[var(--primary)] mx-auto mb-4" />
                                    <h4 className="text-xl font-bold text-white mb-3" style={fontHeadline}>Fix your technical bottlenecks.</h4>
                                    <p className="text-zinc-300 text-sm leading-relaxed max-w-lg mx-auto mb-8" style={fontBody}>{verdict.hook}</p>
                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"} target="_blank" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                        Book MVP Deployment
                                    </a>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
