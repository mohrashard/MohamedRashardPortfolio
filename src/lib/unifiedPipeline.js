import { executeWithWaterfall } from './contentEngine.js';

// ============================================================================
// 1. PROBE GOOGLE DEMAND (RECURSIVE AUTOCOMPLETE)
// ============================================================================
async function probeGoogleDemand(seed) {
  if (!seed) return { score: 0, predictions: [] };

  const cleanSeed = seed.toLowerCase().trim();
  const probes = [
    cleanSeed,
    `how to ${cleanSeed}`,
    `${cleanSeed} best practices`,
    `${cleanSeed} vs`,
    `${cleanSeed} architecture`
  ];

  const predictions = new Set();

  await Promise.all(
    probes.map(async (query) => {
      try {
        const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const data = await res.json();
        if (data && Array.isArray(data[1])) {
          data[1].forEach(item => predictions.add(item));
        }
      } catch (e) {
        // Continue if single probe fails
      }
    })
  );

  const predictionsList = Array.from(predictions);

  // Calculate Demand Score based on autocomplete density
  let score = 0;
  if (predictionsList.length === 0) score = 0;
  else if (predictionsList.length < 5) score = Math.min(50, predictionsList.length * 12);
  else if (predictionsList.length < 10) score = Math.min(80, 50 + (predictionsList.length * 4));
  else score = Math.min(100, 80 + (predictionsList.length * 2));

  return { score, predictions: predictionsList };
}

// ============================================================================
// 2. RUN FULL STRATEGY & VALIDATION PIPELINE
// ============================================================================
export async function analyzeAndRankTopic(rawInput) {
  console.log('[Pipeline] 🔍 Stage 1: Running AI Intent & Entity Distillation...');

  const strategyPrompt = `You are an elite B2B Technical Content Strategist for MR² Labs (an agency that builds AI products, SaaS MVPs, Next.js web apps, React Native apps, and Local LLM infrastructure in 72 hours for founders).
Evaluate the raw input for commercial engineering value specifically for OUR agency.

STRICT NICHE ENFORCEMENT:
You MUST REJECT any topic that does not directly align with MR² Labs' core services:
1. Custom AI Integration & Local LLM Deployment (Zero-subscription AI)
2. SaaS MVP Development (Speed, 72-hour sprints)
3. Next.js Web Application Architecture
4. React Native Mobile Apps
5. Supabase Database Infrastructure
6. Automated Workflow & Prospecting Systems

If the topic is about general hardware (e.g. Motorola), pure DevOps, networking (e.g. SIP routing), or anything outside our web/AI/app focus, output "status": "rejected" with a reason.

If approved, extract a 2-3 word broad "search_seed" that real humans type into Google (e.g., "local llm deployment", "nextjs mvp architecture", "ai prospecting automation").

OUTPUT PURE JSON ONLY (example):
{
  "status": "approved",
  "intent_score": 38,
  "scores": { "pain": 10, "budget": 10, "alignment": 10, "evergreen": 8 },
  "brief": {
    "proposed_slug": "secure-llm-database-access",
    "target_keyword": "Secure LLM Production Database Access",
    "search_seed": "llm database security",
    "target_audience": "CTOs and Technical Founders",
    "core_objection": "LLMs needing DB access create massive security and permission risks",
    "category": "Architecture"
  }
}`;

  const strategyResult = await executeWithWaterfall(strategyPrompt, `Raw Thread:\n${rawInput}`, 'node1');

  if (strategyResult.status === 'rejected' || strategyResult.intent_score < 30) {
    return {
      status: 'rejected',
      reason: strategyResult.reason || 'Failed Commercial Intent Threshold (<30/40)'
    };
  }

  console.log(`[Pipeline] 🌐 Stage 2: Probing Google Demand for seed: "${strategyResult.brief.search_seed}"...`);
  const demandResult = await probeGoogleDemand(strategyResult.brief.search_seed);

  // Stage 3: Calculate Unified Opportunity Score
  const intentScore = strategyResult.intent_score; // 0 - 40
  const demandScore = demandResult.score;          // 0 - 100
  const opportunityScore = Math.round((intentScore * 1.25) + (demandScore * 0.5));

  console.log(`[Pipeline] 📊 Stage 3: Intent: ${intentScore}/40 | Demand: ${demandScore}/100 | Opportunity Score: ${opportunityScore}/100`);

  // Enrich the brief with verified user expectations
  const enrichedBrief = {
    ...strategyResult.brief,
    scores: strategyResult.scores,
    intent_score: intentScore,
    demand_score: demandScore,
    opportunity_score: opportunityScore,
    user_expectations: demandResult.predictions.slice(0, 6),
    breakout_keywords: demandResult.predictions.slice(0, 4)
  };

  return {
    status: opportunityScore >= 75 ? 'approved_high_demand' : (opportunityScore >= 50 ? 'backlog' : 'rejected_low_traffic'),
    opportunity_score: opportunityScore,
    data: enrichedBrief
  };
}
