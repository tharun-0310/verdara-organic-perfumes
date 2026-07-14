import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../context/StoreContext';
import { authAPI, orderAPI } from '../services/api';
import { formatPrice } from '../utils/helpers';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    orderAPI.getMyOrders()
      .then((res) => setOrders(res.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  const statusColors = {
    pending: 'text-yellow-400',
    confirmed: 'text-verdara-green-light',
    processing: 'text-blue-400',
    shipped: 'text-verdara-gold',
    delivered: 'text-verdara-green-light',
    cancelled: 'text-red-400',
  };

  return (
    <main className="min-h-screen bg-verdara-charcoal pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="section-label text-verdara-gold mb-3">Welcome back</p>
            <h1 className="font-display text-4xl text-verdara-cream">{user?.name}</h1>
            <p className="text-verdara-cream/40 font-body font-300 text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="btn-ghost text-verdara-cream/40 hover:text-verdara-cream"
          >
            Sign Out
          </button>
        </div>

        <div className="vr-rule mb-12" />

        {/* Order History */}
        <h2 className="font-display text-3xl text-verdara-cream mb-8">Order History</h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-verdara-charcoal-soft animate-pulse rounded" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 border border-verdara-gold/10">
            <p className="font-display text-2xl text-verdara-cream mb-4">No orders yet</p>
            <p className="text-verdara-cream/40 font-body font-300 mb-8">Discover our botanical fragrances</p>
            <Link to="/shop" className="btn-primary">Shop Collection</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border border-verdara-gold/10 p-6 hover:border-verdara-gold/20 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-verdara-cream font-body text-sm"># {order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-verdara-cream/40 font-body font-300 text-xs mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-body uppercase tracking-wider ${statusColors[order.status] || 'text-verdara-cream/60'}`}>
                      {order.status}
                    </p>
                    <p className="font-display text-xl text-verdara-cream mt-1">{formatPrice(order.totalPrice)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span key={item._id} className="text-verdara-cream/50 text-xs font-body border border-verdara-gold/10 px-3 py-1">
                      {item.name} × {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
