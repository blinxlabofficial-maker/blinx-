'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const TRAIL_COUNT = 7;

// Config for each dot in the trail (size, base opacity, lerp speed, brand color)
const DOT_CONFIGS = [
  { size: 9, opacity: 1, lerp: 0.55, bg: 'var(--electric-red)' },       // Lead dot
  { size: 7.5, opacity: 0.85, lerp: 0.38, bg: 'var(--electric-red)' }, // Dot 1
  { size: 6.5, opacity: 0.7, lerp: 0.30, bg: 'var(--electric-red)' },  // Dot 2
  { size: 5.5, opacity: 0.55, lerp: 0.24, bg: '#FF7A00' },             // Dot 3 (Amber transition)
  { size: 4.5, opacity: 0.42, lerp: 0.19, bg: '#FFAE00' },             // Dot 4
  { size: 3.5, opacity: 0.30, lerp: 0.15, bg: 'var(--voltage-yellow)' },// Dot 5
  { size: 2.5, opacity: 0.20, lerp: 0.12, bg: 'var(--voltage-yellow)' },// Dot 6 (Tail)
];

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPositions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Strictly activate ONLY on desktop devices with a fine pointer (mouse/trackpad)
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
      const isMobileWidth = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(hasFinePointer && !isMobileWidth && !prefersReducedMotion);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Interactive target detection via event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-interactive], [data-interactive="true"], summary'
      );
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 60-120fps Animation Loop with direct DOM updates (Zero React re-render overhead)
    const renderLoop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = dotsRef.current[i];
        if (!dot) continue;

        const config = DOT_CONFIGS[i];
        const prevPos = i === 0 ? { x: targetX, y: targetY } : dotPositions.current[i - 1];
        const currentPos = dotPositions.current[i];

        // Smooth physics lerp
        currentPos.x += (prevPos.x - currentPos.x) * config.lerp;
        currentPos.y += (prevPos.y - currentPos.y) * config.lerp;

        const offsetX = currentPos.x - config.size / 2;
        const offsetY = currentPos.y - config.size / 2;

        dot.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div 
      className={`${styles.cursorWrapper} ${isVisible ? styles.visible : ''}`} 
      aria-hidden="true"
    >
      {DOT_CONFIGS.map((config, index) => {
        const isLead = index === 0;
        return (
          <div
            key={index}
            ref={(el) => { dotsRef.current[index] = el; }}
            className={`
              ${styles.dot} 
              ${isLead ? styles.leadDot : styles.trailDot}
              ${isLead && isHovered ? styles.leadHover : ''}
              ${isLead && isClicking ? styles.leadClick : ''}
              {!isLead && isHovered ? styles.trailHover : ''}
            `}
            style={{
              width: `${config.size}px`,
              height: `${config.size}px`,
              opacity: isHovered && !isLead ? config.opacity * 0.9 : config.opacity,
              backgroundColor: isHovered ? (isLead ? undefined : 'var(--voltage-yellow)') : config.bg,
            }}
          />
        );
      })}
    </div>
  );
}
