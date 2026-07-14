import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useSceneStore } from '../context/StoreContext';

export let lenisInstance = null;

export default function LenisProvider({ children }) {
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);
  const rafRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      lenisInstance = lenis;

      lenis.on('scroll', (e) => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setScrollProgress(e.scroll / docHeight);
        }
      });

      function raf(time) {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }

      rafRef.current = requestAnimationFrame(raf);
    } catch (err) {
      // Lenis failed — page still works without smooth scroll
      console.warn('Lenis init failed:', err.message);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      lenisInstance = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
