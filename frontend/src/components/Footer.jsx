import React from 'react';
import './Footer.css';
import Logo from './Logo';
import { Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo-wrap" data-testid="footer-logo">
            <Logo variant="light" />
            <p className="footer-tagline" data-testid="footer-tagline">Strategy that gets you seen.</p>
          </div>
          
          <div className="footer-contact" data-testid="footer-contact">
            <a href="mailto:hello@blinxlabs.com" className="footer-email" data-testid="footer-email-link">
              hello@blinxlabs.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright" data-testid="footer-copyright">
            &copy; 2026 Blinx Lab. All rights reserved.
          </p>
          
          <div className="footer-social" data-testid="footer-social">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-testid="footer-instagram-link"
            >
              <Instagram size={20} />
            </a>
          </div>

          <button 
            className="back-to-top" 
            onClick={scrollToTop}
            aria-label="Back to top"
            data-testid="back-to-top-button"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
