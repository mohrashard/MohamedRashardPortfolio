import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export const metadata = {
    title: {
        default: "Mohamed Rashard Rizmi | AI & Web Developer",
        template: "%s | Mohamed Rashard Rizmi"
    },
    description: "Portfolio of Mohamed Rashard Rizmi, a Software Engineer & AI Specialist based in Colombo, Sri Lanka. Expert in Next.js, React, and Machine Learning.",
    alternates: {
        canonical: "https://www.mohamedrashard.dev",
    },
};

export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}