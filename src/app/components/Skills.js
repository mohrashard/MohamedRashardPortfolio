"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Skills() {
    const [activeTab, setActiveTab] = useState("Programming Languages");

    const skillsData = {
        "Programming Languages": [
            { name: "C++", icon: "devicon-cplusplus-plain", color: "#00599C" },
            { name: "Java", icon: "devicon-java-plain", color: "#007396" },
            { name: "Python", icon: "devicon-python-plain", color: "#3776AB" },
            { name: "C#", icon: "devicon-csharp-plain", color: "#239120" },
            { name: "PHP", icon: "devicon-php-plain", color: "#777BB4" },
        ],
        "Web Development": [
            { name: "HTML", icon: "devicon-html5-plain colored", color: "#E34F26" },
            { name: "CSS", icon: "devicon-css3-plain colored", color: "#1572B6" },
            { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "#F7DF1E" },
        ],
        "Frameworks": [
            { name: "ASP.NET", icon: "devicon-dot-net-plain colored", color: "#512BD4" },
            { name: "Java Servlet", icon: "devicon-java-plain colored", color: "#28A1C5" },
            { name: "React", icon: "devicon-react-original colored", color: "#61DAFB" },
            { name: "Flask", icon: "devicon-flask-plain", color: "#FFFFFF" },
            { name: "Express", icon: "devicon-express-original", color: "#FFFFFF" },
            { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "#339933" },
            { name: "Next.js", icon: "devicon-nextjs-plain", color: "#FFFFFF" },
        ],
        "Databases": [
            { name: "MySQL", icon: "devicon-mysql-plain colored", color: "#4479A1" },
            { name: "MSSQL", icon: "devicon-microsoftsqlserver-plain colored", color: "#CC2927" },
            { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "#47A248" },
            { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", color: "#336791" },
        ],
        "Tools & Technologies": [
            { name: "VS Code", icon: "devicon-vscode-plain colored", color: "#007ACC" },
            { name: "Visual Studio", icon: "devicon-visualstudio-plain colored", color: "#CF9EFF" },
            { name: "Android Studio", icon: "devicon-android-plain colored", color: "#3DDC84" },
            { name: "NetBeans", icon: "devicon-apache-plain colored", color: "#D455AB" },
            { name: "IntelliJ IDEA", icon: "devicon-intellij-plain colored", color: "#FA2C5A" },
            { name: "Python IDLE", icon: "devicon-python-plain", color: "#3776AB" },
            { name: "SSMS", icon: "devicon-microsoftsqlserver-plain colored", color: "#CC2927" },
            { name: "Git", icon: "devicon-git-plain colored", color: "#F05032" },
            { name: "GitHub", icon: "devicon-github-original", color: "#FFFFFF" },
            { name: "Jupyter", icon: "devicon-jupyter-plain colored", color: "#F37626" },
            { name: "Google Colab", icon: "devicon-google-plain colored", color: "#F9AB00" },
            { name: "Hugging Face", icon: "fas fa-robot", color: "#FFD21E" },
            { name: "Kaggle", icon: "fab fa-kaggle", color: "#20BEFF" },
        ],
        "AI/ML": [
            { name: "Random Forest", icon: "fas fa-tree", color: "#228B22" },
            { name: "XGBoost", icon: "fas fa-wind", color: "#11A347" },
            { name: "Neural Networks", icon: "fas fa-project-diagram", color: "#9932CC" },
            { name: "TensorFlow", icon: "devicon-tensorflow-original colored", color: "#FF6F00" },
            { name: "Scikit-learn", icon: "devicon-scikitlearn-plain colored", color: "#F7931E" },
            { name: "SVM", icon: "fas fa-bezier-curve", color: "#E377C2" },
            { name: "Linear Regression", icon: "fas fa-chart-line", color: "#1F77B4" },
        ],
        "Cloud": [
            { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", color: "#FF9900" },
        ]
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
