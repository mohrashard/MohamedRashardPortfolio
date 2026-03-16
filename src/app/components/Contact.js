import React from "react";
import Link from "next/link";

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#020202] border-t border-white/5">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Available for new projects
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight">
                    Your idea deserves to be <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">live this week.</span>
                </h2>

                <p className="text-lg md:text-xl text-slate-400 mb-4 max-w-2xl mx-auto font-light leading-relaxed">
                    Start with a free AI Audit. I will personally review your business and show you exactly where AI can save you time and money — specific to how you work, delivered within 48 hours.
                </p>

                <p className="text-sm text-slate-600 mb-12 font-light">
                    No pitch. No obligation. No templates. Just a real, personal audit from me.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                    <Link
                        href="/services#audit-form"
                        className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-black text-lg hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
                    >
                        <i className="fas fa-magnifying-glass group-hover:-translate-y-1 transition-transform"></i>
                        Claim Free AI Audit
                    </Link>

                    <a
                        href="mailto:mohrashard@gmail.com"
                        className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
                    >
                        <i className="far fa-envelope"></i> Email Me Directly
                    </a>
                </div>

                {/* Timezone trust signal — critical for US/UK/CA/AU clients */}
                <p className="text-xs text-slate-600 mb-10 font-light">
                    <i className="fas fa-clock mr-1.5"></i>
                    Based in Colombo, Sri Lanka (UTC+5:30) — responding within 4 hours during working hours, within 12 hours globally.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 rounded-2xl">
                        <i className="fab fa-linkedin text-blue-500 text-xl"></i>
                        <a href="https://www.linkedin.com/in/mohamedrashard" target="_blank" rel="noopener noreferrer" className="text-slate-300 font-medium hover:text-white transition-colors">
                            Connect on LinkedIn
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 rounded-2xl">
                        <i className="fab fa-github text-white text-xl"></i>
                        <a href="https://github.com/mohrashard/" target="_blank" rel="noopener noreferrer" className="text-slate-300 font-medium hover:text-white transition-colors">
                            View GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}