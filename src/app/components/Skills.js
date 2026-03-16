"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Skills() {
    const [activeTab, setActiveTab] = useState("AI & Machine Learning");

    const skillsData = {
        // ── Tab order: AI first because it is your #1 commercial differentiator ──
        "AI & Machine Learning": [
            { name: "OpenAI API", icon: "fas fa-robot", color: "#10a37f" },
            { name: "LangChain", icon: "fas fa-link", color: "#1c6ef3" },
            { name: "Gemini API", icon: "fas fa-star", color: "#4285F4" },
            { name: "Claude API", icon: "fas fa-brain", color: "#D97757" },
            { name: "OpenClaw", icon: "fas fa-hand-back-fist", color: "#FF4500" },
            { name: "TensorFlow", icon: "devicon-tensorflow-original colored", color: "#FF6F00" },
            { name: "Scikit-learn", icon: "devicon-scikitlearn-plain colored", color: "#F7931E" },
            { name: "XGBoost", icon: "fas fa-chart-bar", color: "#11A347" },
            { name: "Hugging Face", icon: "fas fa-smile", color: "#FFD21E" },
            { name: "Python", icon: "devicon-python-plain", color: "#3776AB" },
        ],
        "Frontend": [
            { name: "Next.js", icon: "devicon-nextjs-plain", color: "#FFFFFF" },
            { name: "React", icon: "devicon-react-original colored", color: "#61DAFB" },
            { name: "TypeScript", icon: "devicon-typescript-plain colored", color: "#3178C6" },
            { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "#F7DF1E" },
            { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored", color: "#06B6D4" },
            { name: "Framer Motion", icon: "fas fa-magic", color: "#BB4FE8" },
            { name: "HTML", icon: "devicon-html5-plain colored", color: "#E34F26" },
            { name: "CSS", icon: "devicon-css3-plain colored", color: "#1572B6" },
        ],
        "Backend": [
            { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "#339933" },
            { name: "Express", icon: "devicon-express-original", color: "#FFFFFF" },
            { name: "Flask", icon: "devicon-flask-plain", color: "#FFFFFF" },
            { name: "FastAPI", icon: "fas fa-bolt", color: "#009688" },
            { name: "REST APIs", icon: "fas fa-exchange-alt", color: "#FF6B6B" },
            { name: "Resend", icon: "fas fa-envelope", color: "#FFFFFF" },
        ],
        "Databases": [
            { name: "Supabase", icon: "devicon-supabase-plain", color: "#3ECF8E" },
            { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", color: "#336791" },
            { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "#47A248" },
            { name: "MySQL", icon: "devicon-mysql-plain colored", color: "#4479A1" },
        ],
        "Mobile": [
            { name: "React Native", icon: "devicon-react-original colored", color: "#61DAFB" },
            { name: "Expo", icon: "fas fa-mobile-screen", color: "#FFFFFF" },
            { name: "Firebase", icon: "devicon-firebase-plain colored", color: "#FFCA28" },
        ],
        "DevOps & Cloud": [
            { name: "Vercel", icon: "devicon-vercel-original", color: "#FFFFFF" },
            { name: "Railway", icon: "devicon-railway-original", color: "#B835FF" },
            { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", color: "#FF9900" },
            { name: "Git", icon: "devicon-git-plain colored", color: "#F05032" },
            { name: "GitHub", icon: "devicon-github-original", color: "#FFFFFF" },
            { name: "VS Code", icon: "devicon-vscode-plain colored", color: "#007ACC" },
        ],
        "Payments & Auth": [
            { name: "Stripe", icon: "fab fa-stripe-s", color: "#635BFF" },
            { name: "Supabase Auth", icon: "fas fa-lock", color: "#3ECF8E" },
            { name: "JWT", icon: "fas fa-key", color: "#FB015B" },
            { name: "OAuth 2.0", icon: "fas fa-shield-halved", color: "#4285F4" },
        ],
    };

    return (
        <section id="skills" className="py-24 px-6 md:px-12 relative bg-[#050505]">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px]"></div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
                    <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {Object.keys(skillsData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border 
                                ${activeTab === tab
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {skillsData[activeTab].map((skill, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                key={skill.name}
                                className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:border-blue-500/30 transition-all duration-300"
                            >
                                <div className="w-full absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <i className={`${skill.icon} text-5xl transition-transform duration-300 group-hover:scale-110 drop-shadow-md`} style={{ color: skill.color }}></i>
                                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                                <div className="h-1 w-0 group-hover:w-1/2 bg-blue-500 rounded-full transition-all duration-300"></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}