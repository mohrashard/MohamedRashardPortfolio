"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, Github, Code2, Users, Star, Lock, Unlock, Mail, ShieldAlert, Zap, CheckCircle2 } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const TERMINAL_STEPS = [
    "Establishing connection to GitHub REST API...",
    "Cloning repository metadata...",
    "Analyzing historical commit frequencies...",
    "Parsing language diversity vectors...",
    "Querying LLM for technical evaluation...",
    "Compiling final developer score..."
];

export default function GithubAnalyzer() {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("idle"); // idle | analyzing | score | unlocked
    const [result, setResult] = useState(null);
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [terminalStep, setTerminalStep] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (status === "idle" && inputRef.current) inputRef.current.focus();
    }, [status]);

    useEffect(() => {
        if (status === "analyzing") {
            const interval = setInterval(() => {
                setTerminalStep(prev => (prev < TERMINAL_STEPS.length - 1 ? prev + 1 : prev));
            }, 600);
            return () => clearInterval(interval);
        }
    }, [status]);

    const executeDiagnostic = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setStatus("analyzing");
        setTerminalStep(0);
        
        try {
            const res = await fetch('/api/github-analyzer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });
            const data = await res.json();
            
            setTimeout(() => {
                if (data.success) {
                    setResult(data.data);
                    setStatus("score");
                } else {
                    alert(data.error || "Analysis failed.");
                    setStatus("idle");
                }
            }, 1000);
        } catch (error) {
            console.error(error);
            setStatus("idle");
        }
    };

    const handleUnlock = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        try {
            await fetch('/api/github-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, gitResult: result })
            });
            setStatus("unlocked");
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden">
            
            {/* Ambient Background - Terminal/Code Vibe */}
            <div className="fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/labs" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl">
                    
                    {/* Header */}
                    <div className="p-8 md:px-12 md:py-10 border-b border-white/[0.04]">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                            <Github size={12} /> Recruitment Diagnostic
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                            GitHub Profile Analyzer
                        </h1>
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                        
                        {/* STATE 1: Input */}
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto text-center">
                                <h2 className="text-xl md:text-2xl font-medium text-white mb-4 leading-tight" style={fontHeadline}>
                                    Enter a developer's GitHub username.
                                </h2>
                                <p className="text-zinc-400 text-sm mb-10" style={fontBody}>
                                    We will extract their public repositories, calculate their code consistency, and generate a technical hiring verdict.
                                </p>

                                <form onSubmit={executeDiagnostic} className="group max-w-md mx-auto">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <span className="text-zinc-500 font-mono text-lg">@</span>
                                        </div>
                                        <input 
                                            type="text"
                                            ref={inputRef}
                                            required
                                            className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl pl-12 pr-6 py-5 text-zinc-100 text-lg focus:outline-none focus:border-[var(--primary)]/50 transition-all shadow-inner font-mono"
                                            placeholder="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" disabled={!username.trim()} className="mt-6 w-full inline-flex justify-center items-center gap-3 px-8 py-4 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#0055d4] disabled:opacity-30 transition-all" style={fontLabel}>
                                        Run Diagnostic <ChevronRight size={16} />
                                    </button>
                                </form>

                                <div className="mt-10 p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 inline-block">
                                    <p className="text-xs text-[var(--accent)] font-medium" style={fontBody}>
                                        Try evaluating <button type="button" onClick={() => setUsername('mohrashard')} className="font-bold underline decoration-[var(--primary)]/50 hover:text-[var(--primary)] text-zinc-300">my profile</button> to see what a top-tier score looks like.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* STATE 2: Analyzing */}
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <Github size={40} className="text-[var(--accent)] animate-pulse mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative">
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100' : 'opacity-0'}`}>
                                                <span className="text-[var(--primary)]">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-zinc-500'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STATE 3: Score & Gated Assessment */}
                        {(status === "score" || status === "unlocked") && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
                                
                                {/* Profile Header */}
                                <div className="flex items-center gap-6 mb-10 pb-8 border-b border-white/[0.05]">
                                    <img src={result.metrics.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-[var(--primary)]/30" />
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white" style={fontHeadline}>{result.metrics.name}</h2>
                                        <a href={`https://github.com/${result.metrics.username}`} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] text-sm hover:underline font-mono">@{result.metrics.username}</a>
                                    </div>
                                </div>

                                {/* Hard Metrics Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center text-center">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Dev Score</div>
                                        <h3 className="text-3xl font-black text-white">{result.metrics.baseScore}</h3>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center text-center">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Consistency</div>
                                        <h3 className="text-2xl font-black text-[var(--primary)]">{result.metrics.consistencyScore}%</h3>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center text-center">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Diversity</div>
                                        <h3 className="text-2xl font-black text-[var(--accent)]">{result.metrics.diversityScore}%</h3>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center text-center">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Repositories</div>
                                        <h3 className="text-2xl font-black text-white">{result.metrics.repoCount}</h3>
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="mb-12">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3" style={fontLabel}>Stack Detected</div>
                                    <div className="flex flex-wrap gap-2">
                                        {result.metrics.languages.map((lang, i) => (
                                            <span key={i} className="px-3 py-1 rounded bg-white/[0.03] border border-white/[0.1] text-xs font-mono text-zinc-300">{lang}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Gate or Content */}
                                {status === "score" ? (
                                    <div className="p-8 rounded-[2rem] bg-[#050505] border border-[var(--primary)]/20 shadow-2xl relative overflow-hidden group text-center max-w-2xl mx-auto">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--primary)]/10 rounded-full blur-[60px] pointer-events-none" />
                                        
                                        <Lock size={24} className="text-[var(--accent)] mx-auto mb-4" />
                                        <h4 className="text-xl font-bold text-white mb-2" style={fontHeadline}>Unlock the CTO Verdict</h4>
                                        <p className="text-zinc-400 text-sm mb-8" style={fontBody}>
                                            See the AI-generated breakdown of their technical strengths, red flags, and our final recommendation on whether you should hire them to build your MVP.
                                        </p>
                                        
                                        <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                                            <input 
                                                type="email" placeholder="founder@startup.com" 
                                                required value={email} onChange={(e) => setEmail(e.target.value)} 
                                                className="w-full px-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white focus:border-[var(--primary)] outline-none transition-all text-sm text-center" 
                                            />
                                            <button type="submit" disabled={isSending || !email} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-[var(--primary)] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                                {isSending ? <><Activity size={16} className="animate-spin" /> Fetching Report...</> : <><Unlock size={16} /> Reveal Hiring Verdict</>}
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="p-8 rounded-2xl bg-[#050505] border border-white/[0.08] mb-8">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-4" style={fontLabel}>Technical Summary</h3>
                                            <p className="text-zinc-200 leading-relaxed font-medium" style={fontBody}>{result.analysis.summary}</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-emerald-500/20">
                                                <h4 className="text-emerald-400 font-bold text-sm mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> Strengths</h4>
                                                <ul className="space-y-3">
                                                    {result.analysis.strengths.map((s, i) => (
                                                        <li key={i} className="text-sm text-zinc-300 leading-relaxed">• {s}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-rose-500/20">
                                                <h4 className="text-rose-400 font-bold text-sm mb-4 flex items-center gap-2"><ShieldAlert size={16} /> Technical Gaps</h4>
                                                <ul className="space-y-3">
                                                    {result.analysis.gaps.map((g, i) => (
                                                        <li key={i} className="text-sm text-zinc-300 leading-relaxed">• {g}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/30 text-center relative overflow-hidden">
                                            <Zap size={24} className="text-[var(--primary)] mx-auto mb-4" />
                                            <h4 className="text-xl font-bold text-white mb-3" style={fontHeadline}>Don't gamble your MVP build.</h4>
                                            <p className="text-zinc-300 text-sm leading-relaxed max-w-lg mx-auto mb-6 italic" style={fontBody}>"{result.analysis.hire_recommendation}"</p>
                                            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">If you need a guaranteed top-tier architect to build your MVP right the first time, Mr² Labs ships production-ready applications in 72 hours.</p>
                                            
                                            <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"} target="_blank" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                                Book MVP Deployment
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
