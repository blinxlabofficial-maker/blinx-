'use client';
import { useEffect, useState, useRef } from 'react';
import { useInView } from './useInView';

export function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();
  const started = useRef(false);

  useEffect(() => {
    if (isInView && !started.current) {
      started.current = true;
      let startTime: number;
      
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        if (progress < duration) {
          const percentage = Math.min(progress / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - percentage, 3);
          setCount(Math.floor(easeProgress * target));
          requestAnimationFrame(animateCount);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, target, duration]);

  return { ref, count };
}
