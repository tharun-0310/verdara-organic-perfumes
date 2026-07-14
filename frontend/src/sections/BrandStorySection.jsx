import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStorySection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current.querySelectorAll('.reveal-line'),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );

      // Body text
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 85%',
          },
        }
      );

      // Decorative line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-verdara-charcoal overflow-hidden"
    >
      {/* Botanical SVG decoration */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 400 600" className="w-full h-full" fill="none">
          <path d="M200 50 C 150 150, 50 200, 100 350 S 300 400, 200 550" stroke="#c9a84c" strokeWidth="1" />
          <circle cx="100" cy="200" r="30" stroke="#c9a84c" strokeWidth="0.5" />
          <circle cx="280" cy="320" r="20" stroke="#c9a84c" strokeWidth="0.5" />
          <ellipse cx="200" cy="450" rx="40" ry="25" stroke="#c9a84c" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div ref={lineRef} className="flex items-center gap-6 mb-16" style={{ transformOrigin: 'left center' }}>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-verdara-gold/40 to-transparent" />
          <p className="section-label text-verdara-gold">Brand Story</p>
        </div>

        {/* Main heading */}
        <div ref={headingRef} className="overflow-hidden mb-12">
          <h2 className="font-display text-[clamp(3rem,8vw,9rem)] text-verdara-cream leading-[0.95]">
            <span className="block overflow-hidden">
              <span className="reveal-line block opacity-0">Nature,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="reveal-line block opacity-0 italic text-verdara-gold">Distilled.</span>
            </span>
          </h2>
        </div>

        {/* Body text */}
        <div ref={bodyRef} className="max-w-xl ml-auto opacity-0">
          <p className="text-verdara-cream/70 font-body font-300 text-lg leading-relaxed mb-6">
            Every Verdara fragrance begins with botanicals — essential oils, flowers, woods, and natural extracts selected from the world's most extraordinary growing regions.
          </p>
          <p className="text-verdara-cream/50 font-body font-300 leading-relaxed">
            We believe in transparency, in small batches, and in fragrances that honour the raw materials they come from. Nothing synthetic. Nothing unnecessary. Only the essence of nature, in a bottle.
          </p>
        </div>
      </div>
    </section>
  );
}
