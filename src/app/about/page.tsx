import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Target, 
  Flame, 
  Layers, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  Film,
  Users,
  Award
} from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us | Blinx Lab — We Build Businesses for the Digital World',
  description: 'Learn about Blinx Lab, our mission, creative philosophy, and how we engineer compounding digital growth through full-stack web applications and viral video production.',
};

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      {/* 1. Atmospheric Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroAtmosphere} aria-hidden="true">
          <div className={styles.heroGlowBlob1} />
          <div className={styles.heroGlowBlob2} />
          <div className={styles.heroGridOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDot} />
            <span className={styles.heroLabel}>WHO WE ARE · THE BLINX STORY</span>
          </div>

          <h1 className={styles.heroTitle}>We build businesses for the digital world.</h1>

          <p className={styles.heroSubtitle}>
            Blinx Lab is a modern creative engineering studio. We combine full-stack web architectures, AI diagnostic pipelines, and viral video production to turn audience attention into measurable revenue.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>35+</div>
              <div className={styles.statLabel}>Video Productions</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>7+</div>
              <div className={styles.statLabel}>Live Web Platforms</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100M+</div>
              <div className={styles.statLabel}>Views Generated</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>Infrastructure Uptime</div>
            </div>
          </div>
        </div>

        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      {/* 2. Our Thesis & Core Mission */}
      <section className={styles.missionSection}>
        <div className={styles.missionGrid}>
          <div className={styles.missionTextCol}>
            <span className={styles.sectionMiniTag}>OUR THESIS</span>
            <h2 className={styles.missionHeading}>Small &amp; developing businesses deserve enterprise-grade craft.</h2>
            <p className={styles.missionParagraph}>
              Most digital agencies force you to choose between slow, bloated traditional web developers or disconnected freelance video editors who don&apos;t understand your business model.
            </p>
            <p className={styles.missionParagraph}>
              At Blinx Lab, we unified both disciplines into a singular, high-velocity growth flywheel. Every line of code is optimized for conversion velocity, and every video keyframe is calibrated using retention psychology.
            </p>

            <div className={styles.checkPills}>
              <div className={styles.checkPillItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Zero fluff or generic templates</span>
              </div>
              <div className={styles.checkPillItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Senior engineers &amp; video directors only</span>
              </div>
              <div className={styles.checkPillItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Full IP ownership on delivery</span>
              </div>
            </div>
          </div>

          <div className={styles.missionVisualCol}>
            <div className={styles.flywheelSummaryCard}>
              <div className={styles.summaryCardHeader}>
                <Sparkles size={18} className={styles.sparkleIcon} />
                <span>THE 4-STAGE ENGINE</span>
              </div>
              <h3 className={styles.summaryCardTitle}>The Blinx Compounding Engine</h3>
              
              <div className={styles.stageMiniList}>
                <div className={styles.stageMiniItem}>
                  <span className={styles.stageNum}>01</span>
                  <div>
                    <strong>BUILD</strong>
                    <p>Sub-second Next.js web applications, e-commerce &amp; custom AI tools.</p>
                  </div>
                </div>
                <div className={styles.stageMiniItem}>
                  <span className={styles.stageNum}>02</span>
                  <div>
                    <strong>VISIBILITY</strong>
                    <p>High-retention viral video production, commercials &amp; organic SEO.</p>
                  </div>
                </div>
                <div className={styles.stageMiniItem}>
                  <span className={styles.stageNum}>03</span>
                  <div>
                    <strong>GROWTH</strong>
                    <p>Conversion funnel optimization, high-ROAS paid ads &amp; telemetry.</p>
                  </div>
                </div>
                <div className={styles.stageMiniItem}>
                  <span className={styles.stageNum}>04</span>
                  <div>
                    <strong>SYSTEMIZE</strong>
                    <p>Automated CRM pipelines, ERP workflows &amp; internal dashboards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Principles & Philosophy */}
      <section className={styles.principlesSection}>
        <div className={styles.sectionHeaderCenter}>
          <span className={styles.sectionMiniTag}>OUR DNA</span>
          <h2 className={styles.principlesHeading}>How we think, build, and ship.</h2>
          <p className={styles.principlesSub}>The foundational standards behind every project we deliver.</p>
        </div>

        <div className={styles.principlesGrid}>
          <div className={styles.principleCard}>
            <div className={styles.principleIconBox}>
              <Flame size={22} />
            </div>
            <h3 className={styles.principleTitle}>Retention &gt; Empty Views</h3>
            <p className={styles.principleDesc}>
              A million clicks mean nothing if viewers bounce in 2 seconds. We build hook architectures and fast interfaces that captivate audiences and drive action.
            </p>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIconBox}>
              <Layers size={22} />
            </div>
            <h3 className={styles.principleTitle}>Full-Stack Mastery</h3>
            <p className={styles.principleDesc}>
              From Next.js and Three.js 3D WebGL to Python ML neural networks and After Effects kinetic typography, we own the full technology and creative stack.
            </p>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIconBox}>
              <Zap size={22} />
            </div>
            <h3 className={styles.principleTitle}>Sub-Second Execution</h3>
            <p className={styles.principleDesc}>
              Speed is a competitive advantage. We optimize server response times to under 50ms and deliver 4K video masters with rapid turnaround times.
            </p>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIconBox}>
              <ShieldCheck size={22} />
            </div>
            <h3 className={styles.principleTitle}>Transparent Partnership</h3>
            <p className={styles.principleDesc}>
              No hidden agency markups or junior hand-offs. You collaborate directly with senior creators and engineers dedicated to your outcome.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Section */}
      <section className={styles.ctaSection}>
        <span className={styles.ctaTag}>READY TO SCALE?</span>
        <h2 className={styles.ctaTitle}>Experience the Blinx standard firsthand.</h2>
        <p className={styles.ctaSubtext}>
          Explore our production portfolio or reach out to our team to discuss your next breakthrough.
        </p>
        <div className={styles.ctaActions}>
          <Link href="/work" className={styles.ctaButtonPrimary}>
            <span>Explore Portfolio &amp; Edits</span>
            <ArrowRight size={16} />
          </Link>
          <button type="button" data-open-contact-modal="true" className={styles.ctaButtonSecondary}>
            <span>Start a Project &rarr;</span>
          </button>
        </div>
      </section>
    </div>
  );
}
