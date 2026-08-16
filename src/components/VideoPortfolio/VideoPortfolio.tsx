'use client';

import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Play, 
  Search, 
  X, 
  Flame 
} from 'lucide-react';
import { 
  videoProjectsData, 
  videoPortfolioCategories 
} from '@/data/videoPortfolio';
import ReelViewer from '../ReelViewer/ReelViewer';
import styles from './VideoPortfolio.module.css';

function VideoPortfolioInner() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Sync category with URL search params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && videoPortfolioCategories.some(c => c.id === cat)) {
      setSelectedCategory(cat);
      const section = document.getElementById('video-showcase');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [searchParams]);

  // Filter video projects
  const filteredProjects = useMemo(() => {
    return videoProjectsData.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle video card mouse enter / leave preview on desktop grid
  const handleMouseEnter = (id: string) => {
    setHoveredCardId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id: string) => {
    setHoveredCardId(null);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleCardClick = (projectId: string) => {
    const index = filteredProjects.findIndex(p => p.id === projectId);
    setActiveReelIndex(index >= 0 ? index : 0);
  };

  const activeCategoryObj = videoPortfolioCategories.find(c => c.id === selectedCategory);
  const categoryTitle = activeCategoryObj ? activeCategoryObj.label : undefined;

  return (
    <div id="video-showcase" className={styles.portfolioWrapper} data-testid="video-portfolio">
      {/* Category Filter Pills & Search Controls */}
      <div className={styles.controlsBar}>
        {/* Category Pills */}
        <div className={styles.categoryScrollTrack} role="tablist" aria-label="Video Categories">
          {videoPortfolioCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`${styles.categoryPill} ${selectedCategory === cat.id ? styles.categoryPillActive : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className={styles.categoryCount}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className={styles.searchBox}>
          <Search size={17} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by client, title, tag (e.g. Refen, Ferrari, Trading...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search portfolio videos"
          />
          {searchQuery && (
            <button 
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Results Status Header */}
      <div className={styles.resultsInfoRow}>
        <div className={styles.resultsCount}>
          <span>Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'production projects'}</span>
          {selectedCategory !== 'all' && (
            <span className={styles.activeFilterBadge}>in {videoPortfolioCategories.find(c => c.id === selectedCategory)?.label}</span>
          )}
        </div>

        {searchQuery && (
          <button 
            className={styles.resetFilterBtn}
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Video Cards Showcase Grid */}
      <div className={styles.videoGrid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            const isHovered = hoveredCardId === project.id;
            const isWidescreen = project.aspectRatio === '16:9';

            return (
              <div 
                key={project.id}
                className={`${styles.videoCard} ${isWidescreen ? styles.videoCardWidescreen : ''}`}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
                onClick={() => handleCardClick(project.id)}
                role="button"
                tabIndex={0}
                aria-label={`Play reel: ${project.title} for ${project.client}`}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(project.id)}
              >
                {/* Video Media Container */}
                <div className={`${styles.mediaContainer} ${isWidescreen ? styles.widescreenAspect : styles.verticalAspect}`}>
                  <video
                    ref={(el) => { videoRefs.current[project.id] = el; }}
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={styles.cardVideo}
                  />

                  {/* Glassmorphic Overlay Gradient */}
                  <div className={styles.mediaOverlay} />

                  {/* Top Badges */}
                  <div className={styles.topBadgesRow}>
                    <span className={styles.categoryBadge}>{project.categoryLabel}</span>
                    <span className={styles.aspectBadge}>{project.aspectRatio === '9:16' ? '9:16 REEL' : '16:9 4K'}</span>
                  </div>

                  {/* Center Play Pulse Icon */}
                  <div className={`${styles.playButtonWrapper} ${isHovered ? styles.playHidden : ''}`}>
                    <div className={styles.playButtonCircle}>
                      <Play size={20} fill="#FFFFFF" color="#FFFFFF" className={styles.playIconSvg} />
                    </div>
                  </div>

                  {/* Bottom Metric & Duration Tag */}
                  <div className={styles.bottomMediaInfo}>
                    <div className={styles.metricPill}>
                      <Flame size={14} className={styles.flameIcon} />
                      <span>{project.metric} <strong>{project.metricLabel}</strong></span>
                    </div>
                    <span className={styles.durationTag}>{project.duration}</span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className={styles.cardDetails}>
                  <div className={styles.clientMetaRow}>
                    <span className={styles.clientName}>{project.client}</span>
                    <span className={styles.clickPrompt}>Watch Reel &rarr;</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>

                  {/* Tag Chips */}
                  <div className={styles.tagsRow}>
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className={styles.tagChip}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <p>No video edits found matching &ldquo;{searchQuery}&rdquo;.</p>
            <button 
              className={styles.emptyResetBtn}
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            >
              View All 35 Projects
            </button>
          </div>
        )}
      </div>

      {/* Instagram Reels-Style Fullscreen Vertical Feed */}
      {activeReelIndex !== null && (
        <ReelViewer
          items={filteredProjects}
          initialIndex={activeReelIndex}
          categoryTitle={categoryTitle}
          onClose={() => setActiveReelIndex(null)}
        />
      )}
    </div>
  );
}

export default function VideoPortfolio() {
  return (
    <Suspense fallback={<div className={styles.loadingState}>Loading Video Portfolio...</div>}>
      <VideoPortfolioInner />
    </Suspense>
  );
}
