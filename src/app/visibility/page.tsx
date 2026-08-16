import { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import ProcessStrip from '@/components/ProcessStrip/ProcessStrip';
import Button from '@/components/Button/Button';
import { visibilityServices } from '@/data/services';
import * as LucideIcons from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Visibility | Blinx Lab',
  description: 'Being good isn\'t enough if nobody sees you.',
};

export default function VisibilityPage() {
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
              <span className={styles.label}>VISIBILITY</span>
            </div>
            <h1 className={styles.title}>Being good isn't enough if nobody sees you.</h1>
          </div>
        </div>
        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      <SectionReveal>
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {visibilityServices?.map((service, idx) => (
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
        <ProcessStrip steps={['See', 'Interest', 'Trust', 'Act']} />
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Ready to be seen?</h2>
            <Button isContactModal serviceCategory="Visibility" variant="primary" data-testid="cta-button">
              Get Noticed
            </Button>
          </div>
        </section>
      </SectionReveal>
    </main>
  );
}
