'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './HeroSection.module.css';

const PART1 = "Small businesses";
const PART2 = "deserve to be";
const PART3 = "seen.";

export default function HeroSection() {
  const { openContactModal } = useContactModal();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const [typedPart1, setTypedPart1] = useState('');
  const [typedPart2, setTypedPart2] = useState('');
  const [typedPart3, setTypedPart3] = useState('');
  const [cursorStage, setCursorStage] = useState<1 | 2 | 3 | 'done'>(1);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (isReducedMotion) {
      setTypedPart1(PART1);
      setTypedPart2(PART2);
      setTypedPart3(PART3);
      setCursorStage('done');
      return;
    }

    let isMounted = true;

    const runTypewriter = async () => {
      // Short initial pause
      await new Promise(r => setTimeout(r, 220));
      if (!isMounted) return;

      // Type Part 1 ("Small businesses")
      for (let i = 1; i <= PART1.length; i++) {
        if (!isMounted) return;
        setTypedPart1(PART1.slice(0, i));
        await new Promise(r => setTimeout(r, 45 + Math.random() * 20));
      }

      // Pause before line 2
      await new Promise(r => setTimeout(r, 180));
      if (!isMounted) return;
      setCursorStage(2);

      // Type Part 2 ("deserve to be")
      for (let i = 1; i <= PART2.length; i++) {
        if (!isMounted) return;
        setTypedPart2(PART2.slice(0, i));
        await new Promise(r => setTimeout(r, 45 + Math.random() * 20));
      }

      // Brief pause before accent word
      await new Promise(r => setTimeout(r, 120));
      if (!isMounted) return;
      setCursorStage(3);

      // Type Part 3 ("seen.")
      for (let i = 1; i <= PART3.length; i++) {
        if (!isMounted) return;
        setTypedPart3(PART3.slice(0, i));
        await new Promise(r => setTimeout(r, 60 + Math.random() * 25));
      }

      if (!isMounted) return;
      setCursorStage('done');
    };

    runTypewriter();

    return () => {
      isMounted = false;
    };
  }, [isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      // Parallax blobs
      const blobs = heroRef.current?.querySelectorAll(`.${styles.blob}`);
      blobs?.forEach((blob, index) => {
        const speed = (index + 1) * 0.25;
        (blob as HTMLElement).style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });

      // 3D Tilt headline
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReducedMotion]);

  return (
    <section id="hero" className={styles.hero} ref={heroRef} data-testid="hero-section">
      {/* SVG Filter for Viscous Liquid / Goo Effect */}
      <svg style={{ display: 'none' }} aria-hidden="true">
        <defs>
          <filter id="viscous-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Viscous Blobs in Blinx Color Pattern */}
      <div className={styles.viscousContainer} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      {/* Suspension Grid Overlay */}
      <div className={styles.suspensionGrid} aria-hidden="true" />

      {/* Main Content */}
      <div className={styles.content}>
        {/* Dynamic Chromatic Headline with Typewriter Effect */}
        <h1 
          className={styles.headline} 
          ref={headlineRef}
          aria-label="Small businesses deserve to be seen."
        >
          <span className={styles.headlineSpan} data-text={typedPart1 || ' '}>
            {typedPart1}
          </span>
          {cursorStage === 1 && (
            <span className={styles.cursor} aria-hidden="true" />
          )}

          {(Boolean(typedPart2) || cursorStage !== 1) && <br />}

          {typedPart2 && (
            <span className={styles.headlineSpan} data-text={typedPart2}>
              {typedPart2}
            </span>
          )}
          {cursorStage === 2 && (
            <span className={styles.cursor} aria-hidden="true" />
          )}

          {typedPart3 && (
            <>
              {' '}
              <span className={`${styles.headlineSpan} ${styles.accentSpan}`} data-text={typedPart3}>
                {typedPart3}
              </span>
            </>
          )}
          {(cursorStage === 3 || cursorStage === 'done') && (
            <span 
              className={`${styles.cursor} ${cursorStage === 'done' ? styles.cursorDone : ''}`} 
              aria-hidden="true" 
            />
          )}
        </h1>

        {/* Subhead */}
        <p className={styles.subhead}>
          We build systems that turn attention into compounding revenue. No vanity metrics, just momentum.
        </p>

        {/* CTA Cluster */}
        <div className={styles.ctaContainer}>
          <button type="button" onClick={() => openContactModal()} className={styles.primaryBtn}>
            <span>Get Free Growth Audit</span>
          </button>
          <Link href="#flywheel" className={styles.secondaryBtn}>
            <span>Explore The Flywheel</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
