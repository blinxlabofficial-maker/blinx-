'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

export default function CountUp({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 1200 
}: { 
  value: number, 
  suffix?: string, 
  prefix?: string,
  duration?: number 
}) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }
    
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo for decelerating effect
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [inView, value, duration]);
  
  return <span ref={ref} data-testid="count-up">{prefix}{count}{suffix}</span>;
}
