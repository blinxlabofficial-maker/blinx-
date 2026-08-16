import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './ProcessStrip.module.css';

interface ProcessStripProps {
  steps: string[];
  activeIndex?: number;
}

export default function ProcessStrip({ steps, activeIndex = 0 }: ProcessStripProps) {
  return (
    <div className={styles.strip} data-testid="process-strip" role="list">
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;
        
        return (
          <React.Fragment key={index}>
            <div className={`${styles.step} ${isActive ? styles.active : ''} ${isPast ? styles.past : ''}`} role="listitem" aria-current={isActive ? "step" : undefined}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.label}>{step}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={styles.connector}>
                <ArrowRight size={20} className={styles.arrow} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
