import { Metadata } from 'next';
import Link from 'next/link';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import Button from '@/components/Button/Button';
import ScaleTimeline from './ScaleTimeline';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Scale | Blinx Lab',
  description: 'Scaling isn\'t doing more. It\'s building a business that can handle more.',
};

const segmentationCards = [
  { stage: 'Build', title: 'Need a foundation?', href: '/build', desc: 'Start here if you need a website or app.' },
  { stage: 'Visibility', title: 'Need traffic?', href: '/visibility', desc: 'Start here to get seen.' },
  { stage: 'Growth', title: 'Need conversions?', href: '/growth', desc: 'Start here to increase revenue.' },
  { stage: 'Systemize', title: 'Need operations?', href: '/systemize', desc: 'Start here to automate.' },
  { stage: 'Scale', title: 'Ready for everything?', href: '/support', desc: 'Talk to us about comprehensive scaling.' },
];

export default function ScalePage() {
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
              <span className={styles.label}>SCALE</span>
            </div>
            <h1 className={styles.title}>Scaling isn't doing more. It's building a business that can handle more.</h1>
          </div>
        </div>
        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      <SectionReveal>
        <section className={styles.timelineSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>The Journey to Scale</h2>
            <ScaleTimeline />
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.segmentationSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitleDark}>Where are you in your journey?</h2>
            <div className={styles.segmentationGrid}>
              {segmentationCards.map((card, idx) => (
                <Link href={card.href} key={idx} className={styles.segmentationCard} data-testid={`segmentation-card-${card.stage.toLowerCase()}`}>
                  <span className={styles.cardStage}>{card.stage}</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.desc}</p>
                  <span className={styles.cardLink}>Explore →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Ready to scale?</h2>
            <Button isContactModal serviceCategory="Scale" variant="primary" data-testid="cta-button">
              Start Your Journey
            </Button>
          </div>
        </section>
      </SectionReveal>
    </main>
  );
}
