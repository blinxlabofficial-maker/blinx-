'use client';

import React, { useEffect, useRef } from 'react';
import { X, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import ContactForm from '@/components/ContactForm/ContactForm';
import styles from './ContactModal.module.css';

export default function ContactModal() {
  const { isOpen, selectedService, closeContactModal } = useContactModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContactModal();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeContactModal]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modalBackdrop}
      onClick={closeContactModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      data-testid="contact-modal"
    >
      <div 
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {/* Close Button */}
        <button 
          className={styles.closeBtn}
          onClick={closeContactModal}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Compact Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeLabel}>GET IN TOUCH</span>
          </div>

          <h2 id="contact-modal-title" className={styles.modalTitle}>
            Let&apos;s build together.
          </h2>

          <p className={styles.modalSubtitle}>
            Leave your details and our senior desk will reach out within 24 hours.
          </p>
        </div>

        {/* Compact Form Area */}
        <div className={styles.modalFormWrapper}>
          <ContactForm 
            initialService={selectedService} 
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
}
