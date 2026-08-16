'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Monitor, 
  Megaphone, 
  TrendingUp, 
  Settings, 
  ArrowRight,
  Globe,
  Film,
  Mic,
  Flame,
  Gamepad2,
  Compass,
  Sparkles
} from 'lucide-react';
import { Wordmark } from '../Wordmark/Wordmark';
import Button from '../Button/Button';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './Navbar.module.css';

const serviceCategories = [
  {
    id: 'build',
    title: '01. Build',
    route: '/build',
    description: 'Custom Web Apps, E-commerce & Sub-Second Architectures',
    icon: Monitor,
    color: 'var(--electric-red)'
  },
  {
    id: 'visibility',
    title: '02. Visibility',
    route: '/visibility',
    description: 'Targeted Local & National SEO, High-ROAS Paid Ads & PR',
    icon: Megaphone,
    color: '#D97706'
  },
  {
    id: 'growth',
    title: '03. Growth',
    route: '/growth',
    description: 'Conversion Optimization, Automated Funnels & Analytics',
    icon: TrendingUp,
    color: 'var(--electric-red)'
  },
  {
    id: 'systemize',
    title: '04. Systemize',
    route: '/systemize',
    description: 'CRM Workflows, ERP Automations & Internal Dashboards',
    icon: Settings,
    color: '#D97706'
  }
];

const workCategories = [
  {
    id: 'websites',
    title: 'Web & AI Platforms',
    route: '/work?type=websites',
    description: 'Custom Next.js apps, AI healthcare tools & 3D experiences',
    icon: Globe,
    badge: '7 PLATFORMS',
    color: 'var(--electric-red)'
  },
  {
    id: 'real-estate',
    title: 'Real Estate Videos',
    route: '/work?category=real-estate',
    description: 'High-ticket property tours & luxury architecture pitches',
    icon: Film,
    badge: 'HIGH-TICKET',
    color: '#FF7A00'
  },
  {
    id: 'commercials',
    title: 'Commercial Ads',
    route: '/work?category=commercials',
    description: 'Flagship product launch ads & kinetic motion typography',
    icon: Megaphone,
    badge: 'BRAND ADS',
    color: '#FFAE00'
  },
  {
    id: 'finance',
    title: 'Finance & Trading',
    route: '/work?category=finance',
    description: 'Live chart animations, prop trading & wealth systems',
    icon: TrendingUp,
    badge: 'AUTHORITY',
    color: '#10B981'
  },
  {
    id: 'podcasts',
    title: 'Podcasts & Clips',
    route: '/work?category=podcasts',
    description: 'Multi-cam shows, dynamic color captions & 16:9 teasers',
    icon: Mic,
    badge: 'LONG-FORM',
    color: '#8B5CF6'
  },
  {
    id: 'short-form',
    title: 'Viral Short-Form',
    route: '/work?category=short-form',
    description: 'First-3s scroll stopping hooks & high-tension storytelling',
    icon: Flame,
    badge: 'RETENTION',
    color: 'var(--electric-red)'
  },
  {
    id: 'gaming',
    title: 'Gaming & Fantasy',
    route: '/work?category=gaming',
    description: 'Kickstarter campaigns, RPG rules & character build guides',
    icon: Gamepad2,
    badge: 'ENTERTAINMENT',
    color: '#3B82F6'
  },
  {
    id: 'travel-vlogs',
    title: 'Travel & Vlogs',
    route: '/work?category=travel-vlogs',
    description: 'Tropical LUT color grading & YouTube retention pacing',
    icon: Compass,
    badge: 'CINEMATIC',
    color: '#EC4899'
  }
];

