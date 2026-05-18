'use client';

export default function Footer() {
  return (
    <footer>
      <div className="section-inner">
        <div className="footer-grid">
          <div>
            <a href="#" className="footer-logo">
              blin<span className="x">x</span>
              <span className="footer-cursor"></span>
            </a>
            <p className="footer-brand-desc">
              A results-driven social media marketing agency built for brands that refuse to blend in. Social
              · Sharp · Swift.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li>
                <a href="#">Social Media Marketing</a>
              </li>
              <li>
                <a href="#">Influencer Marketing</a>
              </li>
              <li>
                <a href="#">Reel & Product Shoots</a>
              </li>
              <li>
                <a href="#">Website Development</a>
              </li>
              <li>
                <a href="#">SEO & AIO</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Our Work</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Blinx Lab · All rights reserved</span>
          <div className="footer-social">
            <a href="#">IG</a>
            <a href="#">LI</a>
            <a href="#">YT</a>
            <a href="#">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}