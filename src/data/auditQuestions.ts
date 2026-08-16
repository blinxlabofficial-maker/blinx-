export interface AuditOption {
  id: string;
  text: string;
  relatedStage: 'build' | 'visibility' | 'growth' | 'systemize';
}

export interface AuditQuestion {
  id: string;
  question: string;
  options: AuditOption[];
}

export const auditQuestions: AuditQuestion[] = [
  {
    id: "q1",
    question: "What is your biggest current bottleneck?",
    options: [
      { id: "q1-a", text: "We don't have a modern, professional website.", relatedStage: "build" },
      { id: "q1-b", text: "People can't find us online when they search.", relatedStage: "visibility" },
      { id: "q1-c", text: "We get traffic, but they don't convert into leads/sales.", relatedStage: "growth" },
      { id: "q1-d", text: "We're overwhelmed with manual tasks and messy data.", relatedStage: "systemize" }
    ]
  },
  {
    id: "q2",
    question: "How do you currently acquire most of your customers?",
    options: [
      { id: "q2-a", text: "Almost entirely word-of-mouth and referrals.", relatedStage: "visibility" },
      { id: "q2-b", text: "Organic search and social media, but it's inconsistent.", relatedStage: "growth" },
      { id: "q2-c", text: "Paid ads, but our return on ad spend (ROAS) is dropping.", relatedStage: "growth" },
      { id: "q2-d", text: "Sales outreach, but tracking leads is a nightmare.", relatedStage: "systemize" }
    ]
  },
  {
    id: "q3",
    question: "How would you rate your current website?",
    options: [
      { id: "q3-a", text: "Non-existent or extremely outdated.", relatedStage: "build" },
      { id: "q3-b", text: "Looks okay, but doesn't work well on mobile.", relatedStage: "build" },
      { id: "q3-c", text: "Looks good, but doesn't generate leads.", relatedStage: "growth" },
      { id: "q3-d", text: "It's fine, but doesn't integrate with our other tools.", relatedStage: "systemize" }
    ]
  },
  {
    id: "q4",
    question: "What happens after a lead contacts you?",
    options: [
      { id: "q4-a", text: "We manually reply when we have time.", relatedStage: "systemize" },
      { id: "q4-b", text: "They go into a spreadsheet or basic email list.", relatedStage: "systemize" },
      { id: "q4-c", text: "We have basic automated email responses.", relatedStage: "growth" },
      { id: "q4-d", text: "We have a fully automated CRM workflow.", relatedStage: "visibility" }
    ]
  },
  {
    id: "q5",
    question: "What is your primary goal for the next 12 months?",
    options: [
      { id: "q5-a", text: "Establish a strong foundational online presence.", relatedStage: "build" },
      { id: "q5-b", text: "Significantly increase brand awareness and traffic.", relatedStage: "visibility" },
      { id: "q5-c", text: "Optimize conversions and increase revenue.", relatedStage: "growth" },
      { id: "q5-d", text: "Streamline operations to handle scale without breaking.", relatedStage: "systemize" }
    ]
  }
];

export interface Recommendation {
  stage: string;
  title: string;
  description: string;
}

export function getRecommendations(answers: string[]): Recommendation[] {
  // Map answer IDs to their related stages
  const stageCounts: Record<string, number> = {
    build: 0,
    visibility: 0,
    growth: 0,
    systemize: 0
  };

  answers.forEach(answerId => {
    for (const q of auditQuestions) {
      const option = q.options.find(o => o.id === answerId);
      if (option) {
        stageCounts[option.relatedStage]++;
      }
    }
  });

  // Sort stages by count
  const sortedStages = Object.entries(stageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  // Take top 3
  const topStages = sortedStages.slice(0, 3);

  const recommendationsData: Record<string, Recommendation> = {
    build: {
      stage: "Build",
      title: "Establish Your Digital Foundation",
      description: "You need a high-performance, conversion-optimized platform. We recommend starting with a custom website rebuild to ensure your brand is represented professionally before driving traffic."
    },
    visibility: {
      stage: "Visibility",
      title: "Amplify Your Reach",
      description: "Your foundation is set, but you need more eyes on your business. We recommend deploying targeted Meta Ads and Local SEO to drive high-intent traffic to your offerings."
    },
    growth: {
      stage: "Growth",
      title: "Maximize Your Conversions",
      description: "You're getting traffic, but leaving money on the table. We recommend a comprehensive CRO (Conversion Rate Optimization) audit and aggressive A/B testing to turn more visitors into leads."
    },
    systemize: {
      stage: "Systemize",
      title: "Streamline Your Operations",
      description: "Manual processes are holding back your scale. We recommend integrating a robust CRM and automating your key workflows to save time and ensure no leads fall through the cracks."
    }
  };

  return topStages.map(stage => recommendationsData[stage]);
}
