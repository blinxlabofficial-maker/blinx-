import React from 'react';
import { Monitor, Share2, MapPin, ArrowRight } from 'lucide-react';
import './Services.css';

const Services = () => {
  return (
    <section id="services" className="services" data-testid="services-section">
      <div className="services-inner container">
        <div className="services-header">
          <div className="services-label reveal" data-testid="services-label">WHAT WE DO</div>
          <h2 className="services-heading reveal reveal-delay-1" data-testid="services-heading">Services</h2>
        </div>
        
        <div className="services-list" data-testid="services-list">
          <div 
            className="service-row reveal reveal-delay-2" 
            onClick={() => window.location.hash = '#/service/build'}
            data-testid="service-row-1"
          >
            <span className="service-number" data-testid="service-number-1">01</span>
            <Monitor className="service-icon" data-testid="service-icon-1" />
            <div className="service-content" data-testid="service-content-1">
              <h3 className="service-title">Websites that work</h3>
              <p className="service-desc">Clear, fast websites that turn attention into action.</p>
            </div>
            <ArrowRight className="service-arrow" data-testid="service-arrow-1" />
          </div>
          
          <div 
            className="service-row reveal reveal-delay-3" 
            onClick={() => window.location.hash = '#/service/visibility'}
            data-testid="service-row-2"
          >
            <span className="service-number" data-testid="service-number-2">02</span>
            <Share2 className="service-icon" data-testid="service-icon-2" />
            <div className="service-content" data-testid="service-content-2">
              <h3 className="service-title">Social with purpose</h3>
              <p className="service-desc">Content systems that make expertise visible and memorable.</p>
            </div>
            <ArrowRight className="service-arrow" data-testid="service-arrow-2" />
          </div>
          
          <div 
            className="service-row reveal reveal-delay-4" 
            onClick={() => window.location.hash = '#/service/growth'}
            data-testid="service-row-3"
          >
            <span className="service-number" data-testid="service-number-3">03</span>
            <MapPin className="service-icon" data-testid="service-icon-3" />
            <div className="service-content" data-testid="service-content-3">
              <h3 className="service-title">Found where it matters</h3>
              <p className="service-desc">Local SEO, maps, and digital foundations that put businesses in front of the right people.</p>
            </div>
            <ArrowRight className="service-arrow" data-testid="service-arrow-3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
