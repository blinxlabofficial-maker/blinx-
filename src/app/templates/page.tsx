import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Layout, Rocket, LineChart, Briefcase } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Templates | Blinx Lab',
  description: 'Start faster with pre-built solutions.',
};

const templates = [
  {
    id: 'websites',
    title: 'Website Templates',
    description: 'High-converting, SEO-optimized website foundations ready to be customized for your brand.',
    icon: Layout,
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'Campaign-ready landing pages engineered specifically for paid traffic and maximum conversion.',
    icon: Rocket,
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    description: 'Beautiful admin panels and data visualization components for your internal tools.',
    icon: LineChart,
  },
  {
    id: 'business-systems',
    title: 'Business Systems',
    description: 'Pre-configured CRM, booking, and operational automation workflows.',
    icon: Briefcase,
  }
];

export default function TemplatesPage() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroAtmosphere} aria-hidden="true">
          <div className={styles.heroGlowBlob1} />
          <div className={styles.heroGlowBlob2} />
          <div className={styles.heroGridOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDot} />
            <span className={styles.heroLabel}>TEMPLATES</span>
          </div>
          <h1 className={styles.heroTitle}>Start faster with pre-built solutions.</h1>
        </div>
        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      <section className={styles.templatesGrid}>
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div key={template.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Icon size={24} color="var(--electric-red)" />
                </div>
                <span className={styles.comingSoonBadge}>Coming Soon</span>
              </div>
              <h3 className={styles.cardTitle}>{template.title}</h3>
              <p className={styles.cardDescription}>{template.description}</p>
            </div>
          );
        })}
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Need something completely custom?</h2>
        <button type="button" data-open-contact-modal="true" data-service="Custom Build" className={styles.ctaButton}>
          Let&apos;s Build It
        </button>
      </section>
    </div>
  );
}
