import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: '01',
    title: 'Organic Ingredients',
    description: 'Only certified organic botanical extracts and cold-pressed essential oils. Never synthetic substitutes.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9z" />
        <path d="M5.6 10.2c3.74-1.35 7.89.18 9.65 3.67" />
        <path d="M3 8c0 0 2.45-3 6-3s7 2 7 7" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Cruelty Free',
    description: 'Every Verdara fragrance is certified cruelty-free. No animal testing, at any stage of production.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Ethically Sourced',
    description: 'Direct relationships with farmers and cooperatives ensure fair compensation and sustainable land use.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Recyclable Packaging',
    description: 'Our bottles are crafted from recycled glass. All secondary packaging uses FSC-certified materials.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <polyline points="1 4 1 10 7 10" />
        <polyline points="23 20 23 14 17 14" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Small Batch',
    description: 'Each fragrance is produced in limited quantities to guarantee freshness, quality, and zero excess.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <path d="M3 2h18M9 2v2M15 2v2M3 22h18M9 20v2M15 20v2M3 12h18M3 7h18M3 17h18" />
      </svg>
    ),
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.querySelectorAll('.pillar-card'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-verdara-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="section-label text-verdara-gold mb-4">Our Beliefs</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5.5rem)] text-verdara-cream">
            Pure by Origin.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="pillar-card opacity-0 border border-verdara-gold/10 p-8 hover:border-verdara-gold/30 transition-all duration-400 group"
            >
              <div className="text-verdara-gold/50 mb-6 group-hover:text-verdara-gold transition-colors duration-300">
                {p.icon}
              </div>
              <p className="section-label text-verdara-gold/30 mb-3">{p.number}</p>
              <h3 className="font-display text-xl text-verdara-cream mb-3">{p.title}</h3>
              <p className="text-verdara-cream/40 font-body font-300 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
