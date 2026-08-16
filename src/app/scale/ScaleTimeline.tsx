'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './ScaleTimeline.module.css';

const steps = [
  { num: '01', title: 'Build', description: 'Lay the digital foundation.' },
  { num: '02', title: 'Visibility', description: 'Get seen by the right people.' },
  { num: '03', title: 'Growth', description: 'Turn attention into revenue.' },
  { num: '04', title: 'Systemize', description: 'Automate to remove bottlenecks.' },
  { num: '05', title: 'Scale', description: 'Grow without breaking.' },
];

export default function ScaleTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight / 2 - rect.top) / rect.height));
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.timelineContainer} ref={containerRef}>
      <div className={styles.line}>
        <div 
          className={styles.lineProgress} 
          style={{ height: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        />
      </div>
      {steps.map((step, idx) => (
        <div key={idx} className={`${styles.step} ${idx <= activeIndex ? styles.active : ''}`}>
          <div className={styles.marker}>{step.num}</div>
          <div className={styles.content}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
