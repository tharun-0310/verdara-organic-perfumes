import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Auth Store ──────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        localStorage.setItem('verdara_token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('verdara_token');
        localStorage.removeItem('verdara_user');
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'verdara_auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// ─── Cart Store ───────────────────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, quantity = 1, size = null) => {
        const items = get().items;
        const key = `${product._id}-${size || product.size}`;
        const existing = items.find((i) => i.key === key);

        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                key,
                product,
                quantity,
                size: size || product.size,
                price: product.price,
              },
            ],
          });
        }
      },

      removeItem: (key) =>
        set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          set((s) => ({ items: s.items.filter((i) => i.key !== key) }));
        } else {
          set((s) => ({
            items: s.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
          }));
        }
      },

      clearCart: () => set({ items: [] }),

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: 'verdara_cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ─── Scene / 3D Store ─────────────────────────────────────────────────────
export const useSceneStore = create((set) => ({
  currentFragrance: 0, // 0–5 index matching fragrances array
  scrollProgress: 0,
  isPreloaderDone: false,
  isSceneReady: false,
  pointerX: 0,
  pointerY: 0,

  setFragrance: (index) => set({ currentFragrance: index }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setPreloaderDone: () => set({ isPreloaderDone: true }),
  setSceneReady: () => set({ isSceneReady: true }),
  setPointer: (x, y) => set({ pointerX: x, pointerY: y }),
}));

// ─── UI Store ─────────────────────────────────────────────────────────────
export const useUIStore = create((set) => ({
  isNavOpen: false,
  activeModal: null,

  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
  toggleNav: () => set((s) => ({ isNavOpen: !s.isNavOpen })),

  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
