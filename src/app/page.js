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


export const metadata = {
    title: "Mr² Labs - AI & Software Development Agency",
    description: "We build and ship high-performance software, mobile apps, and AI products for founders. MVPs delivered in days, not months.",
    alternates: {
        canonical: "https://mr2labs.com",
    },
    openGraph: {
        title: "Mr² Labs - AI & Software Development Agency",
        description: "We build and ship high-performance software, mobile apps, and AI products for founders. MVPs delivered in days, not months.",
        url: "https://mr2labs.com",
        siteName: "Mr² Labs",
        images: [
            {
                url: "https://mr2labs.com/og/home.png",
                width: 1200,
                height: 630,
                alt: "Mr² Labs - Home",
            }
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mr² Labs - AI & Software Development Agency",
        description: "We build and ship high-performance software, mobile apps, and AI products for founders. MVPs delivered in days, not months.",
        images: ["https://mr2labs.com/og/home.png"],
        creator: "@mr2labs",
    }
};

export default function Home() {
    // Organization JSON-LD moved to layout.js
    return (
        <main className="relative min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#0066FF]/30 overflow-x-hidden">

            {/* Static SEO content — visible to Google, hidden visually */}
            <div className="sr-only">
              <h1>Mr² Labs — AI & Software Development Agency</h1>
              <p>We build and ship high-performance software, mobile apps, and AI products for founders. MVPs delivered in 72 hours, not months. Based in Colombo, Sri Lanka. Serving clients globally across the US, UK, Canada, and Australia.</p>
              <h2>Our Services</h2>
              <ul>
                <li>Custom AI Integration and Local LLM Deployment</li>
                <li>SaaS MVP Development in 48-72 Hours</li>
                <li>React Native Mobile App Development</li>
                <li>Next.js Web Application Architecture</li>
                <li>Supabase Database Infrastructure</li>
                <li>Automated Workflow and Prospecting Systems</li>
              </ul>
              <h2>Projects Shipped</h2>
              <ul>
                <li>Ignite Ed — AI-powered trilingual education platform for Sri Lankan students</li>
                <li>GrabMe — Home services marketplace PWA built in 48 hours</li>
                <li>BizFinder AI — Automated B2B prospecting pipeline for design agencies</li>
              </ul>
            </div>



            <Navbar />

            {/* 1. The Hook */}
            <Hero />

            {/* 2. Immediate Validation - Tech & Telemetry Ribbon */}
            <TrustBar />
            <SocialProofTicker />

            {/* 3. The Proof - Deployed Architectures */}
            <Projects />

            {/* 4. The Engine - Infrastructure Capabilities */}
            <Skills />

            {/* 5. The Firm Thesis - Studio Overview */}
            <About />

            {/* 6. Market Validation */}
            <Testimonials />

            {/* 7. The Close - Deployment Terminal */}
            <Contact />

        </main>
    );
}