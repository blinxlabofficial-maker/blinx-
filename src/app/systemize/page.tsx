import { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import Button from '@/components/Button/Button';
import { systemizeServices } from '@/data/services';
import * as LucideIcons from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Systemize | Blinx Lab',
  description: 'Stop running your business from WhatsApp, Excel and memory.',
};

export default function SystemizePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroAtmosphere} aria-hidden="true">
          <div className={styles.heroGlowBlob1} />
          <div className={styles.heroGlowBlob2} />
          <div className={styles.heroGridOverlay} />
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badgeWrapper}>
              <span className={styles.badgeDot} />
              <span className={styles.label}>SYSTEMIZE</span>
            </div>
            <h1 className={styles.title}>Stop running your business from WhatsApp, Excel and memory.</h1>
          </div>
        </div>
        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      <SectionReveal>
        <section className={styles.comparisonSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>The Evolution of Operations</h2>
            <div className={styles.comparisonGrid}>
              <div className={styles.beforeCard} data-testid="before-card">
                <span className={styles.cardLabel}>BEFORE</span>
                <ul className={styles.cardList}>
                  <li>Scattered data across spreadsheets</li>
                  <li>Manual data entry & copy-pasting</li>
                  <li>Communication silos & missed messages</li>
                  <li>No clear visibility into metrics</li>
                  <li>Operations rely on specific people</li>
                </ul>
              </div>
              <div className={styles.afterCard} data-testid="after-card">
                <span className={styles.cardLabelAfter}>AFTER</span>
                <ul className={styles.cardListAfter}>
                  <li>Centralized, automated databases</li>
                  <li>Systems that talk to each other</li>
                  <li>Clear, unified communication channels</li>
                  <li>Real-time dashboards & reporting</li>
                  <li>Process-driven, scalable operations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {systemizeServices?.map((service, idx) => (
                <ServiceCard 
                  key={idx}
                  title={service.title}
                  description={service.description}
                  iconName={service.iconName}
                  index={idx}
                  data-testid={`service-card-${idx}`}
                />
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Ready to systemize?</h2>
            <Button isContactModal serviceCategory="Systemize" variant="primary" data-testid="cta-button">
              Streamline Now
            </Button>
          </div>
        </section>
      </SectionReveal>
    </main>
  );
}
