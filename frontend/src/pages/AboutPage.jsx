import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: '🌿', title: 'Organic Origins', desc: 'Every ingredient is ethically sourced from certified organic farms and wild-crafted suppliers.' },
  { icon: '🐝', title: 'Cruelty Free', desc: 'No animal testing, ever. All formulations are certified cruelty-free and vegan-friendly.' },
  { icon: '♻️', title: 'Sustainable Packaging', desc: 'Our bottles are made from recyclable glass. All secondary packaging uses FSC-certified materials.' },
  { icon: '🌍', title: 'Ethical Sourcing', desc: 'We work directly with farmers and cooperatives to ensure fair pay and sustainable practices.' },
  { icon: '🧪', title: 'Small Batch', desc: 'Every fragrance is produced in small batches to ensure freshness, quality, and minimal waste.' },
];

export default function AboutPage() {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.3 }
    );
  }, []);

  return (
    <main className="min-h-screen bg-verdara-charcoal">
      {/* Hero */}
      <section className="min-h-[60vh] flex items-end pb-20 px-6 pt-40 max-w-7xl mx-auto">
        <div ref={headingRef} className="opacity-0">
          <p className="section-label text-verdara-gold mb-6">Our Story</p>
          <h1 className="font-display text-[clamp(3rem,7vw,8rem)] text-verdara-cream leading-[0.95] max-w-4xl">
            Nature,<br /><em>Distilled.</em>
          </h1>
        </div>
      </section>

      <div className="vr-rule mx-6 max-w-7xl" />

      {/* Philosophy */}
      <section id="philosophy" className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label text-verdara-gold mb-6">Philosophy</p>
          <h2 className="font-display text-[clamp(2rem,4vw,4rem)] text-verdara-cream mb-8">Pure by Origin.</h2>
          <p className="text-verdara-cream/60 font-body font-300 leading-relaxed mb-6">
            Verdara was born from a simple belief: the finest fragrances come from the finest ingredients. Not from laboratories or synthetic shortcuts — but from the living world.
          </p>
          <p className="text-verdara-cream/60 font-body font-300 leading-relaxed">
            Every bottle contains only what nature intended. Botanical extracts, essential oils, absolute concentrations, and natural isolates — selected for their purity and potency, and nothing else.
          </p>
        </div>
        <div className="aspect-square bg-verdara-charcoal-soft border border-verdara-gold/10 flex items-center justify-center">
          <p className="font-display text-8xl text-verdara-gold/10">V</p>
        </div>
      </section>

      <div className="vr-rule mx-6" />

      {/* Values */}
      <section id="sustainability" className="max-w-7xl mx-auto px-6 py-24">
        <p className="section-label text-verdara-gold mb-6 text-center">Our Commitments</p>
        <h2 className="font-display text-[clamp(2rem,4vw,4rem)] text-verdara-cream mb-16 text-center">
          Verdara Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="border border-verdara-gold/10 p-8 hover:border-verdara-gold/30 transition-colors duration-400"
            >
              <div className="text-3xl mb-4" aria-hidden="true">{v.icon}</div>
              <h3 className="font-display text-2xl text-verdara-cream mb-4">{v.title}</h3>
              <p className="text-verdara-cream/50 font-body font-300 leading-relaxed text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="vr-rule mx-6" />

      {/* Ingredient Sourcing */}
      <section id="ingredients" className="max-w-7xl mx-auto px-6 py-24">
        <p className="section-label text-verdara-gold mb-6">Provenance</p>
        <h2 className="font-display text-[clamp(2rem,4vw,4rem)] text-verdara-cream mb-8">From Earth to Essence.</h2>
        <p className="text-verdara-cream/60 font-body font-300 leading-relaxed max-w-2xl">
          Our rose absolute is cold-pressed from Bulgarian Damascena roses harvested at dawn. Our vetiver is steam-distilled from roots grown in Haiti. Our oud is sourced from sustainably managed Aquilaria trees in Southeast Asia.
          Each ingredient carries with it the landscape, the season, and the hands that gathered it.
        </p>
      </section>
    </main>
  );
}
