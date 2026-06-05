export const metadata = {
    title: "B2B Cold Email Generator | High-Converting Outreach | Mr² Labs",
    description: "Generate highly personalized, high-converting cold email variants for your B2B SaaS or agency. AI-driven outreach templates engineered to book calls.",
    keywords: [
        "Cold Email Generator",
        "B2B Sales Outreach",
        "AI Email Templates",
        "Cold Outreach Automation",
        "Mr² Labs Sales Tools",
        "High Converting Cold Emails"
    ],
    openGraph: {
        title: "B2B Cold Email Generator | High-Converting Outreach",
        description: "Generate high-converting, personalized cold email variants for your specific audience. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/cold-email",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Cold Email Generator" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/cold-email",
    },
};

export default function ColdEmailLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "B2B Cold Email Generator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An AI-powered sales utility that ingests product value propositions and outputs 3 distinct cold email frameworks (Direct, Story-based, Question-led) optimized for high response rates in B2B outreach."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the Cold Email Generator</h2>
                <p>
                    The Cold Email Generator is a free B2B sales utility engineered by Mr² Labs. 
                    It is designed to solve the primary friction point of outbound sales: writing copy that converts. 
                    By inputting a product description, target demographic, and core pain point, the system 
                    utilizes the Gemini API to craft highly personalized outreach sequences.
                </p>
                <p>
                    The tool avoids standard corporate fluff, instead optimizing for short, punchy, plain-text 
                    formats that maximize deliverability and open rates.
                </p>
            </article>
        </>
    );
}
