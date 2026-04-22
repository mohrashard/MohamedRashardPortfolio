import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import SocialProofTicker from "./components/SocialProofTicker";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export async function generateMetadata() {
    return {
        title: "Mr² Labs: Ship Your MVP in 72 Hours | Mohamed Rashard",
        description: "AI-powered software development agency in Colombo, Sri Lanka. We build MVPs, SaaS platforms, and AI automation tools for founders — shipped in 72 hours at a fraction of agency cost.",
        keywords: ["MVP development", "AI developer Sri Lanka", "SaaS development Colombo", "Next.js developer", "AI automation agency", "72 hour MVP", "Mr2 Labs", "Mohamed Rashard"],
        alternates: {
            canonical: process.env.NEXT_PUBLIC_SITE_URL,
        },
        openGraph: {
            title: "Mr² Labs: Ship Your MVP in 72 Hours",
            description: "We build production-grade MVPs for founders in 72 hours. AI-powered development from Colombo, Sri Lanka.",
            url: process.env.NEXT_PUBLIC_SITE_URL,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Mr² Labs: Ship Your MVP in 72 Hours",
            description: "Production-grade MVPs shipped in 72 hours. AI development agency — Colombo, Sri Lanka.",
        }
    };
}



export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">
            <Navbar />
            <Hero />
            <TrustBar />
            <SocialProofTicker />
            <About />
            <Skills />
            <Projects />
            <Testimonials />
            <Contact />
        </main>
    );
}