import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Flame, 
  Sparkles, 
  Layers, 
  Volume2, 
  Palette, 
  ArrowRight, 
  CheckCircle2,
  Globe,
  Film
} from 'lucide-react';
import VideoPortfolio from '@/components/VideoPortfolio/VideoPortfolio';
import WebsitePortfolio from '@/components/WebsitePortfolio/WebsitePortfolio';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Portfolio & Live Platforms | Blinx Lab — Web Development & Video Production',
  description: 'Explore our live website builds and 35+ high-retention video production projects across wellness, marketplaces, AI healthcare, real estate, and finance.',
};

export default function WorkPage() {
  return (
    <div className={styles.pageContainer}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroAtmosphere} aria-hidden="true">
          <div className={styles.heroGlowBlob1} />
          <div className={styles.heroGlowBlob2} />
          <div className={styles.heroGridOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDot} />
            <span className={styles.heroLabel}>WORK &amp; LIVE PLATFORMS</span>
          </div>
          <h1 className={styles.heroTitle}>Real results for real businesses.</h1>
          <p className={styles.heroSubtitle}>
            Full-stack web applications, AI-powered systems, and high-retention video production engineered to turn audience attention into compounding revenue.
          </p>

          {/* Quick Stat Ticker */}
          <div className={styles.statTickerRow}>
            <div className={styles.statTickerItem}>
              <div className={styles.statTickerNumber}>7+</div>
              <div className={styles.statTickerLabel}>Live Web Platforms</div>
            </div>
            <div className={styles.statTickerItem}>
              <div className={styles.statTickerNumber}>35+</div>
              <div className={styles.statTickerLabel}>Curated Video Edits</div>
            </div>
            <div className={styles.statTickerItem}>
              <div className={styles.statTickerNumber}>100M+</div>
              <div className={styles.statTickerLabel}>Views &amp; Impressions</div>
            </div>
            <div className={styles.statTickerItem}>
              <div className={styles.statTickerNumber}>99.9%</div>
              <div className={styles.statTickerLabel}>Platform Uptime</div>
            </div>
          </div>
        </div>
        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      {/* 2. Live Web Platforms Portfolio */}
      <section className={styles.sectionHeaderWrapper}>
        <span className={styles.sectionTag}>LIVE WEB PLATFORMS</span>
        <h2 className={styles.sectionMainTitle}>Full-Stack &amp; AI Web Applications</h2>
        <p className={styles.sectionSubtext}>
          Explore our production deployments across community marketplaces, AI diagnostic tools, hospitality platforms, and 3D spatial experiences.
        </p>
      </section>

      <WebsitePortfolio />

      {/* 3. Video Editing & Creative Production Portfolio */}
      <section className={styles.sectionHeaderWrapper}>
        <span className={styles.sectionTag}>CREATIVE LAB &amp; PRODUCTION</span>
        <h2 className={styles.sectionMainTitle}>Video Editing &amp; Viral Retention Hub</h2>
        <p className={styles.sectionSubtext}>
          High-velocity commercial ads, luxury real estate tours, prop trading breakdowns, and viral short-form retention edits.
        </p>
      </section>

      <VideoPortfolio />

      {/* 4. Creative Production Capabilities Matrix */}
      <section className={styles.sectionHeaderWrapper}>
        <span className={styles.sectionTag}>CREATIVE ENGINEERING</span>
        <h2 className={styles.sectionMainTitle}>How we engineer high-performing digital assets.</h2>
        <p className={styles.sectionSubtext}>
          Every interface element, server response, and video keyframe is optimized for speed, clarity, and conversion.
        </p>
      </section>

      <div className={styles.capabilitiesGrid}>
        <div className={styles.capabilityCard}>
          <div className={styles.capabilityIconBox}>
            <Flame size={22} />
          </div>
          <h3 className={styles.capabilityCardTitle}>Hook Architecture &amp; Pacing</h3>
          <p className={styles.capabilityCardDesc}>
            First-3-second scroll stoppers, dynamic visual curiosity loops, and rhythmic pattern interrupts that maximize watch time.
          </p>
        </div>

        <div className={styles.capabilityCard}>
          <div className={styles.capabilityIconBox}>
            <Layers size={22} />
          </div>
          <h3 className={styles.capabilityCardTitle}>Kinetic Motion &amp; 3D Web</h3>
          <p className={styles.capabilityCardDesc}>
            Interactive Three.js WebGL graphics, custom After Effects kinetic typography, and smooth scrollytelling interfaces.
          </p>
        </div>

        <div className={styles.capabilityCard}>
          <div className={styles.capabilityIconBox}>
            <Volume2 size={22} />
          </div>
          <h3 className={styles.capabilityCardTitle}>Sound Design &amp; Foley</h3>
          <p className={styles.capabilityCardDesc}>
            Custom sonic branding, bass hits, riser swells, whooshes, and broadcast-grade voiceover mastering.
          </p>
        </div>

        <div className={styles.capabilityCard}>
          <div className={styles.capabilityIconBox}>
            <Palette size={22} />
          </div>
          <h3 className={styles.capabilityCardTitle}>AI &amp; Backend Systems</h3>
          <p className={styles.capabilityCardDesc}>
            Python ML neural networks, TensorFlow MRI inference, MongoDB data pipelines, and sub-second serverless APIs.
          </p>
        </div>
      </div>

      {/* 5. Bottom Creative CTA Banner */}
      <section className={styles.ctaSection}>
        <span className={styles.ctaTag}>READY TO BUILD?</span>
        <h2 className={styles.ctaTitle}>Turn your vision into a compounding revenue engine.</h2>
        <p className={styles.ctaSubtext}>
          Schedule a 20-minute strategy session to review your digital presence, tech architecture, and creative roadmap.
        </p>
        <div className={styles.ctaActions}>
          <button type="button" data-open-contact-modal="true" className={styles.ctaButtonPrimary}>
            <span>Start Your Project</span>
            <ArrowRight size={16} />
          </button>
          <Link href="/about" className={styles.ctaButtonSecondary}>
            <span>About Our Team</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
