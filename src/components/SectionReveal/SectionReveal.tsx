'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

interface SectionRevealProps {
  children: React.ReactNode;
  staggerIndex?: number;
  staggerDelay?: number;
  duration?: number;
  yOffset?: number;
  rootMargin?: string;
}

export default function SectionReveal({ 
  children, 
  staggerIndex = 0, 
  staggerDelay = 70,
  duration,
  yOffset = 24,
  rootMargin = '0px'
}: SectionRevealProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, rootMargin, triggerOnce: true });
  
  const delay = staggerIndex * staggerDelay;
  
  const customStyles = {
    transitionDelay: `${delay}ms`,
    '--reveal-duration': duration ? `${duration}ms` : undefined,
    '--reveal-y': `${yOffset}px`,
  } as React.CSSProperties;
  
  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'revealed' : ''}`}
      style={customStyles}
    >
      {children}
    </div>
  );
}
