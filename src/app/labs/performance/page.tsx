"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Activity, ChevronRight, Globe, Layers, Server, DollarSign, TrendingDown, CheckCircle2, AlertTriangle, Search, Mail, Zap, Shield } from 'lucide-react';
import { fetchHtmlAndAnalyze, checkBundleCache } from './actions';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const TERMINAL_STEPS = [
    "Establishing server connection...",
    "Crawling DOM tree structure...",
    "Identifying third-party scripts...",
    "Interrogating CDN cache headers...",
    "Calculating inline state bloat...",
    "Compiling performance blueprint..."
];

function PerformanceAuditContent() {
    const searchParams = useSearchParams();
    const focusParam = searchParams.get('focus');
    const speedParam = searchParams.get('speed');
    
    const defaultTab = ['DOM', 'CDN', 'ROI'].includes(focusParam?.toUpperCase() || '') 
        ? focusParam?.toUpperCase() 
        : 'DOM';

    const defaultSpeed = parseFloat(speedParam || '3.5');

    const [domain, setDomain] = useState("");
    const [status, setStatus] = useState("idle"); 
    const [activeTab, setActiveTab] = useState(defaultTab || 'DOM');
    
    const [domResult, setDomResult] = useState<any>(null);
    const [cdnResult, setCdnResult] = useState<any>(null);

    // ROI Calculator State
    const [traffic, setTraffic] = useState(50000);
    const [aov, setAov] = useState(100);
    const [loadTime, setLoadTime] = useState(defaultSpeed);

    // Lead Capture State
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [terminalStep, setTerminalStep] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (status === "analyzing") {
            const interval = setInterval(() => {
                setTerminalStep(prev => (prev < TERMINAL_STEPS.length - 1 ? prev + 1 : prev));
            }, 300); // Fast scan
            return () => clearInterval(interval);
        }
    }, [status]);

    useEffect(() => {
        if (status === "idle" && inputRef.current) inputRef.current.focus();
    }, [status]);

    const handleNext = async () => {
        if (!domain.trim()) return;
        setStatus("analyzing");
        setTerminalStep(0);
        
        // Simulated scanning state
        await new Promise(resolve => setTimeout(resolve, 2000));

        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        const target = `https://${cleanDomain}`;

        const domData = await fetchHtmlAndAnalyze(target);

        if (domData.success) {
            setDomResult(domData.data);
            if (domData.data.firstJsUrl) {
                const cdnData = await checkBundleCache(domData.data.firstJsUrl);
                if (cdnData.success) {
                    setCdnResult(cdnData.data);
                }
            }
        }

        setStatus("complete");
    };

    const handleSendBlueprint = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

        try {
            await fetch('/api/performance-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, domain: cleanDomain, lostRevenue: Math.round(lostRevenue) })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
    };

    // ROI Calculation
    const baseCvr = 0.03; // 3% base conversion rate
    const dropFactor = Math.max(0, loadTime - 2.0) * 0.07; 
    const currentCvr = Math.max(0, baseCvr * (1 - dropFactor));
    const potentialRevenue = traffic * 12 * aov * baseCvr;
    const currentRevenue = traffic * 12 * aov * currentCvr;
    const lostRevenue = potentialRevenue - currentRevenue;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-purple-500/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8">
            <style dangerouslySetInnerHTML={{__html: `@media print { @page { margin: 0; } body { background-color: #050505 !important; -webkit-print-color-adjust: exact; } header, footer, nav { display: none !important; } }`}} />

            {/* Glassmorphic Ambient Background */}
            <div className="print:hidden fixed top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                {/* Glassmorphic Dashboard Panel */}
                <div className="rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden print:bg-transparent print:border-none print:shadow-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Activity size={12} /> Performance Engineering
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                DOM & CDN Analysis
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center print:p-0 relative">
                        
                        {/* STATE 1: Input */}
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto z-10">
                                <h2 className="text-xl md:text-2xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    Enter domain to audit DOM bloat and cache headers:
                                </h2>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Globe size={24} className="text-zinc-500" />
                                    </div>
                                    <input 
                                        type="url"
                                        ref={inputRef}
                                        className="w-full bg-black/40 border-2 border-white/[0.05] rounded-2xl py-6 pr-6 pl-14 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-purple-500/50 transition-all shadow-inner backdrop-blur-md"
                                        placeholder="yourstartup.com"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!domain.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 disabled:opacity-30 transition-all shadow-md border border-white/5" style={fontLabel}>
                                        Analyze Stack <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STATE 2: Analyzing */}
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in z-10">
                                <Search size={40} className="text-purple-400 animate-pulse mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                                <span className="text-purple-400">{'>'}</span>
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
                                
                                {/* Tabs */}
                                <div className="flex gap-4 border-b border-white/[0.05] mb-8 pb-1">
                                    {['DOM', 'CDN', 'ROI'].map(tab => (
                                        <button 
                                            key={tab} 
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                                            style={fontLabel}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="grid grid-cols-1 gap-6 mb-12 print:mb-4 print:gap-3">
                                    
                                    {activeTab === 'DOM' && (
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.05] flex flex-col md:flex-row md:items-center gap-6 backdrop-blur-sm">
                                                <Layers size={32} className="text-purple-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1" style={fontLabel}>Third-Party Tools (Scripts)</div>
                                                    <div className="text-3xl font-black text-white" style={fontHeadline}>{domResult?.externalScriptCount || 0}</div>
                                                    <p className="text-sm text-zinc-400 mt-2">Too many external tools (like tracking pixels and chat widgets) slow down your website and frustrate users.</p>
                                                </div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.05] flex flex-col md:flex-row md:items-center gap-6 backdrop-blur-sm">
                                                <Activity size={32} className="text-purple-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1" style={fontLabel}>Hidden Data Bloat</div>
                                                    <div className="text-3xl font-black text-white" style={fontHeadline}>{domResult?.inlineStateSizeKb || 0} KB</div>
                                                    <p className="text-sm text-zinc-400 mt-2">Your website is loading unnecessary hidden data behind the scenes, making it feel sluggish. Target &lt; 50KB.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'CDN' && (
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.05] backdrop-blur-sm">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Server size={24} className="text-blue-400" />
                                                    <h3 className="text-lg font-bold text-white" style={fontHeadline}>Server Caching (Speed Boost)</h3>
                                                </div>
                                                
                                                {domResult?.firstJsUrl ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1" style={fontLabel}>Main Website File</div>
                                                            <div className="text-sm text-zinc-300 truncate">{domResult.firstJsUrl}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1" style={fontLabel}>Server Instructions (Cache-Control)</div>
                                                            <div className="text-base text-white font-mono p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                                                                {cdnResult?.cacheControl || 'Missing or No Cache'}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className={`p-4 rounded-xl border ${cdnResult?.hasImmutable ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-rose-500/20 bg-rose-500/10'}`}>
                                                            {cdnResult?.hasImmutable ? (
                                                                <div className="flex items-start gap-3">
                                                                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
                                                                    <div>
                                                                        <div className="text-emerald-400 font-bold mb-1">Fast Delivery Enabled</div>
                                                                        <div className="text-sm text-emerald-400/80">Great! Your website files are saved on global servers so they load instantly for visitors anywhere.</div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-start gap-3">
                                                                    <AlertTriangle size={20} className="text-rose-400 flex-shrink-0" />
                                                                    <div>
                                                                        <div className="text-rose-400 font-bold mb-1">Slow Delivery Detected</div>
                                                                        <div className="text-sm text-rose-400/80">Your website isn&apos;t saving files efficiently. Every visitor has to download everything from scratch, causing slow load times.</div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-zinc-400">No script bundles detected.</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'ROI' && (
                                        <div className="p-6 md:p-8 rounded-2xl bg-black/60 border border-white/[0.05] backdrop-blur-md shadow-2xl">
                                            <div className="text-center mb-8">
                                                <h3 className="text-2xl font-bold text-white mb-2" style={fontHeadline}>Performance ROI Calculator</h3>
                                                <p className="text-zinc-400 text-sm">Every 1 second of load time over 2.0s equals a 7% drop in conversion.</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-10 mb-10">
                                                <div className="space-y-8">
                                                    <div>
                                                        <div className="flex justify-between mb-2">
                                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400" style={fontLabel}>Monthly Traffic</label>
                                                            <span className="text-xs font-bold text-white">{traffic.toLocaleString()}</span>
                                                        </div>
                                                        <input 
                                                            type="range" min="1000" max="500000" step="1000" 
                                                            value={traffic} onChange={(e) => setTraffic(Number(e.target.value))}
                                                            className="w-full accent-purple-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between mb-2">
                                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400" style={fontLabel}>Average Order Value</label>
                                                            <span className="text-xs font-bold text-white">${aov}</span>
                                                        </div>
                                                        <input 
                                                            type="range" min="10" max="2000" step="10" 
                                                            value={aov} onChange={(e) => setAov(Number(e.target.value))}
                                                            className="w-full accent-purple-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between mb-2">
                                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400" style={fontLabel}>Load Time (s)</label>
                                                            <span className="text-xs font-bold text-purple-400">{loadTime.toFixed(1)}s</span>
                                                        </div>
                                                        <input 
                                                            type="range" min="0.5" max="10.0" step="0.1" 
                                                            value={loadTime} onChange={(e) => setLoadTime(Number(e.target.value))}
                                                            className="w-full accent-purple-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-center items-center p-8 rounded-xl bg-rose-500/5 border border-rose-500/20">
                                                    <TrendingDown size={32} className="text-rose-500 mb-4" />
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-rose-500/70 mb-2" style={fontLabel}>Lost Annual Revenue</div>
                                                    <div className="text-4xl md:text-5xl font-black text-rose-400 mb-2" style={fontHeadline}>
                                                        {formatCurrency(lostRevenue)}
                                                    </div>
                                                    <div className="text-sm text-zinc-400 text-center mt-2">
                                                        Due to <span className="font-bold text-white">{(dropFactor * 100).toFixed(1)}%</span> conversion drop
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* Lead Capture Footer */}
                                <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-rose-500/20 shadow-[0_10px_40px_-10px_rgba(225,29,72,0.15)] relative overflow-hidden group mt-4">
                                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1 text-center lg:text-left">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                                <Shield size={12} /> {lostRevenue > 0 ? "Stop Leaking Revenue" : "Optimize Architecture"}
                                            </div>
                                            <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>
                                                {lostRevenue > 0 ? "Speed up your website and stop losing money." : "Get a complete technical teardown."}
                                            </h4>
                                            <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0" style={fontBody}>
                                                {lostRevenue > 0 
                                                    ? `You are losing an estimated ${formatCurrency(lostRevenue)} per year due to slow page loads. Enter your email to get a step-by-step report on how to fix these bottlenecks immediately.`
                                                    : "Even if your site loads fast, hidden DOM bloat can impact organic reach. Enter your email to get a full architectural teardown and optimization blueprint."
                                                }
                                            </p>
                                        </div>
                                        
                                        <div className="w-full lg:w-[420px]">
                                            {emailSent ? (
                                                <div className="flex flex-col gap-3 animate-in fade-in">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 mb-1">
                                                        <CheckCircle2 size={18} />
                                                        <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Review Requested</span>
                                                    </div>
                                                    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mohrashard/30min"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 transition-all" style={fontLabel}>
                                                        Book Strategy Call
                                                    </a>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendBlueprint} className="flex flex-col gap-4">
                                                    <div className="relative">
                                                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
                                                        <input type="email" placeholder="founder@startup.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A] border border-white/[0.1] rounded-xl text-white focus:border-rose-500/50 outline-none transition-all" />
                                                    </div>
                                                    <button type="submit" disabled={isSending || !email} className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-rose-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-700 disabled:opacity-50 transition-all shadow-[0_5px_20px_rgba(225,29,72,0.3)]" style={fontLabel}>
                                                        {isSending ? <><Activity size={18} className="animate-spin" /> Preparing Tear-down...</> : <><Zap size={18} /> Send Technical Report</>}
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

export default function PerformanceAudit() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500">Loading Lab...</div>}>
            <PerformanceAuditContent />
        </Suspense>
    );
}
