"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const titleRef = useRef(null);

    // Typing Effect
    useEffect(() => {
        const titles = ["Software Engineer", "AI/ML Engineer", "Web Developer", "Full-Stack Developer", "Content Creator"];
        let count = 0;
        let index = 0;
        let currentText = "";
        let isDeleting = false;
        let timer = null;
        let ismounted = true;

        const type = () => {
            if (!ismounted) return;
            const currentTitle = titles[count % titles.length];

            if (isDeleting) {
                currentText = currentTitle.substring(0, currentText.length - 1);
            } else {
                currentText = currentTitle.substring(0, currentText.length + 1);
            }

            if (titleRef.current) {
                titleRef.current.innerHTML = `${currentText}<span class="typing-cursor">|</span>`;
            }

            let typeSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && currentText === currentTitle) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentText === "") {
                isDeleting = false;
                count++;
                typeSpeed = 200;
            }

            timer = setTimeout(type, typeSpeed);
        };

        // Start typing
        timer = setTimeout(type, 1000);

        return () => {
            clearTimeout(timer);
            ismounted = false;
        }
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#020617]">
            {/* Background Decoration: Navy Blue Space Theme */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Deep Space Blue - Top Right */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>

                {/* Cosmic Purple/Navy - Bottom Left */}
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Stars/Grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                {/* Hero Text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 md:space-y-8 text-center lg:text-left"
                >
                    <div>
                        <h1 className="glitch-effect text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight tracking-tight">
                            Mohamed <br />
                            Rashard Rizmi
                        </h1>
                        <div className="h-8 md:h-12 flex items-center justify-center lg:justify-start">
                            <h2 ref={titleRef} className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-400/90 font-mono"></h2>
                        </div>
                    </div>

                    <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Specializing in <strong className="text-blue-400">web app development</strong>,
                        <strong className="text-blue-400"> mobile solutions</strong>, and cutting-edge
                        <strong className="text-blue-400"> AI integration</strong>.
                        Transforming complex problems into elegant digital experiences.
                    </p>

                    {/* Service Highlights - Mini Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                        {[
                            { title: "React & Next.js", desc: "Modern Web Apps", icon: "fab fa-react", color: "text-sky-400" },
                            { title: "React Native", desc: "Mobile Solutions", icon: "fas fa-mobile-alt", color: "text-indigo-400" },
                            { title: "AI Integration", desc: "Smart Automation", icon: "fas fa-robot", color: "text-amber-400" },
                            { title: "Custom Software", desc: "Tailored Solutions", icon: "fas fa-code", color: "text-emerald-400" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-base sm:text-lg ${s.color}`}>
                                    <i className={s.icon}></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-200">{s.title}</h3>
                                    <p className="text-xs text-slate-500">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                        <button onClick={() => scrollToSection("projects")} className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 sm:gap-3">
                            <i className="fas fa-rocket"></i> Explore My Work
                        </button>
                        <button onClick={() => scrollToSection("contact")} className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-transparent border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/5 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 sm:gap-3">
                            <i className="fas fa-handshake"></i> Hire Me
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center lg:justify-start gap-4 pt-6">
                        {[
                            { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/mohamedrashard", color: "hover:bg-[#0077b5]" },
                            { icon: "fab fa-github", href: "https://github.com/mohrashard/", color: "hover:bg-[#333]" },
                            { icon: "fab fa-instagram", href: "https://www.instagram.com/moh_.rashaxd", color: "hover:bg-pink-600" },
                            { icon: "fab fa-tiktok", href: "https://www.tiktok.com/@mohh.rasharrd", color: "hover:bg-black" },
                            { icon: "fab fa-facebook-f", href: "https://www.facebook.com/share/1EnKfVXh1z/", color: "hover:bg-[#1877f2]" },
                            { icon: "fab fa-youtube", href: "https://youtube.com/@moh_rashard", color: "hover:bg-red-600" },
                        ].map((social, i) => (
                            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-300 hover:text-white hover:-translate-y-2 hover:shadow-lg ${social.color}`}>
                                <i className={social.icon}></i>
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Hero Graphic / Animation */}
                <div className="hidden lg:flex justify-center items-center h-full relative">
                    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                        {/* Tech Orbit Container - Icons INSIDE to rotate with it */}
                        <div className="tech-orbit absolute m-auto w-[350px] h-[350px] border border-white/10 rounded-full">
                            <div className="tech-icon-orbit absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(97,218,251,0.3)]">
                                <i className="fab fa-react text-2xl text-[#61DAFB]"></i>
                            </div>
                            <div className="tech-icon-orbit absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(247,223,30,0.3)]">
                                <i className="fab fa-js text-2xl text-[#F7DF1E]"></i>
                            </div>
                            <div className="tech-icon-orbit absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-[0_0_20px_rgba(55,118,171,0.3)]">
                                <i className="fab fa-python text-2xl text-[#3776AB]"></i>
                            </div>
                            <div className="tech-icon-orbit absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(104,160,99,0.3)]">
                                <i className="fab fa-node text-2xl text-[#68A063]"></i>
                            </div>
                        </div>

                        {/* Central Code Block - Static in center */}
                        <div className="relative w-64 bg-black/80 backdrop-blur-md rounded-xl border border-white/15 p-6 shadow-2xl z-20">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <code className="font-mono text-sm space-y-2 block">
                                <div className="flex gap-2"><span className="text-purple-400">const</span> <span className="text-blue-400">dev</span> <span className="text-white">=</span></div>
                                <div className="pl-4 text-green-400">'Rashard';</div>
                                <div className="flex gap-2"><span className="text-purple-400">while</span><span className="text-yellow-400">(alive)</span> <span className="text-white">{"{"}</span></div>
                                <div className="pl-4 flex gap-2"><span className="text-blue-400">code</span><span className="text-white">();</span></div>
                                <div className="pl-4 flex gap-2"><span className="text-blue-400">eat</span><span className="text-white">();</span></div>
                                <div className="pl-4 flex gap-2"><span className="text-blue-400">sleep</span><span className="text-white">();</span></div>
                                <div className="text-white">{"}"}</div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
