import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Shop: [
    { label: 'All Fragrances', to: '/shop' },
    { label: 'Forest Dew', to: '/products/forest-dew' },
    { label: 'Rose Veil', to: '/products/rose-veil' },
    { label: 'Citrus Bloom', to: '/products/citrus-bloom' },
    { label: 'Ocean Mist', to: '/products/ocean-mist' },
    { label: 'Lavender Haze', to: '/products/lavender-haze' },
    { label: 'Golden Oud', to: '/products/golden-oud' },
  ],
  Discover: [
    { label: 'Our Story', to: '/about' },
    { label: 'Ingredients', to: '/about#ingredients' },
    { label: 'Sustainability', to: '/about#sustainability' },
  ],
  Support: [
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
  ],
};

export default function Footer() {
  const wordmarkRef = useRef(null);

  useEffect(() => {
    if (!wordmarkRef.current) return;

    gsap.fromTo(
      wordmarkRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: wordmarkRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  return (
    <footer className="bg-verdara-charcoal border-t border-verdara-gold/10 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-3xl tracking-[0.2em] text-verdara-cream mb-4 block">
              VERDARA
            </Link>
            <p className="text-verdara-cream/50 text-sm leading-relaxed font-body font-300 mb-6 max-w-xs">
              Premium organic fragrances inspired by botanicals, essential oils, and the living world around us.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-verdara-cream/40 hover:text-verdara-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-verdara-cream/40 hover:text-verdara-gold transition-colors duration-300"
                aria-label="Pinterest"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.43 7.63 11.19-.1-.95-.2-2.41.04-3.45.22-.93 1.48-6.27 1.48-6.27s-.38-.76-.38-1.88c0-1.76 1.02-3.07 2.29-3.07 1.08 0 1.6.81 1.6 1.78 0 1.09-.69 2.71-1.05 4.21-.3 1.26.63 2.28 1.87 2.28 2.24 0 3.75-2.88 3.75-6.28 0-2.59-1.75-4.4-4.25-4.4-2.9 0-4.6 2.18-4.6 4.43 0 .88.34 1.82.76 2.33.08.1.09.19.07.29-.08.32-.25 1-.28 1.14-.04.18-.14.22-.32.13-1.25-.58-2.03-2.42-2.03-3.9 0-3.16 2.3-6.07 6.63-6.07 3.48 0 6.19 2.48 6.19 5.8 0 3.46-2.18 6.25-5.2 6.25-1.02 0-1.97-.53-2.3-1.15l-.62 2.33c-.23.87-.84 1.96-1.25 2.62.94.29 1.93.45 2.96.45 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="section-label text-verdara-gold mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-verdara-cream/50 hover:text-verdara-cream text-sm font-body font-300 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Horizontal Rule */}
        <div className="vr-rule mb-8" />

        {/* Large Wordmark */}
        <div
          ref={wordmarkRef}
          className="overflow-hidden mb-8 opacity-0"
          aria-hidden="true"
        >
          <p
            className="font-display text-[clamp(4rem,12vw,14rem)] text-verdara-cream/[0.04] leading-none tracking-wider select-none"
          >
            VERDARA
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-verdara-cream/30 text-xs font-body font-300 tracking-wider">
            © {new Date().getFullYear()} VERDARA ORGANIC PERFUMES. ALL RIGHTS RESERVED.
          </p>
          <p className="text-verdara-cream/20 text-xs font-body font-300 tracking-wider">
            PURE BOTANICAL ESSENCE
          </p>
        </div>
      </div>
    </footer>
  );
}
