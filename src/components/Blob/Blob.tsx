'use client';

import React, { useEffect, useState } from 'react';
import styles from './Blob.module.css';

interface BlobProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'center';
  variant?: 'primary' | 'dark';
  opacity?: number;
  mouseTrack?: boolean;
}

export default function Blob({ 
  position = 'center', 
  variant = 'primary',
  opacity,
  mouseTrack = false 
}: BlobProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!mouseTrack || isReducedMotion) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate offset based on mouse position relative to center of screen
      // Max offset is ~15px
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      targetX = x;
      targetY = y;
    };

    const animate = () => {
      // ease towards target
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      
      setOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseTrack, isReducedMotion]);

  const customStyle: React.CSSProperties = {};
  if (opacity !== undefined) {
    customStyle.opacity = opacity;
  }
  
  if (mouseTrack && (offset.x !== 0 || offset.y !== 0) && !isReducedMotion) {
    customStyle.transform = `translate(${offset.x}px, ${offset.y}px)`;
  }

  return (
    <div 
      className={`${styles.blob} ${styles[position]} ${styles[variant]} ${mouseTrack && !isReducedMotion ? styles.tracking : ''}`}
      style={customStyle}
      aria-hidden="true"
    />
  );
}
