export interface CaseStudyResults {
  enquiries?: string;
  visibility?: string;
  roas?: string;
  hoursSaved?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  location: string;
  servicesUsed: string[];
  challenge: string;
  solution: string;
  results: CaseStudyResults;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "hi-view-constructions",
    client: "Hi-View Constructions",
    industry: "Construction",
    location: "Sydney",
    servicesUsed: ["Web Design", "Local SEO", "Lead Generation"],
    challenge: "Hi-View was relying entirely on word-of-mouth. They had an outdated website that didn't reflect the premium quality of their residential builds, and they were invisible in local search results for key Sydney suburbs.",
    solution: "We engineered a conversion-focused website highlighting their portfolio with stunning imagery. We then deployed a hyper-local SEO strategy combined with targeted Google Ads to capture high-intent traffic searching for custom home builders.",
    results: {
      enquiries: "+120% YoY",
      visibility: "Page 1 for 15+ keywords",
      roas: "4.5x"
    }
  },
  {
    id: "peak-performance-physio",
    client: "Peak Performance Physio",
    industry: "Health & Wellness",
    location: "Melbourne",
    servicesUsed: ["Brand Refresh", "Meta Ads", "Workflow Automation"],
    challenge: "Despite having excellent practitioners, the clinic struggled to maintain consistent bookings during off-peak seasons. Their patient onboarding process was heavily manual, eating up hours of administrative time.",
    solution: "We revitalized their brand identity to stand out in a crowded market and launched targeted Meta ad campaigns offering seasonal assessments. We also integrated a new CRM with their booking system to automate patient intake and follow-ups.",
    results: {
      enquiries: "Consistently fully booked",
      roas: "3.2x",
      hoursSaved: "15 hours/week"
    }
  },
  {
    id: "urban-edge-logistics",
    client: "Urban Edge Logistics",
    industry: "Logistics & Transport",
    location: "Brisbane",
    servicesUsed: ["Custom Web App", "ERP Integration", "B2B SEO"],
    challenge: "Urban Edge was scaling rapidly but their dispatch and tracking systems couldn't keep up. Clients were frustrated by the lack of real-time visibility, and the sales team struggled to generate qualified B2B leads online.",
    solution: "We developed a secure, custom client portal integrated directly with their legacy ERP system for real-time freight tracking. Simultaneously, we executed a B2B SEO strategy focused on long-tail industry queries to drive qualified traffic.",
    results: {
      visibility: "+85% organic traffic",
      hoursSaved: "40+ hours/week in customer support",
      enquiries: "3x increase in enterprise leads"
    }
  }
];
