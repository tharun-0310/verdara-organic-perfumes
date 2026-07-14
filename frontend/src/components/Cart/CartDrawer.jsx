import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/helpers';
import gsap from 'gsap';

export default function CartDrawer() {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingPrice = subtotal >= 100 ? 0 : 8.99;

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.6, ease: 'expo.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'expo.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm ${isOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-verdara-charcoal border-l border-verdara-gold/10 flex flex-col"
        style={{ transform: 'translateX(100%)' }}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-verdara-gold/10">
          <h2 className="font-display text-2xl text-verdara-cream">Your Bag</h2>
          <button
            onClick={closeCart}
            className="text-verdara-cream/50 hover:text-verdara-cream transition-colors p-1"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div className="w-16 h-16 rounded-full border border-verdara-gold/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-verdara-gold/50" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <div>
                <p className="font-display text-xl text-verdara-cream mb-2">Your bag is empty</p>
                <p className="text-verdara-cream/40 text-sm font-body font-300">Discover our botanical collection</p>
              </div>
              <Link to="/shop" onClick={closeCart} className="btn-outline">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4">
                  {/* Product image placeholder */}
                  <div
                    className="w-20 h-20 rounded flex-shrink-0 flex items-center justify-center"
                    style={{ background: item.product.glassTint || '#2a2a2a' }}
                  >
                    {item.product.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div
                        className="w-8 h-12 rounded-full opacity-60"
                        style={{ background: item.product.liquidColor || '#c9a84c' }}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display text-verdara-cream text-lg truncate">{item.product.name}</p>
                    <p className="text-verdara-cream/40 text-xs font-body font-300 mb-3">{item.size}</p>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-3 border border-verdara-gold/20 px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="text-verdara-cream/60 hover:text-verdara-cream w-4 h-4 flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-verdara-cream font-body text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="text-verdara-cream/60 hover:text-verdara-cream w-4 h-4 flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-display text-verdara-cream">{formatPrice(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-verdara-cream/30 hover:text-verdara-cream/70 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-verdara-gold/10 p-6 space-y-4">
            <div className="flex justify-between text-sm font-body font-300">
              <span className="text-verdara-cream/60">Subtotal</span>
              <span className="text-verdara-cream">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm font-body font-300">
              <span className="text-verdara-cream/60">Shipping</span>
              <span className="text-verdara-cream">{shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}</span>
            </div>
            <div className="vr-rule" />
            <div className="flex justify-between">
              <span className="font-display text-verdara-cream text-xl">Total</span>
              <span className="font-display text-verdara-cream text-xl">{formatPrice(subtotal + shippingPrice)}</span>
            </div>
            <Link to="/cart" onClick={closeCart} className="btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>
            <button onClick={closeCart} className="btn-ghost w-full justify-center text-verdara-cream/50">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
