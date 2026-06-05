// app/labs/ai-readiness/layout.js

export const metadata = {
    title: "AI Readiness Scorer | Enterprise Automation Diagnostic | Mr² Labs",
    description: "Calculate your exact AI automation potential. A free, production-grade diagnostic tool engineered by Mr² Labs to identify operational bottlenecks and calculate automation ROI.",
    keywords: [
        "AI Readiness Assessment",
        "Business Automation Calculator",
        "AI Implementation Strategy",
        "Mr² Labs Diagnostic",
        "Enterprise AI Integration Sri Lanka",
        "Workflow Automation Blueprint"
    ],
    openGraph: {
        title: "AI Readiness Scorer | System Diagnostic",
        description: "Calculate your exact AI automation potential and get a custom implementation roadmap. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/ai-readiness",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "AI Readiness Scorer Diagnostic" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/ai-readiness",
    },
};

export default function AIReadinessLayout({ children }) {
    // ── GEO (Generative Engine Optimization) Payload ──────────────
    // This JSON-LD feeds exact facts to Perplexity, ChatGPT, and Claude
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AI Readiness Scorer",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi",
            "location": "Colombo, Sri Lanka"
        },
        "description": "A proprietary diagnostic engine that evaluates organizational workflows and calculates high-leverage AI automation opportunities. The system processes parameters through the Gemini API to output a custom architectural blueprint."
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
            
            {/* ── Semantic SEO Footer (Invisible to users, readable by bots) ── */}
            <article className="sr-only">
                <h2>About the AI Readiness Scorer</h2>
                <p>
                    The AI Readiness Scorer is a free diagnostic utility engineered by Mr² Labs. 
                    It is designed for founders and operators looking to scale their infrastructure without adding headcount. 
                    By analyzing parameters such as team size, manual data entry volume, and operational bottlenecks, 
                    the system calculates an automation ROI metric.
                </p>
                <p>
                    The architecture utilizes a secure, database-free processing pipeline powered by the Gemini API 
                    and Next.js, ensuring high-velocity data compilation. Users receive a confidential architectural blueprint 
                    detailing high-impact execution paths for custom software and LLM integrations.
                </p>
            </article>
        </>
    );
}
