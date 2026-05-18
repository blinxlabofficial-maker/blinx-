'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal nav after initial load
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <nav className={isVisible ? 'nav-visible' : ''}>
      <Link href="/" className="nav-logo">
        blin<span className="x">x</span><span className="cursor"></span>
      </Link>
      <ul className="nav-links">
        <li><Link href="/about">About</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/work">Work</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <Link href="/contact" className="nav-cta">Start Your Sprint →</Link>
    </nav>
  );
}