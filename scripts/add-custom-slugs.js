const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('src/data/pseo-slugs.json', 'utf8')); 

const customSlugs = [
    { 
        "slug": "custom-saas-web-mobile-app", 
        "h1Title": "Cost to Build a Custom SaaS, Web, or Mobile App", 
        "seoDescription": "Have a unique idea that doesn't fit standard templates? Explore the architecture, costs, and timeline to build a fully custom scalable application.", 
        "category": "Custom Solutions", 
        "technicalArchitecture": [
            "Next.js App Router or React Native (Mobile)", 
            "Scalable Cloud Backend (Supabase / AWS)", 
            "Third-Party API Integrations (Stripe, Twilio)", 
            "Custom Database Schema & Secure Auth", 
            "Tailored UI/UX Design System"
        ], 
        "traditionalAgencyEstimate": { 
            "costRange": "$30,000 - $150,000+", 
            "timeToBuild": "4 - 9 months", 
            "teamRequired": "1 Architect, 1 Designer, 2+ Full-Stack Developers" 
        }, 
        "mr2LabsHook": "Don't get trapped in a 9-month development cycle. We scope your core MVP and build the customized v1 in under 72 hours." 
    }, 
    { 
        "slug": "custom-ai-automation-internal-tool", 
        "h1Title": "Cost to Build a Custom AI Automation or Internal Tool", 
        "seoDescription": "Looking to automate operations, capture leads with AI, or build a custom internal tool? Discover what it costs to architect bespoke AI workflows.", 
        "category": "Custom Solutions", 
        "technicalArchitecture": [
            "LLM Orchestration (OpenAI / Anthropic Claude)", 
            "Workflow Automation Engine (Edge Functions)", 
            "Data Ingestion & Event Webhook Pipelines", 
            "Internal Ops Dashboard & RBAC Auth", 
            "Vector Database for Custom Context"
        ], 
        "traditionalAgencyEstimate": { 
            "costRange": "$25,000 - $100,000", 
            "timeToBuild": "3 - 6 months", 
            "teamRequired": "1 AI Consultant, 2 Full-Stack Engineers, 1 Product Lead" 
        }, 
        "mr2LabsHook": "Custom AI integrations don't require massive enterprise budgets. See how we launch production-ready AI agents and tools in days." 
    }
]; 

data.unshift(...customSlugs); 
fs.writeFileSync('src/data/pseo-slugs.json', JSON.stringify(data, null, 4));
console.log("Success: Injected custom slugs");
