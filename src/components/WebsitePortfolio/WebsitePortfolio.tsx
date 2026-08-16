'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Layers, 
  Sparkles,
  ArrowRight,
  Globe
} from 'lucide-react';
import { 
  websiteProjectsData, 
  websiteCategories, 
  WebsiteProject 
} from '@/data/websitePortfolio';
import styles from './WebsitePortfolio.module.css';

function WebsitePortfolioInner() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Sync category with URL search params
  useEffect(() => {
    const webCat = searchParams.get('webCategory');
    const cat = searchParams.get('category');
    const type = searchParams.get('type');

    if (type === 'websites') {
      const section = document.getElementById('website-showcase');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else if (webCat && websiteCategories.some(c => c.id === webCat)) {
      setActiveCategory(webCat);
      const section = document.getElementById('website-showcase');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else if (cat && websiteCategories.some(c => c.id === cat)) {
      setActiveCategory(cat);
      const section = document.getElementById('website-showcase');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return websiteProjectsData;
    return websiteProjectsData.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div id="website-showcase" className={styles.wrapper} data-testid="website-portfolio">
      {/* Category Navigation Pills */}
      <div className={styles.filterTrack} role="tablist" aria-label="Website Categories">
        {websiteCategories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`${styles.filterPill} ${activeCategory === cat.id ? styles.filterPillActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span>{cat.label}</span>
            <span className={styles.filterCount}>{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Website Cards Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <div key={project.id} className={styles.projectCard}>
            {/* Project Image Preview */}
            <div className={styles.imageContainer}>
              <Image
                src={project.imageSrc}
                alt={`${project.title} screenshot`}
                width={700}
                height={450}
                className={styles.projectImg}
                priority={index < 2}
              />
              <div className={styles.imageOverlay} />

              {/* Status & Live Badge */}
              <div className={styles.imageTopBar}>
                <span className={styles.categoryBadge}>{project.categoryLabel}</span>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.liveSiteBtn}
                  aria-label={`Visit live website for ${project.title}`}
                >
                  <span className={styles.liveDot} />
                  <span>Live Demo</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Project Details */}
            <div className={styles.cardBody}>
              {/* Tech Stack Pills */}
              <div className={styles.techStackRow}>
                {project.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className={styles.techPill}>{tech}</span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>

              {/* Problem / Result Comparison Box */}
              <div className={styles.impactBox}>
                <div className={styles.impactItem}>
                  <div className={styles.impactHeader}>
                    <AlertCircle size={14} className={styles.problemIcon} />
                    <span className={styles.impactLabelProblem}>CHALLENGE</span>
                  </div>
                  <p className={styles.impactText}>{project.problem}</p>
                </div>

                <div className={styles.impactItem}>
                  <div className={styles.impactHeader}>
                    <CheckCircle2 size={14} className={styles.resultIcon} />
                    <span className={styles.impactLabelResult}>OUTCOME</span>
                  </div>
                  <p className={styles.impactText}>{project.result}</p>
                </div>
              </div>

              {/* Metrics Row */}
              <div className={styles.metricsGrid}>
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className={styles.metricCard}>
                    <div className={styles.metricValue}>{m.value}</div>
                    <div className={styles.metricLabel}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Card Footer CTA */}
              <div className={styles.cardFooter}>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.viewSiteLink}
                >
                  <Globe size={15} />
                  <span>Launch Live Platform</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WebsitePortfolio() {
  return (
    <Suspense fallback={<div>Loading Web Portfolio...</div>}>
      <WebsitePortfolioInner />
    </Suspense>
  );
}
