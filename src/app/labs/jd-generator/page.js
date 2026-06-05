"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, FileText, Code2, Briefcase, Download, Mail, DollarSign } from 'lucide-react';

// ── Shared font tokens ──────────────────────────────────────
const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const QUESTIONS = [
    { id: "role", label: "What role are you hiring for? (e.g., Founding Full Stack Engineer)" },
    { id: "stack", label: "What is your primary tech stack? (e.g., Next.js, Supabase, Tailwind)" },
    { id: "stage", label: "What is your company stage? (e.g., Bootstrapped, Seed, Series A)" },
    { id: "challenge", label: "What is the biggest technical challenge this person will solve in their first 3 months?" }
];

const TERMINAL_STEPS = [
    "Parsing stack requirements and architectural constraints...",
    "Eliminating generic HR jargon and buzzwords...",
    "Injecting senior-level technical responsibilities...",
    "Calibrating market salary data for role tier...",
    "Compiling tech-native job description..."
];

export default function JDGenerator() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentInput, setCurrentInput] = useState("");
    const [status, setStatus] = useState("idle"); 
    const [result, setResult] = useState(null);
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    
    const [terminalStep, setTerminalStep] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (status === "idle" && inputRef.current) inputRef.current.focus();
    }, [step, status]);

    useEffect(() => {
        if (status === "analyzing") {
            const interval = setInterval(() => {
                setTerminalStep(prev => (prev < TERMINAL_STEPS.length - 1 ? prev + 1 : prev));
            }, 700);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleNext = async () => {
        if (!currentInput.trim()) return;
        const currentQ = QUESTIONS[step].label;
        const newAnswers = { ...answers, [currentQ]: currentInput };
        setAnswers(newAnswers);
        setCurrentInput("");

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            await executeDiagnostic(newAnswers);
        }
    };

    const executeDiagnostic = async (finalAnswers) => {
        setStatus("analyzing");
        setTerminalStep(0);
        
        try {
            const res = await fetch('/api/jd-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers })
            });
            const data = await res.json();
            setTimeout(() => {
                if (data.success) {
                    setResult(data.data);
                    setStatus("complete");
                } else {
                    alert("Generation failed. Please try again.");
                    setStatus("idle");
                }
            }, 1000);
        } catch (error) {
            console.error(error);
            setStatus("idle");
        }
    };

    const handleSendReport = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        try {
            await fetch('/api/jd-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, jdResult: result, answers })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
    };

    const progress = ((step) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8">
            <style dangerouslySetInnerHTML={{__html: `@media print { @page { margin: 0; } body { background-color: #050505 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } header, footer, nav { display: none !important; } }`}} />

            
            <div className="print:hidden fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Briefcase size={12} /> Recruitment Infrastructure
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                Tech JD Generator
                            </h1>
                        </div>
                        {status === "idle" && (
                            <div className="w-full md:w-48 text-right">
                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3" style={fontLabel}>Parameter {step + 1} of {QUESTIONS.length}</div>
                                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-700" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center print:p-0">
                        
                        
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    {QUESTIONS[step].label}
                                </h2>
                                <div className="relative group">
                                    <textarea 
                                        ref={inputRef}
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl p-6 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-[var(--primary)]/50 transition-all resize-none shadow-inner"
                                        rows={3}
                                        placeholder="Type your answer here..."
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!currentInput.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#0055d4] disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                        {step === QUESTIONS.length - 1 ? "Generate JD" : "Next"} <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <FileText size={40} className="text-[var(--primary)] animate-pulse mb-8" />
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

                        
                        {status === "complete" && result && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                <div className="hidden print:block mb-10 pb-6 border-b border-white/[0.1]">
                                    <h1 className="text-4xl font-black text-white uppercase tracking-tight" style={fontHeadline}>Job Description</h1>
                                    <p className="text-zinc-400 text-sm mt-2" style={fontBody}>Architected by Mr² Labs</p>
                                </div>

                                <div className="flex items-center justify-between border-b border-white/[0.05] pb-6 mb-8 print:border-none print:pb-0 print:mb-4">
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-white" style={fontHeadline}>{result.role_title}</h2>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)]">
                                        <DollarSign size={14} />
                                        <span className="text-[10px] font-bold tracking-widest font-mono">{result.salary_range}</span>
                                    </div>
                                </div>

                                <div className="prose prose-invert prose-zinc max-w-none mb-16 print:mb-8">
                                    <p className="text-lg text-zinc-300 font-medium italic border-l-2 border-[var(--primary)] pl-4" style={fontBody}>
                                        "{result.the_pitch}"
                                    </p>

                                    <h3 className="text-[var(--accent)] font-bold uppercase tracking-widest text-xs mt-8 mb-4" style={fontLabel}>The Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2 mb-8 print:mb-4">
                                        {result.the_stack.map((tech, i) => (
                                            <span key={i} className="px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.08] text-sm text-zinc-200 flex items-center gap-2">
                                                <Code2 size={14} className="text-[var(--primary)]" /> {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-[var(--accent)] font-bold uppercase tracking-widest text-xs mt-8 mb-4" style={fontLabel}>What You Will Do</h3>
                                    <ul className="space-y-2 mb-8 print:mb-4">
                                        {result.what_you_will_do.map((item, i) => (
                                            <li key={i} className="text-zinc-300 flex items-start gap-3">
                                                <span className="text-[var(--primary)] mt-1">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <h3 className="text-[var(--accent)] font-bold uppercase tracking-widest text-xs mt-8 mb-4" style={fontLabel}>Requirements</h3>
                                    <ul className="space-y-2">
                                        {result.requirements.map((item, i) => (
                                            <li key={i} className="text-zinc-300 flex items-start gap-3">
                                                <CheckCircle2 size={16} className="text-[var(--accent)] flex-shrink-0 mt-0.5" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                
                                <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/10 to-[#050505] border border-[var(--primary)]/30 shadow-[0_10px_40px_-10px_rgba(0,102,255,0.2)] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-[80px] pointer-events-none" />
                                    
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1 text-center lg:text-left">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest" style={fontLabel}>
                                                <Activity size={12} /> Stop Waiting
                                            </div>
                                            <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>Need this built right now?</h4>
                                            <p className="text-zinc-300 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed" style={fontBody}>
                                                The average technical hiring cycle takes 3 months. <strong className="text-white">Mr² Labs can architect and deploy your entire MVP in 72 hours.</strong> 
                                                <br/><br/>
                                                Download this JD to start interviewing, but let's book a call to get your v1 shipped this week.
                                            </p>
                                        </div>
                                        
                                        <div className="w-full lg:w-[420px]">
                                            {emailSent ? (
                                                <div className="flex flex-col gap-3 animate-in fade-in">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--accent)]/10 text-[var(--accent)] mb-1">
                                                        <CheckCircle2 size={18} />
                                                        <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Email Confirmed</span>
                                                    </div>
                                                    <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all w-full" style={fontLabel}>
                                                        <Download size={14} /> Download JD
                                                    </button>
                                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0055d4] transition-all shadow-[0_0_20px_rgba(0,102,255,0.4)]" style={fontLabel}>
                                                        Skip Hiring. Book Deployment
                                                    </a>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendReport} className="flex flex-col gap-4">
                                                    <div className="relative">
                                                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"/>
                                                        <input type="email" placeholder="founder@startup.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white focus:border-[var(--primary)] outline-none transition-all" />
                                                    </div>
                                                    <button type="submit" disabled={isSending || !email} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0055d4] disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]" style={fontLabel}>
                                                        {isSending ? <><Activity size={18} className="animate-spin"/> Saving...</> : <><Zap size={18} /> Unlock Download & Next Steps</>}
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
