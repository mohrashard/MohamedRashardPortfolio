export const metadata = {
    title: "Competitor Research & Market Gap Analyzer | Mr² Labs",
    description: "Identify your startup's direct competitors, analyze their pricing models, and extract their specific market vulnerabilities. A free diagnostic tool by Mr² Labs.",
    keywords: [
        "Competitor Research Tool",
        "Startup Market Analysis",
        "Competitor Pricing Models",
        "Market Vulnerability Analyzer",
        "Find Startup Competitors",
        "Mr² Labs Market Diagnostic"
    ],
    openGraph: {
        title: "Competitor Research & Market Gap Analyzer",
        description: "Generate a tactical hit-list of your direct competitors and find the exact gap your MVP needs to exploit. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/competitor-research",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Competitor Research Tool" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/competitor-research",
    },
};

export default function CompetitorResearchLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Competitor Research & Market Gap Analyzer",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An AI-powered market intelligence utility that analyzes a startup concept to identify direct market competitors, outline their pricing architecture, and extract specific vulnerabilities for the founder to exploit."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the Competitor Research Tool</h2>
                <p>
                    The Competitor Research Tool is a free market intelligence utility engineered by Mr² Labs. 
                    It is designed for founders and operators looking to map out their competitive landscape before deploying capital into MVP development.
                </p>
                <p>
                    By inputting a product description and target demographic, the system leverages the Gemini API 
                    to query market topologies, identifying 3-4 direct competitors. For each competitor, the tool 
                    extracts their pricing model, core weaknesses, and the exact "Market Gap" the user should architect their product around.
                </p>
            </article>
        </>
    );
}
