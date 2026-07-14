import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI, reviewAPI } from '../services/api';
import { useCartStore, useAuthStore } from '../context/StoreContext';
import { formatPrice, getStars } from '../utils/helpers';
import ProductBottleCanvas from '../three/scenes/ProductBottleCanvas';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productRes, reviewsRes] = await Promise.all([
          productAPI.getBySlug(slug),
          // Reviews fetched after we have the product ID
        ]);
        setProduct(productRes.data.product);
        setSelectedSize(productRes.data.product.size);

        const revRes = await reviewAPI.getByProduct(productRes.data.product._id);
        setReviews(revRes.data.reviews);
      } catch (err) {
        setError('Product not found or unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-verdara-charcoal">
        <div className="w-12 h-12 rounded-full border border-verdara-gold/30 border-t-verdara-gold animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-verdara-charcoal gap-6">
        <p className="font-display text-3xl text-verdara-cream">Product not found</p>
        <Link to="/shop" className="btn-outline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-verdara-charcoal pt-24">
      {/* Product Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* 3D Bottle Canvas */}
        <div
          className="relative lg:sticky lg:top-0 h-[60vh] lg:h-screen overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${product.envColor2 || '#0d1f17'}, ${product.envColor1 || '#1a3a2a'})` }}
        >
          <ProductBottleCanvas product={product} />
        </div>

        {/* Product Info */}
        <div className="p-10 lg:p-16 flex flex-col justify-center">
          <p className="section-label text-verdara-gold mb-4">{product.fragranceFamily}</p>
          <h1 className="font-display text-[clamp(2.5rem,4vw,5rem)] text-verdara-cream mb-2">{product.name}</h1>
          <p className="text-verdara-cream/60 font-body font-300 mb-6">{product.shortDescription}</p>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1" aria-label={`${product.rating} out of 5 stars`}>
                {getStars(product.rating).map((star, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={star.filled ? '#c9a84c' : 'none'} stroke="#c9a84c" strokeWidth="1.5" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-verdara-cream/40 text-xs font-body">({product.reviewCount} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="font-display text-4xl text-verdara-cream mb-8">{formatPrice(product.price)}</div>

          {/* Size Selection */}
          {product.availableSizes?.length > 0 && (
            <div className="mb-8">
              <p className="section-label text-verdara-cream/60 mb-3">Size</p>
              <div className="flex gap-3">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 text-xs font-body tracking-[0.15em] transition-all duration-300
                      ${selectedSize === size
                        ? 'bg-verdara-gold text-verdara-charcoal'
                        : 'border border-verdara-gold/20 text-verdara-cream/60 hover:border-verdara-gold/50'
                      }`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-6 mb-8">
            <p className="section-label text-verdara-cream/60">Quantity</p>
            <div className="flex items-center gap-4 border border-verdara-gold/20 px-4 py-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-verdara-cream/60 hover:text-verdara-cream" aria-label="Decrease quantity">−</button>
              <span className="text-verdara-cream font-body w-6 text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-verdara-cream/60 hover:text-verdara-cream" aria-label="Increase quantity">+</button>
            </div>
            <p className="text-verdara-cream/30 text-xs font-body">{product.stock} in stock</p>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`btn-primary w-full mb-4 ${addedToCart ? 'bg-verdara-green text-verdara-cream' : ''}`}
          >
            {product.stock === 0 ? 'Out of Stock' : addedToCart ? '✓ Added to Bag' : 'Add to Bag'}
          </button>

          {/* Fragrance Notes */}
          <div className="mt-10 space-y-6">
            <div className="vr-rule" />
            <h2 className="font-display text-2xl text-verdara-cream">Fragrance Notes</h2>
            {[
              { label: 'Top Notes', notes: product.topNotes },
              { label: 'Heart Notes', notes: product.heartNotes },
              { label: 'Base Notes', notes: product.baseNotes },
            ].map(({ label, notes }) => (
              <div key={label}>
                <p className="section-label text-verdara-gold mb-2">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {notes.map((note) => (
                    <span key={note} className="px-3 py-1 border border-verdara-gold/20 text-verdara-cream/70 text-xs font-body">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="vr-rule" />
            <h3 className="font-display text-xl text-verdara-cream">Ingredients</h3>
            <p className="text-verdara-cream/50 text-sm font-body font-300 leading-relaxed">
              {product.ingredients.join(' · ')}
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl text-verdara-cream mb-10">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-verdara-cream/40 font-body font-300">
            No reviews yet. {isAuthenticated ? 'Be the first to review.' : <Link to="/auth/login" className="text-verdara-gold underline">Sign in to review.</Link>}
          </p>
        ) : (
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-verdara-gold/10 pb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-verdara-gold/20 flex items-center justify-center">
                    <span className="text-verdara-gold text-xs font-body font-500">
                      {review.user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-verdara-cream font-body">{review.user?.name}</span>
                  <div className="flex gap-1 ml-auto" aria-label={`${review.rating} stars`}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < review.rating ? '#c9a84c' : 'none'} stroke="#c9a84c" strokeWidth="1.5" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-verdara-cream/70 font-body font-300 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
