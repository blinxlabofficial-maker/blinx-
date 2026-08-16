'use client';
import { useEffect, useState, useRef } from 'react';

export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options?: UseInViewOptions) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options || {};
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          observer.unobserve(currentRef);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    }, { threshold, rootMargin });

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Use as an any for the element ref
  return [ref as any, isInView] as const;
}
