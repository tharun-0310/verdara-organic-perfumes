import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard/ProductCard';

gsap.registerPlugin(ScrollTrigger);

export default function ProductCollectionSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    productAPI.getAll({ limit: 6, sort: '-featured' })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || !gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        gridRef.current.querySelectorAll('article'),
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section ref={sectionRef} className="py-32 bg-verdara-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 opacity-0">
          <div>
            <p className="section-label text-verdara-forest mb-4">Collection</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5.5rem)] text-verdara-forest leading-[0.95]">
              The Botanical<br />Collection.
            </h2>
          </div>
          <Link to="/shop" className="btn-ghost text-verdara-forest hover:text-verdara-gold whitespace-nowrap">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-verdara-cream-dark animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
