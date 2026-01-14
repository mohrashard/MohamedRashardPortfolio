import React from "react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/5"></div>
            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
                    <a href="mailto:mohrashard@gmail.com" className="flex items-center justify-center gap-4 p-6 bg-[#111] border border-white/5 rounded-2xl hover:border-blue-500/50 hover:bg-blue-900/10 transition-all group min-w-[280px]">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <i className="fas fa-envelope text-xl"></i>
                        </div>
                        <span className="text-lg font-medium text-slate-200 group-hover:text-white">mohrashard@gmail.com</span>
                    </a>
                    <a href="https://www.linkedin.com/in/mohamedrashard" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 p-6 bg-[#111] border border-white/5 rounded-2xl hover:border-blue-500/50 hover:bg-blue-900/10 transition-all group min-w-[280px]">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <i className="fab fa-linkedin-in text-xl"></i>
                        </div>
                        <span className="text-lg font-medium text-slate-200 group-hover:text-white">LinkedIn Profile</span>
                    </a>
                </div>

                <a href="mailto:mohrashard@gmail.com" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 rounded-full text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all">
                    <i className="far fa-paper-plane"></i> Say Hello
                </a>
            </div>
        </section>
    );
}
