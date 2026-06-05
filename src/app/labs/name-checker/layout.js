export const metadata = {
    title: "Startup Name Generator & Real-Time Domain Checker | Mr² Labs",
    description: "Generate highly-brandable startup names using AI and verify .com, .io, and .dev domain availability in real-time. A free utility by Mr² Labs.",
    keywords: [
        "Startup Name Generator",
        "Domain Availability Checker",
        "AI Business Naming Tool",
        "Tech Startup Names",
        "Mr² Labs Utility",
        "Real Time DNS Checker"
    ],
    openGraph: {
        title: "Startup Name Generator & Domain Checker",
        description: "Generate brandable startup names and verify domain availability in real-time. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/name-checker",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Startup Name & Domain Checker" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/name-checker",
    },
};

export default function NameCheckerLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Startup Name & Domain Checker",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "An automated branding utility that processes startup concepts through the Gemini API to generate brandable names, and simultaneously queries global DNS registries to verify .com, .io, and .dev domain availability in real-time."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the Startup Name & Domain Checker</h2>
                <p>
                    The Startup Name & Domain Checker is a free engineering utility built by Mr² Labs. 
                    It eliminates the friction of the early-stage startup naming process. By inputting a core product concept, 
                    the system utilizes advanced LLMs (Gemini) to generate premium, brandable names.
                </p>
                <p>
                    Crucially, the tool leverages a custom Node.js DNS resolver architecture to query global registries in real-time, 
                    verifying the availability of .com, .io, and .dev top-level domains without relying on bloated, paid APIs.
                </p>
            </article>
        </>
    );
}
