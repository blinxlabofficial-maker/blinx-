'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Flame, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './ReelViewer.module.css';

export interface ReelItem {
  id: string;
  title: string;
  client: string;
  categoryLabel?: string;
  videoSrc: string;
  aspectRatio?: '9:16' | '16:9';
  duration?: string;
  metric?: string;
  metricLabel?: string;
  tags?: string[];
}

interface ReelViewerProps {
  items: ReelItem[];
  initialIndex?: number;
  categoryTitle?: string;
  onClose: () => void;
}

export default function ReelViewer({
  items,
  initialIndex = 0,
  categoryTitle,
  onClose
}: ReelViewerProps) {
  const { openContactModal } = useContactModal();
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPlayStateAnimation, setShowPlayStateAnimation] = useState<'play' | 'pause' | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Scroll to initial index on mount
  useEffect(() => {
    if (containerRef.current && itemRefs.current[initialIndex]) {
      const t = setTimeout(() => {
        itemRefs.current[initialIndex]?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [initialIndex]);

  // ScrollToIndex helper
  const scrollToIndex = useCallback((index: number) => {
    const target = itemRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Handle active video play/pause
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.muted = isMuted;
        if (isPlaying) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // If unmuted autoplay fails, fallback to muted
              video.muted = true;
              setIsMuted(true);
              video.play().catch(() => {});
            });
          }
        } else {
          video.pause();
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, isPlaying, isMuted]);

  // IntersectionObserver to detect which reel is in focus
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-reel-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
              setIsPlaying(true);
              setProgress(0);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.65
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'j') {
        e.preventDefault();
        if (activeIndex < items.length) {
          scrollToIndex(activeIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'k') {
        e.preventDefault();
        if (activeIndex > 0) {
          scrollToIndex(activeIndex - 1);
        }
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items.length, scrollToIndex, onClose, isPlaying]);

  // Toggle play/pause
  const togglePlayPause = () => {
    const newPlaying = !isPlaying;
    setIsPlaying(newPlaying);
    setShowPlayStateAnimation(newPlaying ? 'play' : 'pause');

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
      setShowPlayStateAnimation(null);
    }, 600);
  };

  // Toggle mute
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  // Live video time update for progress bar
  const handleTimeUpdate = (index: number) => {
    if (index !== activeIndex) return;
    const video = videoRefs.current[index];
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  // On video end, optionally auto-scroll to next reel if available
  const handleVideoEnded = (index: number) => {
    if (index === activeIndex && activeIndex < items.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const isAtEnd = activeIndex >= items.length;

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Reels Video Viewer"
    >
      {/* Top Header Bar */}
      <header className={styles.topBar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBarLeft}>
          <span className={styles.brandPill}>BLINX REELS</span>
          {categoryTitle && (
            <span className={styles.categoryTitlePill}>{categoryTitle}</span>
          )}
          <span className={styles.reelCounter}>
            {activeIndex < items.length ? `${activeIndex + 1} / ${items.length}` : 'Section Complete'}
          </span>
        </div>

        <button 
          className={styles.closeBtn} 
          onClick={onClose} 
          aria-label="Close reels viewer"
          type="button"
        >
          <X size={20} />
        </button>
      </header>

      {/* Main Reels Center Column */}
      <div 
        className={styles.reelsCenterStage} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Snapping Vertical Scroll Container */}
        <div 
          className={styles.reelsContainer} 
          ref={containerRef}
          tabIndex={0}
          aria-label="Vertical reel video feed"
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const isWidescreen = item.aspectRatio === '16:9';

            return (
              <div 
                key={item.id} 
                className={styles.reelSlide}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-reel-index={index}
              >
                <div 
                  className={`${styles.videoCardWrapper} ${isWidescreen ? styles.widescreenCard : ''}`}
                  onClick={togglePlayPause}
                  role="button"
                  tabIndex={0}
                  aria-label={isPlaying ? "Pause reel video" : "Play reel video"}
                  data-cursor-interactive="true"
                >
                  {/* Video Media Element */}
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={item.videoSrc}
                    playsInline
                    loop
                    preload={Math.abs(index - activeIndex) <= 1 ? 'auto' : 'metadata'}
                    muted={isMuted}
                    onTimeUpdate={() => handleTimeUpdate(index)}
                    onEnded={() => handleVideoEnded(index)}
                    className={styles.videoPlayer}
                  />

                  {/* Gradient Scrim Overlays */}
                  <div className={styles.topScrim} />
                  <div className={styles.bottomScrim} />

                  {/* Play / Pause Pop-up Indicator */}
                  {isActive && showPlayStateAnimation && (
                    <div className={styles.popIconWrapper}>
                      <div className={styles.popIconBubble}>
                        {showPlayStateAnimation === 'play' ? (
                          <Play size={36} fill="#FFFFFF" color="#FFFFFF" />
                        ) : (
                          <Pause size={36} fill="#FFFFFF" color="#FFFFFF" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Minimalist Bottom-Left Meta Overlay (No Details Bloat) */}
                  <div className={styles.reelBottomMeta} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.clientTagRow}>
                      <span className={styles.clientName}>{item.client}</span>
                      {item.categoryLabel && (
                        <span className={styles.categoryBadge}>{item.categoryLabel}</span>
                      )}
                    </div>

                    <h3 className={styles.reelTitle}>{item.title}</h3>

                    {item.metric && (
                      <div className={styles.metricTag}>
                        <Flame size={13} className={styles.flameIcon} />
                        <span>{item.metric} {item.metricLabel}</span>
                      </div>
                    )}
                  </div>

                  {/* Live Progress Scrubber Bar */}
                  {isActive && (
                    <div className={styles.progressBarTrack}>
                      <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* End of Section Slide */}
          <div 
            className={styles.reelSlide}
            ref={(el) => { itemRefs.current[items.length] = el; }}
            data-reel-index={items.length}
          >
            <div className={styles.endOfSectionCard}>
              <div className={styles.endIconWrapper}>
                <Sparkles size={32} className={styles.sparkleIcon} />
              </div>
              <span className={styles.endTag}>END OF SECTION</span>
              <h3 className={styles.endTitle}>
                You&apos;ve watched all {items.length} videos in {categoryTitle || 'this playlist'}
              </h3>
              <p className={styles.endSubtext}>
                Ready to produce high-retention video assets for your business?
              </p>

              <div className={styles.endActions}>
                <button 
                  type="button" 
                  className={styles.endReplayBtn}
                  onClick={() => scrollToIndex(0)}
                >
                  <RotateCcw size={16} />
                  <span>Replay from Start</span>
                </button>

                <button 
                  type="button" 
                  className={styles.endInquireBtn}
                  onClick={() => {
                    onClose();
                    openContactModal();
                  }}
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Right Side Action Column */}
        <aside className={styles.rightFloatingActions} onClick={(e) => e.stopPropagation()}>
          {/* Scroll Up Button */}
          <button 
            type="button"
            className={`${styles.actionCircleBtn} ${activeIndex === 0 ? styles.btnDisabled : ''}`}
            onClick={() => activeIndex > 0 && scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous reel"
            title="Previous reel (Up Arrow)"
          >
            <ChevronUp size={22} />
          </button>

          {/* Sound / Mute Toggle Button */}
          <button 
            type="button"
            className={`${styles.actionCircleBtn} ${!isMuted ? styles.soundActiveBtn : ''}`}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            <span className={styles.actionTooltip}>{isMuted ? 'Muted' : 'Sound ON'}</span>
          </button>

          {/* Play / Pause Toggle Button */}
          <button 
            type="button"
            className={styles.actionCircleBtn}
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
          </button>

          {/* Scroll Down Button */}
          <button 
            type="button"
            className={`${styles.actionCircleBtn} ${isAtEnd ? styles.btnDisabled : ''}`}
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={isAtEnd}
            aria-label="Next reel"
            title="Next reel (Down Arrow)"
          >
            <ChevronDown size={22} />
          </button>
        </aside>
      </div>
    </div>
  );
}
