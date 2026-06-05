export const metadata = {
    title: "API Response Time & Latency Tester | Mr² Labs",
    description: "Ping any public API endpoint to analyze latency, payload efficiency, and server response time. Get an AI-driven architectural verdict on your infrastructure.",
    keywords: [
        "API Response Time Tester",
        "API Latency Checker",
        "Endpoint Performance Test",
        "API Payload Efficiency",
        "Mr² Labs Developer Tools",
        "Server Response Time Analyzer"
    ],
    openGraph: {
        title: "API Response Time Tester | Performance Diagnostic",
        description: "Test your API latency, payload size, and uptime in real-time. Engineered by Mr² Labs.",
        url: "https://mr2labs.com/labs/api-tester",
        type: "website",
        images: [{ url: "/labs-hero-bg.png", width: 1200, height: 630, alt: "API Response Time Tester" }],
    },
    alternates: {
        canonical: "https://mr2labs.com/labs/api-tester",
    },
};

export default function ApiTesterLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "API Response Time Tester",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "developer": {
            "@type": "Organization",
            "name": "Mr² Labs",
            "founder": "Mohamed Rashard Rizmi"
        },
        "description": "A developer utility that acts as a secure server-side proxy to ping public API endpoints, calculate exact latency in milliseconds, evaluate payload efficiency in bytes, and utilize LLMs to generate an architectural optimization verdict."
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
            <article className="sr-only">
                <h2>About the API Response Time Tester</h2>
                <p>
                    The API Response Time Tester is a free developer utility engineered by Mr² Labs. 
                    It is designed for technical founders and engineers to evaluate the performance of public REST APIs and backend infrastructure.
                </p>
                <p>
                    By inputting an endpoint URL, the system's Next.js backend performs a server-side fetch to bypass CORS, 
                    measuring exact latency, HTTP status codes, and payload sizes. These telemetry metrics are then processed 
                    by the Gemini API to output an architectural grade and optimization strategy, such as implementing edge caching or GraphQL.
                </p>
            </article>
        </>
    );
}
