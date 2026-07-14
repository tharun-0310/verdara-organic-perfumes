import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCartStore, useAuthStore, useUIStore } from '../../context/StoreContext';
import gsap from 'gsap';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
];

export default function NavBar() {
  const navRef = useRef(null);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const { isAuthenticated } = useAuthStore();
  const toggleCart = useCartStore((s) => s.toggleCart);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Nav entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
    );
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isHome = location.pathname === '/';

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ease-expo-out
          ${scrolled || !isHome
            ? 'bg-verdara-charcoal/95 backdrop-blur-md border-b border-verdara-gold/10'
            : 'bg-transparent'
          }`}
        style={{ height: 'var(--nav-height)' }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl tracking-[0.2em] text-verdara-cream hover:text-verdara-gold transition-colors duration-300"
            aria-label="Verdara home"
          >
            VERDARA
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `section-label transition-colors duration-300 ${
                    isActive ? 'text-verdara-gold' : 'text-verdara-cream/70 hover:text-verdara-cream'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Auth */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="section-label text-verdara-cream/70 hover:text-verdara-gold transition-colors duration-300"
                  aria-label="Profile"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className="section-label text-verdara-cream/70 hover:text-verdara-gold transition-colors duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 section-label text-verdara-cream/70 hover:text-verdara-gold transition-colors duration-300"
              aria-label={`Cart, ${itemCount} items`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-4 h-4 bg-verdara-gold text-verdara-charcoal text-[10px] font-body font-500 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline">Bag</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block w-5 h-px bg-verdara-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-px bg-verdara-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-verdara-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-verdara-charcoal flex flex-col items-center justify-center transition-all duration-600 ease-expo-out md:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center gap-10" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-display text-5xl text-verdara-cream hover:text-verdara-gold transition-colors duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/cart"
            className="font-display text-5xl text-verdara-cream hover:text-verdara-gold transition-colors duration-300"
          >
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className="font-display text-5xl text-verdara-cream hover:text-verdara-gold transition-colors duration-300">
              Profile
            </Link>
          ) : (
            <Link to="/auth/login" className="font-display text-5xl text-verdara-cream hover:text-verdara-gold transition-colors duration-300">
              Sign In
            </Link>
          )}
        </nav>
        <div className="absolute bottom-12 section-label text-verdara-gold/40">VERDARA — PURE BOTANICAL ESSENCE</div>
      </div>
    </>
  );
}
