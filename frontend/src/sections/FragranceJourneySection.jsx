import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSceneStore } from '../context/StoreContext';
import fragrances from '../data/fragrances';

gsap.registerPlugin(ScrollTrigger);

export default function FragranceJourneySection() {
  const sectionRef = useRef(null);
  const setFragrance = useSceneStore((s) => s.setFragrance);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin this section and cycle through fragrances on scroll
      const stages = sectionRef.current.querySelectorAll('.journey-stage');

      // Master pinned scroll
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${stages.length * 100}%`,
          scrub: 1,
          pin: true,
        },
      });

      stages.forEach((stage, i) => {
        masterTl
          .to(stage, { opacity: 1, duration: 0.3 }, i)
          .to(
            stage,
            { opacity: 0, duration: 0.3 },
            i + 0.7
          )
          .add(() => {
            setFragrance(i);
          }, i + 0.1);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [setFragrance]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-verdara-charcoal overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <p className="font-display text-[clamp(4rem,12vw,14rem)] text-verdara-cream/[0.03] leading-none tracking-wider select-none">
          JOURNEY
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-screen flex flex-col justify-between py-24">
        <div className="text-center">
          <p className="section-label text-verdara-gold mb-4">Scroll to Explore</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,6rem)] text-verdara-cream">
            A Journey Through Scent.
          </h2>
        </div>

        {/* Fragrance stages — all layered, shown via opacity */}
        <div className="relative flex-1 flex items-center justify-end">
          <div className="w-full max-w-sm space-y-0">
            {fragrances.map((f, i) => (
              <div
                key={f.id}
                className="journey-stage absolute right-0 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none"
                style={{ width: '340px' }}
              >
                <div
                  className="border border-current/10 p-8"
                  style={{ borderColor: f.accentColor + '30' }}
                >
                  {/* Color swatch */}
                  <div
                    className="w-12 h-12 rounded-full mb-6"
                    style={{
                      background: f.liquidColor,
                      boxShadow: `0 0 24px ${f.glowColor}60`,
                    }}
                    aria-hidden="true"
                  />
                  <p className="section-label mb-2" style={{ color: f.accentColor }}>
                    {String(i + 1).padStart(2, '0')} / {String(fragrances.length).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-4xl text-verdara-cream mb-3">{f.name}</h3>
                  <p className="text-verdara-cream/60 font-body font-300 text-sm leading-relaxed mb-6">
                    {f.tagline}
                  </p>
                  <div className="space-y-2">
                    {['topNotes', 'heartNotes', 'baseNotes'].map((noteType, ni) => (
                      <div key={noteType} className="flex items-center gap-3">
                        <span
                          className="section-label text-[9px]"
                          style={{ color: f.accentColor + '80' }}
                        >
                          {['TOP', 'HEART', 'BASE'][ni]}
                        </span>
                        <span className="text-verdara-cream/50 text-xs font-body font-300">
                          {f[noteType].slice(0, 2).join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3">
          {fragrances.map((f) => (
            <div
              key={f.id}
              className="w-1.5 h-1.5 rounded-full transition-all duration-400"
              style={{ background: f.liquidColor, opacity: 0.5 }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
