import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../context/StoreContext';
import { formatPrice } from '../utils/helpers';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingPrice = subtotal >= 100 ? 0 : 8.99;
  const total = subtotal + shippingPrice;

  return (
    <main className="min-h-screen bg-verdara-charcoal pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="section-label text-verdara-gold mb-3">Your Selection</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-verdara-cream">Shopping Bag</h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-8 text-center">
            <div className="w-24 h-24 rounded-full border border-verdara-gold/20 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-verdara-gold/40" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <div>
              <p className="font-display text-3xl text-verdara-cream mb-3">Your bag is empty</p>
              <p className="text-verdara-cream/40 font-body font-300">Discover our botanical fragrances</p>
            </div>
            <Link to="/shop" className="btn-primary">Explore Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.key} className="flex gap-6 border-b border-verdara-gold/10 pb-6">
                  <div
                    className="w-28 h-36 flex-shrink-0 flex items-center justify-center rounded"
                    style={{ background: item.product.glassTint || '#2a2a2a' }}
                  >
                    <div className="w-12 h-20 rounded-full" style={{ background: item.product.liquidColor || '#c9a84c', opacity: 0.7 }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h2 className="font-display text-2xl text-verdara-cream">{item.product.name}</h2>
                      <span className="font-display text-xl text-verdara-cream">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p className="text-verdara-cream/40 text-sm font-body font-300 mb-2">{item.size}</p>
                    <p className="text-verdara-cream/40 text-xs font-body font-300 mb-6">{formatPrice(item.price)} each</p>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4 border border-verdara-gold/20 px-4 py-2">
                        <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="text-verdara-cream/60 hover:text-verdara-cream" aria-label="Decrease">−</button>
                        <span className="text-verdara-cream font-body w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="text-verdara-cream/60 hover:text-verdara-cream" aria-label="Increase">+</button>
                      </div>
                      <button onClick={() => removeItem(item.key)} className="section-label text-verdara-cream/30 hover:text-verdara-cream/70 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={clearCart} className="section-label text-verdara-cream/30 hover:text-verdara-cream/60 transition-colors mt-4">
                Clear Bag
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-verdara-charcoal-soft border border-verdara-gold/10 p-8 sticky top-28">
                <h2 className="font-display text-2xl text-verdara-cream mb-8">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm font-body font-300">
                    <span className="text-verdara-cream/60">Subtotal</span>
                    <span className="text-verdara-cream">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body font-300">
                    <span className="text-verdara-cream/60">Shipping</span>
                    <span className="text-verdara-cream">{shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}</span>
                  </div>
                  {shippingPrice > 0 && (
                    <p className="text-verdara-cream/30 text-xs font-body">Free shipping on orders over $100</p>
                  )}
                </div>

                <div className="vr-rule mb-6" />

                <div className="flex justify-between mb-8">
                  <span className="font-display text-xl text-verdara-cream">Total</span>
                  <span className="font-display text-xl text-verdara-cream">{formatPrice(total)}</span>
                </div>

                <button className="btn-primary w-full mb-4">Proceed to Checkout</button>
                <Link to="/shop" className="btn-ghost w-full justify-center text-verdara-cream/50">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
