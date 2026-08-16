'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './FloatingContactButton.module.css';

export default function FloatingContactButton() {
  const { openContactModal } = useContactModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after slight delay on initial page load for smooth entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`${styles.floatingWrapper} ${isVisible ? styles.visible : ''}`}
      data-testid="floating-contact-btn"
    >
      <button 
        type="button"
        onClick={() => openContactModal()}
        className={styles.contactBtn}
        aria-label="Open project inquiry popup modal"
      >
        <span className={styles.btnGlow} aria-hidden="true" />
        
        <div className={styles.iconBox}>
          <MessageSquare size={17} className={styles.msgIcon} />
          <span className={styles.onlineDot} />
        </div>

        <div className={styles.labelGroup}>
          <span className={styles.btnTag}>LET&apos;S TALK</span>
          <span className={styles.btnText}>Start Project</span>
        </div>

        <div className={styles.arrowBox}>
          <ArrowRight size={14} className={styles.arrowIcon} />
        </div>
      </button>
    </div>
  );
}
