"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Activity, ChevronRight, Globe, Share2, Mail, Smartphone, AlertTriangle, Search, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { analyzeConversion } from './actions';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const TERMINAL_STEPS = [
    "Establishing secure server connection...",
    "Crawling DOM for form implementations...",
    "Detecting plain-text email leakages...",
    "Scraping OpenGraph social tags...",
    "Verifying Progressive Web App manifest...",
    "Compiling conversion blueprint..."
];

function ConversionAuditContent() {
    const searchParams = useSearchParams();
    const focusParam = searchParams.get('focus');
    
    const defaultTab = ['LEAD', 'SOCIAL', 'PWA'].includes(focusParam?.toUpperCase() || '') 
        ? focusParam?.toUpperCase() 
        : 'LEAD';

    const [domain, setDomain] = useState("");
    const [status, setStatus] = useState("idle"); 
    const [activeTab, setActiveTab] = useState(defaultTab || 'LEAD');
    
    const [auditData, setAuditData] = useState<any>(null);

    // Lead Capture State
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [terminalStep, setTerminalStep] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (status === "idle" && inputRef.current) inputRef.current.focus();
    }, [status]);

    useEffect(() => {
        if (status === "analyzing") {
            const interval = setInterval(() => {
                setTerminalStep(prev => (prev < TERMINAL_STEPS.length - 1 ? prev + 1 : prev));
            }, 300); // Fast scan
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleNext = async () => {
        if (!domain.trim()) return;
        setStatus("analyzing");
        setTerminalStep(0);
        
        // Simulated scanning state
        await new Promise(resolve => setTimeout(resolve, 2000));

        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        const target = `https://${cleanDomain}`;

        const data = await analyzeConversion(target);

        if (data.success) {
            setAuditData(data.data);
        } else {
            // handle error if needed, but for lab we'll just set mock/empty
            setAuditData({
                mailtoLinks: [],
                hasForm: false,
                ogImage: null,
                ogTitle: 'Error fetching',
                ogDescription: 'Error fetching',
                manifest: null,
                url: target
            });
        }

        setStatus("complete");
    };

    const handleSendBlueprint = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        const issues = [];
        if (!auditData?.hasForm || auditData?.mailtoLinks?.length > 0) issues.push("Lead Leakage");
        if (!auditData?.ogImage) issues.push("Missing Social OpenGraph");
        if (!auditData?.manifest) issues.push("Broken PWA Manifest");

        try {
            await fetch('/api/conversion-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, domain: cleanDomain, issues: issues.join(", ") || "General UX Review" })
            });
        } catch (error) {
            console.error(error);
        }
        
        setIsSending(false);
        setEmailSent(true);
    };

    const isLeaking = auditData?.mailtoLinks?.length > 0 || !auditData?.hasForm;
    const isSocialBroken = !auditData?.ogImage;
    const isPwaBroken = !auditData?.manifest;
    
    const hasIssues = isLeaking || isSocialBroken || isPwaBroken;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-orange-500/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8">
            <style dangerouslySetInnerHTML={{__html: `@media print { @page { margin: 0; } body { background-color: #050505 !important; -webkit-print-color-adjust: exact; } header, footer, nav { display: none !important; } }`}} />

            {/* Glassmorphic Ambient Background */}
            <div className="print:hidden fixed top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                <div className="rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden print:bg-transparent print:border-none print:shadow-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Activity size={12} /> UX & Conversion
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                PWA & Social Flow
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center print:p-0 relative">
                        
                        {/* STATE 1: Input */}
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto z-10">
                                <h2 className="text-xl md:text-2xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    Enter domain to audit PWA hooks and Social Graph:
                                </h2>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Globe size={24} className="text-zinc-500" />
                                    </div>
                                    <input 
                                        type="url"
                                        ref={inputRef}
                                        className="w-full bg-black/40 border-2 border-white/[0.05] rounded-2xl py-6 pr-6 pl-14 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-orange-500/50 transition-all shadow-inner backdrop-blur-md"
                                        placeholder="yourstartup.com"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!domain.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 disabled:opacity-30 transition-all shadow-md border border-white/5" style={fontLabel}>
                                        Analyze UX <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STATE 2: Analyzing */}
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in z-10">
                                <Search size={40} className="text-orange-400 animate-pulse mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                                <span className="text-orange-400">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-zinc-500'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STATE 3: Complete Results */}
                        {status === "complete" && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full z-10">
                                
                                <div className="flex gap-4 border-b border-white/[0.05] mb-8 pb-1">
                                    {['LEAD', 'SOCIAL', 'PWA'].map(tab => (
                                        <button 
                                            key={tab} 
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-orange-400 border-b-2 border-orange-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                                            style={fontLabel}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 gap-6 mb-12">
                                    
                                    {activeTab === 'LEAD' && (
                                        <div className="space-y-6">
                                            <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-white/[0.05] flex flex-col md:flex-row gap-8 backdrop-blur-sm">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <Mail size={24} className={isLeaking ? "text-rose-400" : "text-emerald-400"} />
                                                        <h3 className="text-xl font-bold text-white" style={fontHeadline}>Lead Capture & Leakage</h3>
                                                    </div>
                                                    
                                                    {isLeaking ? (
                                                        <div className="space-y-4">
                                                            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10">
                                                                <h4 className="text-rose-400 font-bold mb-2">Vulnerable to Spam & Drop-off</h4>
                                                                <p className="text-sm text-rose-400/80 mb-4">
                                                                    You are using plain `mailto:` links or missing a proper lead form. This invites bot spam and creates friction for users on mobile or webmail.
                                                                </p>
                                                                {auditData.mailtoLinks?.length > 0 && (
                                                                    <div className="bg-black/50 p-3 rounded-lg border border-rose-500/10">
                                                                        <div className="text-[10px] uppercase text-zinc-500 font-bold mb-2" style={fontLabel}>Detected Mailto Links:</div>
                                                                        {auditData.mailtoLinks.map((email: string, i: number) => (
                                                                            <div key={i} className="text-sm text-zinc-300">{email}</div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 flex items-start gap-3">
                                                            <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
                                                            <div>
                                                                <div className="text-emerald-400 font-bold mb-1">Optimized Lead Funnel</div>
                                                                <div className="text-sm text-emerald-400/80">Great job. You are using dedicated forms instead of plain text emails, protecting you from spam and capturing leads efficiently.</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'SOCIAL' && (
                                        <div className="space-y-6">
                                            <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-white/[0.05] backdrop-blur-sm">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Share2 size={24} className={isSocialBroken ? "text-rose-400" : "text-emerald-400"} />
                                                    <h3 className="text-xl font-bold text-white" style={fontHeadline}>Social Share Visualizer</h3>
                                                </div>
                                                
                                                <p className="text-sm text-zinc-400 mb-6">This is how your link looks when shared on platforms like LinkedIn, Twitter, or Slack.</p>

                                                {/* Fake LinkedIn Post */}
                                                <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-2xl border border-zinc-200">
                                                    <div className="p-4 flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
                                                        <div>
                                                            <div className="text-sm font-bold text-zinc-900">John Doe</div>
                                                            <div className="text-[11px] text-zinc-500">Checking out this amazing new startup!</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className={`border-t border-b border-zinc-200 ${isSocialBroken ? 'bg-zinc-100 flex items-center justify-center min-h-[200px]' : 'bg-zinc-100 min-h-[200px] bg-cover bg-center'}`} style={!isSocialBroken ? { backgroundImage: `url(${auditData.ogImage})` } : {}}>
                                                        {isSocialBroken && (
                                                            <div className="text-zinc-400 flex flex-col items-center">
                                                                <AlertTriangle size={32} className="mb-2" />
                                                                <span className="text-sm font-medium">No Image Provided</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="p-3 bg-zinc-50">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">{auditData.url.replace(/^https?:\/\//, '')}</div>
                                                        <div className="text-sm font-bold text-zinc-900 line-clamp-1">{auditData.ogTitle}</div>
                                                        <div className="text-xs text-zinc-600 line-clamp-1 mt-1">{auditData.ogDescription}</div>
                                                    </div>
                                                </div>
                                                
                                                {isSocialBroken && (
                                                    <div className="mt-6 p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 text-sm">
                                                        <strong>Critical Drop-off:</strong> Missing <code className="bg-black/50 px-1 py-0.5 rounded text-xs">&lt;meta property="og:image"&gt;</code>. Links without rich previews have a 70% lower click-through rate on social media.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'PWA' && (
                                        <div className="space-y-6">
                                            <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-white/[0.05] backdrop-blur-sm">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Smartphone size={24} className={isPwaBroken ? "text-rose-400" : "text-emerald-400"} />
                                                    <h3 className="text-xl font-bold text-white" style={fontHeadline}>Mobile "App" Experience (PWA)</h3>
                                                </div>
                                                
                                                <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                                                    
                                                    {/* iPhone Mockup */}
                                                    <div className="w-[280px] h-[560px] bg-black rounded-[40px] border-[8px] border-zinc-800 p-4 relative overflow-hidden shadow-2xl flex-shrink-0">
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-zinc-800 rounded-b-3xl"></div>
                                                        <div className="mt-8 flex flex-col h-full">
                                                            <div className="flex-1 bg-zinc-900 rounded-xl border border-white/5 p-4 flex flex-col">
                                                                <div className="text-xs text-zinc-500 text-center mb-4">{auditData.url.replace(/^https?:\/\//, '')}</div>
                                                                <div className="flex-1 flex items-center justify-center">
                                                                    <Globe size={48} className="text-zinc-700" />
                                                                </div>
                                                                
                                                                {/* Share Sheet Mockup */}
                                                                <div className="bg-zinc-800 rounded-xl p-3 shadow-lg -mt-10 animate-in slide-in-from-bottom-8">
                                                                    <div className="text-[10px] font-bold text-center text-zinc-400 mb-3 border-b border-white/5 pb-2">Share</div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <div className="flex items-center gap-3 p-2">
                                                                            <Share2 size={16} className="text-zinc-300" /> <span className="text-xs text-zinc-300">Copy Link</span>
                                                                        </div>
                                                                        <div className={`flex items-center gap-3 p-2 rounded-lg ${isPwaBroken ? 'opacity-30' : 'bg-white/10'}`}>
                                                                            <Smartphone size={16} className={isPwaBroken ? "text-zinc-500" : "text-white"} /> 
                                                                            <span className={`text-xs ${isPwaBroken ? 'text-zinc-500' : 'text-white font-bold'}`}>Add to Home Screen</span>
                                                                            {isPwaBroken && <AlertTriangle size={12} className="ml-auto text-rose-500" />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        {isPwaBroken ? (
                                                            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10">
                                                                <h4 className="text-rose-400 font-bold mb-2">PWA Manifest Missing</h4>
                                                                <p className="text-sm text-rose-400/80 mb-4">
                                                                    Your app cannot be installed natively on iOS or Android devices because it lacks a <code className="bg-black/50 px-1 py-0.5 rounded">manifest.json</code> file.
                                                                </p>
                                                                <p className="text-xs text-zinc-400">Installing as an app gives you a permanent spot on their home screen and allows you to send push notifications, increasing LTV.</p>
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                                                                <h4 className="text-emerald-400 font-bold mb-2">PWA Ready</h4>
                                                                <p className="text-sm text-emerald-400/80">
                                                                    Your application is installable on mobile devices. This significantly boosts engagement and retention.
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* Lead Capture Footer */}
                                {hasIssues && (
                                    <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-orange-500/20 shadow-[0_10px_40px_-10px_rgba(249,115,22,0.15)] relative overflow-hidden group mt-4">
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        
                                        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                            <div className="flex-1 text-center lg:text-left">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-500 text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                                    <Shield size={12} /> Conversion Rescue
                                                </div>
                                                <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>
                                                    Fix your funnel before you run ads.
                                                </h4>
                                                <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0" style={fontBody}>
                                                    You are losing potential customers to poor mobile experiences and broken social links. Enter your email to get a full architectural teardown and optimization blueprint.
                                                </p>
                                            </div>
                                            
                                            <div className="w-full lg:w-[420px]">
                                                {emailSent ? (
                                                    <div className="flex flex-col gap-3 animate-in fade-in">
                                                        <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-500 mb-1">
                                                            <CheckCircle2 size={18} />
                                                            <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Review Requested</span>
                                                        </div>
                                                        <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-orange-700 transition-all" style={fontLabel}>
                                                            Book Strategy Call
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <form onSubmit={handleSendBlueprint} className="flex flex-col gap-4">
                                                        <div className="relative">
                                                            <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
                                                            <input type="email" placeholder="founder@startup.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white focus:border-orange-500/50 outline-none transition-all" />
                                                        </div>
                                                        <button type="submit" disabled={isSending || !email} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-orange-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-orange-700 disabled:opacity-50 transition-all shadow-[0_5px_20px_rgba(249,115,22,0.3)]" style={fontLabel}>
                                                            {isSending ? <><Activity size={18} className="animate-spin" /> Preparing Tear-down...</> : <><Zap size={18} /> Send Technical Report</>}
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
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

export default function ConversionAudit() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500">Loading Lab...</div>}>
            <ConversionAuditContent />
        </Suspense>
    );
}
