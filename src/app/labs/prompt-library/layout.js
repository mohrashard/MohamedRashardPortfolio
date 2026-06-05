export const metadata = {
    title: "AI Prompt Library for Technical Founders & Operators | Mr² Labs",
    description: "Access a curated library of production-tested prompt frameworks for Next.js development, workflow automation, and growth marketing. Engineered by Mr² Labs.",
    keywords: [
        "AI Prompt Library",
        "Prompt Engineering Frameworks",
        "Next.js AI Prompts",
        "Startup Founder Prompts",
        "Automation Prompts",
        "Mr² Labs Developer Tools"
    ],
    openGraph: {
        title: "AI Prompt Library for Technical Founders & Operators",
        description: "Curated, production-tested prompt structures to automate engineering, workflows, and marketing. Built by Mr² Labs.",
        url: "https://mr2labs.com/labs/prompt-library",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "AI Prompt Library Workspace" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/prompt-library",
    },
};

export default function PromptLibraryLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "AI Prompt Library for Technical Founders",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "A repository of highly structured prompt engineering frameworks designed to optimize LLM performance across application development, infrastructure scaling, and business automation."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the AI Prompt Library</h2>
                <p>
                    The AI Prompt Library is an open-access repository curated by Mr² Labs. It provides 
                    reusable system prompts and context-gated structures for modern LLMs like Gemini and Llama.
                </p>
                <p>
                    Categories include Code Generation (Next.js, Supabase), Workflow Automation (Zapier, custom Webhooks), 
                    and Growth Marketing (Outbound SDR engineering). It eliminates chat fragmentation by giving builders 
                    predictable, structured JSON or plain-text generation outputs.
                </p>
            </article>
        </>
    );
}
