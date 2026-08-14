import React from 'react';
import { Crosshair, Palette, TrendingUp } from 'lucide-react';
import { useScrollRevealMultiple } from '../hooks/useScrollReveal';
import './ImpactStrip.css';

const ImpactStrip = () => {
  useScrollRevealMultiple();

  return (
    <section className="impact-strip" data-testid="impact-strip-section">
      <div className="impact-strip-inner container">
        <div className="impact-item reveal" data-testid="impact-item-1">
          <Crosshair size={24} className="impact-icon" data-testid="impact-icon-1" />
          <span className="impact-text" data-testid="impact-text-1">Strategy before noise</span>
        </div>
        <div className="impact-item reveal reveal-delay-1" data-testid="impact-item-2">
          <Palette size={24} className="impact-icon" data-testid="impact-icon-2" />
          <span className="impact-text" data-testid="impact-text-2">Creative built to convert</span>
        </div>
        <div className="impact-item reveal reveal-delay-2" data-testid="impact-item-3">
          <TrendingUp size={24} className="impact-icon" data-testid="impact-icon-3" />
          <span className="impact-text" data-testid="impact-text-3">Momentum for your next chapter</span>
        </div>
      </div>
    </section>
  );
};

export default ImpactStrip;
