'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, Star, Quote } from 'lucide-react';
import styles from './TestimonialCarousel.module.css';

interface Testimonial {
  quote: string;
  name: string;
  business: string;
  role: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(next, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <div 
      className={styles.carouselContainer} 
      data-testid="testimonial-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="var(--voltage-yellow)" stroke="var(--voltage-yellow)" />
            ))}
          </div>
          <Quote size={28} className={styles.quoteIcon} />
        </div>

        <div key={currentIndex} className={styles.quoteWrapper} aria-live="polite">
          <p className={styles.quote}>&ldquo;{current.quote}&rdquo;</p>
          
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              {current.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <span className={styles.name}>{current.name}</span>
              <span className={styles.role}>{current.role} · {current.business}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.controls}>
        <button className={styles.arrowButton} onClick={prev} aria-label="Previous testimonial">
          <ArrowLeft size={20} />
        </button>
        
        <div className={styles.dots}>
          {testimonials.map((_, idx) => (
            <button 
              key={idx} 
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        
        <button className={styles.arrowButton} onClick={next} aria-label="Next testimonial">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
