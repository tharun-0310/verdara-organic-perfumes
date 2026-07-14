import React, { useRef } from 'react';

const testimonials = [
  { name: 'Aria M.', rating: 5, comment: 'Forest Dew is unlike anything I have ever worn. It transports me to the woods every morning.', product: 'Forest Dew' },
  { name: 'Lena K.', rating: 5, comment: 'Rose Veil is my signature scent. Soft, elegant, and utterly feminine without being overwhelming.', product: 'Rose Veil' },
  { name: 'James T.', rating: 5, comment: 'Golden Oud is a masterpiece. Rich, complex, and incredibly long-lasting. Worth every penny.', product: 'Golden Oud' },
  { name: 'Sofia B.', rating: 5, comment: 'Citrus Bloom is pure sunshine. I get compliments every single time I wear it.', product: 'Citrus Bloom' },
  { name: 'Marco R.', rating: 5, comment: 'Ocean Mist is clean and crisp. The perfect everyday scent that never feels heavy.', product: 'Ocean Mist' },
  { name: 'Nina P.', rating: 5, comment: 'Lavender Haze is so dreamy. I wear it every night before bed and sleep beautifully.', product: 'Lavender Haze' },
  { name: 'Chloe D.', rating: 5, comment: 'The quality of the ingredients is immediately obvious. Verdara is a cut above everything else.', product: 'Forest Dew' },
  { name: 'Olivier S.', rating: 5, comment: 'I have tried dozens of organic perfumes. Verdara is the first one that actually feels premium.', product: 'Golden Oud' },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < rating ? '#c9a84c' : 'none'} stroke="#c9a84c" strokeWidth="1.5" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-80 border border-verdara-gold/10 p-8 mr-6">
      <StarRating rating={t.rating} />
      <blockquote className="text-verdara-cream/70 font-body font-300 text-sm leading-relaxed mb-6">
        "{t.comment}"
      </blockquote>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-verdara-cream font-body font-400 text-sm">{t.name}</p>
          <p className="text-verdara-gold/50 text-xs font-body font-300 mt-0.5">{t.product}</p>
        </div>
        <div
          className="w-8 h-8 rounded-full border border-verdara-gold/20 flex items-center justify-center"
        >
          <span className="text-verdara-gold text-xs font-body">{t.name.charAt(0)}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const isPaused = useRef(false);

  // Duplicate for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-32 bg-verdara-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <p className="section-label text-verdara-gold mb-4">Testimonials</p>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-verdara-cream">
          What They're Saying.
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="relative overflow-hidden"
        role="region"
        aria-label="Customer testimonials"
      >
        <div
          ref={trackRef}
          className="flex animate-marquee"
          onMouseEnter={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
          }}
          onMouseLeave={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
          }}
          onFocus={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
          }}
          onBlur={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
          }}
        >
          {allTestimonials.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
