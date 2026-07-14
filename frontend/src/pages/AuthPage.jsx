import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuthStore } from '../context/StoreContext';

export default function AuthPage() {
  const { mode } = useParams();
  const isLogin = mode !== 'register';
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = isLogin
        ? await authAPI.login({ email: form.email, password: form.password })
        : await authAPI.register(form);

      const { user, token } = response.data;
      setAuth(user, token);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-verdara-charcoal flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link to="/" className="font-display text-3xl tracking-[0.2em] text-verdara-cream mb-8 block">
            VERDARA
          </Link>
          <h1 className="font-display text-4xl text-verdara-cream mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-verdara-cream/50 font-body font-300 text-sm">
            {isLogin ? 'Sign in to your Verdara account' : 'Join the Verdara garden'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="section-label text-verdara-cream/60 block mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required={!isLogin}
                autoComplete="name"
                className="w-full bg-transparent border border-verdara-gold/20 text-verdara-cream placeholder-verdara-cream/30 px-4 py-3 font-body font-300 focus:outline-none focus:border-verdara-gold/60 transition-colors"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="section-label text-verdara-cream/60 block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
              className="w-full bg-transparent border border-verdara-gold/20 text-verdara-cream placeholder-verdara-cream/30 px-4 py-3 font-body font-300 focus:outline-none focus:border-verdara-gold/60 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="section-label text-verdara-cream/60 block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              className="w-full bg-transparent border border-verdara-gold/20 text-verdara-cream placeholder-verdara-cream/30 px-4 py-3 font-body font-300 focus:outline-none focus:border-verdara-gold/60 transition-colors"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {error && (
            <div className="border border-red-500/30 bg-red-500/10 px-4 py-3" role="alert">
              <p className="text-red-400 text-sm font-body font-300">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Please wait…' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-verdara-cream/40 font-body font-300 text-sm mt-8">
          {isLogin ? (
            <>Don't have an account?{' '}<Link to="/auth/register" className="text-verdara-gold hover:underline">Sign up</Link></>
          ) : (
            <>Already have an account?{' '}<Link to="/auth/login" className="text-verdara-gold hover:underline">Sign in</Link></>
          )}
        </p>
      </div>
    </main>
  );
}
