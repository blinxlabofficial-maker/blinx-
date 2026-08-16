'use client';

import React from 'react';
import styles from './Wordmark.module.css';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Wordmark({ size = 'md', className = '' }: WordmarkProps) {
  return (
    <div className={`${styles.wordmark} ${styles[size]} ${className}`} data-testid="wordmark" aria-label="blinx_">
      <span className={styles.blin}>blin</span>
      <span className={styles.x}>x</span>
      <span className={styles.underscore} aria-hidden="true" />
    </div>
  );
}

export default Wordmark;
