/**
 * Blinx Lab — Rule-Based Growth Audit Engine
 *
 * Analyzes user responses to the 5-question growth audit
 * and produces 3 tailored, prioritized recommendations.
 */

const RECOMMENDATIONS = {
  needsWebsite: {
    title: 'Build a conversion-focused website',
    description:
      'Your business needs a professional, fast-loading website that turns visitors into customers. We recommend starting with a focused landing page that clearly communicates your value and includes a strong call to action.',
    priority: 1,
    icon: 'globe',
  },
  improveWebsite: {
    title: 'Optimise your website for conversions',
    description:
      'You have a website — great. But is it working hard enough? A performance audit, clearer messaging, and strategic calls-to-action could dramatically increase the leads and sales your site generates.',
    priority: 2,
    icon: 'gauge',
  },
  needsSEO: {
    title: 'Get found on Google with local SEO',
    description:
      'Customers are searching for businesses like yours, but they are finding your competitors first. A local SEO strategy — including Google Business Profile optimisation, keyword targeting, and directory listings — will put you on the map.',
    priority: 1,
    icon: 'search',
  },
  improveSEO: {
    title: 'Strengthen your search visibility',
    description:
      'You are getting some Google traffic, but there is room to grow. Consistent content, better on-page optimisation, and targeted local keywords will help you capture more of the right audience.',
    priority: 3,
    icon: 'trending-up',
  },
  needsSocial: {
    title: 'Establish a social media content system',
    description:
      'Social media is where trust is built before a purchase happens. A consistent content calendar with authentic, value-driven posts will make your expertise visible and keep your business top of mind.',
    priority: 1,
    icon: 'share-2',
  },
  improveSocial: {
    title: 'Make your social media more strategic',
    description:
      'Posting sometimes is better than not posting, but a purpose-driven content strategy will get you much further. We recommend batching content, defining content pillars, and focusing on the platforms where your audience is most active.',
    priority: 2,
    icon: 'target',
  },
  brandStrategy: {
    title: 'Clarify your brand message',
    description:
      'Before any tactic works, your message needs to be clear. We help you articulate what makes your business different, who it serves, and why it matters — so every piece of marketing hits harder.',
    priority: 2,
    icon: 'pen-tool',
  },
  contentStrategy: {
    title: 'Create a content engine that scales',
    description:
      'Content is your most valuable long-term marketing asset. A documented content strategy — blog posts, social media, email — will build authority and generate organic leads over time.',
    priority: 3,
    icon: 'file-text',
  },
  digitalFoundation: {
    title: 'Set up your digital foundations properly',
    description:
      'Google Business Profile, analytics tracking, and basic directory listings are the unsexy foundations that make everything else work. Start here to ensure nothing falls through the cracks.',
    priority: 1,
    icon: 'layers',
  },
  retentionStrategy: {
    title: 'Build a customer retention system',
    description:
      'Acquiring a new customer costs five times more than keeping one. Email marketing, review collection, and loyalty strategies will help you get more value from the customers you already have.',
    priority: 3,
    icon: 'repeat',
  },
};

/**
 * Analyze audit answers and return top 3 recommendations.
 *
 * @param {Object} answers
 * @param {string} answers.businessType - e.g. "retail", "service", "restaurant", "ecommerce", "other"
 * @param {string} answers.hasWebsite - "yes" | "no"
 * @param {string} answers.foundOnGoogle - "yes" | "no" | "not-sure"
 * @param {string} answers.activeSocial - "yes" | "no" | "sometimes"
 * @param {string} answers.biggestChallenge - "visibility" | "leads" | "trust" | "consistency" | "everything"
 * @returns {Array<Object>} Top 3 recommendations
 */
