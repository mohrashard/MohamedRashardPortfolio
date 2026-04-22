export interface PSEOSlug {
  slug: string;
  h1Title: string;
  seoDescription: string;
  category: string;
  technicalArchitecture: string[];
  traditionalAgencyEstimate: {
    costRange: string;
    timeToBuild: string;
    teamRequired: string;
  };
  mr2LabsHook: string;
  location?: {
    type: "country" | "city" | "region";
    country: string;
    countryCode: string;
    city?: string;
    region?: string;
    localKeyword?: string;
  };
}

// --- AI Estimator Types ---

export interface Feature {
  name: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export interface AgencyPhase {
  phase: string;
  duration: string;
  cost: string;
}

export interface Mr2LabsEstimate {
  sprintTime: string;
  approach: string;
  coreFeatures: string[];
  skippedForMVP: string[];
}

export interface EstimateData {
  appName: string;
  summary: string;
  isSimpleBuild: boolean;
  features: Feature[];
  techStack: string[];
  agencyCostMin: number;
  agencyCostMax: number;
  timelineMinWeeks: number;
  timelineMaxWeeks: number;
  engineersMin: number;
  engineersMax: number;
  agencyPhases: AgencyPhase[];
  mr2Labs: Mr2LabsEstimate;
}
