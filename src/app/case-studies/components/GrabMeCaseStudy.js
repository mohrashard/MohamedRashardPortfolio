import React from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import ScrollObserver from '../../services/ScrollObserver';
import AvailabilityBadge from '../../components/AvailabilityBadge';

export default function GrabMeCaseStudy() {
    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#0066FF]/30 pt-[120px] pb-24 overflow-x-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[50%] bg-[var(--primary)]/10 blur-[150px] rounded-full"></div>
                <div className="absolute top-[30%] left-[-10%] w-[30%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full"></div>
            </div>

            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                
                {/* HERO SECTION */}
                <div className="text-center mb-24 mt-8" data-animate="slide-up">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
                        <AvailabilityBadge />
                        <span className="hidden sm:block text-zinc-700 text-xs">•</span>
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-400 font-mono">
                            <span className="text-[var(--primary)] mr-1">&gt;_</span> 72-HOUR SPRINT. PWA MARKETPLACE.
                        </span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] font-['Plus_Jakarta_Sans',sans-serif] mb-6">
                        <span className="text-white block mb-2">Empowering</span>
                        <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text">Local Technicians.</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-['Inter',sans-serif] leading-relaxed">
                        How we built and launched our own scalable, Upwork-style PWA in just 72 hours to eliminate predatory broker commissions and connect customers with skilled workers instantly.
                    </p>
                </div>

                {/* CHALLENGE VS SOLUTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-32">
                    {/* Challenge */}
                    <div className="bg-[#0A0A0A]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 relative group" data-animate="slide-right">
                        <div className="absolute top-0 left-8 w-24 h-1 bg-red-500 blur-xl opacity-30 rounded-full"></div>
                        <h3 className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-circle-exclamation"></i> The Problem
                        </h3>
                        <h4 className="text-2xl font-bold text-white mb-4">The Commission Trap.</h4>
                        <p className="text-zinc-400 leading-relaxed font-['Inter',sans-serif] text-sm md:text-base">
                            In Sri Lanka, highly talented electricians, plumbers, and AC repairers struggle to earn a proper income. They rely on disjointed WhatsApp groups and word-of-mouth. Worse, when they do find jobs, predatory group admins and brokers take massive commissions.
                        </p>
                    </div>

                    {/* Solution */}
                    <div className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border border-[var(--primary)]/30 rounded-3xl p-8 md:p-10 relative group shadow-[0_0_40px_rgba(0,102,255,0.05)]" data-animate="slide-left" data-delay="1">
                        <div className="absolute top-0 left-8 w-24 h-1 bg-[var(--primary)] blur-lg opacity-60 rounded-full"></div>
                        <h3 className="text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-lightbulb"></i> The Solution
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center p-0.5 border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                <Image src="/grabme.webp" alt="Grab Me Logo" width={32} height={32} className="w-full h-full object-contain rounded-sm" />
                            </div>
                            <h4 className="text-2xl font-bold text-white">Grab Me</h4>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-['Inter',sans-serif] text-sm md:text-base">
                            A live, scalable ecosystem built as a Progressive Web App (PWA). Customers can find workers instantly without logging in, and workers pay a flat subscription model instead of per-job commissions.
                        </p>
                    </div>
                </div>

                {/* METRICS ROW */}
                <div className="w-full max-w-4xl mx-auto mb-32 relative" data-animate="fade">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5 blur-[50px] rounded-full pointer-events-none"></div>
                    <div className="relative bg-[#050505]/40 backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
                            {[
                                { value: '72', suffix: 'h', label: 'Deployment Time', borderB: 'border-b border-white/[0.05] md:border-b-0' },
                                { value: '0', prefix: '$', label: 'Marketing Spent', borderB: 'border-b border-white/[0.05] md:border-b-0' },
                                { value: '15', suffix: '+', label: 'Service Categories', borderB: '' },
                                { value: '0', suffix: '%', label: 'Commission Taken', borderB: '' }
                            ].map((metric, i) => (
                                <div key={i} className={`p-8 text-center flex flex-col justify-center items-center group relative overflow-hidden ${metric.borderB}`}>
                                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                    <div className="text-3xl md:text-4xl font-black font-['Plus_Jakarta_Sans',sans-serif] mb-2 tracking-tighter">
                                        {metric.prefix && <span className="text-zinc-600 mr-1 font-light text-2xl md:text-3xl">{metric.prefix}</span>}
                                        <span className="bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text drop-shadow-sm">{metric.value}</span>
                                        {metric.suffix && <span className="text-[var(--primary)] ml-1 text-xl md:text-2xl">{metric.suffix}</span>}
                                    </div>
                                    <div className="text-zinc-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase group-hover:text-zinc-300 transition-colors duration-300">
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FEATURES GRID */}
                <div className="mb-32">
                    <div className="text-center mb-16" data-animate="fade">
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">The Engine Inside</h2>
                        <p className="text-zinc-500 mt-3 text-lg font-['Inter',sans-serif]">Built for infinite scale and frictionless UX.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: 'fa-magnifying-glass', title: 'Frictionless Search', desc: 'No-login search functionality allowing customers to instantly find nearby technicians for quick repairs.' },
                            { icon: 'fa-handshake', title: 'Subscription Model', desc: 'Eliminated the broker commission model. Workers keep 100% of their earnings by paying a flat fee.' },
                            { icon: 'fa-briefcase', title: 'Worker Dashboard', desc: 'A dedicated portal for technicians to manage their leads, profile, and active jobs.' },
                            { icon: 'fa-hammer', title: 'Admin Master Panel', desc: 'Complete central oversight system for managing workers, customers, and subscriptions.' },
                            { icon: 'fa-mobile-button', title: 'PWA Architecture', desc: 'Installable directly to home screens without the friction of App Store downloads or updates.' },
                            { icon: 'fa-server', title: 'Infinite Scale', desc: 'Cloud-native database and robust backend designed to handle nationwide concurrency.' },
                        ].map((feat, i) => (
                            <div key={i} className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 hover:border-[var(--primary)]/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,102,255,0.08)] group" data-animate="slide-up" data-delay={i % 3 + 1}>
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--primary)] mb-5 group-hover:bg-[var(--primary)]/10 group-hover:scale-110 transition-all duration-300">
                                    <i className={`fa-solid ${feat.icon} text-lg`}></i>
                                </div>
                                <h4 className="text-white font-bold mb-3">{feat.title}</h4>
                                <p className="text-zinc-500 text-[13px] leading-relaxed font-['Inter',sans-serif]">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TIMELINE */}
                <div className="mb-32">
                    <div className="text-center mb-20" data-animate="slide-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-3">The 72-Hour Sprint</h2>
                        <p className="text-[var(--accent)] text-sm tracking-widest uppercase font-bold">Unprecedented Velocity.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto pl-6 sm:pl-0">
                        {/* Vertical Line */}
                        <div className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-transparent sm:-translate-x-1/2 opacity-30"></div>

                        <div className="space-y-16">
                            {[
                                { date: 'Hour 0-24', title: 'Core Architecture', desc: 'Defined the subscription model database schema and deployed the base PWA infrastructure to the cloud.' },
                                { date: 'Hour 24-48', title: 'Search & Dashboard', desc: 'Built the frictionless customer search engine and the complete worker dashboard for lead management.' },
                                { date: 'Hour 48-72', title: 'MVP Launch', desc: 'Finalized the master admin panel, integrated subscriptions, and went live with a fully functional MVP.' },
                            ].map((step, i) => (
                                <div key={i} className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 group" data-animate="slide-up" data-delay={i % 3 + 1}>
                                    
                                    <div className="sm:w-1/2 sm:pr-14 sm:text-right pl-8 sm:pl-0 order-2 sm:order-1">
                                        <div className="sm:hidden text-[var(--primary)] font-bold text-xs tracking-widest uppercase mb-2">{step.date}</div>
                                        <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed font-['Inter',sans-serif]">{step.desc}</p>
                                    </div>
                                    
                                    <div className="absolute left-[-11px] sm:left-1/2 w-12 h-12 sm:-translate-x-1/2 flex items-center justify-center z-10 order-1 sm:order-2">
                                        <div className="w-3 h-3 rounded-full bg-[var(--primary)] border-[3px] border-[#050505] shadow-[0_0_20px_rgba(0,102,255,0.8)] group-hover:scale-150 transition-transform duration-300"></div>
                                    </div>

                                    <div className="sm:w-1/2 sm:pl-14 hidden sm:flex items-center justify-start order-3 text-left">
                                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[var(--primary)] font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:bg-white/[0.06] transition-colors">
                                            <i className="fa-solid fa-stopwatch text-[10px]"></i>
                                            {step.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* THE RESULT / CTA */}
                <div className="max-w-4xl mx-auto rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-b from-[#0A0A0A]/80 to-[#050505] p-8 md:p-12 text-center relative overflow-hidden" data-animate="fade">
                    <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-[var(--primary)]/10 blur-[150px] pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10">
                            <span className="text-[var(--accent)] text-[10px] font-bold tracking-widest uppercase">The Impact</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-6">A Fair Marketplace Created</h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto font-['Inter',sans-serif] leading-relaxed mb-10">
                            By delivering the MVP internally in just 72 hours, we proved that high-quality marketplaces can be built from scratch at unprecedented speed. Technicians now keep their hard-earned money through a flat subscription model, and Sri Lankan families have a reliable, instant way to find help.
                        </p>
                        
                        <a href="/services#audit-form" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                            <span>Launch Solution</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>

            </div>
            
            <ScrollObserver />
        </main>
    );
}
