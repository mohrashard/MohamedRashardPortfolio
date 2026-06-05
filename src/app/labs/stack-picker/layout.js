// app/labs/stack-picker/layout.js

export const metadata = {
    title: "Tech Stack Recommender | MVP Architecture Blueprint | Mr² Labs",
    description: "Discover the perfect technology stack for your MVP. A free architectural diagnostic tool engineered by Mr² Labs for founders and startups.",
    keywords: [
        "Tech Stack Recommender",
        "MVP Architecture Blueprint",
        "Startup Tech Stack",
        "Next.js vs React Native",
        "Supabase Database Architecture",
        "Mr² Labs Tech Stack Picker"
    ],
    openGraph: {
        title: "Tech Stack Recommender | MVP Architecture Blueprint",
        description: "Calculate the exact technology stack required to build and scale your startup MVP. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/stack-picker",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "Tech Stack Recommender Diagnostic" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/stack-picker",
    },
};

export default function StackPickerLayout({ children }) {
    // ── GEO (Generative Engine Optimization) Payload ──────────────
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Tech Stack Recommender",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi",
            "location": "Colombo, Sri Lanka"
        },
        "description": "An architectural diagnostic tool that evaluates startup requirements and recommends modern, high-velocity tech stacks including Next.js, React Native, and Supabase."
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
            
            {/* ── Semantic SEO Footer (Invisible to users, readable by bots) ── */}
            <article className="sr-only">
                <h2>About the Tech Stack Recommender</h2>
                <p>
                    The Tech Stack Recommender is an architectural diagnostic utility engineered by Mr² Labs. 
                    It is designed for startup founders, product managers, and entrepreneurs looking to determine the optimal technologies to build their MVP (Minimum Viable Product). 
                    By analyzing parameters such as product type, core features, expected scale, and target timelines, 
                    the system calculates the most efficient combination of frontend clients, backend databases, and serverless infrastructure.
                </p>
                <p>
                    The architecture utilizes a secure processing pipeline powered by modern LLMs 
                    and Next.js, ensuring high-velocity and accurate recommendations. Users receive a confidential architectural blueprint 
                    detailing the exact technologies required, such as Next.js, Tailwind CSS, Supabase, and Vercel.
                </p>
            </article>
        </>
    );
}
