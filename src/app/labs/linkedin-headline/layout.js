export const metadata = {
    title: "LinkedIn Headline Generator | Optimize Profile SEO | Mr² Labs",
    description: "Generate search-optimized, high-converting LinkedIn profile headlines designed for founders, consultants, and operators.",
    keywords: [
        "LinkedIn Headline Generator",
        "Profile SEO Optimization",
        "Personal Branding Tool",
        "Founder LinkedIn Headline",
        "Consultant Profile Optimization",
        "Mr² Labs Viral Tools"
    ],
    openGraph: {
        title: "LinkedIn Headline Generator | Personal Branding Engine",
        description: "Generate search-optimized LinkedIn headlines to maximize inbound leads and profile views. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/linkedin-headline",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "LinkedIn Headline Generator" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/linkedin-headline",
    },
};

export default function LinkedinHeadlineLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "LinkedIn Headline Generator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "A personal branding utility that utilizes LLMs to generate search-optimized, high-converting LinkedIn headlines for founders, operators, and B2B consultants based on their specific value proposition."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the LinkedIn Headline Generator</h2>
                <p>
                    The LinkedIn Headline Generator is a free personal branding and SEO utility engineered by Mr² Labs. 
                    It helps B2B founders, agency owners, and consultants optimize their LinkedIn profiles for search visibility and inbound lead generation.
                </p>
                <p>
                    By inputting their role, industry, and core value proposition, the Gemini API generates 5 distinct headline frameworks: 
                    The Authority, The Results-Driven, The Visionary, The Niche Specialist, and The Conversation Starter. 
                    This tool requires no email signup and is designed for frictionless, open-source use.
                </p>
            </article>
        </>
    );
}
