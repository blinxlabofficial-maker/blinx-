import React, { useState } from 'react';
import { 
  Building2, 
  Settings, 
  Calendar, 
  TrendingUp, 
  Play, 
  X,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';
import './CaseStudy.css';

export default function CaseStudy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="work" className="case-study-section" data-testid="case-study-section">
      <div className="container">
        
        {/* Pulsing Badge */}
        <div className="case-badge-wrap text-center">
          <span className="pulse-dot" aria-hidden="true"></span>
          <span className="case-badge label text-yellow" data-testid="case-study-badge">CASE STUDY</span>
        </div>

        {/* Headline */}
        <div className="case-header text-center">
          <h2 className="case-title" data-testid="case-study-title">
            Dominating the Luxury Fitness Space
          </h2>
          <p className="case-subtext" data-testid="case-study-subtext">
            How we architected a high-performance growth engine that delivered a 300% ROI increase in just 90 days. <span className="motto">Social. Sharp. Swift.</span>
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="case-main-grid">
          
          {/* Left Column: Metrics & Specs */}
          <div className="case-meta-col">
            
            {/* KPI Stat Card */}
            <div className="kpi-rotated-card" data-testid="kpi-rotated-card">
              <div className="kpi-badge">+420% Growth</div>
              <p>Shattering previous benchmarks with a completely restructured visibility and conversion framework.</p>
            </div>

            {/* Overview Grid */}
            <div className="overview-cards-grid" data-testid="overview-grid">
              <div className="overview-card">
                <Building2 size={22} className="card-icon" />
                <div>
                  <span className="card-label">INDUSTRY</span>
                  <h4 className="card-val">Luxury Fitness</h4>
                </div>
              </div>

              <div className="overview-card">
                <Settings size={22} className="card-icon" />
                <div>
                  <span className="card-label">SERVICE</span>
                  <h4 className="card-val">Full-Stack Growth</h4>
                </div>
              </div>

              <div className="overview-card">
                <Calendar size={22} className="card-icon" />
                <div>
                  <span className="card-label">DURATION</span>
                  <h4 className="card-val">90 Days</h4>
                </div>
              </div>

              <div className="overview-card">
                <TrendingUp size={22} className="card-icon" />
                <div>
                  <span className="card-label">PRIMARY KPI</span>
                  <h4 className="card-val">ROI & Conversion</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="case-narrative-col">
            <div className="friction-analysis">
              <h3 className="narrative-heading">
                The Friction <span className="highlight-underline">Analysis</span>
              </h3>
              <p className="narrative-p" data-testid="case-friction-text">
                Prior to our intervention, the brand was experiencing stagnant growth despite high advertising spend. Their digital systems were fragmented, creative assets lacked a cohesive sharp edge, and their acquisition cost was spiraling out of control. They did not need another campaign; they needed a systematic overhaul of their entire conversion funnel.
              </p>
            </div>
            
            <div className="friction-analysis">
              <h3 className="narrative-heading">The Flywheel Solution</h3>
              <p className="narrative-p">
                We deployed the Blinx Flywheel. First, we engineered a blazing fast digital infrastructure optimized for high-value membership checkouts. Next, we launched targeted paid media campaigns coupled with custom-shot reels that captured the raw premium feel of the gym floor. Finally, we automated lead capture to eliminate follow-up lag.
              </p>
            </div>
          </div>
        </div>

        {/* Video Testimonial Section */}
        <div className="video-testimonial-box" data-testid="video-testimonial-box">
          <div className="video-row">
            
            {/* Visual Simulator Player */}
            <div className="video-player-container">
              {isPlaying ? (
                <div className="simulated-video">
                  <div className="video-overlay-controls">
                    <button onClick={() => setIsMuted(!isMuted)} className="ctrl-btn">
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button onClick={() => setIsPlaying(false)} className="ctrl-btn">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="playback-visualizer">
                    <span className="visualizer-bar bar-1"></span>
                    <span className="visualizer-bar bar-2"></span>
                    <span className="visualizer-bar bar-3"></span>
                    <span className="visualizer-bar bar-4"></span>
                  </div>
                  <p className="video-playing-txt">CEO Video Testimonial Stream Active...</p>
                </div>
              ) : (
                <div className="video-thumbnail" onClick={() => setIsPlaying(true)}>
                  <div className="play-btn-circle">
                    <Play size={24} className="play-icon" />
                  </div>
                  <span className="video-badge label">CLIENT VOICE</span>
                </div>
              )}
            </div>

            {/* Quote details */}
            <div className="testimonial-text-content">
              <div className="case-badge-wrap">
                <span className="pulse-dot" aria-hidden="true"></span>
                <span className="video-caption label text-yellow">VIDEO TESTIMONIAL</span>
              </div>
              <blockquote className="testimonial-quote">
                "Blinx didn't just give us a campaign; they gave us a <span className="highlight-red">category-defining engine</span>."
              </blockquote>
              <div className="testimonial-attribution">
                <strong>CEO</strong>
                <span>UltraFit Global</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
