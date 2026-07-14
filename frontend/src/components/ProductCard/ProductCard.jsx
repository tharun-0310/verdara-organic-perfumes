import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/helpers';

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative will-change-transform"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      <Link to={`/products/${product.slug}`} className="block focus-visible:outline-none">
        {/* Image Area */}
        <div
          className="relative aspect-[3/4] overflow-hidden mb-5"
          style={{
            background: `linear-gradient(160deg, ${product.envColor1 || '#1a1a1a'}, ${product.envColor2 || '#0d0d0d'})`,
          }}
        >
          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-600"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${product.glowColor || '#c9a84c'}22 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {/* Bottle visual (placeholder procedural) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative transition-transform duration-600 ease-expo-out"
              style={{ transform: isHovered ? 'translateY(-8px) scale(1.04)' : 'translateY(0) scale(1)' }}
            >
              {/* Bottle body */}
              <div
                className="relative mx-auto"
                style={{ width: '70px', height: '110px' }}
                aria-hidden="true"
              >
                {/* Cap */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-5 rounded-t-sm"
                  style={{ background: product.capColor || '#1a1a1a' }}
                />
                {/* Neck */}
                <div
                  className="absolute top-5 left-1/2 -translate-x-1/2 w-6 h-6"
                  style={{ background: product.glassTint || '#e0f0e0', opacity: 0.8 }}
                />
                {/* Body */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 rounded-sm overflow-hidden"
                  style={{
                    background: product.glassTint || '#e0f0e0',
                    opacity: 0.85,
                    boxShadow: `0 0 30px ${product.glowColor || '#c9a84c'}40`,
                  }}
                >
                  {/* Liquid fill */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '70%',
                      background: product.liquidColor || '#c9a84c',
                      opacity: 0.7,
                    }}
                  />
                  {/* Label */}
                  <div
                    className="absolute inset-x-2 top-3 h-8 flex items-center justify-center"
                    style={{ background: product.labelColor || '#1a1a1a', opacity: 0.9 }}
                  >
                    <span className="text-[6px] text-white/80 font-body tracking-wider uppercase">
                      {product.name?.split(' ')[0]}
                    </span>
                  </div>
                </div>
                {/* Shadow */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full blur-md opacity-30"
                  style={{ background: product.glowColor || '#c9a84c' }}
                />
              </div>
            </div>
          </div>

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-verdara-gold text-verdara-charcoal text-xs font-body tracking-[0.15em] uppercase">
              Featured
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="section-label text-verdara-gold/70 mb-1">{product.fragranceFamily}</p>
              <h2 className="font-display text-2xl text-verdara-cream group-hover:text-verdara-gold transition-colors duration-300">
                {product.name}
              </h2>
            </div>
            <span className="font-display text-xl text-verdara-cream mt-1">{formatPrice(product.price)}</span>
          </div>
          <p className="text-verdara-cream/50 text-sm font-body font-300 mt-2 mb-4 leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Notes preview */}
          <div className="flex flex-wrap gap-1 mb-5">
            {product.topNotes?.slice(0, 3).map((note) => (
              <span key={note} className="text-[10px] text-verdara-cream/30 font-body tracking-wider border border-verdara-cream/10 px-2 py-0.5">
                {note}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Add to Bag */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-3 text-xs tracking-[0.2em] uppercase font-body transition-all duration-400
          ${addedToCart
            ? 'bg-verdara-green-light text-verdara-charcoal'
            : 'border border-verdara-gold/30 text-verdara-cream/70 hover:border-verdara-gold hover:text-verdara-cream'
          }`}
        aria-label={`Add ${product.name} to bag`}
      >
        {addedToCart ? '✓ Added' : 'Add to Bag'}
      </button>
    </article>
  );
}
