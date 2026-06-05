export const metadata = {
    title: "Tech Job Description Generator | Hire Senior Engineers | Mr² Labs",
    description: "Generate highly specific, stack-aware job descriptions designed to attract senior engineering talent. Eliminate HR fluff and speak directly to top developers.",
    keywords: [
        "Tech Job Description Generator",
        "Senior Software Engineer JD",
        "Tech Stack Hiring",
        "AI JD Writer",
        "Hire Founding Engineer",
        "Mr² Labs Developer Hiring"
    ],
    openGraph: {
        title: "Tech Job Description Generator | Attract Top Talent",
        description: "Generate stack-aware, no-nonsense job descriptions designed to attract senior engineers. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/jd-generator",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Tech Job Description Generator" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/jd-generator",
    },
};

export default function JDGeneratorLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Tech Job Description Generator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An AI-powered recruitment utility that outputs highly specific, stack-aware technical job descriptions. It removes generic corporate jargon and optimizes copy to attract senior software engineering talent."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the Tech Job Description Generator</h2>
                <p>
                    The Tech Job Description Generator is a free recruitment and engineering utility built by Mr² Labs. 
                    It solves the common bottleneck founders face when trying to hire top-tier technical talent without a technical background.
                </p>
                <p>
                    By inputting the required tech stack, company stage, and core engineering challenges, the system uses the Gemini API 
                    to generate a "no-fluff" Job Description. It removes buzzwords like "ninja" or "rockstar" and focuses purely on 
                    architectural challenges, technical constraints, and realistic market salary data to attract senior developers.
                </p>
            </article>
        </>
    );
}
