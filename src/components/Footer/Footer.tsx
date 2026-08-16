import React from 'react';
import Link from 'next/link';
import { Wordmark } from '../Wordmark/Wordmark';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.col1}>
            <Wordmark size="lg" />
            <p className={styles.tagline}>
              Engineering exceptional digital experiences that perform.
            </p>
            <div className={styles.socials}>
              {/* Social placeholders with accessible SVGs */}
              <a href="#" className={styles.socialLink} aria-label="Follow us on X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Follow us on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.21a1.64 1.64 0 0 0-1.64 1.64c0 .9.74 1.64 1.64 1.64.9 0 1.63-.74 1.63-1.64 0-.9-.73-1.64-1.63-1.64z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Follow us on GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.col2}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.list}>
              <li><Link href="/" className={styles.link}>Home</Link></li>
              <li><Link href="/work" className={styles.link}>Our Work</Link></li>
              <li><Link href="/about" className={styles.link}>About</Link></li>
              <li><Link href="/support" className={styles.link}>Support</Link></li>
            </ul>
          </div>
          
          <div className={styles.col3}>
            <h4 className={styles.heading}>Services</h4>
            <ul className={styles.list}>
              <li><Link href="/build" className={styles.link}>Build</Link></li>
              <li><Link href="/visibility" className={styles.link}>Visibility</Link></li>
              <li><Link href="/growth" className={styles.link}>Growth</Link></li>
              <li><Link href="/systemize" className={styles.link}>Systemize</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Blinx Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
