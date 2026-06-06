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
        title: "Mr² Labs | High-Velocity Software Engineering & AI Deployment",
        description: "Mr² Labs is an elite software engineering firm based in Colombo. We architect, secure, and ship production-grade AI applications and SaaS MVPs in 48-72 hours.",
        keywords: [
            "Mr2 Labs",
            "mr2 labs",
            "Mr² Labs",
            "mr² labs",
            "MVP deployment",
            "AI software firm",
            "SaaS development agency",
            "Next.js 15 architecture",
            "Mohamed Rashard Rizmi",
            "72 hour MVP sprint",
            "Codebase rescue",
            "B2B software engineering",
            "AI automation agency"
        ],
        alternates: {
            canonical: "https://www.mr2labs.com",
        },
        openGraph: {
            title: "Mr² Labs | High-Velocity Software Engineering",
            description: "We bypass the bloated agency model to build production-grade MVPs for funded founders in 72 hours.",
            url: "https://www.mr2labs.com",
            siteName: "Mr² Labs",
            type: "website",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: "Mr² Labs | High-Velocity Software Engineering",
            description: "Production-grade MVPs shipped in 48-72 hours. Elite AI development and deployment.",
        }
    };
}

export default function Home() {
    // Upgraded from WebSite to Organization for better B2B SEO and LLM entity recognition
    const jsonLdOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mr² Labs",
        "url": "https://www.mr2labs.com",
        "logo": "https://www.mr2labs.com/mr-squared-logo.png",
        "founder": {
            "@type": "Person",
            "name": "Mohamed Rashard Rizmi",
            "jobTitle": "Full Stack Software Engineer"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "rashard@mr2labs.com",
            "contactType": "technical support and sales"
        },
        "sameAs": [
            "https://www.linkedin.com/in/mohamedrashard"
        ],
        "description": "An elite software engineering and digital systems firm specializing in rapid 48 to 72-hour MVP deployment, AI architecture, and codebase rescue."
    };

    return (
        <main className="relative min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#0066FF]/30 overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
            />



            <Navbar />

            {/* 1. The Hook */}
            <Hero />

            {/* 2. Immediate Validation — Tech & Telemetry Ribbon */}
            <TrustBar />
            <SocialProofTicker />

            {/* 3. The Proof — Deployed Architectures */}
            <Projects />

            {/* 4. The Engine — Infrastructure Capabilities */}
            <Skills />

            {/* 5. The Firm Thesis — Studio Overview */}
            <About />

            {/* 6. Market Validation */}
            <Testimonials />

            {/* 7. The Close — Deployment Terminal */}
            <Contact />

        </main>
    );
}