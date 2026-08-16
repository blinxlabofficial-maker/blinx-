'use client';

import React from 'react';
import { ArrowRight, Code } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SectionReveal from '../SectionReveal/SectionReveal';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  iconName?: string;
  title: string;
  description: string;
  href?: string;
  index: number;
}

export default function ServiceCard({ iconName = 'Code', title, description, index }: ServiceCardProps) {
  const { openContactModal } = useContactModal();
  const IconComponent = (LucideIcons as any)[iconName] || Code;

  return (
    <SectionReveal staggerIndex={index}>
      <div className={styles.card} data-testid={`service-card-${index}`}>
        <div className={styles.topRow}>
          <div className={styles.iconWrapper}>
            <IconComponent className={styles.icon} size={24} />
          </div>
          <span className={styles.serviceIndex}>0{index + 1}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.cardFooter}>
          <button 
            type="button"
            onClick={() => openContactModal(title)} 
            className={styles.link} 
            aria-label={`Inquire about ${title}`}
          >
            <span>Inquire Service</span>
            <ArrowRight className={styles.arrow} size={15} />
          </button>
        </div>
      </div>
    </SectionReveal>
  );
}
