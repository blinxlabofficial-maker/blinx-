'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Layers, 
  Cpu, 
  Rocket, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import SectionReveal from '../SectionReveal/SectionReveal';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './ProcessSection.module.css';

const processSteps = [
  {
    number: '01',
    phase: 'DISCOVERY & STRATEGY',
    timeline: 'Week 1',
    title: 'Diagnostic Audit & Blueprint',
    description: 'We analyze your unit economics, audit your current digital stack, and map competitive acquisition channels to identify high-leverage growth bottlenecks.',
    icon: Search,
    color: 'var(--electric-red)',
    deliverables: [
      'Comprehensive Growth Audit',
      'Technical Architecture Blueprint',
      'Prioritized Sprint Roadmap'
    ]
  },
  {
    number: '02',
    phase: 'CREATIVE & PROTOTYPING',
    timeline: 'Weeks 2–3',
    title: 'Conversion Design & Craft',
    description: 'We design high-polish, conversion-focused user interfaces and clear messaging that position your business as the category leader.',
    icon: Layers,
    color: '#FF7A00',
    deliverables: [
      'Interactive Figma Prototypes',
      'Design System & Component Library',
      'High-Intent Conversion Copy'
    ]
  },
  {
    number: '03',
    phase: 'ENGINEERING & INTEGRATION',
    timeline: 'Weeks 3–5',
    title: 'Full-Stack Build & Automation',
    description: 'We engineer blazing-fast web applications, custom databases, and automated workflows that eliminate manual operational overhead.',
    icon: Cpu,
    color: '#FFAE00',
    deliverables: [
      'Production-Grade Web Application',
      'CRM, Payment & ERP Integration',
      'Automated Backend Workflows'
    ]
  },
  {
    number: '04',
    phase: 'DEPLOYMENT & SCALE',
    timeline: 'Week 6 & Beyond',
    title: 'Launch & Compounding Growth',
    description: 'We execute a zero-downtime deployment, configure full analytics instrumentation, and initiate organic and paid distribution loops.',
    icon: Rocket,
    color: 'var(--voltage-yellow)',
    deliverables: [
      'Zero-Downtime Deployment',
      'Real-Time Analytics Dashboard',
      'Continuous Conversion Optimization'
    ]
  }
];

export default function ProcessSection() {
  const { openContactModal } = useContactModal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className={styles.section} data-testid="process-section">
      {/* Anchor for backwards compatibility */}
      <div id="services" className={styles.anchorOffset} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <SectionReveal>
            <span className={styles.tag}>HOW WE EXECUTE</span>
            <h2 className={styles.title}>From diagnosis to compounding momentum.</h2>
            <p className={styles.subtitle}>
              A transparent, sprint-based delivery model engineered for velocity, zero agency bloat, and measurable revenue impact.
            </p>
          </SectionReveal>
        </div>

        {/* Process Timeline Grid */}
        <div className={styles.timelineGrid}>
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isHovered = activeStep === idx;

            return (
              <SectionReveal key={step.number} staggerIndex={idx}>
                <div 
                  className={`${styles.stepCard} ${isHovered ? styles.stepCardActive : ''}`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  {/* Step Top Bar */}
                  <div className={styles.cardTop}>
                    <div className={styles.iconBox} style={{ color: step.color }}>
                      <Icon size={22} />
                    </div>
                    <div className={styles.badgeGroup}>
                      <span className={styles.timelineBadge}>{step.timeline}</span>
                      <span className={styles.stepNumber}>{step.number}</span>
                    </div>
                  </div>

                  {/* Phase & Title */}
                  <div className={styles.cardHeader}>
                    <span className={styles.phaseLabel}>{step.phase}</span>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                  </div>

                  {/* Description */}
                  <p className={styles.cardDesc}>{step.description}</p>

                  {/* Deliverables List */}
                  <div className={styles.deliverablesSection}>
                    <span className={styles.deliverablesHeading}>Key Deliverables:</span>
                    <ul className={styles.deliverablesList}>
                      {step.deliverables.map((item, itemIdx) => (
                        <li key={itemIdx} className={styles.deliverableItem}>
                          <CheckCircle2 size={15} className={styles.checkIcon} style={{ color: step.color }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className={styles.cardAccentBar} style={{ background: step.color }} />
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom Fast-Track Banner */}
        <SectionReveal>
          <div className={styles.bottomBanner}>
            <div className={styles.bannerLeft}>
              <div className={styles.sparkleIconBox}>
                <Sparkles size={22} className={styles.sparkleIcon} />
              </div>
              <div>
                <h4 className={styles.bannerTitle}>Want to see what this roadmap looks like for your business?</h4>
                <p className={styles.bannerText}>
                  Take our 2-minute diagnostic audit to get a customized implementation roadmap and timeline.
                </p>
              </div>
            </div>
            <div className={styles.bannerRight}>
              <button type="button" onClick={() => openContactModal()} className={styles.bannerBtn}>
                <span>Get Free Growth Audit</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
