'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SprintProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      dot: '01',
      title: 'Discovery & Audit',
      desc: 'Deep-dive into your brand, competitors, audience, and current digital footprint.',
      delay: 'reveal-delay-1',
    },
    {
      dot: '02',
      title: 'Strategy & KPIs',
      desc: 'Define clear goals, platform priorities, content pillars, and success metrics.',
      delay: 'reveal-delay-2',
    },
    {
      dot: '03',
      title: 'Content & Production',
      desc: 'Build the content calendar, shoot assets, design creatives, write copy.',
      delay: 'reveal-delay-3',
    },
    {
      dot: '04',
      title: 'Execute & Publish',
      desc: 'Launch campaigns, manage community, run ads, and maintain publishing cadence.',
      delay: 'reveal-delay-4',
    },
    {
      dot: '05',
      title: 'Analytics & Report',
      desc: 'Sprint-end performance dashboard with reach, engagement, ROI, and next-sprint plan.',
      delay: 'reveal-delay-4',
    },
  ];

  useEffect(() => {
    if (!containerRef.current || !progressLineRef.current || !stepsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate progress line on scroll (vertical scaleY)
      gsap.to(progressLineRef.current, {
        scaleY: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1.2,
          markers: false,
        },
      });

      // Animate each step dot
      const stepDots = stepsContainerRef.current?.querySelectorAll('.step-dot');
      stepDots?.forEach((dot, index) => {
        gsap.from(dot, {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out',
          scrollTrigger: {
            trigger: dot,
            start: 'top center',
            end: 'center center',
            scrub: 0.5,
            markers: false,
          },
        });

        // Glow effect on scroll
        gsap.to(dot, {
          boxShadow: '0 0 30px rgba(255, 60, 90, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top center',
            end: 'center center',
            scrub: 0.5,
            markers: false,
          },
        });
      });

      // Stagger step content from right
      const stepContents = stepsContainerRef.current?.querySelectorAll('.step-content');
      stepContents?.forEach((content) => {
        gsap.from(content, {
          opacity: 0,
          x: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top center',
            end: 'center center',
            scrub: 0.5,
            markers: false,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="process" ref={containerRef}>
      <div className="section-inner">
        <div className="reveal visible">
          <div className="section-label">How We Work</div>
          <h2>The 30/60/90-day Sprint Model.</h2>
        </div>
        <div className="process-steps" ref={stepsContainerRef}>
          <div className="process-progress-line-bg" ref={progressLineRef}></div>
          <div className="process-progress-line-fg"></div>
          {steps.map((step, index) => (
            <div key={step.dot} className={`process-step reveal visible ${step.delay}`}>
              <div className="step-dot" style={{ '--step-index': index } as React.CSSProperties}>
                {step.dot}
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}