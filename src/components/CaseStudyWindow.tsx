'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  tag: string;
  platforms: string[];
  platformIcons: React.ElementType[];
  client: string;
  desc: string;
  metricValue: number;
  metricSuffix: string;
  label: string;
  isLarge?: boolean;
  image?: string;
}

export default function CaseStudyWindow() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const counterRefsRef = useRef<(HTMLElement | null)[]>([]);

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      tag: 'Instagram · Reels',
      platforms: ['Instagram'],
      platformIcons: [FaInstagram],
      client: 'D2C Fashion Brand',
      desc: 'Built a full content strategy from scratch — reels, carousels, influencer collabs. Grew from 2K to 28K followers in one sprint.',
      metricValue: 3.2,
      metricSuffix: 'x',
      label: 'Engagement lift in 60 days',
      isLarge: true,
      image: '/Untitled_design_frames/parallax animation    (1).jpg',
    },
    {
      id: '2',
      tag: 'Meta Ads · LinkedIn',
      platforms: ['Meta', 'LinkedIn'],
      platformIcons: [FaFacebook, FaLinkedin],
      client: 'SaaS Startup',
      desc: 'Demand gen campaign across Meta and LinkedIn. Reduced CAC by 40% while doubling qualified leads.',
      metricValue: 40,
      metricSuffix: '%',
      label: 'Reduction in CAC',
      image: '/Untitled_design_frames/parallax animation    (2).jpg',
    },
    {
      id: '3',
      tag: 'YouTube · Reels',
      platforms: ['YouTube'],
      platformIcons: [FaYoutube],
      client: 'F&B Brand',
      desc: 'Product-led short-form content with strong hooks. 12 reels in 30 days, averaging 180K views each.',
      metricValue: 180,
      metricSuffix: 'K',
      label: 'Avg views per reel',
      image: '/Untitled_design_frames/parallax animation    (3).jpg',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Animate each metric counter on scroll
      counterRefsRef.current.forEach((counterEl) => {
        if (!counterEl) return;

        const valueSpan = counterEl.querySelector('.metric-value') as HTMLElement;
        if (!valueSpan) return;

        const metricValue = parseFloat(valueSpan.getAttribute('data-value') || '0');

        gsap.from(valueSpan, {
          textContent: '0',
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counterEl,
            start: 'top 80%',
            end: 'top 20%',
            scrub: false,
            markers: false,
          },
          onUpdate() {
            const current = gsap.getProperty(valueSpan, 'textContent');
            valueSpan.textContent = parseFloat(current as string).toFixed(metricValue % 1 !== 0 ? 1 : 0);
          },
        });

        // Glow pulse animation on metric
        const metricEl = counterEl.querySelector('.work-metric');
        if (metricEl) {
          gsap.to(metricEl, {
            duration: 2,
            repeat: -1,
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: counterEl,
              start: 'top 80%',
              end: 'bottom 20%',
            },
            onUpdate() {
              const progress = gsap.getProperty(metricEl, 'progress') as number;
              const pulse = Math.sin(progress * Math.PI) * 0.3;
              const glowStrength = 0.3 + pulse;
              (metricEl as HTMLElement).style.textShadow = `0 0 ${20 + pulse * 20}px rgba(255, 60, 90, ${glowStrength})`;
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work" id="work" ref={containerRef}>
      <div className="section-inner">
        <div className="work-head reveal visible">
          <div>
            <div className="section-label">Case Studies</div>
            <h2>Results that speak for themselves.</h2>
          </div>
          <a href="#contact" className="btn-ghost">
            See All Work →
          </a>
        </div>
        <div className="work-grid" ref={gridRef}>
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`work-card ${study.isLarge ? 'work-card-large' : ''} reveal visible ${index > 0 ? `reveal-delay-${index}` : ''}`}
              ref={(el) => {
                counterRefsRef.current[index] = el;
              }}
            >
              <div>
                <div className="work-tag">{study.tag}</div>
                <div className="work-client">{study.client}</div>
                <p className="work-desc">{study.desc}</p>
                <div className="work-metric-container">
                  <div className="work-metric">
                    <span className="metric-value" data-value={study.metricValue}>
                      0
                    </span>
                    {study.metricSuffix}
                  </div>
                  <div className="platform-badges">
                    {study.platformIcons.map((Icon, idx) => (
                      <div key={idx} className="platform-badge" title={study.platforms[idx]}>
                        <Icon />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="work-metric-label">{study.label}</div>
              </div>
              {study.isLarge && study.image && (
                <div className="work-visual">
                  <img src={study.image} alt={study.client} className="work-image" />
                </div>
              )}
              {!study.isLarge && study.image && (
                <div className="work-image-overlay">
                  <img src={study.image} alt={study.client} className="work-image-small" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}