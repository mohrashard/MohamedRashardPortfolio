export const metadata = {
    title: "GitHub Developer Profile Analyzer | Mr² Labs",
    description: "Evaluate software engineers instantly. Enter a GitHub username to calculate developer scores, code consistency, and technical hiring readiness.",
    keywords: [
        "GitHub Profile Analyzer",
        "Developer Scoring Tool",
        "Hire Software Engineer",
        "GitHub Stats Checker",
        "Technical Recruiter Tool",
        "Mr² Labs Developer Diagnostic"
    ],
    openGraph: {
        title: "GitHub Developer Profile Analyzer | Mr² Labs",
        description: "Analyze any GitHub profile to calculate developer scores and assess technical hiring readiness.",
        url: "https://mr2labs.com/labs/github-analyzer",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "GitHub Developer Profile Analyzer" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/github-analyzer",
    },
};

export default function GithubAnalyzerLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "GitHub Developer Profile Analyzer",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An automated technical recruitment diagnostic that pulls public GitHub REST API telemetry to calculate code consistency, language diversity, and community impact, utilizing LLMs to output a hiring recommendation."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the GitHub Developer Profile Analyzer</h2>
                <p>
                    The GitHub Developer Profile Analyzer is an engineering and recruitment utility built by Mr² Labs. 
                    It is designed for startup founders, CTOs, and technical recruiters who need to quickly evaluate the code quality and consistency of a potential engineering hire.
                </p>
                <p>
                    By inputting a developer's GitHub username, the system connects to the GitHub REST API to fetch 
                    public repositories, language distributions, and commit events. It calculates a weighted "Developer Score" 
                    and uses the Gemini API to formulate a technical breakdown of strengths, gaps, and an MVP hiring recommendation.
                </p>
            </article>
        </>
    );
}
