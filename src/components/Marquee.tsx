'use client';

export default function Marquee() {
  const items = [
    { text: 'SOCIAL MEDIA', color: 'yellow' },
    { text: 'REEL SHOOTS', color: 'red' },
    { text: 'INFLUENCER MARKETING', color: 'yellow' },
    { text: 'VIDEO EDITING', color: 'red' },
    { text: 'SEO MANAGEMENT', color: 'yellow' },
    { text: 'PRODUCT SHOOTS', color: 'red' },
    { text: 'BRAND STRATEGY', color: 'yellow' },
    { text: 'PAID ADS', color: 'red' },
    { text: 'AIO CONTENT', color: 'yellow' },
    { text: 'WEBSITE DEVELOPMENT', color: 'red' },
  ];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className={`marquee-item ${item.color}`}>
            {item.text}
            <span className="marquee-dot"></span>
          </span>
        ))}
      </div>
    </div>
  );
}