'use client';

import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Film,
  Eye,
  Flame,
  Sparkle
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import { 
  videoProjectsData, 
  videoPortfolioCategories, 
  VideoProject 
} from '@/data/videoPortfolio';
import styles from './VideoPortfolio.module.css';

function VideoPortfolioInner() {
  const { openContactModal } = useContactModal();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<VideoProject | null>(null);
  const [modalMuted, setModalMuted] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

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

  // Handle video card mouse enter / leave preview
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

  // Modal navigation
  const handleNextProject = () => {
    if (!activeModalProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === activeModalProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setActiveModalProject(filteredProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!activeModalProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === activeModalProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveModalProject(filteredProjects[prevIndex]);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProject(null);
      if (e.key === 'ArrowRight') handleNextProject();
      if (e.key === 'ArrowLeft') handlePrevProject();
    };

    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject, filteredProjects]);

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
                onClick={() => setActiveModalProject(project)}
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${project.title} for ${project.client}`}
                onKeyDown={(e) => e.key === 'Enter' && setActiveModalProject(project)}
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
                    <span className={styles.clickPrompt}>Watch Video &rarr;</span>
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

      {/* Fullscreen Interactive Video Player Modal */}
      {activeModalProject && (
        <div 
          className={styles.modalBackdrop}
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalProject.title}
        >
          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button 
              className={styles.modalCloseBtn}
              onClick={() => setActiveModalProject(null)}
              aria-label="Close video player"
            >
              <X size={20} />
            </button>

            {/* Left/Prev Arrow */}
            <button 
              className={`${styles.navArrow} ${styles.prevArrow}`}
              onClick={handlePrevProject}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right/Next Arrow */}
            <button 
              className={`${styles.navArrow} ${styles.nextArrow}`}
              onClick={handleNextProject}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            <div className={styles.modalGrid}>
              {/* Video Player Column */}
              <div className={styles.modalPlayerColumn}>
                <div className={styles.modalVideoWrapper}>
                  <video
                    ref={modalVideoRef}
                    key={activeModalProject.videoSrc}
                    src={activeModalProject.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    muted={modalMuted}
                    className={styles.modalVideo}
                  />
                </div>
              </div>

              {/* Project Brief & Details Column */}
              <div className={styles.modalDetailsColumn}>
                <div className={styles.modalHeader}>
                  <span className={styles.modalCategoryBadge}>{activeModalProject.categoryLabel}</span>
                  <h3 className={styles.modalTitle}>{activeModalProject.title}</h3>
                  <p className={styles.modalClient}>Client: <strong>{activeModalProject.client}</strong></p>
                </div>

                {/* Metric Spotlight */}
                <div className={styles.modalMetricBox}>
                  <div className={styles.modalMetricValue}>{activeModalProject.metric}</div>
                  <div className={styles.modalMetricLabel}>{activeModalProject.metricLabel}</div>
                </div>

                <div className={styles.modalDescBlock}>
                  <h4 className={styles.modalSectionTitle}>Project Brief &amp; Execution</h4>
                  <p className={styles.modalDescText}>{activeModalProject.description}</p>
                </div>

                <div className={styles.modalTagsBlock}>
                  <h4 className={styles.modalSectionTitle}>Editing Techniques Applied</h4>
                  <div className={styles.modalTagsList}>
                    {activeModalProject.tags.map((tag, idx) => (
                      <span key={idx} className={styles.modalTagChip}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className={styles.modalCtaArea}>
                  <button 
                    type="button"
                    className={styles.modalInquireBtn}
                    onClick={() => {
                      const projTitle = activeModalProject.title;
                      setActiveModalProject(null);
                      openContactModal(projTitle);
                    }}
                  >
                    <span>Inquire Similar Video Edit</span>
                    <ArrowRight size={16} />
                  </button>
                  <p className={styles.modalMicro}>Fast turnaround · 4K Master Delivery · Revisions Included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
