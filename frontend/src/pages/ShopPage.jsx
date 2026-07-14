import React, { useEffect, useState, useCallback } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard/ProductCard';
import { debounce } from '../utils/helpers';

const FRAGRANCE_FAMILIES = ['all', 'floral', 'woody', 'citrus', 'aquatic', 'oriental', 'herbal', 'musky'];
const SORT_OPTIONS = [
  { label: 'Newest', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Best Rated', value: '-rating' },
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [family, setFamily] = useState('all');
  const [sort, setSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll(params);
      setProducts(response.data.products);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = {
      sort,
      page,
      limit: 12,
      ...(search && { search }),
      ...(family !== 'all' && { fragranceFamily: family }),
    };
    fetchProducts(params);
  }, [search, family, sort, page, fetchProducts]);

  const handleSearch = debounce((val) => {
    setSearch(val);
    setPage(1);
  }, 400);

  return (
    <main className="min-h-screen bg-verdara-charcoal pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label text-verdara-gold mb-4">Collection</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-verdara-cream mb-4">
            The Botanical Collection
          </h1>
          <p className="text-verdara-cream/50 font-body font-300 max-w-md mx-auto">
            Six fragrances. Six worlds. Each one bottled from nature.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="search"
              placeholder="Search fragrances…"
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-verdara-charcoal-soft border border-verdara-gold/20 text-verdara-cream placeholder-verdara-cream/30 px-4 py-3 text-sm font-body focus:outline-none focus:border-verdara-gold/60 transition-colors"
              aria-label="Search fragrances"
            />
            <svg className="absolute right-3 top-3.5 text-verdara-cream/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Family filter */}
          <div className="flex gap-2 flex-wrap">
            {FRAGRANCE_FAMILIES.map((f) => (
              <button
                key={f}
                onClick={() => { setFamily(f); setPage(1); }}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-body transition-all duration-300
                  ${family === f
                    ? 'bg-verdara-gold text-verdara-charcoal'
                    : 'border border-verdara-gold/20 text-verdara-cream/60 hover:border-verdara-gold/50 hover:text-verdara-cream'
                  }`}
                aria-pressed={family === f}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="bg-verdara-charcoal-soft border border-verdara-gold/20 text-verdara-cream/70 px-4 py-2 text-xs font-body focus:outline-none focus:border-verdara-gold/60 transition-colors"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-verdara-charcoal-soft animate-pulse rounded" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-verdara-cream/50 font-body mb-4">{error}</p>
            <button onClick={() => fetchProducts({})} className="btn-outline">Retry</button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-verdara-cream mb-4">No fragrances found</p>
            <p className="text-verdara-cream/50 font-body font-300 mb-8">Try adjusting your filters.</p>
            <button onClick={() => { setSearch(''); setFamily('all'); }} className="btn-outline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-16">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 text-sm font-body transition-all duration-300
                  ${page === i + 1
                    ? 'bg-verdara-gold text-verdara-charcoal'
                    : 'border border-verdara-gold/20 text-verdara-cream/60 hover:border-verdara-gold/50'
                  }`}
                aria-label={`Page ${i + 1}`}
                aria-current={page === i + 1 ? 'page' : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
