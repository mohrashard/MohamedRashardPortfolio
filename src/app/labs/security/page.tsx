"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Terminal, ArrowLeft, Activity, ChevronRight, CheckCircle2, Zap, Globe, Download, Mail, AlertTriangle, ShieldAlert, Code2, Shield } from 'lucide-react';
import { resolveDnsRecords, fetchSecurityHeaders } from './actions';

const fontHeadline = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontLabel = { fontFamily: "'Geist Mono', 'Geist', monospace" };

const TERMINAL_STEPS = [
    "Establishing secure server connection...",
    "Querying DNS records...",
    "Parsing DMARC policies...",
    "Retrieving MX configurations...",
    "Fetching HTTP Security Headers...",
    "Analyzing infrastructure vulnerabilities..."
];

function SecurityAuditContent() {
    const searchParams = useSearchParams();
    const focusParam = searchParams.get('focus');
    const defaultTab = ['DMARC', 'MX', 'HEADERS'].includes(focusParam?.toUpperCase() || '') 
        ? focusParam?.toUpperCase() 
        : 'DMARC';

    const [domain, setDomain] = useState("");
    const [status, setStatus] = useState("idle"); 
    const [activeTab, setActiveTab] = useState(defaultTab || 'DMARC');
    
    const [dmarcResult, setDmarcResult] = useState<any>(null);
    const [mxResult, setMxResult] = useState<any>(null);
    const [headersResult, setHeadersResult] = useState<any>(null);
    const [vulnerabilities, setVulnerabilities] = useState<string[]>([]);

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
        setVulnerabilities([]);
        setEmailSent(false);

        // Simulated scanning state
        await new Promise(resolve => setTimeout(resolve, 2000));

        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

        const [dnsData, headersData] = await Promise.all([
            resolveDnsRecords(cleanDomain),
            fetchSecurityHeaders(cleanDomain)
        ]);

        const vulns = [];

        if (dnsData.success) {
            setDmarcResult(dnsData.data.dmarc);
            setMxResult(dnsData.data.mx);
            
            if (dnsData.data.dmarc.length === 0) {
                vulns.push('Missing DMARC Record');
            }
            if (dnsData.data.mx.length === 0) {
                vulns.push('Missing MX Records');
            }
        }
        if (headersData.success) {
            setHeadersResult(headersData.data);
            if (!headersData.data['strict-transport-security']) {
                vulns.push('Missing Strict-Transport-Security Header');
            }
            if (!headersData.data['x-frame-options']) {
                vulns.push('Missing X-Frame-Options Header');
            }
        }

        setVulnerabilities(vulns);
        setStatus("complete");
    };

    const handleSendBlueprint = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) return;
        setIsSending(true);
        
        const vulnStr = vulnerabilities.join(', ') || 'General Review';
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

        try {
            await fetch('/api/security-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, vulnerability: vulnStr, domain: cleanDomain })
            });
        } catch (error) {
            console.error(error);
        }
        setIsSending(false);
        setEmailSent(true);
    };

    const hasVuln = vulnerabilities.length > 0;

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] relative selection:bg-[var(--primary)]/30 py-24 px-4 sm:px-6 overflow-hidden print:p-8">
            <style dangerouslySetInnerHTML={{__html: `@media print { @page { margin: 0; } body { background-color: #050505 !important; -webkit-print-color-adjust: exact; } header, footer, nav { display: none !important; } }`}} />

            {/* Ambient Background */}
            <div className="print:hidden fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            <div className="print:hidden fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto relative z-10 print:max-w-none">
                <Link href="/labs" className="print:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors mb-10 group" style={fontLabel}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Labs
                </Link>

                <div className="rounded-[2.5rem] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.06] overflow-hidden shadow-2xl print:bg-transparent print:border-none">
                    
                    <div className="print:hidden p-8 md:px-12 md:py-10 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[80px] pointer-events-none" />
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                <Activity size={12} /> Infrastructure Audit
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={fontHeadline}>
                                DNS & Security Headers
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center print:p-0">
                        
                        {/* STATE 1: Input */}
                        {status === "idle" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-2xl mx-auto">
                                <h2 className="text-xl md:text-2xl font-medium text-white mb-10 leading-tight" style={fontHeadline}>
                                    Enter domain to audit security infrastructure:
                                </h2>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Globe size={24} className="text-zinc-500" />
                                    </div>
                                    <input 
                                        type="url"
                                        ref={inputRef}
                                        className="w-full bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl py-6 pr-6 pl-14 text-zinc-100 text-lg md:text-xl focus:outline-none focus:border-[var(--accent)]/50 transition-all shadow-inner"
                                        placeholder="yourstartup.com"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                                    />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} disabled={!domain.trim()} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-200 disabled:opacity-30 transition-all shadow-md border border-white/5" style={fontLabel}>
                                        Run Audit <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STATE 2: Analyzing */}
                        {status === "analyzing" && (
                            <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto w-full animate-in fade-in">
                                <Activity size={40} className="text-[var(--accent)] animate-pulse mb-8" />
                                <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-6 font-mono text-xs sm:text-sm shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
                                    <div className="space-y-3">
                                        {TERMINAL_STEPS.map((text, idx) => (
                                            <div key={idx} style={{ display: idx <= terminalStep + 1 ? 'flex' : 'none' }} className={`items-center gap-3 transition-all duration-300 ${idx <= terminalStep ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                                <span className="text-[var(--accent)]">{'>'}</span>
                                                <span className={idx === terminalStep ? 'text-white animate-pulse' : 'text-zinc-500'}>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STATE 3: Complete Blueprint */}
                        {status === "complete" && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
                                
                                <div className="hidden print:block mb-6 pb-4 border-b border-white/[0.1]">
                                    <h1 className="text-4xl print:text-3xl font-black text-white uppercase tracking-tight" style={fontHeadline}>Security Audit Report</h1>
                                    <p className="text-zinc-400 text-sm print:text-xs mt-1" style={fontBody}>Target: {domain}</p>
                                </div>

                                {/* Vulnerability Header */}
                                <div className={`flex flex-col md:flex-row items-center gap-8 mb-12 print:mb-4 p-8 rounded-[2rem] bg-gradient-to-r from-white/[0.03] to-transparent border ${hasVuln ? 'border-rose-500/20' : 'border-emerald-500/20'} print:border-white/[0.1] print:p-5 print:rounded-xl`}>
                                    <div className={`w-28 h-28 print:w-20 print:h-20 flex-shrink-0 rounded-full border-4 print:border-2 flex items-center justify-center ${
                                        !hasVuln ? 'border-emerald-500 text-emerald-400 shadow-md border border-white/5 print:shadow-none' : 
                                        'border-rose-500 text-rose-400 shadow-md border border-white/5 print:shadow-none'
                                    }`}>
                                        {!hasVuln ? <CheckCircle2 size={40} /> : <AlertTriangle size={40} />}
                                    </div>
                                    <div className="text-center md:text-left print:text-left">
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2" style={fontLabel}>Audit Status</div>
                                        {hasVuln ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-rose-400 mb-2">Security Gaps Detected</h3>
                                                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-medium">Your website and emails are missing critical protections. Hackers could exploit these gaps to spoof your domain.</p>
                                            </>
                                        ) : (
                                            <>
                                                <h3 className="text-2xl font-bold text-emerald-400 mb-2">Secure</h3>
                                                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-medium">Your DNS and HTTP headers are properly configured.</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-4 border-b border-white/[0.1] mb-8">
                                    {['DMARC', 'MX', 'HEADERS'].map(tab => (
                                        <button 
                                            key={tab} 
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-zinc-500 hover:text-zinc-300'}`}
                                            style={fontLabel}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="grid grid-cols-1 gap-4 mb-12 print:mb-4 print:gap-3">
                                    {activeTab === 'DMARC' && (
                                        <div className="p-5 print:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row md:items-start gap-4 print:gap-3 print:border-white/[0.1]">
                                            <ShieldAlert size={20} className={dmarcResult?.length ? "text-emerald-500 flex-shrink-0 mt-1" : "text-rose-500 flex-shrink-0 mt-1"} />
                                            <div className="w-full">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Email Protection (DMARC)</div>
                                                {dmarcResult?.length > 0 ? (
                                                    <pre className="text-sm text-zinc-300 bg-[#050505] p-4 rounded-lg overflow-x-auto border border-white/[0.05]">{dmarcResult.join('\n')}</pre>
                                                ) : (
                                                    <div className="text-rose-400 font-bold">No Email Protection Found. Scammers can send emails pretending to be you.</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'MX' && (
                                        <div className="p-5 print:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row md:items-start gap-4 print:gap-3 print:border-white/[0.1]">
                                            <Mail size={20} className={mxResult?.length ? "text-emerald-500 flex-shrink-0 mt-1" : "text-rose-500 flex-shrink-0 mt-1"} />
                                            <div className="w-full">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Email Servers (MX)</div>
                                                {mxResult?.length > 0 ? (
                                                    <div className="text-sm text-zinc-300 bg-[#050505] p-4 rounded-lg border border-white/[0.05] space-y-2">
                                                        {mxResult.map((mx: any, idx: number) => (
                                                            <div key={idx} className="flex justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                                                <span>{mx.exchange}</span>
                                                                <span className="text-[var(--accent)]">Priority {mx.priority}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-rose-400 font-bold">No MX records found.</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'HEADERS' && (
                                        <div className="p-5 print:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row md:items-start gap-4 print:gap-3 print:border-white/[0.1]">
                                            <Code2 size={20} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                                            <div className="w-full space-y-4">
                                                <div>
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Secure Connection Enforcement (HSTS)</div>
                                                    <div className={`text-base font-medium ${headersResult?.['strict-transport-security'] ? 'text-emerald-400' : 'text-rose-400'}`} style={fontBody}>
                                                        {headersResult?.['strict-transport-security'] || 'Missing - Your site is vulnerable to interception.'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2" style={fontLabel}>Clickjacking Protection (X-Frame-Options)</div>
                                                    <div className={`text-base font-medium ${headersResult?.['x-frame-options'] ? 'text-emerald-400' : 'text-rose-400'}`} style={fontBody}>
                                                        {headersResult?.['x-frame-options'] || 'Missing - Hackers can embed your site to steal clicks.'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Lead Capture Footer */}
                                {hasVuln && (
                                    <div className="print:hidden p-8 md:p-10 rounded-[2rem] bg-[#050505] border border-rose-500/20 shadow-[0_10px_40px_-10px_rgba(225,29,72,0.15)] relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        
                                        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                                            <div className="flex-1 text-center lg:text-left">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.2em]" style={fontLabel}>
                                                    <Shield size={12} /> Secure Your Domain
                                                </div>
                                                <h4 className="text-2xl font-bold text-white mb-3" style={fontHeadline}>Stop scammers from spoofing your domain.</h4>
                                                <p className="text-zinc-400 text-sm max-w-md mx-auto lg:mx-0" style={fontBody}>Your domain is vulnerable to email spoofing and security attacks. Enter your email to get a step-by-step report on how to fix these gaps immediately.</p>
                                            </div>
                                            
                                            <div className="w-full lg:w-[420px]">
                                                {emailSent ? (
                                                    <div className="flex flex-col gap-3 animate-in fade-in">
                                                        <div className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 mb-1">
                                                            <CheckCircle2 size={18} />
                                                            <span className="text-[11px] font-bold tracking-widest uppercase" style={fontLabel}>Fix Requested</span>
                                                        </div>
                                                        <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://mr2labs.com/book/direct"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 transition-all" style={fontLabel}>
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
                                                            {isSending ? <><Activity size={18} className="animate-spin" /> Preparing Fix...</> : <><Zap size={18} /> 1-Click Fix</>}
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

export default function SecurityAudit() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500">Loading Lab...</div>}>
            <SecurityAuditContent />
        </Suspense>
    );
}
