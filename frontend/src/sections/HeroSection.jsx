import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { useSceneStore } from '../context/StoreContext';

// Lazy-load the heavy 3D canvas — if it fails, the rest of the hero still shows
const MainCanvas = lazy(() => import('../three/scenes/MainCanvas'));

// Error boundary for the 3D canvas — blank canvas instead of crash
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn('3D canvas failed to load:', err.message);
  }
  render() {
    if (this.state.failed) {
      // Graceful fallback — gradient background, no crash
      return (
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, #1b4332 0%, #0d1f17 60%, #1a1a1a 100%)' }}
          aria-hidden="true"
        />
      );
    }
    return this.props.children;
  }
}

export default function HeroSection() {
  const headingRef  = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef      = useRef(null);
  const isPreloaderDone = useSceneStore((s) => s.isPreloaderDone);

  // Simple CSS-based reveal after preloader — no GSAP dependency here
  useEffect(() => {
    if (!isPreloaderDone) return;
    const elements = [subtitleRef.current, headingRef.current, ctaRef.current];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.transition = `opacity 0.8s ease ${i * 0.15 + 0.3}s, transform 0.8s ease ${i * 0.15 + 0.3}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, [isPreloaderDone]);

  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d1f17 0%, #1a1a1a 60%)' }}
    >
      {/* 3D Canvas — isolated so crashes don't break the page */}
      <CanvasErrorBoundary>
        <Suspense fallback={null}>
          <MainCanvas
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        </Suspense>
      </CanvasErrorBoundary>

      {/* Large background wordmark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display leading-none tracking-[0.05em]"
          style={{ fontSize: 'clamp(8rem,22vw,22rem)', color: 'rgba(245,240,232,0.03)' }}
        >
          VERDARA
        </span>
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">

        <p
          ref={subtitleRef}
          className="section-label text-verdara-gold mb-6"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          PURE BOTANICAL ESSENCE
        </p>

        <div ref={headingRef} style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <h1
            className="font-display text-verdara-cream leading-[1.05] max-w-4xl"
            style={{ fontSize: 'clamp(2.2rem,5.5vw,6rem)' }}
          >
            Bottled by Nature.<br />
            Remembered by{' '}
            <em style={{ color: '#c9a84c' }}>the Senses.</em>
          </h1>
        </div>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 mt-10"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <Link to="/shop" className="btn-primary">
            Explore Collection
          </Link>
          <Link to="/about" className="btn-outline">
            Discover Your Scent
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.4 }}
        aria-hidden="true"
      >
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.6))' }}
        />
        <span className="section-label text-verdara-cream/50" style={{ fontSize: '9px' }}>SCROLL</span>
      </div>
    </section>
  );
}
