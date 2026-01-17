import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export const metadata = {
    title: "Mr2 Labs | Systems Architecture & Revenue Ecosystems (Mr²)",
    description: "Mr2 Labs architects high-ticket automated revenue ecosystems and custom AI solutions. We engineer digital dominance for global visionaries.",
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