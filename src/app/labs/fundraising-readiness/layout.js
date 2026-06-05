export const metadata = {
    title: "Fundraising Readiness Scorecard | Startup Diagnostic | Mr² Labs",
    description: "Calculate your startup's exact fundraising readiness score. Find out if you are ready to pitch VC and Angel investors based on traction, team, and market data.",
    keywords: [
        "Fundraising Readiness Calculator",
        "Startup Pitch Readiness",
        "VC Funding Scorecard",
        "Pre-Seed Startup Evaluation",
        "Mr² Labs Diagnostic",
        "Angel Investment Checklist"
    ],
    openGraph: {
        title: "Fundraising Readiness Scorecard | VC Diagnostic",
        description: "Calculate your exact fundraising readiness score before you pitch investors. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/fundraising-readiness",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Fundraising Readiness Scorecard" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/fundraising-readiness",
    },
};

export default function FundraisingReadinessLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Fundraising Readiness Scorecard",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An algorithmic diagnostic utility that evaluates startup fundamentals (market size, traction, team, momentum) to calculate a weighted Fundraising Readiness Score out of 100, providing actionable gaps to fix before pitching investors."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the Fundraising Readiness Scorecard</h2>
                <p>
                    The Fundraising Readiness Scorecard is a logical diagnostic tool built by Mr² Labs. 
                    It is designed for startup founders preparing to raise Pre-Seed or Seed rounds from Angel Investors and Venture Capitalists.
                </p>
                <p>
                    The tool uses a weighted 100-point algorithm across 6 core dimensions: Problem & Market, Traction, Team, 
                    Preparedness, Product Differentiation, and Momentum. It requires no AI APIs, running purely on deterministic 
                    investment heuristics to output a fundability score and isolate specific execution gaps.
                </p>
            </article>
        </>
    );
}
