'use client';

import { useEffect, useRef } from 'react';

function countUp(el: HTMLElement, target: number) {
  let start = 0;
  const duration = 1400;
  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toString();
    }
  };
  requestAnimationFrame(step);
}

export default function AboutStats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statsData = [
      { id: 'stat1', val: 60 },
      { id: 'stat2', val: 200 },
      { id: 'stat3', val: 3 },
      { id: 'stat4', val: 10 },
    ];

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            statsData.forEach((s) => {
              const el = document.getElementById(s.id);
              if (el) countUp(el, s.val);
            });
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => statsObserver.disconnect();
  }, []);

  return (
    <section className="about" id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="reveal visible">
            <div className="section-label">About Blinx Lab</div>
            <h2>
              Where marketing isn&apos;t just a strategy — it&apos;s an <em>identity</em>.
            </h2>
            <p className="about-body">
              We&apos;re a results-driven social media marketing agency built for brands that refuse
              to blend in. We craft strategies that are precise, electric, and built for the scroll.
              Every post is intentional. Every campaign is built to convert.
            </p>
          </div>
          <div className="about-stats reveal visible reveal-delay-2" ref={statsRef}>
            <div className="stat-card">
              <div className="stat-num">
                <span id="stat1">0</span>
                <span>+</span>
              </div>
              <div className="stat-desc">Brands Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <span id="stat2">0</span>
                <span>+</span>
              </div>
              <div className="stat-desc">Campaigns Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <span id="stat3">0</span>
                <span>x</span>
              </div>
              <div className="stat-desc">Avg Engagement Lift</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <span id="stat4">0</span>
                <span>+</span>
              </div>
              <div className="stat-desc">Platforms Mastered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}