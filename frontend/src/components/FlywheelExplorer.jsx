import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Smartphone, 
  Cloud, 
  Share2, 
  Video, 
  MousePointerClick, 
  Search, 
  Cpu, 
  MapPin, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Sliders,
  CheckCircle,
  Database,
  LineChart
} from 'lucide-react';
import './FlywheelExplorer.css';

const STAGES = [
  {
    id: 'build',
    name: 'Build',
    badge: 'STAGE 01 — INFRASTRUCTURE',
    headline: 'Your business needs more than a website. It needs infrastructure.',
    subtext: 'We build the digital foundation your business scales on — engineered for high performance, conversion speed, and stability.',
    content: (
      <div className="stage-content-grid">
        <div className="stage-left">
          <span className="content-badge">DIGITAL PRESENCE</span>
          <h3>Websites that perform.</h3>
          <p>
            We don't just build brochures. We engineer high-performance, conversion-optimized platforms designed to capture attention and drive action. Flawless rendering, modern frontend stacks, and absolute reliability.
          </p>
          <ul className="feature-list">
            <li><CheckCircle size={16} className="text-red" /> Custom UI/UX Design</li>
            <li><CheckCircle size={16} className="text-red" /> React & Next.js Architecture</li>
            <li><CheckCircle size={16} className="text-red" /> Headless CMS Integration</li>
            <li><CheckCircle size={16} className="text-red" /> Obsessive Performance Optimization</li>
          </ul>
        </div>
        <div className="stage-right">
          <div className="mockup-container dark-card">
            <div className="mockup-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="mockup-body">
              <div className="mockup-nav">
                <span className="mockup-logo">blinx_</span>
                <span className="mockup-btn">Start</span>
              </div>
              <div className="mockup-hero">
                <div className="stroke-text">BUILD</div>
                <p>High-performance web applications built for speed & conversions.</p>
                <div className="mockup-chart">
                  <div className="bar" style={{height: '40%'}}></div>
                  <div className="bar" style={{height: '60%'}}></div>
                  <div className="bar" style={{height: '95%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stage-row-reverse">
          <div className="stage-left">
            <span className="content-badge red-badge">PRODUCT ENGINEERING</span>
            <h3>Applications that scale.</h3>
            <p>
              Mobile and web applications built for complexity and growth. We turn complex requirements into intuitive, high-energy user experiences with optimized databases and secure APIs.
            </p>
            <div className="feature-grid">
              <div className="f-card">
                <Smartphone size={24} className="text-yellow" />
                <h4>Native & Cross-Platform</h4>
                <p>iOS and Android applications designed for native performance.</p>
              </div>
              <div className="f-card">
                <Cloud size={24} className="text-yellow" />
                <h4>SaaS Platforms</h4>
                <p>Scalable cloud infrastructure for subscription-based products.</p>
              </div>
            </div>
          </div>
          <div className="stage-right">
            <div className="mockup-phone">
              <div className="phone-screen">
                <div className="phone-notch"></div>
                <div className="phone-content">
                  <div className="stat-value text-red">+340%</div>
                  <div className="stat-label">Acquisition Rate</div>
                  <div className="phone-lines">
                    <span className="line"></span>
                    <span className="line short"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'visibility',
    name: 'Visibility',
    badge: 'STAGE 02 — VISIBILITY',
    headline: "Being good isn't enough if nobody sees you.",
    subtext: 'We make your business impossible to overlook. From content that stops the scroll to ads that drive action. We engineer attention.',
    content: (
      <div className="stage-content-grid">
        <div className="stage-left">
          <h3>Social Media <span className="stroke-text">Dominance</span></h3>
          <p>
            Strategic narrative and aggressive community growth. We don't just post; we build cult-like followings across all major platforms.
          </p>
          <div className="platform-badges">
            <span className="p-badge">Instagram</span>
            <span className="p-badge">TikTok</span>
            <span className="p-badge">LinkedIn</span>
            <span className="p-badge">Threads</span>
          </div>
          
          <div className="creative-arsenal">
            <span className="content-badge">CREATIVE ARSENAL</span>
            <div className="arsenal-grid">
              <div className="a-card">
                <Video size={20} className="text-red" />
                <h5>Video</h5>
                <p>Reel shoots, product videography & professional edits.</p>
              </div>
              <div className="a-card">
                <Share2 size={20} className="text-red" />
                <h5>Motion</h5>
                <p>Kinetic typography & scroll-stopping visuals.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stage-right">
          <div className="paid-media-box">
            <div className="paid-badge">PAID MEDIA ARSENAL</div>
            <h4>Targeted Attention</h4>
            <p>Meta & Google Ads executed with ruthless precision to drive predictable customer acquisition and scale budget efficiency.</p>
            
            <div className="metric-grid-2x2">
              <div className="m-card">
                <span className="m-val text-yellow">3.4x</span>
                <span className="m-lbl">Avg ROAS</span>
              </div>
              <div className="m-card">
                <span className="m-val text-red">-40%</span>
                <span className="m-lbl">CPA Reduction</span>
              </div>
              <div className="m-card span-2">
                <span className="m-val">$2M+</span>
                <span className="m-lbl">Ad Spend Managed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'growth',
    name: 'Growth',
    badge: 'STAGE 03 — GROWTH STAGE',
    headline: 'Attention is useless without discoverability.',
    subtext: 'We don\'t just chase clicks. We engineer demand. Through aggressive SEO, forward-thinking AEO, and local search dominance, we put you where buyers search.',
    content: (
      <div className="stage-content-grid">
        <div className="stage-left">
          <span className="content-badge">AI & SEARCH DYNAMICS</span>
          <h3>The New Search Landscape</h3>
          <p>
            Traditional search is changing. We optimize your brand not just for standard search indexes, but for the Answer Engines powering conversational searches today.
          </p>
          
          <div className="aeo-feature-card">
            <span className="badge-yellow">FORWARD-THINKING</span>
            <h4>Answer Engine Optimisation (AEO)</h4>
            <p>
              Positioning your brand as the definitive answer for AI models (ChatGPT, Gemini, SGE). We structure your data and content authority so you are cited by the engines of tomorrow.
            </p>
          </div>
        </div>

        <div className="stage-right">
          <div className="search-bento">
            <div className="bento-cell">
              <Search size={24} className="text-red" />
              <h4>Technical SEO</h4>
              <p>Blazing fast load speeds, clean schemas, and clean indexability.</p>
            </div>
            <div className="bento-cell highlight-yellow">
              <MapPin size={24} className="text-black" />
              <h4>Own Your Neighborhood</h4>
              <p>Google Maps pack optimization, reviews strategy, and localized keywords to dominate locally.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'systemize',
    name: 'Systemize',
    badge: 'STAGE 04 — SYSTEMIZE STAGE',
    headline: 'Stop running your business from WhatsApp, Excel, and memory.',
    subtext: 'Turn messy manual processes into automated digital pipelines. We build custom dashboards, CRMs, and system integrations that put you in complete control.',
    content: (
      <div className="stage-content-grid">
        <div className="stage-left">
          <h3>Centralised Business Ecosystems</h3>
          <p>
            Disjointed software creates data leaks and operator stress. We connect your customer acquisition, project management, and sales communications into a single integrated hub.
          </p>
          
          <div className="comparison-flow">
            <div className="flow-card muted">
              <h5>Messy Operations</h5>
              <p>Spreadsheets, chats, and manual copy-pasting.</p>
            </div>
            <div className="flow-arrow">➔</div>
            <div className="flow-card active">
              <h5>The Blinx System</h5>
              <p>Automated CRM triggers, real-time metrics, and notifications.</p>
            </div>
          </div>
        </div>

        <div className="stage-right">
          <div className="bento-cell dark">
            <Sliders size={24} className="text-yellow" />
            <h4>Custom KPI Dashboards</h4>
            <p>Real-time business intelligence visualizations tailored to your specific metrics, showing revenue velocity, active campaigns, and conversion rates.</p>
            <div className="mini-chart">
              <div className="line-rep"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'scale',
    name: 'Scale',
    badge: 'STAGE 05 — MARKET DOMINANCE',
    headline: 'Once the foundation is right, growth becomes repeatable.',
    subtext: 'The final phase of the Blinx flywheel. Predictable revenue, operational freedom, and category leadership.',
    content: (
      <div className="scale-stage-wrapper">
        <h3 className="section-sub">The Complete Flywheel Journey</h3>
        <p className="section-desc">How we move ambicious brands from startup to category leaders.</p>
        
        <div className="journey-stepper">
          <div className="journey-step">
            <span className="step-num">01</span>
            <h4>Idea</h4>
            <p>The vision and initial concept validation.</p>
          </div>
          <div className="journey-step">
            <span className="step-num">02</span>
            <h4>Foundation</h4>
            <p>Web infrastructure built for conversion.</p>
          </div>
          <div className="journey-step">
            <span className="step-num">03</span>
            <h4>Visibility</h4>
            <p>Social attention and paid media scaling.</p>
          </div>
          <div className="journey-step">
            <span className="step-num">04</span>
            <h4>Customers</h4>
            <p>Consistent acquisition engines active.</p>
          </div>
          <div className="journey-step">
            <span className="step-num">05</span>
            <h4>Systems</h4>
            <p>Automating operations and integrations.</p>
          </div>
          <div className="journey-step active">
            <span className="step-num">06</span>
            <h4>Scale</h4>
            <p>Exponential and predictable market dominance.</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function FlywheelExplorer({ onConfigureStage }) {
  const [activeTab, setActiveTab] = useState('build');

  const currentStage = STAGES.find(s => s.id === activeTab);

  return (
    <section id="flywheel" className="flywheel-section" data-testid="flywheel-section">
      <div className="container">
        <div className="flywheel-header text-center">
          <span className="flywheel-label" data-testid="flywheel-label">THE SYSTEM</span>
          <h2 className="flywheel-title" data-testid="flywheel-title">The Digital Growth Flywheel</h2>
          <p className="flywheel-desc">
            We don't do ad-hoc marketing. We build interconnected growth engines. Click through the stages below to explore our core blueprint.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flywheel-tabs" data-testid="flywheel-tabs" role="tablist">
          {STAGES.map((stage) => (
            <button
              key={stage.id}
              role="tab"
              aria-selected={activeTab === stage.id}
              aria-controls={`panel-${stage.id}`}
              id={`tab-${stage.id}`}
              className={`flywheel-tab-btn ${activeTab === stage.id ? 'active' : ''}`}
              onClick={() => setActiveTab(stage.id)}
              data-testid={`flywheel-tab-${stage.id}`}
            >
              <span className="tab-num">0{STAGES.indexOf(stage) + 1}</span>
              <span className="tab-name">{stage.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div 
          className="flywheel-panel" 
          id={`panel-${activeTab}`} 
          role="tabpanel" 
          aria-labelledby={`tab-${activeTab}`}
          data-testid="flywheel-panel"
          key={activeTab} // Resets state/animation on tab switch
        >
          <div className="panel-badge label text-yellow">{currentStage.badge}</div>
          <h3 className="panel-headline">{currentStage.headline}</h3>
          <p className="panel-subtext">{currentStage.subtext}</p>
          
          {onConfigureStage && (
            <button 
              className="btn-primary" 
              style={{ marginBottom: '2rem', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
              onClick={() => onConfigureStage(currentStage.id)}
              data-testid={`configure-stage-btn-${currentStage.id}`}
            >
              Customize {currentStage.name} Plan
              <ArrowRight size={16} />
            </button>
          )}
          
          <div className="panel-custom-content">
            {currentStage.content}
          </div>
        </div>
      </div>
    </section>
  );
}
