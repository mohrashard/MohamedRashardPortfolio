import React from "react";
import Link from "next/link";

export default function Projects() {
    const caseStudies = [
        {
            title: "BizFinder AI",
            client: "A marketing founder targeting B2B businesses limit by manual outreach.",
            problem: "They were spending over 5 hours a week manually finding and qualifying leads.",
            built: "I built BizFinder AI in 48 hours to automatically discover and qualify leads using the Gemini API.",
            result: "5 hours saved every week allowing them to focus purely on closing.",
            color: "blue",
            icon: "fas fa-search-dollar"
        },
        {
            title: "LiverLens",
            client: "A private healthcare clinic needing better triaging for hepatology patients.",
            problem: "Doctors were spending too much time manually calculating disease risk factors from raw data.",
            built: "I built LiverLens, a secure React + Flask platform powered by a custom XGBoost AI model.",
            result: "92% prediction accuracy, saving 15 minutes per patient evaluation.",
            color: "purple",
            icon: "fas fa-heartbeat"
        },
        {
            title: "Mentora",
            client: "A digital health startup aiming to scale their wellness coaching program globally.",
            problem: "Coaches simply couldn't manually analyze thousands of daily behavior data points per user.",
            built: "I built an AI engine that analyzes digital patterns to generate personalized wellness recommendations at scale.",
            result: "Scaled rapidly to 1,000+ users with zero additional coaching headcount.",
            color: "cyan",
            icon: "fas fa-brain"
        },
        {
            title: "Tasknet",
            client: "A service provider marketplace needing a seamless two-sided matching platform.",
            problem: "Buyers couldn't seamlessly discover, vet, and book reliable service providers in real-time.",
            built: "I built a customized full-stack collaborative platform with a tailored matching algorithm.",
            result: "300% increase in successful local service matches within the first month.",
            color: "emerald",
            icon: "fas fa-network-wired"
        }
    ];

    const colorConfig = {
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
        cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    };

    return (
        <section id="projects" className="py-24 px-6 md:px-12 bg-[#080808]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h2>
                    <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6"></div>
                    <p className="text-slate-400 text-lg">Real business problems solved with engineering and AI.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {caseStudies.map((study, idx) => {
                        const style = colorConfig[study.color] || colorConfig.blue;
                        const [textColor] = style.split(' ');
                        
                        return (
                            <div key={idx} className="group flex flex-col bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="p-8 flex flex-col h-full">
                                    <h3 className="text-3xl font-black mb-8 text-white group-hover:text-blue-400 transition-colors flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${style} shadow-lg`}>
                                            <i className={`${study.icon} text-xl`}></i>
                                        </div>
                                        {study.title}
                                    </h3>
                                    
                                    <div className="space-y-4 mb-8 text-slate-300 flex-grow text-[15px] leading-relaxed">
                                        <p><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-building text-slate-500 w-5"></i> Client:</strong> {study.client}</p>
                                        <p><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-exclamation-triangle text-slate-500 w-5"></i> Problem:</strong> {study.problem}</p>
                                        <p><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-hammer text-slate-500 w-5"></i> Built:</strong> {study.built}</p>
                                        <p className="pt-2"><strong className="text-white font-bold ml-1 mr-2"><i className="fas fa-bolt text-slate-500 w-5"></i> Result:</strong> <span className={`${textColor} font-bold`}>{study.result}</span></p>
                                    </div>
                                    
                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <Link href="/services#audit-form" className={`group/btn inline-flex items-center gap-2 font-bold transition-all ${textColor} hover:brightness-125`}>
                                            Want something like this? Claim your free audit. 
                                            <i className="fas fa-arrow-right text-xs ml-1 transition-transform group-hover/btn:translate-x-1"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
