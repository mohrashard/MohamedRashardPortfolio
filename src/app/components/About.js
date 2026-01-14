import React from 'react';

export default function About() {
    return (
        <section id="about" className="py-24 px-6 md:px-12 relative bg-[#080808]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Bio Text */}
                    <div className="space-y-6 text-slate-400 leading-relaxed text-lg" itemScope itemType="https://schema.org/Person">
                        <p>
                            Software Engineer with a robust foundation in <strong className="text-white">Artificial Intelligence</strong> and <strong className="text-white">Data Analytics</strong>. Currently a final-year undergraduate (First Class Honors track) in Software Engineering at Cardiff Metropolitan University. Based in <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><strong className="text-white" itemProp="addressLocality">Colombo</strong>, <strong className="text-white" itemProp="addressCountry">Sri Lanka</strong></span>, I combine strong algorithmic thinking with practical full-stack expertise to build scalable, innovative software solutions.
                        </p>
                        <p>
                            My technical arsenal includes <strong className="text-white">C++, Java, Python, and JavaScript</strong>, with specialized proficiency in the <strong className="text-white">React ecosystem, Node.js, and ASP.NET</strong>. I excel in architecting enterprise-grade applications, bridging the gap between responsive, intuitive front-end interfaces and secure, high-performance back-end infrastructure deployed on the cloud.
                        </p>
                        <p>
                            Beyond traditional development, I am deeply passionate about integrating Machine Learning models (XGBoost, TensorFlow) into web applications. I thrive in agile, collaborative environments using Git and CI/CD practices.
                        </p>

                        {/* Languages */}
                        <div className="mt-8 space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
                            {["English", "Tamil", "Sinhala"].map(lang => (
                                <div key={lang} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300 font-medium">{lang}</span>
                                        <span className="text-blue-400 text-xs uppercase tracking-wide">Fluent</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-full animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Cards */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6">Education</h3>
                        {[
                            { title: "B.Sc. (Hons) in Software Engineering", school: "Cardiff Metropolitan University", year: "Mar 2023 - Nov 2026", gpa: "GPA 3.1", icon: "fas fa-graduation-cap", highlight: true },
                            { title: "Diploma in Computing", school: "ICBT Campus, Colombo", year: "Dec 2022", icon: "fas fa-certificate", highlight: false },
                            { title: "G.C.E. Advanced Level", school: "Private Candidate", year: "Dec 2024", icon: "fas fa-school", highlight: false },
                            { title: "G.C.E. Ordinary Level", school: "Zahira College, Colombo", year: "Jun 2022", icon: "fas fa-school", highlight: false },
                        ].map((edu, idx) => (
                            <div key={idx} className={`relative p-6 rounded-2xl border transition-all duration-300 group ${edu.highlight ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/10 border-blue-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                <div className="flex gap-5 items-start">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${edu.highlight ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/10 text-slate-400'}`}>
                                        <i className={edu.icon}></i>
                                    </div>
                                    <div>
                                        <h4 className={`text-lg font-bold mb-1 ${edu.highlight ? 'text-white' : 'text-slate-200'}`}>{edu.title}</h4>
                                        <p className="text-slate-400 text-sm mb-3">{edu.school}</p>
                                        <div className="flex gap-3 text-xs font-semibold">
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5">{edu.year}</span>
                                            {edu.gpa && <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">{edu.gpa}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
