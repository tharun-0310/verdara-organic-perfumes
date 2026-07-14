import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import fragrances from '../data/fragrances';

gsap.registerPlugin(ScrollTrigger);

const featured = fragrances[5]; // Golden Oud

export default function FeaturedStorySection() {
  const sectionRef = useRef(null);
  const noteRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      noteRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${featured.envColor2}, ${featured.envColor1})`,
      }}
    >
      {/* Background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <p
          className="font-display leading-none select-none"
          style={{
            fontSize: 'clamp(8rem,20vw,20rem)',
            color: featured.accentColor,
            opacity: 0.04,
          }}
        >
          OUD
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Bottle + notes */}
          <div className="relative flex items-center justify-center" style={{ minHeight: '500px' }}>
            {/* Procedural bottle placeholder */}
            <div className="relative" aria-label={`${featured.name} bottle`}>
              <div
                className="animate-float"
                style={{
                  width: '120px',
                  height: '200px',
                  position: 'relative',
                }}
              >
                {/* Cap */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-8 rounded-t-sm"
                  style={{ background: featured.capColor }} />
                {/* Neck */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10"
                  style={{ background: featured.glassTint, opacity: 0.8 }} />
                {/* Body */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-36 rounded overflow-hidden"
                  style={{ background: featured.glassTint, opacity: 0.85, boxShadow: `0 0 60px ${featured.glowColor}60` }}>
                  <div className="absolute bottom-0 left-0 right-0 h-3/4" style={{ background: featured.liquidColor, opacity: 0.75 }} />
                </div>
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: featured.glowColor }}
                aria-hidden="true"
              />
            </div>

            {/* Orbiting note labels */}
            {[
              { label: 'Saffron', angle: -60, r: 160 },
              { label: 'Oud Wood', angle: 30, r: 170 },
              { label: 'Sandalwood', angle: 120, r: 155 },
              { label: 'Amber', angle: 200, r: 165 },
            ].map(({ label, angle, r }, i) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <div
                  key={label}
                  ref={(el) => (noteRefs.current[i] = el)}
                  className="absolute opacity-0"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * r}px)`,
                    top: `calc(50% + ${Math.sin(rad) * r}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span
                    className="section-label text-[10px] whitespace-nowrap"
                    style={{ color: featured.accentColor + 'cc' }}
                  >
                    {label.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Story */}
          <div>
            <p className="section-label mb-4" style={{ color: featured.accentColor }}>
              Featured Fragrance
            </p>
            <h2 className="font-display text-[clamp(3rem,5vw,6rem)] text-verdara-cream mb-6 leading-[0.95]">
              {featured.name}
            </h2>
            <p className="text-verdara-cream/70 font-body font-300 leading-relaxed mb-10">
              {featured.tagline} The most opulent expression in the Verdara collection — a deep, resinous composition centred around rare aged oud wood.
            </p>

            {/* Fragrance pyramid */}
            <div className="space-y-6 mb-10">
              {[
                { tier: 'Top Notes', notes: featured.topNotes, opacity: '1' },
                { tier: 'Heart Notes', notes: featured.heartNotes, opacity: '0.75' },
                { tier: 'Base Notes', notes: featured.baseNotes, opacity: '0.5' },
              ].map(({ tier, notes, opacity }) => (
                <div key={tier}>
                  <p className="section-label mb-2" style={{ color: featured.accentColor, opacity }}>
                    {tier}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 text-xs font-body text-verdara-cream/70 border"
                        style={{ borderColor: featured.accentColor + '30' }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a href={`/products/${featured.slug}`} className="btn-primary" style={{ background: featured.accentColor }}>
              Discover Golden Oud
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
