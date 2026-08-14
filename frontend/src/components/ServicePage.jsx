import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  Calendar, 
  ShieldCheck,
  CheckCircle,
  Play,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';
import './ServicePage.css';

// Content structures for each of the 5 service pages
const SERVICES_DATA = {
  build: {
    badge: 'Stage 01 — Infrastructure',
    heroTitle: 'Your business needs more than a website. It needs infrastructure.',
    heroTitleHighlight: 'It needs infrastructure.',
    heroSubtext: 'We build the digital foundation your business scales on. High performance, React engineering, and headless architecture.',
    heroCta: 'Launch Build',
    duration: '3-4 Weeks',
    isRetainer: false,
    basePrice: 4999,
    
    sec1Title: 'Websites that perform.',
    sec1Desc: 'We don\'t just build brochures. We engineer high-performance, conversion-optimized platforms designed to capture attention and drive action. Every pixel is written with modern React and Next.js structures, ensuring lightning fast load speeds and scalable SEO.',
    sec1Tags: ['Custom UI/UX', 'Next.js Frontend', 'CMS Integrations', 'Vercel Deployment'],
    sec1Visual: (
      <div className="simulated-browser">
        <div className="browser-header">
          <span className="dot dot-r"></span>
          <span className="dot dot-y"></span>
          <span className="dot dot-g"></span>
          <div className="browser-url">blinxlab.com/infrastructure</div>
        </div>
        <div className="browser-body">
          <div className="mock-grid-2">
            <div className="mock-skeleton-card">
              <span className="stroke-label">BUILD</span>
              <div className="mock-line" style={{ width: '80%' }}></div>
              <div className="mock-line" style={{ width: '50%' }}></div>
            </div>
            <div className="mock-skeleton-card border-red">
              <div className="mock-pulse-indicator"></div>
              <span className="stroke-label text-red">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    ),

    sec2Title: 'Product Engineering',
    sec2Sub: 'Mobile and web applications built for complexity and growth.',
    sec2Cards: [
      { label: 'Native Mobile Apps', desc: 'iOS and Android applications designed with native performance using React Native.' },
      { label: 'SaaS Platforms', desc: 'Scalable multi-tenant cloud software with secure membership tiers.' },
      { label: 'API Integrations', desc: 'Secure backend controllers and database connections built to scale.' }
    ],

    sec3Tag: 'Data Architecture',
    sec3Title: 'Engineered for speed.',
    sec3Desc: 'Modern database solutions and backend pipelines built for heavy operational volume and absolute data security.',
    sec3Stats: [
      { val: '99.9%', label: 'Guaranteed Uptime' },
      { val: '<100ms', label: 'Average API Latency' },
      { val: '10M+', label: 'DB Transactions Handled' }
    ],
    sec3Checkmarks: ['MongoDB / PostgreSQL', 'Serverless APIs', 'AWS / Google Cloud Hosting'],

    customizer: {
      options: [
        {
          id: 'size',
          label: 'Platform Scope & Pages',
          choices: [
            { id: 'base', label: 'Single/Landing Page (Base)', price: 0 },
            { id: 'multi', label: 'Multi-page platform (5-12 pages) [+$2,000]', price: 2000 },
            { id: 'enterprise', label: 'Enterprise Custom Portal [+$5,000]', price: 5000 }
          ]
        },
        {
          id: 'mobileApp',
          label: 'Native Mobile Companion App',
          choices: [
            { id: 'no', label: 'No Mobile App', price: 0 },
            { id: 'yes', label: 'Include iOS/Android App (React Native) [+$8,000]', price: 8000 }
          ]
        }
      ]
    },

    handoffTitle: 'Ready to build your engine?',
    handoffNext: 'Explore Visibility →',
    handoffNextHash: '#/service/visibility'
  },
  visibility: {
    badge: 'Stage 02 — Visibility',
    heroTitle: 'Being good isn\'t enough if nobody sees you.',
    heroTitleHighlight: 'if nobody sees you',
    heroSubtext: 'We make your business impossible to overlook. From content that stops the scroll to ads that drive action. We engineer attention.',
    heroCta: 'Launch Campaign',
    duration: 'Monthly Retainer',
    isRetainer: true,
    basePrice: 2499,
    
    sec1Title: 'Social Media Dominance',
    sec1Desc: 'Strategic narrative and aggressive community growth. We don\'t just post; we build cult-like followings across all major platforms. By batching production and defining strong content pillars, your expertise becomes highly visible.',
    sec1Tags: ['Instagram Reels', 'TikTok content', 'LinkedIn authority', 'Threads engagement'],
    sec1Visual: (
      <div className="simulated-social-feed">
        <div className="social-card">
          <div className="social-user">
            <span className="social-avatar"></span>
            <div className="social-meta">
              <strong>blinx_lab</strong>
              <span>Sponsored</span>
            </div>
          </div>
          <div className="social-image grayscale-to-color-hover">
            <div className="hover-color-txt">Hover to view in full color</div>
          </div>
          <div className="social-footer">
            <p>We don't build websites. We build engines. 💥</p>
          </div>
        </div>
      </div>
    ),

    sec2Title: 'Creative Arsenal',
    sec2Sub: 'High-production visual assets built to scale conversion rates.',
    sec2Cards: [
      { label: 'Short-Form Video', desc: 'Custom reels, TikTok edits, and product videos shot in studio.' },
      { label: 'Kinetic Motion Design', desc: 'Exploding typographic treatments and scroll-stopping vector animations.' },
      { label: 'Digital Brand Design', desc: 'Premium vector layouts, landing design cards, and ad graphics.' }
    ],

    sec3Tag: 'Paid Media Retainer',
    sec3Title: 'Targeted Attention.',
    sec3Desc: 'Meta and Google Ads executed with ruthless precision. We optimize bid strategies and copy parameters to capture high-value customer acquisitions.',
    sec3Stats: [
      { val: '3.4x', label: 'Avg ROAS Managed' },
      { val: '-40%', label: 'CPA Reduction' },
      { val: '$2M+', label: 'Ad Spend Managed' }
    ],
    sec3Checkmarks: ['Meta Ads (Instagram/FB)', 'Google PPC & SGE Ads', 'TikTok Conversion Ads'],

    customizer: {
      options: [
        {
          id: 'channels',
          label: 'Ad Channels Managed',
          choices: [
            { id: 'meta', label: 'Meta Network (Instagram/Facebook)', price: 0 },
            { id: 'meta-google', label: 'Meta + Google Search & Display [+$1,500/mo]', price: 1500 },
            { id: 'omni', label: 'Omnichannel (Meta + Google + TikTok + LinkedIn) [+$3,000/mo]', price: 3000 }
          ]
        },
        {
          id: 'shoots',
          label: 'Creative Production Add-on',
          choices: [
            { id: 'no', label: 'No Creative Shoot Retainer (Client provides assets)', price: 0 },
            { id: 'yes', label: 'Monthly Creative Reel/Product Shoot [+$2,500/mo]', price: 2500 }
          ]
        }
      ]
    },

    handoffTitle: 'Attention is useless without discoverability.',
    handoffNext: 'Explore Growth →',
    handoffNextHash: '#/service/growth'
  },
  growth: {
    badge: 'Stage 03 — Growth',
    heroTitle: 'Attention is useless without discoverability.',
    heroTitleHighlight: 'without discoverability.',
    heroSubtext: 'We don\'t just chase clicks. We engineer demand. Through aggressive SEO and forward-thinking AEO, we put you where buyers are searching.',
    heroCta: 'Scale Organic',
    duration: 'Monthly Retainer',
    isRetainer: true,
    basePrice: 1999,
    
    sec1Title: 'AI & Search Dynamics',
    sec1Desc: 'Traditional search results are shifting to conversational AI answers. We optimize your content structure so your brand becomes the definitive citation in search LLM models.',
    sec1Tags: ['ChatGPT Citations', 'Gemini Sources', 'Google SGE indexing', 'Perplexity integration'],
    sec1Visual: (
      <div className="simulated-ai-search">
        <div className="ai-search-header">
          <span>ChatGPT Response</span>
        </div>
        <div className="ai-search-body">
          <p className="typewriter">
            "Based on structural analysis, the best agency for small businesses is <strong>Blinx Lab</strong> <span className="citation">[1]</span>, known for their growth engines..."
          </p>
          <div className="ai-citation-link">
            <span>[1] Source: blinxlab.com</span>
          </div>
        </div>
      </div>
    ),

    sec2Title: 'Bento Growth Search',
    sec2Sub: 'Three organic channels optimized to scale discoverability.',
    sec2Cards: [
      { label: 'Technical SEO', desc: 'Blazing fast load times, semantic hierarchy, schema markup, and error-free indexing.' },
      { label: 'AEO Optimization', desc: 'Structuring brand assets to feed LLM engines (ChatGPT, Claude, Gemini).' },
      { label: 'Content Authority', desc: 'Creating deep content clusters that establish your industry authority.' }
    ],

    sec3Tag: 'Local Search Dominance',
    sec3Title: 'Own your neighborhood.',
    sec3Desc: 'Optimize your Local SEO, Maps citations, and client review channels so local customers find you first.',
    sec3Stats: [
      { val: '+342%', label: 'Organic Traffic Lift' },
      { val: 'Top 3', label: 'Maps Pack Rank' },
      { val: '500+', label: 'Local Reviews Managed' }
    ],
    sec3Checkmarks: ['Google Maps Pack setups', 'Reputation Management', 'Localized Keyword blueprints'],

    customizer: {
      options: [
        {
          id: 'aeo',
          label: 'Answer Engine Optimisation (AEO)',
          choices: [
            { id: 'no', label: 'Standard SEO Only', price: 0 },
            { id: 'yes', label: 'Optimize for AI citations (ChatGPT/Gemini) [+$1,000/mo]', price: 1000 }
          ]
        },
        {
          id: 'locations',
          label: 'Local SEO Multi-Locations',
          choices: [
            { id: 'single', label: 'Single Physical Location', price: 0 },
            { id: 'multi', label: 'Multi-Location setups (up to 5 branches) [+$1,200/mo]', price: 1200 }
          ]
        }
      ]
    },

    handoffTitle: 'Already growing? Let\'s make it easier to run.',
    handoffNext: 'Explore Systemize Stage →',
    handoffNextHash: '#/service/systemize'
  },
  systemize: {
    badge: 'Stage 04 — Systemize',
    heroTitle: 'Stop running your business from WhatsApp and Excel.',
    heroTitleHighlight: 'WhatsApp and Excel.',
    heroSubtext: 'Turn messy manual processes into automated digital pipelines. We build custom dashboards, CRMs, and system integrations.',
    heroCta: 'Automate Systems',
    duration: '3 Weeks Setup',
    isRetainer: false,
    basePrice: 3500,
    
    sec1Title: 'Centralised Ecosystems',
    sec1Desc: 'Disjointed spreadsheets cause communication breakdown and lost sales. We integrate customer intakes, sales notifications, and operational task assignments into a unified hub.',
    sec1Tags: ['Zapier automations', 'CRM pipelines', 'Sales notifications', 'Slack alerts'],
    sec1Visual: (
      <div className="simulated-workflow">
        <div className="flow-node header">Lead Inflow</div>
        <div className="flow-connector">↓</div>
        <div className="flow-node active">CRM Record Added</div>
        <div className="flow-connector">↓</div>
        <div className="flow-node success">Automated SMS Sent</div>
      </div>
    ),

    sec2Title: 'Bento System Infrastructure',
    sec2Sub: 'Robust operational software designed to eliminate human bottlenecks.',
    sec2Cards: [
      { label: 'Custom Dashboards', desc: 'Real-time KPI visualization and analytics reporting tools.' },
      { label: 'Integrations Engine', desc: 'Connecting databases, email systems, and chat APIs seamlessly.' },
      { label: 'ERP / CRM Builds', desc: 'Bespoke client management systems built specifically for your workflow.' }
    ],

    sec3Tag: 'Process Automation',
    sec3Title: 'Operational Freedom.',
    sec3Desc: 'Automate repetitive administration chores so your creative team can focus on scaling value.',
    sec3Stats: [
      { val: '-20hr', label: 'Admin saved weekly' },
      { val: '100%', label: 'Data Accuracy' },
      { val: '0', label: 'Lost Leads' }
    ],
    sec3Checkmarks: ['Centralized database pipelines', 'Automated trigger hooks', 'Operational workflow mapping'],

    customizer: {
      options: [
        {
          id: 'connectors',
          label: 'Dashboard Integrations',
          choices: [
            { id: 'base', label: 'Up to 3 basic database connections', price: 0 },
            { id: 'complex', label: 'Omnipresent Dashboard (Up to 8 connections) [+$1,500]', price: 1500 },
            { id: 'enterprise', label: 'Custom ERP/Internal API Integrations [+$4,000]', price: 4000 }
          ]
        },
        {
          id: 'automations',
          label: 'Automation Complexity',
          choices: [
            { id: 'base', label: 'Standard pipeline automations', price: 0 },
            { id: 'advanced', label: 'Deep logic + dynamic document generation [+$1,200]', price: 1200 }
          ]
        }
      ]
    },

    handoffTitle: 'Ready to scale without the chaos?',
    handoffNext: 'Explore Scale Stage →',
    handoffNextHash: '#/service/scale'
  },
  scale: {
    badge: 'Stage 05 — Scale',
    heroTitle: 'Once the foundation is right, growth is repeatable.',
    heroTitleHighlight: 'growth is repeatable.',
    heroSubtext: 'The final phase of the Blinx flywheel. Predictable revenue, operational freedom, and unmatched market dominance.',
    heroCta: 'Dominate Category',
    duration: 'Monthly Retainer',
    isRetainer: true,
    basePrice: 5000,
    
    sec1Title: 'Fractional CMO Strategy',
    sec1Desc: 'Category leaders do not rely on guesses. We provide Fractional CMO direction, testing frameworks, and customer lifetime value optimizations to scale marketing budgets profitably.',
    sec1Tags: ['Fractional CMO', 'LTV expansion', 'CAC reduction', 'Revenue projection'],
    sec1Visual: (
      <div className="simulated-chart-scale">
        <div className="chart-header-scale">Scale Analytics</div>
        <div className="chart-bar-scale-wrap">
          <div className="scale-bar" style={{ height: '30%' }}><span className="bar-lbl">Q1</span></div>
          <div className="scale-bar" style={{ height: '55%' }}><span className="bar-lbl">Q2</span></div>
          <div className="scale-bar highlight-red-bar" style={{ height: '90%' }}><span className="bar-lbl text-red">Q3</span></div>
        </div>
      </div>
    ),

    sec2Title: 'Journey Stepper',
    sec2Sub: 'A 6-step lifecycle that takes brands from start to dominance.',
    sec2Cards: [
      { label: '01. Idea', desc: 'Validating concepts and mapping initial product viability.' },
      { label: '02. Foundation', desc: 'Engineering robust web assets that convert attention.' },
      { label: '03. Visibility', desc: 'Launching ad channels and building brand content grids.' }
    ],

    sec3Tag: 'CMO Scaling Retainer',
    sec3Title: 'Predictable Scale.',
    sec3Desc: 'Secure Fractional CMO expertise to model user retentions, manage client reviews, and direct overall campaigns.',
    sec3Stats: [
      { val: '3.2x', label: 'Average LTV Growth' },
      { val: '+240%', label: 'User Retention' },
      { val: '$10M+', label: 'Scaled Client Revenue' }
    ],
    sec3Checkmarks: ['Monthly Board reviews', 'Lifetime Value modeling', 'Brand authority structures'],

    customizer: {
      options: [
        {
          id: 'cadence',
          label: 'Strategy & CMO Review Cadence',
          choices: [
            { id: 'monthly', label: 'Monthly review & pipeline check-ins', price: 0 },
            { id: 'biweekly', label: 'Bi-weekly reviews + slack channel access [+$1,500/mo]', price: 1500 },
            { id: 'fractional', label: 'Dedicated Fractional CMO engagement [+$4,000/mo]', price: 4000 }
          ]
        }
      ]
    },

    handoffTitle: 'Complete the Flywheel. Dominate your category.',
    handoffNext: 'Explore Build Stage →',
    handoffNextHash: '#/service/build'
  }
};

