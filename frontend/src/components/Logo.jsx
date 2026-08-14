import './Logo.css';

export default function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light';

  return (
    <a
      href="#top"
      className={`logo ${className}`}
      data-testid="logo"
      aria-label="Blinx Lab — Back to top"
    >
      <span className="logo-wordmark">
        <span className={`logo-blin ${isLight ? 'logo-text-light' : 'logo-text-dark'}`}>
          blin
        </span>
        <span className="logo-x">x</span>
        <span className="logo-underscore" aria-hidden="true"></span>
      </span>
      <span className="logo-lab">LAB</span>
    </a>
  );
}
