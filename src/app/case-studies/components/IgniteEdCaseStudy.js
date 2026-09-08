import React from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import ScrollObserver from '../../services/ScrollObserver';
import VideoPlayer from '../../testimonials/VideoPlayer';
import AvailabilityBadge from '../../components/AvailabilityBadge';
import { AlertCircle, Lightbulb, Layers, PieChart, Sparkles, Gamepad2, Languages, Smartphone, Calendar, ArrowRight } from 'lucide-react';

export default function IgniteEdCaseStudy() {
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
                            <span className="text-[var(--primary)] mr-1">&gt;_</span> 14-DAY DEPLOYMENT. AI-POWERED EDTECH.
                        </span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] font-['Plus_Jakarta_Sans',sans-serif] mb-6">
                        <span className="text-white block mb-2">Democratizing</span>
                        <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text">Education.</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-['Inter',sans-serif] leading-relaxed">
                        How we took an idea to a fully functioning, AI-powered trilingual EdTech platform in just 2 weeks for Ignite Ed.
                    </p>
                </div>

                {/* CHALLENGE VS SOLUTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-32">
                    {/* Challenge */}
                    <div className="bg-[#0A0A0A]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 relative group" data-animate="slide-right">
                        <div className="absolute top-0 left-8 w-24 h-1 bg-red-500 blur-xl opacity-30 rounded-full"></div>
                        <h3 className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <AlertCircle className="w-3.5 h-3.5" /> The Problem
                        </h3>
                        <h4 className="text-2xl font-bold text-white mb-4">Education was a luxury.</h4>
                        <p className="text-zinc-400 leading-relaxed font-['Inter',sans-serif] text-sm md:text-base">
                            In Sri Lanka, past exam papers are expensive. Rural, underprivileged families simply cannot afford past papers, let alone private tutors. Access to quality learning materials was gated behind high costs, leaving many students behind.
                        </p>
                    </div>

                    {/* Solution */}
                    <div className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border border-[var(--primary)]/30 rounded-3xl p-8 md:p-10 relative group shadow-md border border-white/5" data-animate="slide-left" data-delay="1">
                        <div className="absolute top-0 left-8 w-24 h-1 bg-[var(--primary)] blur-lg opacity-60 rounded-full"></div>
                        <h3 className="text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <Lightbulb className="w-3.5 h-3.5" /> The Solution
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center p-0.5 border border-white/10 shadow-md border border-white/5">
                                <Image src="/igniteed.webp" alt="Ignite Ed Logo" width={32} height={32} className="w-full h-full object-contain rounded-sm" />
                            </div>
                            <h4 className="text-2xl font-bold text-white">Ignite Ed</h4>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-['Inter',sans-serif] text-sm md:text-base">
                            A user-friendly, highly accessible mobile app that completely levels the playing field. Anyone can download it, allowing students across the country to access advanced learning tools and materials for a fraction of the traditional cost.
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
                                { value: '14', suffix: 'd', label: 'Development Time', borderB: 'border-b border-white/[0.05] md:border-b-0' },
                                { value: '3', suffix: '', label: 'Languages Supported', borderB: 'border-b border-white/[0.05] md:border-b-0' },
                                { value: '3', suffix: 'd', label: 'Backend Built', borderB: '' },
                                { value: '6', suffix: '', label: 'Core Features Shipped', borderB: '' }
                            ].map((metric, i) => (
                                <div key={i} className={`p-8 text-center flex flex-col justify-center items-center group relative overflow-hidden ${metric.borderB}`}>
                                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                    <div className="text-3xl md:text-4xl font-black font-['Plus_Jakarta_Sans',sans-serif] mb-2 tracking-tighter">
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
                        <p className="text-zinc-500 mt-3 text-lg font-['Inter',sans-serif]">Built for performance, analytics, and high engagement.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Layers, title: 'Session Builder', desc: 'Custom sessions where students select precise subjects, topics, and subtopics.' },
                            { icon: PieChart, title: 'Deep Analytics', desc: 'Mistake tracking and resolution analytics to pinpoint exact learning gaps.' },
                            { icon: Sparkles, title: 'AI Insights', desc: 'AI-powered insight generation and intelligent study plan creation.' },
                            { icon: Gamepad2, title: 'Battle Mode', desc: 'Gamified competitive learning with friends to increase interaction.' },
                            { icon: Languages, title: 'Trilingual Support', desc: 'Full support for 3 languages, breaking down barriers across Sri Lanka.' },
                            { icon: Smartphone, title: 'Mobile First', desc: 'Highly optimized, smooth UX designed specifically for mobile accessibility.' },
                        ].map((feat, i) => {
                            const Icon = feat.icon;
                            return (
                                <div key={i} className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 hover:border-[var(--primary)]/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,102,255,0.08)] group" data-animate="slide-up" data-delay={i % 3 + 1}>
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--primary)] mb-5 group-hover:bg-[var(--primary)]/10 group-hover:scale-110 transition-all duration-300">
                                        <Icon className="w-5 h-5 text-[var(--primary)]" />
                                    </div>
                                    <h4 className="text-white font-bold mb-3">{feat.title}</h4>
                                    <p className="text-zinc-500 text-[13px] leading-relaxed font-['Inter',sans-serif]">{feat.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* TIMELINE */}
                <div className="mb-32">
                    <div className="text-center mb-20" data-animate="slide-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-3">The 14-Day Sprint</h2>
                        <p className="text-[var(--accent)] text-sm tracking-widest uppercase font-bold">Speed Without Compromise.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto pl-6 sm:pl-0">
                        {/* Vertical Line */}
                        <div className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-transparent sm:-translate-x-1/2 opacity-30"></div>

                        <div className="space-y-16">
                            {[
                                { date: 'May 5th', title: 'The Blueprint', desc: 'Ahmed and Sajid approached us with the problem and a proposed solution. We mapped the entire architecture instantly.' },
                                { date: 'May 8th', title: 'Admin Infrastructure Live', desc: 'In just 3 days, the entire backend admin panel was built, secured, and fully completed.' },
                                { date: 'May 9th', title: 'Data Pipeline Active', desc: 'Admin team members seamlessly began entering massive datasets of question papers into the live system.' },
                                { date: 'Week 2', title: 'Mobile Launch & Refinement', desc: 'The entire mobile app was completed. We iterated on color choices based directly on founder feedback, leading to a proud public launch at BMICH.' },
                            ].map((step, i) => (
                                <div key={i} className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 group" data-animate="slide-up" data-delay={i % 3 + 1}>
                                    
                                    {/* Left Content (or right depending on index) */}
                                    <div className="sm:w-1/2 sm:pr-14 sm:text-right pl-8 sm:pl-0 order-2 sm:order-1">
                                        <div className="sm:hidden text-[var(--primary)] font-bold text-xs tracking-widest uppercase mb-2">{step.date}</div>
                                        <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed font-['Inter',sans-serif]">{step.desc}</p>
                                    </div>
                                    
                                    {/* Node */}
                                    <div className="absolute left-[-11px] sm:left-1/2 w-12 h-12 sm:-translate-x-1/2 flex items-center justify-center z-10 order-1 sm:order-2">
                                        <div className="w-3 h-3 rounded-full bg-[var(--primary)] border-[3px] border-[#050505] shadow-md border border-white/5 group-hover:scale-150 transition-transform duration-300"></div>
                                    </div>

                                    {/* Right Content (Date pill) */}
                                    <div className="sm:w-1/2 sm:pl-14 hidden sm:flex items-center justify-start order-3 text-left">
                                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[var(--primary)] font-bold text-xs tracking-widest uppercase shadow-md border border-white/5 group-hover:bg-white/[0.06] transition-colors">
                                            <Calendar className="w-3 h-3 text-[var(--primary)]" />
                                            {step.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* THE RESULT / VIDEO */}
                <div className="max-w-4xl mx-auto rounded-3xl border border-[var(--primary)]/20 bg-[#0A0A0A]/50 backdrop-blur-sm p-8 md:p-12 shadow-md border border-white/5 relative overflow-hidden" data-animate="fade">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/10 blur-[150px] pointer-events-none"></div>

                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10">
                            <span className="text-[var(--accent)] text-[10px] font-bold tracking-widest uppercase">The Result</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-4">The Event Launch at BMICH</h2>
                        <p className="text-zinc-400 text-sm max-w-xl mx-auto font-['Inter',sans-serif] leading-relaxed">
                            Ignite Ed debuted proudly at the BMICH convention center. While the app is currently in pre-launch pending final business registration, watch Ahmed and Sajid share their experience working with Mr² Labs to bring their platform to reality in record time.
                        </p>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto ring-1 ring-white/10 rounded-2xl shadow-2xl mb-10">
                        <VideoPlayer src="/review2.mp4" />
                    </div>

                    <div className="text-center relative z-10">
                        <a href="/services#audit-form" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-md border border-white/5">
                            <span>Launch Solution</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

            </div>
            
            <ScrollObserver />
        </main>
    );
}
