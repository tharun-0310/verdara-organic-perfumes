import React, { useEffect, useState } from 'react';
import { useSceneStore } from '../../context/StoreContext';

export default function Preloader() {
  const isPreloaderDone = useSceneStore((s) => s.isPreloaderDone);
  const setPreloaderDone = useSceneStore((s) => s.setPreloaderDone);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isPreloaderDone) return;

    // Count from 0 → 100 over 2.5s using setInterval (no GSAP dependency)
    let current = 0;
    const steps = 100;
    const duration = 2500;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        // Start exit fade after short pause
        setTimeout(() => {
          setExiting(true);
          // Remove preloader after fade completes
          setTimeout(() => setPreloaderDone(), 600);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isPreloaderDone) return null;

  return (
    <>
      <style>{`
        @keyframes preloader-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes preloader-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes preloader-dot-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#1a1a1a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.6s ease',
          opacity: exiting ? 0 : 1,
          pointerEvents: exiting ? 'none' : 'all',
        }}
        role="status"
        aria-label="Loading Verdara"
        aria-live="polite"
      >
        {/* Floating dots */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                borderRadius: '50%',
                background: '#c9a84c',
                opacity: 0.1,
                left: `${(i * 10) + 5}%`,
                top: `${(i * 9 + 10) % 80}%`,
                animation: `preloader-dot-float ${6 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Animated line */}
        <div style={{ width: '60px', marginBottom: '2.5rem' }}>
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, #c9a84c, #74c69d)',
              transformOrigin: 'left center',
              animation: 'preloader-line 1s ease-out forwards',
            }}
          />
        </div>

        {/* VERDARA */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: '#f5f0e8',
            letterSpacing: '0.25em',
            fontWeight: 400,
            marginBottom: '0.5rem',
            animation: 'preloader-fade-in 0.8s ease-out 0.3s both',
          }}
        >
          VERDARA
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.8)',
            marginBottom: '4rem',
            animation: 'preloader-fade-in 0.8s ease-out 0.6s both',
          }}
        >
          PURE BOTANICAL ESSENCE
        </p>

        {/* Counter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '176px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2.5rem',
                color: '#f5f0e8',
                lineHeight: 1,
                minWidth: '3ch',
                textAlign: 'right',
              }}
              aria-hidden="true"
            >
              {count}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(201,168,76,0.6)', fontFamily: 'system-ui' }}>%</span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.1)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, #c9a84c, #74c69d)',
                width: `${count}%`,
                transition: 'width 0.025s linear',
              }}
            />
          </div>
        </div>

        <span className="sr-only">{count}% loaded</span>
      </div>
    </>
  );
}
