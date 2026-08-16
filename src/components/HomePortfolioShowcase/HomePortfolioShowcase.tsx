'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Play, 
  ExternalLink, 
  ArrowRight, 
  Flame, 
  Sparkles 
} from 'lucide-react';
import SectionReveal from '../SectionReveal/SectionReveal';
import ReelViewer, { ReelItem } from '../ReelViewer/ReelViewer';
import styles from './HomePortfolioShowcase.module.css';

interface FeaturedItem {
  id: string;
  type: 'website' | 'video';
  title: string;
  client: string;
  categoryLabel: string;
  mediaSrc: string;
  liveUrl?: string;
  metric: string;
  metricLabel: string;
  description: string;
  techOrTags: string[];
  duration?: string;
  aspectRatio?: '9:16' | '16:9';
}

const featuredItems: FeaturedItem[] = [
  // 1. Web: Viramah
  {
    id: 'home-web-1',
    type: 'website',
    title: 'Viramah — Wellness Community Platform',
    client: 'Viramah Stay',
    categoryLabel: 'Live Web Platform',
    mediaSrc: '/images/projects/viramah.png',
    liveUrl: 'https://viramahstay.com/',
    metric: '+140%',
    metricLabel: 'Booking Growth',
    description: 'A modern community platform designed to help individuals improve lifestyle through wellness events and retreats.',
    techOrTags: ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB']
  },
  // 2. Video: Oppo F33 Pro
  {
    id: 'home-vid-1',
    type: 'video',
    title: 'Oppo F33 Pro Flagship Launch Ad',
    client: 'Oppo Electronics',
    categoryLabel: 'Commercial Ad',
    mediaSrc: '/videos/commercials/oppo-f33-pro-commercial.mp4',
    metric: '2.4M+',
    metricLabel: 'Campaign Impressions',
    description: 'Commercial tech product reveal featuring explosive sound design, 3D screen tracking, and high-velocity camera moves.',
    techOrTags: ['Commercial', 'After Effects', '3D Tracking'],
    duration: '0:55',
    aspectRatio: '9:16'
  },
  // 3. Web: NeuroScan AI
  {
    id: 'home-web-2',
    type: 'website',
    title: 'NeuroScan AI — Brain MRI Diagnostic System',
    client: 'NeuroScan Health',
    categoryLabel: 'AI & Healthcare',
    mediaSrc: '/images/projects/neuroscan-ai.png',
    liveUrl: 'https://neuro-scan-ai.vercel.app/',
    metric: '98.4%',
    metricLabel: 'Model Accuracy',
    description: 'An AI healthcare platform analyzing brain MRI scans with deep learning neural networks connecting patients with neurologists.',
    techOrTags: ['Python', 'TensorFlow', 'React.js', 'MongoDB']
  },
  // 4. Video: Refen Luxury Real Estate
  {
    id: 'home-vid-2',
    type: 'video',
    title: 'Luxury Property Investment Showcase',
    client: 'Refen Real Estate',
    categoryLabel: 'Real Estate Video',
    mediaSrc: '/videos/real-estate/invest-with-refen.mp4',
    metric: '4.8x',
    metricLabel: 'Inquiry Rate',
    description: 'High-ticket architectural tour with dynamic speed ramps, typography tracking, and high-net-worth investor hook.',
    techOrTags: ['Real Estate', 'Luxury Tours', 'Speed Ramps'],
    duration: '0:48',
    aspectRatio: '9:16'
  },
  // 5. Web: Happy Homes Marketplace
  {
    id: 'home-web-3',
    type: 'website',
    title: 'Happy Homes — Interior Design Marketplace',
    client: 'Happy Homes',
    categoryLabel: 'Live Marketplace',
    mediaSrc: '/images/projects/happyhomes.png',
    liveUrl: 'https://happyhomes-bolt.vercel.app/',
    metric: '3.4x',
    metricLabel: 'Client Inquiries',
    description: 'A digital marketplace connecting homeowners with verified interior designers and skilled home renovation professionals.',
    techOrTags: ['Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB']
  },
  // 6. Video: Alpha Capital Group
  {
    id: 'home-vid-3',
    type: 'video',
    title: 'Institutional Capital Market Breakdown',
    client: 'Alpha Capital Group',
    categoryLabel: 'Finance & Trading',
    mediaSrc: '/videos/finance/alpha-capital-group.mp4',
    metric: '+340%',
    metricLabel: 'Subscriber Velocity',
    description: 'Engaging financial breakdown with live trading chart animations, green-screen keying, and high-retention captioning.',
    techOrTags: ['Prop Trading', 'Chart Animation', 'Retention Captions'],
    duration: '0:45',
    aspectRatio: '9:16'
  }
];

