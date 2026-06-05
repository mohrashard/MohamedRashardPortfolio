export const metadata = {
    title: "SaaS Pricing Page Generator & Strategy | Mr² Labs",
    description: "Generate highly-optimized SaaS pricing tiers, feature lists, and conversion copy. An AI-powered monetization tool engineered by Mr² Labs.",
    keywords: [
        "SaaS Pricing Generator",
        "Pricing Page Template",
        "SaaS Monetization Strategy",
        "Pricing Tier Generator",
        "Mr² Labs Pricing Tool",
        "Startup Revenue Models"
    ],
    openGraph: {
        title: "SaaS Pricing Page Generator | Monetization Strategy",
        description: "Output highly-optimized pricing tiers and copy tailored to your product. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/pricing-generator",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "SaaS Pricing Page Generator" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/pricing-generator",
    },
};

export default function PricingGeneratorLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SaaS Pricing Page Generator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An AI-powered monetization utility that ingests a product's core value proposition and outputs structured, conversion-optimized pricing tiers, including psychological price points, feature gating, and marketing copy."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the SaaS Pricing Page Generator</h2>
                <p>
                    The SaaS Pricing Page Generator is a monetization utility engineered by Mr² Labs. 
                    It is designed for startup founders who have built their MVP but need a conversion-optimized pricing architecture before launching.
                </p>
                <p>
                    By inputting the product name, target audience, and core features, the system leverages the Gemini API 
                    to output a 3-tier pricing strategy. The tool calculates optimal psychological price points, organizes feature limits, 
                    and generates persuasive sales copy formatted instantly into a responsive UI grid.
                </p>
            </article>
        </>
    );
}
