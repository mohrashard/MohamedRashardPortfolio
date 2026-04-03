"use client";

import { useState, useEffect, useRef } from 'react';

export default function AuditForm() {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // drives CSS transition
    const formRef = useRef(null);
    const openTimeoutRef = useRef(null);
    const closeTimeoutRef = useRef(null);

    // Opens the form with smooth animation then scrolls into view
    const openForm = () => {
        // Clear any pending close
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

        setIsOpen(true);

        // Tick after mount so CSS transition fires properly
        openTimeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            // Scroll after the form starts expanding (~50ms delay)
            setTimeout(() => {
                if (formRef.current) {
                    const y = formRef.current.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 80);
        }, 20);
    };

    // Closes with smooth animation
    const closeForm = () => {
        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);

        setIsVisible(false);
        // Wait for transition to finish before unmounting content
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setStatus('idle');
            setErrorMessage('');
            window.history.replaceState(null, '', window.location.pathname);
        }, 500); // matches transition duration
    };

    useEffect(() => {
        const handleAuditClick = (e) => {
            const target = e.target.closest('a[href="#audit-form"]');
            if (target) {
                e.preventDefault();
                // Update hash without page jump
                window.history.pushState(null, '', '#audit-form');
                openForm();
            }
        };

        // Check hash on mount
        if (window.location.hash === '#audit-form') {
            openForm();
        }

        const handleHashChange = () => {
            if (window.location.hash === '#audit-form') {
                openForm();
            } else {
                closeForm();
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        document.addEventListener('click', handleAuditClick);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            document.removeEventListener('click', handleAuditClick);
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/audit-reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nameAndBusiness: data.nameAndBusiness,
                    email: data.email,
                    painPoint: data.painPoint,
                    urgency: data.urgency,
                    budget: data.budget,
                    website: data.website,
                    outcome: data.outcome || '',
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            setStatus('success');
            e.target.reset();
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            setStatus('error');
        }
    };

    return (
        <div ref={formRef}>
            {/* Animated wrapper — always in DOM when isOpen, fades + slides in/out */}
            <div
                style={{
                    maxHeight: isVisible ? '2000px' : '0px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(-16px)',
                    overflow: 'hidden',
                    transition: isVisible
                        ? 'max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, transform 0.4s ease'
                        : 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: isVisible ? 'auto' : 'none',
                }}
            >
                {isOpen && (
                    status === 'success' ? (
                        /* ── SUCCESS STATE ── */
                        <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white/5 border border-cyan-500/30 backdrop-blur-md p-12 md:p-16 text-center mt-12">
                            <div className="w-24 h-24 bg-cyan-500/20 border border-cyan-500/40 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                <i className="fas fa-check text-4xl text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">BOOM!</h3>
                            <p className="text-xl text-slate-300">Audit request received. Check your inbox!</p>
                            <button
                                onClick={closeForm}
                                className="mt-10 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        /* ── FORM STATE ── */
                        <div className="w-full max-w-3xl mx-auto rounded-3xl bg-[#0a0a0a]/40 bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden mt-12">
                            {/* Close button */}
                            <button
                                onClick={closeForm}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all z-50"
                                aria-label="Close audit form"
                            >
                                <i className="fas fa-times" />
                            </button>

                            {/* Decorative glows */}
                            <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />
                            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-[90px] pointer-events-none" />

                            <div className="relative z-10">
                                <div className="text-center mb-10">
                                    <div className="inline-block mb-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                                        <i className="fas fa-bolt mr-2" />
                                        Next Steps
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-3">Free AI Opportunity Audit</h3>
                                    <p className="text-sm md:text-base text-slate-400">Takes 2 minutes. Every audit request gets a personal Loom video response within 48 hours. Not a template. Not an assistant. Me.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">What is your name and what does your business do? <span className="text-red-400">*</span></label>
                                        <input required name="nameAndBusiness" type="text" placeholder="John Doe — I run a local lead gen agency..." className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">Best email address to send the audit to? <span className="text-red-400">*</span></label>
                                        <input required name="email" type="email" placeholder="john@company.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">What is the most time-consuming or repetitive task in your business right now? <span className="text-red-400">*</span></label>
                                        <textarea required name="painPoint" rows={3} placeholder="I spend 10 hours a week doing..." className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium resize-none" />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-300 ml-1">Are you actively looking to solve this in the next 30 days, or still exploring options? <span className="text-red-400">*</span></label>
                                            <div className="relative h-[52px]">
                                                <select required name="urgency" defaultValue="" className="w-full h-full bg-black/40 border border-white/10 rounded-xl px-5 text-white appearance-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium cursor-pointer">
                                                    <option value="" disabled className="text-slate-500">Select an option</option>
                                                    <option value="Ready to move forward in the next 30 days" className="bg-[#0f172a] text-white py-2">Ready to move forward in the next 30 days</option>
                                                    <option value="Exploring options, no rush" className="bg-[#0f172a] text-white py-2">Exploring options, no rush</option>
                                                    <option value="Just curious for now" className="bg-[#0f172a] text-white py-2">Just curious for now</option>
                                                </select>
                                                <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-300 ml-1">What is your rough budget range for this project? <span className="text-red-400">*</span></label>
                                            <div className="relative h-[52px]">
                                                <select required name="budget" defaultValue="" className="w-full h-full bg-black/40 border border-white/10 rounded-xl px-5 text-white appearance-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium cursor-pointer">
                                                    <option value="" disabled className="text-slate-500">Select an option</option>
                                                    <option value="Under $500" className="bg-[#0f172a] text-white py-2">Under $500</option>
                                                    <option value="$500 to $1,500" className="bg-[#0f172a] text-white py-2">$500 to $1,500</option>
                                                    <option value="$1,500 to $5,000" className="bg-[#0f172a] text-white py-2">$1,500 to $5,000</option>
                                                    <option value="$5,000 and above" className="bg-[#0f172a] text-white py-2">$5,000 and above</option>
                                                    <option value="Not sure yet, open to discussion" className="bg-[#0f172a] text-white py-2">Not sure yet, open to discussion</option>
                                                </select>
                                                <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1 flex flex-col gap-1">
                                            <span>Where can I find your website or LinkedIn so I can review your business before the audit? <span className="text-red-400">*</span></span>
                                            <span className="text-xs font-normal text-slate-500">If there is no LinkedIn or website, please send your social media links or describe your business here.</span>
                                        </label>
                                        <input required name="website" type="text" placeholder="https://..." className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">What would it mean for your business if this problem was solved? <span className="text-slate-500 font-normal">(optional bonus)</span></label>
                                        <textarea name="outcome" rows={3} placeholder="It would allow me to take on 5 more clients a month..." className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium resize-none" />
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center">
                                            <i className="fas fa-exclamation-circle mr-3 text-lg" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full group mt-8 relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-lg hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:hover:shadow-none hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin text-xl" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Audit Request</span>
                                                <i className="fas fa-paper-plane text-sm group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl pointer-events-none" />
                                    </button>

                                    <p className="text-center text-xs text-slate-500 mt-4">
                                        <i className="fas fa-lock mr-1" /> Your information is 100% secure.
                                    </p>
                                </form>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