export function Navbar() {
  const { openContactModal } = useContactModal();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [workDropdown, setWorkDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const workTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      setMobileServicesOpen(false);
      setMobileWorkOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeAll = () => {
    setIsOpen(false);
    setServicesDropdown(false);
    setWorkDropdown(false);
    setMobileServicesOpen(false);
    setMobileWorkOpen(false);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current);
    setWorkDropdown(false);
    setServicesDropdown(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdown(false);
    }, 220);
  };

  const handleWorkMouseEnter = () => {
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current);
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdown(false);
    setWorkDropdown(true);
  };

  const handleWorkMouseLeave = () => {
    workTimeoutRef.current = setTimeout(() => {
      setWorkDropdown(false);
    }, 220);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setServicesDropdown(false);
      setWorkDropdown(false);
      setIsOpen(false);
    }
  };

  return (
    <header 
      className={`${styles.header} ${scrolled || isOpen ? styles.scrolled : ''}`} 
      data-testid="navbar"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.container}>
        {/* Left: Brand Wordmark */}
        <Link href="/" className={styles.logoLink} onClick={closeAll} aria-label="blinx home">
          <Wordmark size="sm" />
        </Link>
        
        {/* Center: Desktop Navigation Capsule */}
        <nav className={styles.nav} aria-label="Main navigation" ref={navRef}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/#why-blinx" className={styles.navLink} onClick={closeAll} ref={firstLinkRef}>
                Why Blinx
              </Link>
            </li>
            
            {/* Services with Mega-Menu */}
            <li 
              className={`${styles.navItem} ${styles.servicesNavItem}`}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button 
                className={`${styles.navLink} ${styles.servicesTrigger} ${servicesDropdown ? styles.active : ''}`}
                onClick={() => setServicesDropdown(!servicesDropdown)}
                aria-expanded={servicesDropdown}
                aria-haspopup="true"
                type="button"
              >
                <span>Services</span>
                <ChevronDown size={14} className={`${styles.chevron} ${servicesDropdown ? styles.chevronOpen : ''}`} />
              </button>

              {/* Mega-Menu Dropdown Panel */}
              <div 
                className={`${styles.megaMenu} ${servicesDropdown ? styles.megaMenuOpen : ''}`}
                role="menu"
                aria-label="Services Submenu"
              >
                <div className={styles.megaGrid}>
                  {serviceCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link 
                        key={cat.id} 
                        href={cat.route} 
                        className={styles.megaCard}
                        onClick={closeAll}
                        role="menuitem"
                      >
                        <div className={styles.megaIconWrapper} style={{ color: cat.color }}>
                          <Icon size={19} />
                        </div>
                        <div className={styles.megaCardContent}>
                          <div className={styles.megaCardHeader}>
                            <span className={styles.megaCardTitle}>{cat.title}</span>
                            <ArrowRight size={14} className={styles.megaCardArrow} />
                          </div>
                          <p className={styles.megaCardDesc}>{cat.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className={styles.megaFooter}>
                  <Link href="/#flywheel" className={styles.megaFooterLink} onClick={closeAll}>
                    <span>Explore The Full Flywheel Engine</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button type="button" className={styles.megaFooterAudit} onClick={() => { closeAll(); openContactModal(); }}>
                    <span>Need a custom recommendation? <strong>Start Project &rarr;</strong></span>
                  </button>
                </div>
              </div>
            </li>

            {/* Our Work with Categories Mega-Menu */}
            <li 
              className={`${styles.navItem} ${styles.servicesNavItem}`}
              onMouseEnter={handleWorkMouseEnter}
              onMouseLeave={handleWorkMouseLeave}
            >
              <button 
                className={`${styles.navLink} ${styles.servicesTrigger} ${workDropdown ? styles.active : ''}`}
                onClick={() => setWorkDropdown(!workDropdown)}
                aria-expanded={workDropdown}
                aria-haspopup="true"
                type="button"
              >
                <span>Our Work</span>
                <ChevronDown size={14} className={`${styles.chevron} ${workDropdown ? styles.chevronOpen : ''}`} />
              </button>

              {/* Work Categories Mega-Menu */}
              <div 
                className={`${styles.megaMenu} ${styles.workMegaMenu} ${workDropdown ? styles.megaMenuOpen : ''}`}
                role="menu"
                aria-label="Work Categories Submenu"
              >
                <div className={styles.workMegaGrid}>
                  {workCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link 
                        key={cat.id} 
                        href={cat.route} 
                        className={styles.megaCard}
                        onClick={closeAll}
                        role="menuitem"
                      >
                        <div className={styles.megaIconWrapper} style={{ color: cat.color }}>
                          <Icon size={18} />
                        </div>
                        <div className={styles.megaCardContent}>
                          <div className={styles.megaCardHeader}>
                            <span className={styles.megaCardTitle}>{cat.title}</span>
                            <span className={styles.workBadge}>{cat.badge}</span>
                          </div>
                          <p className={styles.megaCardDesc}>{cat.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className={styles.megaFooter}>
                  <Link href="/work" className={styles.megaFooterLink} onClick={closeAll}>
                    <span>Explore All 42+ Portfolio Projects (Web &amp; Video)</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button type="button" className={styles.megaFooterAudit} onClick={() => { closeAll(); openContactModal(); }}>
                    <span>Ready to scale? <strong>Start Project &rarr;</strong></span>
                  </button>
                </div>
              </div>
            </li>
            
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink} onClick={closeAll}>
                About
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/support" className={styles.navLink} onClick={closeAll}>
                Support
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Right: Desktop CTA Action */}
        <div className={styles.rightActions}>
          <Button variant="primary" onClick={() => { closeAll(); openContactModal(); }}>
            Start Project
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className={styles.mobileToggle} 
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          type="button"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Drawer */}
        <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}>
          <div className={styles.mobileNavLinks}>
            <Link href="/#why-blinx" className={styles.mobileNavLink} onClick={closeAll}>
              Why Blinx
            </Link>

            {/* Mobile Services Accordion */}
            <div className={styles.mobileAccordion}>
              <button 
                className={styles.mobileAccordionTrigger}
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
                type="button"
              >
                <span>Services</span>
                <ChevronDown size={18} className={`${styles.mobileChevron} ${mobileServicesOpen ? styles.chevronOpen : ''}`} />
              </button>

              <div className={`${styles.mobileSubList} ${mobileServicesOpen ? styles.subListOpen : ''}`}>
                {serviceCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link 
                      key={cat.id} 
                      href={cat.route} 
                      className={styles.mobileSubItem}
                      onClick={closeAll}
                    >
                      <div className={styles.mobileSubIconBox}>
                        <Icon size={16} style={{ color: cat.color }} />
                      </div>
                      <div className={styles.mobileSubText}>
                        <strong>{cat.title}</strong>
                        <small>{cat.description}</small>
                      </div>
                    </Link>
                  );
                })}
                <Link href="/#flywheel" className={styles.mobileAllServices} onClick={closeAll}>
                  Explore The Flywheel Engine &rarr;
                </Link>
              </div>
            </div>

            {/* Mobile Our Work Categories Accordion */}
            <div className={styles.mobileAccordion}>
              <button 
                className={styles.mobileAccordionTrigger}
                onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                aria-expanded={mobileWorkOpen}
                type="button"
              >
                <span>Our Work</span>
                <ChevronDown size={18} className={`${styles.mobileChevron} ${mobileWorkOpen ? styles.chevronOpen : ''}`} />
              </button>

              <div className={`${styles.mobileSubList} ${mobileWorkOpen ? styles.subListOpen : ''}`}>
                {workCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link 
                      key={cat.id} 
                      href={cat.route} 
                      className={styles.mobileSubItem}
                      onClick={closeAll}
                    >
                      <div className={styles.mobileSubIconBox}>
                        <Icon size={16} style={{ color: cat.color }} />
                      </div>
                      <div className={styles.mobileSubText}>
                        <strong>{cat.title}</strong>
                        <small>{cat.description}</small>
                      </div>
                    </Link>
                  );
                })}
                <Link href="/work" className={styles.mobileAllServices} onClick={closeAll}>
                  View Full Portfolio &rarr;
                </Link>
              </div>
            </div>

            <Link href="/about" className={styles.mobileNavLink} onClick={closeAll}>
              About
            </Link>

            <Link href="/support" className={styles.mobileNavLink} onClick={closeAll}>
              Support
            </Link>
          </div>

          <div className={styles.mobileCta}>
            <Button variant="primary" onClick={() => { closeAll(); openContactModal(); }}>
              Start Project
            </Button>
            <p className={styles.mobileDirectEmail}>
              Support: <a href="mailto:support@blinxlabs.com">support@blinxlabs.com</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
