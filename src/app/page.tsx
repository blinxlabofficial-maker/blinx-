import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import styles from './page.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';
import FlywheelSection from '@/components/FlywheelSection/FlywheelSection';
import ProcessSection from '@/components/ProcessSection/ProcessSection';
import HomePortfolioShowcase from '@/components/HomePortfolioShowcase/HomePortfolioShowcase';
import Button from '@/components/Button/Button';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import TestimonialCarousel from '@/components/TestimonialCarousel/TestimonialCarousel';
import { caseStudies } from '@/data/caseStudies';
import { testimonials } from '@/data/testimonials';
import CountUp from '@/components/CountUp/CountUp';
import Blob from '@/components/Blob/Blob';
import TiltCard from '@/components/TiltCard/TiltCard';

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (Dark / Ambient) */}
      <HeroSection />

      {/* Inter-Section Transition: Dark Hero to Light Problem */}
      <div className={styles.transitionDarkToLight} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-light)" />
        </svg>
      </div>

      {/* 2. The Problem (Studio Light / Editorial) */}
      <section className={`${styles.section} ${styles.lightBg} ${styles.problemSection}`}>
        <div className={`${styles.container} ${styles.narrowContainer}`}>
          <SectionReveal>
            <span className={styles.categoryTagDark}>THE CORE DILEMMA</span>
          </SectionReveal>
          
          <div className={styles.editorialQuote}>
            <SectionReveal yOffset={20} duration={650} rootMargin="-15% 0px">
              <p className={styles.problemLine}>Most businesses don&apos;t fail because they have a bad product or service.</p>
            </SectionReveal>
            <SectionReveal yOffset={20} duration={650} rootMargin="-20% 0px">
              <p className={styles.problemLine}>They fail because they remain a well-kept secret in a noisy market.</p>
            </SectionReveal>
            <SectionReveal yOffset={20} duration={650} rootMargin="-25% 0px">
              <p className={`${styles.problemLine} ${styles.highlightLine}`}>
                Strategy, craft, and technology must work as one engine.
                <svg className={styles.underlineSvg} viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q100,10 200,5" stroke="var(--electric-red)" strokeWidth="3" fill="none" />
                </svg>
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Inter-Section Transition: Light Problem to Dark Flywheel */}
      <div className={styles.transitionLightToDark} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-dark)" />
        </svg>
      </div>

      {/* 3. Flywheel Section (Dark / Scrollytelling) */}
      <FlywheelSection />

      {/* 4. Value / Impact Strip (Dark) */}
      <section className={`${styles.section} ${styles.darkBg} ${styles.valueSection}`}>
        <div className={styles.container}>
          <div className={styles.valueGrid}>
            <SectionReveal staggerIndex={0}>
              <div className={styles.valueItem}>
                <div className={styles.accentLine} />
                <span className={styles.valueNumber}>01</span>
                <h3>Strategy before noise</h3>
                <p>Every tactic is backed by unit economics and competitive market positioning.</p>
              </div>
            </SectionReveal>
            <SectionReveal staggerIndex={1}>
              <div className={styles.valueItem}>
                <div className={styles.accentLine} />
                <span className={styles.valueNumber}>02</span>
                <h3>Creative built to convert</h3>
                <p>High-polish interfaces and messaging calibrated to turn visitors into buyers.</p>
              </div>
            </SectionReveal>
            <SectionReveal staggerIndex={2}>
              <div className={styles.valueItem}>
                <div className={styles.accentLine} />
                <span className={styles.valueNumber}>03</span>
                <h3>Momentum that compounds</h3>
                <p>Automated operations and workflows that scale smoothly as demand multiplies.</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Inter-Section Transition: Dark Value to Light Process */}
      <div className={styles.transitionDarkToLight} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-light)" />
        </svg>
      </div>

      {/* 5. Process Section (Studio Light / 4-Step Execution Framework) */}
      <ProcessSection />

      {/* Inter-Section Transition: Light Process to Dark Audience */}
      <div className={styles.transitionLightToDark} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-dark)" />
        </svg>
      </div>

      {/* 6. Who We Help (Dark / Audience) */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <SectionReveal>
              <span className={styles.categoryTagLight}>TARGET PROFILES</span>
              <h2 className={styles.sectionTitle}>Built specifically for ambitious operators.</h2>
            </SectionReveal>
          </div>

          <SectionReveal>
            <div className={styles.audienceGrid}>
              <div className={styles.audienceCard}>
                <div className={styles.audienceBadge}>ESTABLISHED</div>
                <h3>Modernize &amp; Scale</h3>
                <p className={styles.audienceDesc}>Businesses with proven revenue ready to modernize legacy systems and accelerate lead flow.</p>
                <ul className={styles.audienceList}>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Custom Client Portals &amp; CRM</li>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Premium Brand &amp; Web Refresh</li>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> High-Intent Search Visibility</li>
                </ul>
              </div>

              <div className={`${styles.audienceCard} ${styles.audienceCardFeatured}`}>
                <div className={styles.featuredTag}>MOST POPULAR</div>
                <div className={styles.audienceBadge}>GROWING</div>
                <h3>Break The Plateau</h3>
                <p className={styles.audienceDesc}>Fast-moving companies hitting operational bottlenecks and needing systems to scale capacity.</p>
                <ul className={styles.audienceList}>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Automated Lead Qualification</li>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Performance Paid Acquisition</li>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Workflow &amp; Dispatch Automations</li>
                </ul>
              </div>

              <div className={styles.audienceCard}>
                <div className={styles.audienceBadge}>NEW VENTURES</div>
                <h3>Launch Strong</h3>
                <p className={styles.audienceDesc}>New ventures seeking an enterprise-grade digital foundation from day one without agency bloat.</p>
                <ul className={styles.audienceList}>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Conversion-Optimized Launch Site</li>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Initial Go-To-Market Funnels</li>
                  <li><CheckCircle2 size={16} className={styles.checkIcon} /> Tracking &amp; Analytics Baseline</li>
                </ul>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Inter-Section Transition: Dark Audience to Light Why Blinx */}
      <div className={styles.transitionDarkToLight} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-light)" />
        </svg>
      </div>

      {/* 7. Why Blinx (Studio Light / Positioning) */}
      <section id="why-blinx" className={`${styles.section} ${styles.lightBg}`}>
        <div className={styles.container}>
          <div className={styles.whyGrid}>
            <div className={styles.whyContent}>
              <SectionReveal>
                <span className={styles.categoryTagDark}>THE BLINX DIFFERENCE</span>
                <h2 className={styles.sectionTitleDark}>Your digital presence should feel like your highest-performing salesperson.</h2>
                <p className={styles.brandCopy}>
                  Most agencies hand you pretty mockups and vanish. We partner with you across engineering, conversion design, and operational automation to create a compounding revenue engine.
                </p>
                <div className={styles.whyPillars}>
                  <div className={styles.whyPillar}>
                    <strong>Senior Operators Only</strong>
                    <span>No junior handoffs or bloated account managers.</span>
                  </div>
                  <div className={styles.whyPillar}>
                    <strong>Speed to Traction</strong>
                    <span>Weeks, not quarters. Rapid deployments that generate early feedback.</span>
                  </div>
                </div>
              </SectionReveal>
            </div>

            <div className={styles.whyVisual}>
              <SectionReveal>
                <div className={styles.convergingContainer}>
                  <svg viewBox="0 0 240 120" className={styles.arrowsSvg}>
                    <path d="M30,20 L110,60" className={styles.arrowPath} stroke="var(--ink-black)" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M95,45 L110,60 L85,65" className={styles.arrowHead} fill="none" stroke="var(--ink-black)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M210,20 L130,60" className={styles.arrowPathRight} stroke="var(--electric-red)" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M145,45 L130,60 L155,65" className={styles.arrowHeadRight} fill="none" stroke="var(--electric-red)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="120" cy="75" r="9" fill="var(--voltage-yellow)" className={styles.centerDot} />
                  </svg>
                  <span className={styles.convergingLabel}>Strategy + Craft = Compounding Scale</span>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Inter-Section Transition: Light Why to Dark Featured Work */}
      <div className={styles.transitionLightToDark} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-dark)" />
        </svg>
      </div>

      {/* 8. Featured Work & Production Portfolio (Dark / Live Web + Video Showcase) */}
      <HomePortfolioShowcase />

      {/* Inter-Section Transition: Dark Work to Light Testimonials */}
      <div className={styles.transitionDarkToLight} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-light)" />
        </svg>
      </div>

      {/* 9. Testimonials (Studio Light) */}
      <section className={`${styles.section} ${styles.lightBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <SectionReveal>
              <span className={styles.categoryTagDark}>CLIENT FEEDBACK</span>
              <h2 className={styles.sectionTitleDark}>Trusted by founders and operational leaders.</h2>
            </SectionReveal>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Inter-Section Transition: Light Testimonials to Dark Final CTA */}
      <div className={styles.transitionLightToDark} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.transitionSvg}>
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="var(--surface-dark)" />
        </svg>
      </div>

      {/* 10. Final CTA Banner (Dark / Luxury) */}
      <section className={`${styles.section} ${styles.darkBg} ${styles.finalCta}`}>
        <Blob position="top-left" variant="primary" opacity={0.4} />
        <div className={styles.container}>
          <SectionReveal>
            <div className={styles.ctaContent}>
              <span className={styles.categoryTagLight}>READY FOR MOMENTUM?</span>
              <h2 className={styles.ctaTitle}>
                Stop losing customers to competitors with <span className="gradient-text">better marketing.</span>
              </h2>
              <p className={styles.ctaSubtext}>
                Schedule a 20-minute growth assessment or start your project today. No generic pitches — only actionable roadmap insights.
              </p>
              <div className={styles.ctaActions}>
                <Button isContactModal variant="primary">Start Your Project</Button>
                <Button isContactModal variant="secondary">Request Free Audit</Button>
              </div>
              <p className={styles.microCopy}>Typical response time under 24 hours · Transparent project scopes</p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
