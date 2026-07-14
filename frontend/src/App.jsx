import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import Preloader from './components/Preloader/Preloader';
import ScrollToTop from './utils/ScrollToTop';
import LenisProvider from './utils/LenisProvider';

// Lazy load pages so a crash in one page doesn't break others
const HomePage     = lazy(() => import('./pages/HomePage'));
const ShopPage     = lazy(() => import('./pages/ShopPage'));
const ProductPage  = lazy(() => import('./pages/ProductPage'));
const CartPage     = lazy(() => import('./pages/CartPage'));
const AboutPage    = lazy(() => import('./pages/AboutPage'));
const AuthPage     = lazy(() => import('./pages/AuthPage'));
const ProfilePage  = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(201,168,76,0.3)',
          borderTopColor: '#c9a84c',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <ScrollToTop />
        <Preloader />
        <NavBar />
        <CartDrawer />

        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"               element={<HomePage />} />
              <Route path="/shop"           element={<ShopPage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/cart"           element={<CartPage />} />
              <Route path="/about"          element={<AboutPage />} />
              <Route path="/auth/:mode"     element={<AuthPage />} />
              <Route path="/auth"           element={<AuthPage />} />
              <Route path="/profile"        element={<ProfilePage />} />
              <Route path="*"               element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </LenisProvider>
    </BrowserRouter>
  );
}
