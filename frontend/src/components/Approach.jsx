import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Approach.css';

const Approach = () => {
  const scrollToServices = (e) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="approach" className="approach" data-testid="approach-section">
      <div className="approach-inner container">
        <div className="approach-image-wrap reveal" data-testid="approach-image-wrap">
          <img 
            src="/images/approach.jpg" 
            alt="Blinx Lab team collaborating on a strategy session" 
            className="approach-image"
            data-testid="approach-image"
          />
        </div>
        
        <div className="approach-content">
          <span className="approach-label reveal" data-testid="approach-label">OUR APPROACH</span>
          <h2 className="approach-heading reveal reveal-delay-1" data-testid="approach-heading">
            Less guesswork. More growth. That's the lab.
          </h2>
          
          <div className="approach-steps" data-testid="approach-steps">
            <div className="approach-step reveal reveal-delay-2" data-testid="approach-step-1">
              <span className="approach-step-number" data-testid="approach-step-number-1">01</span>
              <div className="approach-step-content" data-testid="approach-step-content-1">
                <h3>Find the signal</h3>
                <p>We cut through noise to understand what your market actually responds to.</p>
              </div>
            </div>
            
            <div className="approach-step reveal reveal-delay-3" data-testid="approach-step-2">
              <span className="approach-step-number" data-testid="approach-step-number-2">02</span>
              <div className="approach-step-content" data-testid="approach-step-content-2">
                <h3>Sharpen the story</h3>
                <p>We shape your brand message so it is clear, memorable, and yours.</p>
              </div>
            </div>
            
            <div className="approach-step reveal reveal-delay-4" data-testid="approach-step-3">
              <span className="approach-step-number" data-testid="approach-step-number-3">03</span>
              <div className="approach-step-content" data-testid="approach-step-content-3">
                <h3>Build the system</h3>
                <p>We create the digital infrastructure — website, content, search — that works while you sleep.</p>
              </div>
            </div>
            
            <div className="approach-step reveal reveal-delay-5" data-testid="approach-step-4">
              <span className="approach-step-number" data-testid="approach-step-number-4">04</span>
              <div className="approach-step-content" data-testid="approach-step-content-4">
                <h3>Move the business forward</h3>
                <p>We measure, iterate, and keep pushing. Growth is not a one-off project.</p>
              </div>
            </div>
          </div>
          
          <div className="approach-cta reveal reveal-delay-6" data-testid="approach-cta-wrap">
            <button 
              className="btn-secondary" 
              onClick={scrollToServices}
              data-testid="approach-cta-button"
            >
              Explore our services <ArrowRight size={18} data-testid="approach-cta-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
