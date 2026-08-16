'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './FlywheelSection.module.css';
import { FlywheelDiagram } from '../FlywheelDiagram/FlywheelDiagram';
import SectionReveal from '../SectionReveal/SectionReveal';
import Blob from '../Blob/Blob';

const stages = [
  { 
    id: 1, 
    title: 'Build', 
    phase: 'STAGE 01 · FOUNDATION',
    route: '/build',
    outcome: 'Bespoke web applications and digital assets with sub-second performance.',
    description: 'We construct clean, accessible digital architectures that position your business as the premium authority in your space, designed from day one to maximize conversion.',
    deliverables: ['Custom Web Applications', 'Core Web Vitals 100/100', 'API & Database Integrations']
  },
  { 
    id: 2, 
    title: 'Visibility', 
    phase: 'STAGE 02 · DISTRIBUTION',
    route: '/visibility',
    outcome: 'Targeted dominance in high-intent search queries and paid acquisition channels.',
    description: 'We deploy localized SEO architectures, performance paid media, and authority content distribution to put your brand in front of ready-to-buy prospects.',
    deliverables: ['Local & National SEO Dominance', 'High-ROAS Google & Meta Ads', 'Authority Digital PR']
  },
  { 
    id: 3, 
    title: 'Growth', 
    phase: 'STAGE 03 · CONVERSION',
    route: '/growth',
    outcome: 'Compounding conversion rates and automated sales funnels that maximize lifetime value.',
    description: 'Through rigorous conversion rate optimization, automated email sequences, and lifecycle marketing, we turn passive clicks into loyal, high-paying clients.',
    deliverables: ['Conversion Rate Optimization', 'Automated Lead Qualification', 'Data Analytics & Attribution']
  },
  { 
    id: 4, 
    title: 'Systemize', 
    phase: 'STAGE 04 · AUTOMATION',
    route: '/systemize',
    outcome: 'Elimination of 15–40 hours per week in manual administrative overhead.',
    description: 'We integrate your customer relationship management, dispatch, ERP, and internal team workflows to create a frictionless, zero-touch operational backbone.',
    deliverables: ['Custom CRM & Pipeline Setup', 'Zero-Touch Workflow Automations', 'Real-Time Executive Dashboards']
  },
  { 
    id: 5, 
    title: 'Scale', 
    phase: 'STAGE 05 · EXPANSION',
    route: '/support',
    outcome: 'Predictable category dominance and enterprise market expansion.',
    description: 'With foundational systems, traffic engines, and automation running seamlessly, your business expands into new markets with compounding momentum.',
    deliverables: ['Multi-Market Category Expansion', 'Scalable Cloud Infrastructure', 'Compounding Enterprise Valuation']
  },
];

export default function FlywheelSection() {
  const [activeStage, setActiveStage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStageSelect = (stageId: number) => {
    if (stageId === activeStage) return;
    setIsTransitioning(true);
    setActiveStage(stageId);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextStage = () => {
    const next = activeStage === 5 ? 1 : activeStage + 1;
    handleStageSelect(next);
  };

  const prevStage = () => {
    const prev = activeStage === 1 ? 5 : activeStage - 1;
    handleStageSelect(prev);
  };

  const current = stages.find(s => s.id === activeStage) || stages[0];

  return (
    <section id="flywheel" className={styles.section} data-testid="flywheel-section">
      <div className={styles.container}>
        {/* Section Header */}
        <SectionReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.categoryTag}>THE BLINX OPERATING MODEL</span>
            <h2 className={styles.sectionTitle}>One unified system. Five compounding stages.</h2>
            <p className={styles.sectionSubtitle}>
              Traditional agencies isolate services into disconnected silos. We deploy an interconnected growth flywheel where each stage directly feeds the next.
            </p>
          </div>
        </SectionReveal>
        
        {/* Main Interactive Stage Deck Layout */}
        <div className={styles.flywheelGrid}>
          {/* Left Column: Interactive Flywheel Diagram */}
          <div className={styles.flywheelDiagramCol}>
            <Blob position="center" opacity={0.18} />
            <FlywheelDiagram 
              activeStage={activeStage} 
              onStageClick={(stage) => handleStageSelect(stage)} 
            />
            <div className={styles.diagramHint}>
              <Sparkles size={14} className={styles.hintIcon} />
              <span>Select any node on the flywheel to inspect deliverables</span>
            </div>
          </div>
          
          {/* Right Column: Sleek Compact Animated Stage Card Deck */}
          <div className={styles.flywheelTextCol}>
            {/* Quick Step Indicators Track */}
            <div className={styles.stageTrack}>
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  className={`${styles.trackStep} ${activeStage === stage.id ? styles.trackStepActive : ''}`}
                  onClick={() => handleStageSelect(stage.id)}
                  type="button"
                  aria-label={`Switch to Phase ${stage.id}: ${stage.title}`}
                >
                  <span className={styles.trackNumber}>0{stage.id}</span>
                  <span className={styles.trackTitle}>{stage.title}</span>
                  <div className={styles.trackIndicator} />
                </button>
              ))}
            </div>

            {/* Active Stage Card with Smooth Scrolling/Slide Transition */}
            <div className={`${styles.activeCard} ${isTransitioning ? styles.cardTransitioning : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.phaseBadgeBox}>
                  <span className={styles.badgeDot} />
                  <span className={styles.stagePhaseBadge}>{current.phase}</span>
                </div>
                <div className={styles.cardNavControls}>
                  <button className={styles.navBtn} onClick={prevStage} aria-label="Previous Stage">
                    <ChevronLeft size={16} />
                  </button>
                  <button className={styles.navBtn} onClick={nextStage} aria-label="Next Stage">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <h3 className={styles.stageTitle}>{current.title}</h3>
              
              <div className={styles.outcomeBanner}>
                <strong>Outcome:</strong>
                <span>{current.outcome}</span>
              </div>

              <p className={styles.stageDesc}>{current.description}</p>

              <div className={styles.deliverablesList}>
                <span className={styles.deliverablesTitle}>Key Operational Deliverables:</span>
                <div className={styles.deliverableChips}>
                  {current.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className={styles.deliverableItem}>
                      <CheckCircle2 size={13} className={styles.checkIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.stageFooter}>
                <Link href={current.route} className={styles.stageLink}>
                  <span>Explore {current.title} Hub</span>
                  <ArrowRight size={14} />
                </Link>
                <button className={styles.nextStepTrigger} onClick={nextStage}>
                  <span>Next Phase &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
