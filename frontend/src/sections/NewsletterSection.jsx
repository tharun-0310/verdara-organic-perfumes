import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { newsletterAPI } from '../services/api';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await newsletterAPI.subscribe(email);
      setStatus('success');
      setMessage(res.data.message);
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-40 bg-verdara-forest overflow-hidden"
    >
      {/* Floating botanical elements */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10 animate-float-slow pointer-events-none"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${7 + i}s`,
          }}
          aria-hidden="true"
        >
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <ellipse cx="10" cy="15" rx="6" ry="12" stroke="#c9a84c" strokeWidth="0.5" />
            <line x1="10" y1="3" x2="10" y2="27" stroke="#c9a84c" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto px-6 text-center opacity-0">
        <p className="section-label text-verdara-gold mb-6">Stay Connected</p>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5.5rem)] text-verdara-cream mb-6 leading-[0.95]">
          Enter the Verdara Garden.
        </h2>
        <p className="text-verdara-cream/60 font-body font-300 mb-12 max-w-md mx-auto">
          Be the first to discover new fragrances, botanical stories, and exclusive offers from the Verdara garden.
        </p>

        {status === 'success' ? (
          <div className="border border-verdara-gold/30 bg-verdara-gold/5 p-8">
            <p className="font-display text-2xl text-verdara-cream mb-2">Welcome to the Garden.</p>
            <p className="text-verdara-cream/60 font-body font-300 text-sm">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border border-verdara-cream/20 text-verdara-cream placeholder-verdara-cream/40 px-5 py-3 font-body font-300 text-sm focus:outline-none focus:border-verdara-gold/50 transition-colors"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining…' : 'Join the Garden'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm font-body font-300 mt-4" role="alert">{message}</p>
        )}

        <p className="text-verdara-cream/30 text-xs font-body font-300 mt-6">
          No spam. Unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
