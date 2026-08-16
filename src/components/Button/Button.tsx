'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: LucideIcon;
  isLoading?: boolean;
  isSuccess?: boolean;
  isContactModal?: boolean;
  serviceCategory?: string;
  'data-testid'?: string;
}

export default function Button({
  variant = 'primary',
  children,
  href,
  onClick,
  type = 'button',
  icon: Icon = ArrowRight,
  isLoading = false,
  isSuccess = false,
  isContactModal = false,
  serviceCategory,
  'data-testid': testId = 'button'
}: ButtonProps) {
  const { openContactModal } = useContactModal();
  const className = `${styles.button} ${styles[variant]} ${isLoading ? styles.loading : ''} ${isSuccess ? styles.success : ''}`;
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isContactModal) {
      e.preventDefault();
      openContactModal(serviceCategory);
    }
    if (onClick) onClick();
  };

  const content = (
    <>
      <span className={styles.text}>{isSuccess ? '' : children}</span>
      {isLoading && (
        <span className={styles.loadingDot}></span>
      )}
      {isSuccess && (
        <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
      {!isLoading && !isSuccess && Icon && <Icon className={styles.icon} size={20} />}
    </>
  );

  if (href && !isContactModal) {
    return (
      <Link href={href} className={className} data-testid={testId} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      className={className} 
      data-testid={testId} 
      onClick={handleClick} 
      aria-label={isSuccess ? "Sent successfully" : undefined}
    >
      {content}
    </button>
  );
}
