import { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import ProcessStrip from '@/components/ProcessStrip/ProcessStrip';
import Button from '@/components/Button/Button';
import { growthServices } from '@/data/services';
import * as LucideIcons from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Growth | Blinx Lab',
  description: 'Attention is useless if customers can\'t find you.',
};

export default function GrowthPage() {
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
              <span className={styles.label}>GROWTH</span>
            </div>
            <h1 className={styles.title}>Attention is useless if customers can't find you.</h1>
          </div>
        </div>
        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      <SectionReveal>
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {growthServices?.map((service, idx) => (
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
        <ProcessStrip steps={['Visibility', 'Intent', 'Enquiry', 'Customer', 'Revenue']} />
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Ready to grow your business?</h2>
            <Button isContactModal serviceCategory="Growth" variant="primary" data-testid="cta-button">
              Accelerate Growth
            </Button>
          </div>
        </section>
      </SectionReveal>
    </main>
  );
}
