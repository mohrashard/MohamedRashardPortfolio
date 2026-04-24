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
            {/* Visually Hidden SEO Content for SSR/Crawlers */}
            <section style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                whiteSpace: 'nowrap',
                border: 0
            }}>
                <h1>Mohamed Rashard — Full Stack AI Developer in Sri Lanka</h1>
                <p>
                    I am Mohamed Rashard, a 21-year-old full-stack AI developer based in
                    Colombo, Sri Lanka. I build AI-powered MVPs in 48 hours for funded
                    startup founders and non-technical business owners worldwide.
                    First Class Honours in Software Engineering from Cardiff Metropolitan
                    University 2026.
                </p>
                <h2>What I build</h2>
                <ul>
                    <li>AI-powered SaaS platforms shipped in 48 hours</li>
                    <li>Full-stack web applications using Next.js and React</li>
                    <li>AI integrations with OpenAI, Gemini, and LangChain</li>
                    <li>Computer vision applications using OpenCV</li>
                    <li>Business automation tools replacing manual processes</li>
                    <li>Codebase rescue for half-built abandoned projects</li>
                </ul>
                <h2>Proven results</h2>
                <ul>
                    <li>BizFinder AI — lead generation tool shipped in 47 hours</li>
                    <li>LiverLens — liver disease prediction platform, 92% accuracy</li>
                    <li>Mentora — AI wellness platform serving 3000 users</li>
                    <li>GrabMe — full-stack marketplace product, live</li>
                </ul>
                <h2>Working with clients in US, UK, Canada, Australia, and Middle East</h2>
                <p>
                    Async-friendly. Responding within 4 hours during Colombo working hours
                    and within 12 hours globally. Fixed price projects only.
                    No hourly billing.
                </p>
            </section>
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