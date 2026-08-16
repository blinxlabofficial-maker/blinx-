'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Monitor, ShoppingCart, Layout, Link2, Zap,
  Search, FileText, Share2, Target, Megaphone, Star,
  TrendingUp, Mail, PieChart, Filter, GitFork,
  Users, GitMerge, Database, LayoutDashboard, Wrench, Cloud,
  ArrowRight, Search as SearchIcon, X, CheckCircle2, Sparkles
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './ServicesShowcase.module.css';

interface ServiceItem {
  id: string;
  category: 'build' | 'visibility' | 'growth' | 'systemize';
  categoryTitle: string;
  categoryNumber: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
  route: string;
}

const allServicesData: ServiceItem[] = [
  // Build (5)
  {
    id: 'custom-web-apps',
    category: 'build',
    categoryTitle: 'Build',
    categoryNumber: '01',
    badge: 'FOUNDATION',
    title: 'Custom Web Applications',
    description: 'Bespoke, high-performance web applications engineered for complex business logic, user dashboards, and proprietary customer portals.',
    icon: Monitor,
    color: 'var(--electric-red)',
    route: '/build'
  },
  {
    id: 'ecommerce-platforms',
    category: 'build',
    categoryTitle: 'Build',
    categoryNumber: '01',
    badge: 'FOUNDATION',
    title: 'E-commerce Platforms',
    description: 'High-converting online storefronts with seamless checkout flows, custom product builders, and robust inventory synchronization.',
    icon: ShoppingCart,
    color: 'var(--electric-red)',
    route: '/build'
  },
  {
    id: 'marketing-sites',
    category: 'build',
    categoryTitle: 'Build',
    categoryNumber: '01',
    badge: 'FOUNDATION',
    title: 'High-Converting Marketing Sites',
    description: 'Ultra-fast, accessible, and SEO-architected websites designed to establish premium authority and convert qualified visitors.',
    icon: Layout,
    color: 'var(--electric-red)',
    route: '/build'
  },
  {
    id: 'system-integrations',
    category: 'build',
    categoryTitle: 'Build',
    categoryNumber: '01',
    badge: 'FOUNDATION',
    title: 'API & System Integrations',
    description: 'Bridging third-party APIs, payment gateways, and custom backend databases to eliminate manual data entry across departments.',
    icon: Link2,
    color: 'var(--electric-red)',
    route: '/build'
  },
  {
    id: 'performance-optimization',
    category: 'build',
    categoryTitle: 'Build',
    categoryNumber: '01',
    badge: 'FOUNDATION',
    title: 'Speed & Core Web Vitals',
    description: 'Sub-second load times and 100/100 Lighthouse performance audits that boost search rankings and maximize conversion rates.',
    icon: Zap,
    color: 'var(--electric-red)',
    route: '/build'
  },

  // Visibility (6)
  {
    id: 'seo-strategy',
    category: 'visibility',
    categoryTitle: 'Visibility',
    categoryNumber: '02',
    badge: 'DISTRIBUTION',
    title: 'Local & National SEO',
    description: 'Dominating high-intent search queries with technical SEO, schema architecture, and geographic landing pages that capture ready-to-buy traffic.',
    icon: Search,
    color: 'var(--voltage-yellow)',
    route: '/visibility'
  },
  {
    id: 'paid-advertising',
    category: 'visibility',
    categoryTitle: 'Visibility',
    categoryNumber: '02',
    badge: 'DISTRIBUTION',
    title: 'Performance Paid Media',
    description: 'High-ROAS Google Ads, Meta Ads, and LinkedIn campaigns calibrated for profitable customer acquisition without wasted ad spend.',
    icon: Target,
    color: 'var(--voltage-yellow)',
    route: '/visibility'
  },
  {
    id: 'content-marketing',
    category: 'visibility',
    categoryTitle: 'Visibility',
    categoryNumber: '02',
    badge: 'DISTRIBUTION',
    title: 'Authority Content Strategy',
    description: 'Editorial thought-leadership, strategic case studies, and buyer guides that rank organically and build unshakeable client trust.',
    icon: FileText,
    color: 'var(--voltage-yellow)',
    route: '/visibility'
  },
  {
    id: 'social-distribution',
    category: 'visibility',
    categoryTitle: 'Visibility',
    categoryNumber: '02',
    badge: 'DISTRIBUTION',
    title: 'Multi-Channel Distribution',
    description: 'Systematized social content engines that repurpose core brand messaging across LinkedIn, Instagram, and industry channels.',
    icon: Share2,
    color: 'var(--voltage-yellow)',
    route: '/visibility'
  },
  {
    id: 'digital-pr',
    category: 'visibility',
    categoryTitle: 'Visibility',
    categoryNumber: '02',
    badge: 'DISTRIBUTION',
    title: 'Digital PR & Brand Mentions',
    description: 'Securing editorial features in relevant industry publications to build authoritative backlink equity and category credibility.',
    icon: Megaphone,
    color: 'var(--voltage-yellow)',
    route: '/visibility'
  },
  {
    id: 'brand-identity',
    category: 'visibility',
    categoryTitle: 'Visibility',
    categoryNumber: '02',
    badge: 'DISTRIBUTION',
    title: 'Brand Identity & Messaging',
    description: 'Distinctive visual design systems and punchy value proposition copywriting that make your company instantly memorable.',
    icon: Star,
    color: 'var(--voltage-yellow)',
    route: '/visibility'
  },

  // Growth (6)
  {
    id: 'cro',
    category: 'growth',
    categoryTitle: 'Growth',
    categoryNumber: '03',
    badge: 'CONVERSION',
    title: 'Conversion Rate Optimization (CRO)',
    description: 'Systematic UX audits, heatmapping, and checkout funnel redesigns that double lead volume from your existing web traffic.',
    icon: TrendingUp,
    color: 'var(--electric-red)',
    route: '/growth'
  },
  {
    id: 'sales-funnels',
    category: 'growth',
    categoryTitle: 'Growth',
    categoryNumber: '03',
    badge: 'CONVERSION',
    title: 'Automated Lead Funnels',
    description: 'Multi-step qualification funnels, booking calendars, and quiz audits that capture and warm up prospects 24/7.',
    icon: Filter,
    color: 'var(--electric-red)',
    route: '/growth'
  },
  {
    id: 'email-marketing',
    category: 'growth',
    categoryTitle: 'Growth',
    categoryNumber: '03',
    badge: 'CONVERSION',
    title: 'Lifecycle Email Sequences',
    description: 'Automated welcome series, abandoned checkout sequences, and customer re-engagement flows that drive predictable recurring revenue.',
    icon: Mail,
    color: 'var(--electric-red)',
    route: '/growth'
  },
  {
    id: 'data-analytics',
    category: 'growth',
    categoryTitle: 'Growth',
    categoryNumber: '03',
    badge: 'CONVERSION',
    title: 'Data Analytics & Attribution',
    description: 'Server-side tracking, custom GA4 events, and attribution dashboards that reveal exactly which channels generate profit.',
    icon: PieChart,
    color: 'var(--electric-red)',
    route: '/growth'
  },
  {
    id: 'marketing-automation',
    category: 'growth',
    categoryTitle: 'Growth',
    categoryNumber: '03',
    badge: 'CONVERSION',
    title: 'Omnichannel Automation',
    description: 'Connecting SMS alerts, CRM lead routing, and dynamic retargeting so no qualified sales inquiry ever goes cold.',
    icon: Zap,
    color: 'var(--electric-red)',
    route: '/growth'
  },
  {
    id: 'ab-testing',
    category: 'growth',
    categoryTitle: 'Growth',
    categoryNumber: '03',
    badge: 'CONVERSION',
    title: 'Continuous A/B Experimentation',
    description: 'Statistically significant split testing on headlines, pricing models, and CTA placements to systematically eliminate guesswork.',
    icon: GitFork,
    color: 'var(--electric-red)',
    route: '/growth'
  },

  // Systemize (6)
  {
    id: 'crm-implementation',
    category: 'systemize',
    categoryTitle: 'Systemize',
    categoryNumber: '04',
    badge: 'AUTOMATION',
    title: 'CRM Architecture & Setup',
    description: 'Custom HubSpot, Salesforce, or bespoke CRM implementations configured around your exact deal stages and client pipelines.',
    icon: Users,
    color: 'var(--voltage-yellow)',
    route: '/systemize'
  },
  {
    id: 'workflow-automation',
    category: 'systemize',
    categoryTitle: 'Systemize',
    categoryNumber: '04',
    badge: 'AUTOMATION',
    title: 'Zero-Touch Workflow Automation',
    description: 'Eliminating repetitive administrative tasks using Make, Zapier, and custom webhooks to sync leads, contracts, and invoicing automatically.',
    icon: GitMerge,
    color: 'var(--voltage-yellow)',
    route: '/systemize'
  },
  {
    id: 'erp-integration',
    category: 'systemize',
    categoryTitle: 'Systemize',
    categoryNumber: '04',
    badge: 'AUTOMATION',
    title: 'ERP & Inventory Synchronization',
    description: 'Connecting warehouse inventory, ERP systems, and field dispatch operations with real-time bidirectional data flows.',
    icon: Database,
    color: 'var(--voltage-yellow)',
    route: '/systemize'
  },
  {
    id: 'executive-dashboards',
    category: 'systemize',
    categoryTitle: 'Systemize',
    categoryNumber: '04',
    badge: 'AUTOMATION',
    title: 'Custom Executive Dashboards',
    description: 'Live unified dashboards aggregating revenue, cash flow, operational capacity, and lead metrics into one command center.',
    icon: LayoutDashboard,
    color: 'var(--voltage-yellow)',
    route: '/systemize'
  },
  {
    id: 'internal-portals',
    category: 'systemize',
    categoryTitle: 'Systemize',
    categoryNumber: '04',
    badge: 'AUTOMATION',
    title: 'Client & Team Internal Portals',
    description: 'Secure, authenticated portals where clients track project deliverables, view invoices, and communicate with your team effortlessly.',
    icon: Wrench,
    color: 'var(--voltage-yellow)',
    route: '/systemize'
  },
  {
    id: 'cloud-infrastructure',
    category: 'systemize',
    categoryTitle: 'Systemize',
    categoryNumber: '04',
    badge: 'AUTOMATION',
    title: 'Scalable Cloud Infrastructure',
    description: 'Enterprise-grade hosting, automated daily backups, SSL security, and CI/CD pipelines ensuring 99.99% operational uptime.',
    icon: Cloud,
    color: 'var(--voltage-yellow)',
    route: '/systemize'
  }
];

