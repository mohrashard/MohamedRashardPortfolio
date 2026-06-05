export const metadata = {
    title: "Startup Runway Calculator | Burn Rate & Capital Analysis | Mr² Labs",
    description: "Calculate your startup's exact runway. See how much capital and survival time you gain by eliminating agency overhead and bloated development retainers.",
    keywords: [
        "Startup Runway Calculator",
        "Burn Rate Calculator",
        "Startup Capital Analysis",
        "Agency Overhead Cost",
        "Extend Startup Runway",
        "Mr² Labs Diagnostic"
    ],
    openGraph: {
        title: "Startup Runway Calculator | Capital Burn Analysis",
        description: "Calculate your exact startup runway and see the capital gained by eliminating agency overhead.",
        url: "https://mr2labs.com/labs/runway-calculator",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Startup Runway Calculator" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/runway-calculator",
    },
};

export default function RunwayCalculatorLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Startup Runway Calculator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An interactive financial diagnostic tool that calculates startup runway and burn rate, highlighting the exact capital and survival time gained by replacing agency retainers with high-velocity engineering sprints."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the Startup Runway Calculator</h2>
                <p>
                    The Startup Runway Calculator is a financial diagnostic utility engineered by Mr² Labs. 
                    It is designed for startup founders, CEOs, and operators to evaluate their current burn rate and total capital runway.
                    Crucially, the tool calculates the "Agency Overhead Deficit"—the amount of capital and time lost to slow development retainers.
                </p>
                <p>
                    By inputting total cash, monthly burn, and agency overhead, founders receive a mathematical breakdown of their extended runway 
                    and a custom AI-generated capital efficiency strategy powered by the Gemini API.
                </p>
            </article>
        </>
    );
}
