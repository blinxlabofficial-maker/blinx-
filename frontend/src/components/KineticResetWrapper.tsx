"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: React.ReactNode;
  variants: {
    initial: any;
    animated: any;
    reset?: any;
  };
  duration?: number;
  delay?: number;
  resetTimeout?: number; // Time in ms (e.g. 4000 for 4 seconds)
}

export default function KineticResetWrapper({ children, variants, duration = 0.8, delay = 0, resetTimeout = 4000 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });
  const [animationState, setAnimationState] = useState("initial");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isInView) {
      setAnimationState("animated");

      // Smoothly return back to baseline/reset variant after a short timer (3 to 5 sec)
      timer = setTimeout(() => {
        setAnimationState("reset");
      }, resetTimeout);
    } else {
      // Instantly reset when out of view, making it ready to re-animate on scroll
      setAnimationState("initial");
    }

    return () => clearTimeout(timer);
  }, [isInView, resetTimeout]);

  // Fallback to initial variant if custom reset variant is not specified
  const activeVariant = animationState === "reset" ? (variants.reset || variants.initial) : variants[animationState as keyof typeof variants];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={animationState}
      variants={{
        initial: variants.initial,
        animated: variants.animated,
        reset: variants.reset || variants.initial
      }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
