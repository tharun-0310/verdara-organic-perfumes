import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-verdara-charcoal flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[clamp(6rem,20vw,18rem)] text-verdara-gold/10 leading-none select-none" aria-hidden="true">
        404
      </p>
      <div className="-mt-8 mb-10">
        <h1 className="font-display text-[clamp(2rem,4vw,4rem)] text-verdara-cream mb-4">
          Lost in the Garden
        </h1>
        <p className="text-verdara-cream/50 font-body font-300 max-w-md">
          The page you are looking for has wandered off the path. Let us guide you back.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary">Return Home</Link>
        <Link to="/shop" className="btn-outline">Explore Fragrances</Link>
      </div>
    </main>
  );
}
