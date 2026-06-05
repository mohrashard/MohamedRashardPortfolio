export const metadata = {
    title: "Startup Idea Validator | AI Market & Feasibility Analysis | Mr² Labs",
    description: "Validate your startup idea before writing a line of code. Our AI diagnostic scores your concept across market size, technical feasibility, and competition.",
    keywords: [
        "Startup Idea Validator",
        "Business Idea Analyzer",
        "AI Market Research",
        "MVP Feasibility Check",
        "Mr² Labs Diagnostic",
        "Pre-Seed Startup Tool"
    ],
    openGraph: {
        title: "Startup Idea Validator | Market & Feasibility Analysis",
        description: "Calculate your idea's exact viability score and get a technical execution blueprint. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/idea-validator",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Startup Idea Validator Diagnostic" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/idea-validator",
    },
};

export default function IdeaValidatorLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Startup Idea Validator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An AI-powered diagnostic engine that evaluates startup concepts across market size, technical feasibility, monetization, and competitive density. Outputs a VC-grade viability score."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the Startup Idea Validator</h2>
                <p>
                    The Startup Idea Validator is a free diagnostic utility engineered by Mr² Labs. 
                    It is designed to help founders and entrepreneurs stress-test their concepts before committing capital to development.
                    By analyzing the core problem, proposed solution, and target demographic, the system calculates a viability score out of 100.
                </p>
                <p>
                    The architecture utilizes a secure processing pipeline powered by the Gemini API 
                    to evaluate technical feasibility, market size (TAM), and competitive threats.
                </p>
            </article>
        </>
    );
}