export default function HomePortfolioShowcase() {
  const [filterType, setFilterType] = useState<'all' | 'website' | 'video'>('all');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const filteredItems = featuredItems.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const featuredVideoReels: ReelItem[] = useMemo(() => {
    return featuredItems
      .filter((item) => item.type === 'video')
      .map((item) => ({
        id: item.id,
        title: item.title,
        client: item.client,
        categoryLabel: item.categoryLabel,
        videoSrc: item.mediaSrc,
        aspectRatio: item.aspectRatio || '9:16',
        duration: item.duration,
        metric: item.metric,
        metricLabel: item.metricLabel,
        tags: item.techOrTags
      }));
  }, []);

  const handleMouseEnter = (id: string, type: string) => {
    setHoveredCardId(id);
    if (type === 'video') {
      const video = videoRefs.current[id];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = (id: string, type: string) => {
    setHoveredCardId(null);
    if (type === 'video') {
      const video = videoRefs.current[id];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleVideoClick = (id: string) => {
    const idx = featuredVideoReels.findIndex((r) => r.id === id);
    setActiveReelIndex(idx >= 0 ? idx : 0);
  };

  return (
    <section className={`${styles.section} ${styles.darkBg}`} data-testid="home-portfolio">
      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <SectionReveal>
            <span className={styles.categoryTagLight}>PROVEN CASE STUDIES &amp; PRODUCTIONS</span>
            <h2 className={styles.sectionTitle}>Featured Work &amp; Systems</h2>
            <p className={styles.sectionSub}>
              From live full-stack web platforms to viral high-retention video campaigns engineered for compounding growth.
            </p>
          </SectionReveal>

          {/* Quick Filter Switcher */}
          <SectionReveal>
            <div className={styles.filterPillsTrack}>
              <button
                className={`${styles.filterBtn} ${filterType === 'all' ? styles.filterBtnActive : ''}`}
                onClick={() => setFilterType('all')}
              >
                All Highlights (6)
              </button>
              <button
                className={`${styles.filterBtn} ${filterType === 'website' ? styles.filterBtnActive : ''}`}
                onClick={() => setFilterType('website')}
              >
                Live Web Apps (3)
              </button>
              <button
                className={`${styles.filterBtn} ${filterType === 'video' ? styles.filterBtnActive : ''}`}
                onClick={() => setFilterType('video')}
              >
                Video Edits (3)
              </button>
            </div>
          </SectionReveal>
        </div>

        {/* 6-Item Responsive Showcase Grid */}
        <div className={styles.grid}>
          {filteredItems.map((item, idx) => {
            const isVideo = item.type === 'video';
            const isHovered = hoveredCardId === item.id;

            return (
              <SectionReveal key={item.id} staggerIndex={idx % 3}>
                <div 
                  className={styles.card}
                  onMouseEnter={() => handleMouseEnter(item.id, item.type)}
                  onMouseLeave={() => handleMouseLeave(item.id, item.type)}
                  onClick={() => isVideo && handleVideoClick(item.id)}
                  role={isVideo ? 'button' : undefined}
                  tabIndex={isVideo ? 0 : undefined}
                  onKeyDown={isVideo ? (e) => e.key === 'Enter' && handleVideoClick(item.id) : undefined}
                >
                  {/* Media Frame */}
                  <div className={styles.mediaFrame}>
                    {isVideo ? (
                      <>
                        <video
                          ref={(el) => { videoRefs.current[item.id] = el; }}
                          src={item.mediaSrc}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className={styles.videoElement}
                        />
                        {/* Play Icon */}
                        <div className={`${styles.playWrapper} ${isHovered ? styles.playHidden : ''}`}>
                          <div className={styles.playBtn}>
                            <Play size={18} fill="#FFFFFF" color="#FFFFFF" className={styles.playIconSvg} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.mediaSrc}
                        alt={`${item.title} screenshot`}
                        width={600}
                        height={380}
                        className={styles.imageElement}
                      />
                    )}

                    <div className={styles.mediaOverlay} />

                    {/* Top Badges */}
                    <div className={styles.mediaTopBar}>
                      <span className={styles.typeBadge}>{item.categoryLabel}</span>
                      {isVideo ? (
                        <span className={styles.aspectBadge}>{item.duration}</span>
                      ) : (
                        <a 
                          href={item.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.liveBadgeLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className={styles.liveDot} />
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    {/* Bottom Metric Bar */}
                    <div className={styles.mediaBottomBar}>
                      <div className={styles.metricPill}>
                        <Flame size={13} className={styles.flameIcon} />
                        <span>{item.metric} <strong>{item.metricLabel}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className={styles.cardBody}>
                    <div className={styles.clientRow}>
                      <span className={styles.clientName}>{item.client}</span>
                      <span className={styles.actionHint}>
                        {isVideo ? 'Watch Reel →' : 'View Platform →'}
                      </span>
                    </div>

                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDesc}>{item.description}</p>

                    {/* Tech / Tag Badges */}
                    <div className={styles.tagsRow}>
                      {item.techOrTags.map((tag, tIdx) => (
                        <span key={tIdx} className={styles.tagChip}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom Navigation CTA */}
        <SectionReveal>
          <div className={styles.bottomCtaRow}>
            <div className={styles.bottomCtaLeft}>
              <div className={styles.ctaSparkle}>
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className={styles.ctaHeading}>Looking for a specific industry or service?</h4>
                <p className={styles.ctaText}>Explore our complete catalog of 7 live web platforms and 35+ video editing projects.</p>
              </div>
            </div>
            <Link href="/work" className={styles.exploreAllBtn}>
              <span>Explore All 42+ Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </SectionReveal>
      </div>

      {/* Instagram Reels-Style Video Feed Modal */}
      {activeReelIndex !== null && (
        <ReelViewer
          items={featuredVideoReels}
          initialIndex={activeReelIndex}
          categoryTitle="Featured Productions"
          onClose={() => setActiveReelIndex(null)}
        />
      )}
    </section>
  );
}