const categoryPillars = [
  { id: 'all', label: 'All Services (23)', count: 23 },
  { id: 'build', label: '01. Build', count: 5, badge: 'FOUNDATION', desc: 'Web apps, e-commerce, and high-performance digital foundations.' },
  { id: 'visibility', label: '02. Visibility', count: 6, badge: 'DISTRIBUTION', desc: 'Targeted SEO, performance paid media, and category authority.' },
  { id: 'growth', label: '03. Growth', count: 6, badge: 'CONVERSION', desc: 'Conversion rate optimization, automated funnels, and retention.' },
  { id: 'systemize', label: '04. Systemize', count: 6, badge: 'AUTOMATION', desc: 'CRM, automated workflows, ERP integration, and internal portals.' }
];

export default function ServicesShowcase() {
  const { openContactModal } = useContactModal();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'build' | 'visibility' | 'growth' | 'systemize'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL hash changes (e.g. clicking #build, #visibility from navbar)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['build', 'visibility', 'growth', 'systemize'].includes(hash)) {
        setSelectedCategory(hash as any);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filteredServices = useMemo(() => {
    return allServicesData.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.categoryTitle.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activePillarInfo = useMemo(() => {
    return categoryPillars.find(p => p.id === selectedCategory) || categoryPillars[0];
  }, [selectedCategory]);

  return (
    <section id="services" className={styles.section} data-testid="services-showcase">
      {/* Category Anchor Targets for Smooth Deep-Linking */}
      <div id="build" className={styles.anchorOffset} />
      <div id="visibility" className={styles.anchorOffset} />
      <div id="growth" className={styles.anchorOffset} />
      <div id="systemize" className={styles.anchorOffset} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.monoTag}>FOUR OPERATIONAL PILLARS · 23 SPECIALIZED SERVICES</span>
          <h2 className={styles.title}>Everything required to build, grow, and automate.</h2>
          <p className={styles.subtitle}>
            Explore our end-to-end service matrix. Filter by operational stage or search directly for specific services.
          </p>
        </div>

        {/* Controls: Segmented Tabs + Live Search Bar */}
        <div className={styles.controlsWrapper}>
          {/* Segmented Category Tabs */}
          <div className={styles.tabsList} role="tablist" aria-label="Service Category Tabs">
            {categoryPillars.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`${styles.tabBtn} ${selectedCategory === cat.id ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory(cat.id as any)}
              >
                <span>{cat.label}</span>
                <span className={styles.tabCount}>{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Real-time Search Input */}
          <div className={styles.searchBar}>
            <SearchIcon size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search services (e.g. SEO, CRM, E-commerce, Funnels...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search all services"
            />
            {searchQuery && (
              <button 
                className={styles.clearSearchBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Active Pillar Overview Banner (when a specific category is active) */}
        {selectedCategory !== 'all' && (
          <div className={styles.pillarBanner}>
            <div className={styles.pillarBannerLeft}>
              <span className={styles.pillarBannerBadge}>{activePillarInfo.badge}</span>
              <h3 className={styles.pillarBannerTitle}>{activePillarInfo.label}</h3>
              <p className={styles.pillarBannerDesc}>{activePillarInfo.desc}</p>
            </div>
            <div className={styles.pillarBannerRight}>
              <Link href={`/${selectedCategory}`} className={styles.pillarHubLink}>
                <span>Explore Full {activePillarInfo.label.split('. ')[1]} Hub</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Results Counter if searching */}
        {searchQuery && (
          <div className={styles.searchStatus}>
            <span>Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} matching &ldquo;{searchQuery}&rdquo;</span>
            <button className={styles.resetFilterBtn} onClick={() => setSearchQuery('')}>Reset search</button>
          </div>
        )}

        {/* 23-Service Cards Grid */}
        <div className={styles.servicesGrid}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.iconBox}>
                      <Icon size={22} style={{ color: service.color }} />
                    </div>
                    <span className={styles.cardCategoryBadge}>{service.categoryNumber} · {service.badge}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>

                  <div className={styles.cardBottom}>
                    <Link href={service.route} className={styles.cardActionLink}>
                      <span>Explore Pillar</span>
                      <ArrowRight size={14} />
                    </Link>
                    <button 
                      type="button" 
                      className={styles.cardInquireLink}
                      onClick={() => openContactModal(service.title)}
                    >
                      <span>Inquire &rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <p>No services found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button className={styles.emptyResetBtn} onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                View All 23 Services
              </button>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className={styles.bottomBanner}>
          <div className={styles.bottomBannerContent}>
            <Sparkles size={20} className={styles.bottomIcon} />
            <div>
              <strong>Not sure which services you need first?</strong>
              <p>Take our 2-minute diagnostic audit to get a customized roadmap for your business.</p>
            </div>
          </div>
          <button 
            type="button" 
            className={styles.bottomBannerBtn}
            onClick={() => openContactModal()}
          >
            Get Free Growth Audit &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