export function generateRecommendations(answers) {
  const scored = [];

  // Website analysis
  if (answers.hasWebsite === 'no') {
    scored.push({ ...RECOMMENDATIONS.needsWebsite, score: 100 });
    scored.push({ ...RECOMMENDATIONS.digitalFoundation, score: 70 });
  } else {
    scored.push({ ...RECOMMENDATIONS.improveWebsite, score: 50 });
  }

  // SEO analysis
  if (answers.foundOnGoogle === 'no') {
    scored.push({ ...RECOMMENDATIONS.needsSEO, score: 90 });
  } else if (answers.foundOnGoogle === 'not-sure') {
    scored.push({ ...RECOMMENDATIONS.needsSEO, score: 75 });
  } else {
    scored.push({ ...RECOMMENDATIONS.improveSEO, score: 30 });
  }

  // Social media analysis
  if (answers.activeSocial === 'no') {
    scored.push({ ...RECOMMENDATIONS.needsSocial, score: 80 });
  } else if (answers.activeSocial === 'sometimes') {
    scored.push({ ...RECOMMENDATIONS.improveSocial, score: 55 });
  } else {
    scored.push({ ...RECOMMENDATIONS.improveSocial, score: 25 });
  }

  // Challenge-based boosts
  switch (answers.biggestChallenge) {
    case 'visibility':
      boostByTitle(scored, 'Get found on Google with local SEO', 30);
      boostByTitle(scored, 'Establish a social media content system', 20);
      if (!scored.find((r) => r.title === RECOMMENDATIONS.digitalFoundation.title)) {
        scored.push({ ...RECOMMENDATIONS.digitalFoundation, score: 60 });
      }
      break;
    case 'leads':
      boostByTitle(scored, 'Build a conversion-focused website', 25);
      boostByTitle(scored, 'Optimise your website for conversions', 25);
      if (!scored.find((r) => r.title === RECOMMENDATIONS.contentStrategy.title)) {
        scored.push({ ...RECOMMENDATIONS.contentStrategy, score: 45 });
      }
      break;
    case 'trust':
      scored.push({ ...RECOMMENDATIONS.brandStrategy, score: 65 });
      boostByTitle(scored, 'Make your social media more strategic', 20);
      if (!scored.find((r) => r.title === RECOMMENDATIONS.retentionStrategy.title)) {
        scored.push({ ...RECOMMENDATIONS.retentionStrategy, score: 40 });
      }
      break;
    case 'consistency':
      scored.push({ ...RECOMMENDATIONS.contentStrategy, score: 70 });
      boostByTitle(scored, 'Establish a social media content system', 20);
      boostByTitle(scored, 'Make your social media more strategic', 20);
      break;
    case 'everything':
      scored.push({ ...RECOMMENDATIONS.brandStrategy, score: 60 });
      if (!scored.find((r) => r.title === RECOMMENDATIONS.digitalFoundation.title)) {
        scored.push({ ...RECOMMENDATIONS.digitalFoundation, score: 55 });
      }
      break;
    default:
      break;
  }

  // Business type adjustments
  if (answers.businessType === 'restaurant' || answers.businessType === 'retail') {
    boostByTitle(scored, 'Get found on Google with local SEO', 15);
    boostByTitle(scored, 'Set up your digital foundations properly', 10);
  }
  if (answers.businessType === 'ecommerce') {
    boostByTitle(scored, 'Build a conversion-focused website', 15);
    boostByTitle(scored, 'Optimise your website for conversions', 15);
  }
  if (answers.businessType === 'service') {
    boostByTitle(scored, 'Clarify your brand message', 10);
    boostByTitle(scored, 'Establish a social media content system', 10);
  }

  // Deduplicate by title, keeping highest score
  const deduped = new Map();
  for (const rec of scored) {
    const existing = deduped.get(rec.title);
    if (!existing || rec.score > existing.score) {
      deduped.set(rec.title, rec);
    }
  }

  // Sort by score descending, return top 3
  return Array.from(deduped.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score, ...rest }) => rest);
}

function boostByTitle(items, title, amount) {
  const item = items.find((r) => r.title === title);
  if (item) {
    item.score += amount;
  }
}
