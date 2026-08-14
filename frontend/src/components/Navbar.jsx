import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from './Logo';

const Navbar = ({ onConfigureStage, isServicePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (sectionId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleServiceClick = (stageId) => {
    setIsMobileMenuOpen(false);
    if (onConfigureStage) {
      onConfigureStage(stageId);
    }
  };

  const isOnDark = isServicePage && !isScrolled;

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOnDark ? 'on-dark' : ''}`} data-testid="navbar">
      <div className="container navbar-inner">
        <div className="navbar-logo" onClick={(e) => scrollToSection(e, '#')} data-testid="navbar-logo-link" style={{cursor: 'pointer'}}>
          <Logo variant={isOnDark ? 'light' : 'dark'} />
        </div>

        <nav className="nav-desktop" data-testid="nav-desktop">
          <ul className="nav-links">
            <li>
              <a href="#why-blinx" className="nav-link" onClick={(e) => scrollToSection(e, '#why-blinx')} data-testid="nav-link-why-blinx">
                Why Blinx
              </a>
            </li>
            <li>
              <a href="#approach" className="nav-link" onClick={(e) => scrollToSection(e, '#approach')} data-testid="nav-link-approach">
                Our Approach
              </a>
            </li>
            <li>
              <a href="#flywheel" className="nav-link" onClick={(e) => scrollToSection(e, '#flywheel')} data-testid="nav-link-flywheel">
                The System
              </a>
            </li>
            
            {/* Services Dropdown */}
            <li className="nav-item-dropdown">
              <span className="nav-link dropdown-trigger">
                Services Plan
              </span>
              <ul className="dropdown-menu">
                <li>
                  <button onClick={() => handleServiceClick('build')} data-testid="nav-service-build">
                    01. Build Infrastructure
                  </button>
                </li>
                <li>
                  <button onClick={() => handleServiceClick('visibility')} data-testid="nav-service-visibility">
                    02. Visibility Engine
                  </button>
                </li>
                <li>
                  <button onClick={() => handleServiceClick('growth')} data-testid="nav-service-growth">
                    03. Growth Authority
                  </button>
                </li>
                <li>
                  <button onClick={() => handleServiceClick('systemize')} data-testid="nav-service-systemize">
                    04. Systemize Operations
                  </button>
                </li>
                <li>
                  <button onClick={() => handleServiceClick('scale')} data-testid="nav-service-scale">
                    05. Fractional CMO Scale
                  </button>
                </li>
              </ul>
            </li>

            <li>
              <a href="#work" className="nav-link" onClick={(e) => scrollToSection(e, '#work')} data-testid="nav-link-work">
                Case Study
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, '#contact')} data-testid="nav-link-contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <button 
          className="btn-primary nav-cta" 
          onClick={(e) => scrollToSection(e, '#strategy-call')}
          data-testid="nav-cta-button"
        >
          Strategy Call
        </button>

        <button 
          className={`nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          data-testid="nav-hamburger-button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} data-testid="mobile-menu">
        <ul className="mobile-nav-links">
          <li>
            <a href="#why-blinx" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#why-blinx')} data-testid="mobile-link-why-blinx">
              Why Blinx
            </a>
          </li>
          <li>
            <a href="#approach" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#approach')} data-testid="mobile-link-approach">
              Our Approach
            </a>
          </li>
          <li>
            <a href="#flywheel" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#flywheel')} data-testid="mobile-link-flywheel">
              The System
            </a>
          </li>
          
          {/* Mobile sub-links for services */}
          <li className="mobile-subheader">Custom Service Plans</li>
          <li>
            <button className="mobile-sublink" onClick={() => handleServiceClick('build')} data-testid="mobile-service-build">
              ➔ 01. Build Infrastructure
            </button>
          </li>
          <li>
            <button className="mobile-sublink" onClick={() => handleServiceClick('visibility')} data-testid="mobile-service-visibility">
              ➔ 02. Visibility Engine
            </button>
          </li>
          <li>
            <button className="mobile-sublink" onClick={() => handleServiceClick('growth')} data-testid="mobile-service-growth">
              ➔ 03. Growth Authority
            </button>
          </li>
          <li>
            <button className="mobile-sublink" onClick={() => handleServiceClick('systemize')} data-testid="mobile-service-systemize">
              ➔ 04. Systemize Operations
            </button>
          </li>
          <li>
            <button className="mobile-sublink" onClick={() => handleServiceClick('scale')} data-testid="mobile-service-scale">
              ➔ 05. Fractional CMO Scale
            </button>
          </li>

          <li>
            <a href="#work" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#work')} data-testid="mobile-link-work">
              Case Study
            </a>
          </li>
          <li>
            <a href="#contact" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#contact')} data-testid="mobile-link-contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
