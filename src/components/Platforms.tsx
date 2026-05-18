'use client';

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaXTwitter,
  FaThreads,
  FaPinterest,
  FaSnapchat,
  FaWhatsapp,
  FaTelegram,
} from 'react-icons/fa6';

export default function Platforms() {
  const platforms = [
    { name: 'Instagram', Icon: FaInstagram, color: '#E4405F', bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Facebook', Icon: FaFacebook, color: '#1877F2', bgGradient: 'linear-gradient(135deg, #1877F2 0%, #0A66C2 100%)' },
    { name: 'YouTube', Icon: FaYoutube, color: '#FF0000', bgGradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)' },
    { name: 'LinkedIn', Icon: FaLinkedin, color: '#0A66C2', bgGradient: 'linear-gradient(135deg, #0A66C2 0%, #00549B 100%)' },
    { name: 'X', Icon: FaXTwitter, color: '#000000', bgGradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)' },
    { name: 'Threads', Icon: FaThreads, color: '#000000', bgGradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)' },
    { name: 'Pinterest', Icon: FaPinterest, color: '#E60023', bgGradient: 'linear-gradient(135deg, #E60023 0%, #AD081B 100%)' },
    { name: 'Snapchat', Icon: FaSnapchat, color: '#FFFC00', bgGradient: 'linear-gradient(135deg, #FFFC00 0%, #FFE500 100%)' },
    { name: 'WhatsApp', Icon: FaWhatsapp, color: '#25D366', bgGradient: 'linear-gradient(135deg, #25D366 0%, #1FAE56 100%)' },
    { name: 'Telegram', Icon: FaTelegram, color: '#0088cc', bgGradient: 'linear-gradient(135deg, #0088cc 0%, #0077B5 100%)' },
  ];

  return (
    <section className="platforms">
      <div className="section-inner">
        <h3>Platforms we work on</h3>
        <div className="platform-marquee-wrap">
          <div className="platform-marquee-track">
            {[...platforms, ...platforms].map((platform, idx) => (
              <div key={idx} className="platform-logo" style={{ borderColor: platform.color }}>
                <platform.Icon className="platform-logo-icon" style={{ color: platform.color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}