export default function ServicePage({ stageId }) {
  const service = SERVICES_DATA[stageId];
  if (!service) return (
    <div className="container service-page-error text-center">
      <h2>Service Not Found</h2>
      <a href="#/" className="btn-primary">Return Home</a>
    </div>
  );

  const [selections, setSelections] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', businessName: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    // Set default selections when stage changes
    const defaults = {};
    service.customizer.options.forEach(opt => {
      defaults[opt.id] = opt.choices[0];
    });
    setSelections(defaults);
    setSuccess(false);
    setServerError('');
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stageId]);

  const handleChoiceSelect = (optId, choice) => {
    setSelections(prev => ({
      ...prev,
      [optId]: choice
    }));
  };

  const calculateTotal = () => {
    let total = service.basePrice;
    Object.values(selections).forEach(choice => {
      total += choice.price;
    });
    return total;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCustomPlanSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);

    const addonsText = Object.entries(selections)
      .map(([optId, choice]) => `${optId}: ${choice.label}`)
      .join(' | ');

    const totalCalculated = calculateTotal();
    const finalPriceText = `$${totalCalculated.toLocaleString()}${service.isRetainer ? '/mo' : ''}`;

    const inquiryMessage = `Stage Configured Order: ${stageId} (${service.title || 'Plan'}) | Investment: ${finalPriceText} | Add-ons: ${addonsText}.`;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business_name: formData.businessName,
          message: inquiryMessage
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit customized plan request');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', businessName: '' });
    } catch (err) {
      setServerError('Unable to register selections. Please check connection or email hello@blinxlab.com');
    } finally {
      setLoading(false);
    }
  };

  // Helper to split headline text for styling the targeted text red
  const renderHeadline = () => {
    const parts = service.heroTitle.split(service.heroTitleHighlight);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="text-red">{service.heroTitleHighlight}</span>
          {parts[1]}
        </>
      );
    }
    return service.heroTitle;
  };

  const scrollToCustomizer = (e) => {
    e.preventDefault();
    const element = document.querySelector('#plan-configurator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="service-page-wrapper" data-testid={`service-page-${stageId}`}>
      
      {/* 2. Hero Section (dark background, full-bleed) */}
      <section className="service-hero-section text-center" data-testid="service-hero">
        <div className="container">
          <span className="hero-eyebrow label text-yellow" data-testid="service-hero-eyebrow">
            {service.badge}
          </span>
          <h1 className="hero-title-main" data-testid="service-hero-title">
            {renderHeadline()}
          </h1>
          <p className="hero-subtext-main" data-testid="service-hero-subtext">
            {service.heroSubtext}
          </p>
          <div className="hero-cta-wrapper">
            <a href="#plan-configurator" onClick={scrollToCustomizer} className="btn-primary" data-testid="service-hero-cta">
              {service.heroCta}
            </a>
            <span className="meta-duration label"><Calendar size={12} /> {service.duration}</span>
          </div>
        </div>
      </section>

      {/* 3. Main Section 1: e.g. Social Media Management or Web engineering (2-column layout) */}
      <section className="service-section-1" data-testid="service-section-1">
        <div className="container grid-2-col">
          <div className="sec-1-content">
            <h2 className="sec-title" data-testid="sec-1-title">{service.sec1Title}</h2>
            <p className="sec-desc" data-testid="sec-1-desc">{service.sec1Desc}</p>
            <div className="tags-row" data-testid="sec-1-tags">
              {service.sec1Tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
          <div className="sec-1-visual-wrap" data-testid="sec-1-visual">
            {service.sec1Visual}
          </div>
        </div>
      </section>

      {/* 4. Main Section 2: Creative Arsenal or App development (3-column grid, centered intro) */}
      <section className="service-section-2" data-testid="service-section-2">
        <div className="container">
          <div className="sec-2-intro text-center">
            <h2 className="sec-2-badge label text-red" data-testid="sec-2-badge">{service.sec2Title}</h2>
            <p className="sec-2-sub" data-testid="sec-2-subtitle">{service.sec2Sub}</p>
          </div>
          
          <div className="creative-cards-grid">
            {service.sec2Cards.map((card, idx) => {
              const isOffset = idx === 1; // Center card offset upward
              return (
                <div 
                  key={card.label} 
                  className={`creative-card ${isOffset ? 'offset-up' : ''}`}
                  data-testid={`creative-card-${idx}`}
                >
                  <div className="creative-card-inner">
                    <span className="card-idx label">0{idx + 1}</span>
                    <h4>{card.label}</h4>
                    <p>{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Main Section 3: Paid Media or Data infrastructure (dark section, split layout) */}
      <section className="service-section-3" data-testid="service-section-3">
        <div className="container grid-2-col">
          
          {/* Left: Stats Grid */}
          <div className="sec-3-left-stats" data-testid="sec-3-stats">
            <div className="stats-2x2-grid">
              {service.sec3Stats.map((stat, idx) => (
                <div key={idx} className="stat-card-item">
                  <span className="stat-value-text">{stat.val}</span>
                  <span className="stat-label-text">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Spec Narrative */}
          <div className="sec-3-right-content">
            <span className="sec-3-badge label text-yellow" data-testid="sec-3-badge">{service.sec3Tag}</span>
            <h2 className="sec-3-title" data-testid="sec-3-title">{service.sec3Title}</h2>
            <p className="sec-3-desc" data-testid="sec-3-desc">{service.sec3Desc}</p>
            
            <ul className="sec-3-checklist">
              {service.sec3Checkmarks.map((check) => (
                <li key={check} data-testid="sec-3-checkmark-item">
                  <span className="check-bullet-icon"><Check size={12} /></span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Customizable Pricing & Scope Form (Customizer Box) */}
      <section id="plan-configurator" className="service-customizer-section" data-testid="plan-customizer-section">
        <div className="container">
          <div className="customizer-header text-center">
            <span className="label text-red">PLAN CONFIGURATOR</span>
            <h2>Configure Your Scope</h2>
            <p>Customize add-ons and compute instant pricing calculations for your custom plan.</p>
          </div>

          <div className="customizer-main-split">
            
            {/* Options Toggle Cards */}
            <div className="customizer-cards-col">
              {service.customizer.options.map((opt) => (
                <div key={opt.id} className="opt-block" data-testid={`custom-opt-${opt.id}`}>
                  <label className="opt-block-title">{opt.label}</label>
                  <div className="choices-flex">
                    {opt.choices.map((choice) => {
                      const isSelected = selections[opt.id]?.id === choice.id;
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          className={`choice-pill-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => handleChoiceSelect(opt.id, choice)}
                          data-testid={`choice-pill-${opt.id}-${choice.id}`}
                        >
                          <span className="pill-dot">
                            {isSelected && <span className="pill-dot-inner"></span>}
                          </span>
                          <span className="pill-txt">{choice.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations & Order Form */}
            <div className="customizer-order-col">
              <div className="calc-pricing-card">
                <span className="label text-yellow">TOTAL INVESTMENT</span>
                <div className="calc-price-row">
                  <span className="symbol">$</span>
                  <span className="value">{calculateTotal().toLocaleString()}</span>
                  {service.isRetainer && <span className="period">/mo</span>}
                </div>
                <p className="calc-caption">Prices computed in real-time. Submitting registers this custom setup blueprint.</p>
                
                <div className="order-form-container">
                  {success ? (
                    <div className="checkout-success-box" data-testid="order-success-message">
                      <ShieldCheck size={48} className="text-green" style={{ margin: '0 auto 1rem auto' }} />
                      <h3>Scope Locked Successfully!</h3>
                      <p>Your custom strategy selection has been logged. Our engineering team will review configurations and email you instructions.</p>
                      <button 
                        className="btn-secondary full-width" 
                        onClick={() => setSuccess(false)}
                        style={{ marginTop: '1rem' }}
                        data-testid="order-reset-btn"
                      >
                        Adjust Scope
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCustomPlanSubmit} className="checkout-order-form" data-testid="order-form" noValidate>
                      
                      {serverError && (
                        <div className="checkout-err-banner" data-testid="order-error-banner">
                          {serverError}
                        </div>
                      )}

                      <div className="grp">
                        <label htmlFor="ord-name">Name</label>
                        <input 
                          id="ord-name"
                          type="text" 
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className={errors.name ? 'error' : ''}
                          data-testid="order-name-input"
                        />
                        {errors.name && <span className="err-msg" data-testid="order-error-name">{errors.name}</span>}
                      </div>

                      <div className="grp">
                        <label htmlFor="ord-business">Business Name</label>
                        <input 
                          id="ord-business"
                          type="text" 
                          placeholder="Company name"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          className={errors.businessName ? 'error' : ''}
                          data-testid="order-business-input"
                        />
                        {errors.businessName && <span className="err-msg" data-testid="order-error-business">{errors.businessName}</span>}
                      </div>

                      <div className="grp">
                        <label htmlFor="ord-email">Business Email</label>
                        <input 
                          id="ord-email"
                          type="email" 
                          placeholder="hello@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={errors.email ? 'error' : ''}
                          data-testid="order-email-input"
                        />
                        {errors.email && <span className="err-msg" data-testid="order-error-email">{errors.email}</span>}
                      </div>

                      <button 
                        type="submit" 
                        className="btn-primary full-width"
                        disabled={loading}
                        data-testid="order-submit-btn"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="spinner" size={16} />
                            Securing Scope...
                          </>
                        ) : (
                          <>
                            Secure Custom Scope
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Flywheel Hand-off (CTA Banner) (yellow background) */}
      <section className="flywheel-handoff-banner" data-testid="flywheel-handoff">
        <div className="container handoff-inner">
          <h2 className="handoff-title" data-testid="handoff-title">
            {service.handoffTitle}
          </h2>
          <div className="handoff-ctas">
            <a href={service.handoffNextHash} className="btn-secondary bg-black-text-yellow" data-testid="handoff-next-btn">
              {service.handoffNext}
            </a>
            <a href="#/strategy-call" onClick={(e) => { e.preventDefault(); window.location.hash = '#/strategy-call'; }} className="btn-secondary" data-testid="handoff-booking-btn">
              Book a Strategy Call
            </a>
          </div>
        </div>
      </section>

    </article>
  );
}
