'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WishlistContextType {
  wishlist: string[];
  isSaved: (pandalId: string) => boolean;
  toggleWishlist: (pandalId: string) => void;
  removeFromWishlist: (pandalId: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  isSaved: () => false,
  toggleWishlist: () => {},
  removeFromWishlist: () => {},
  count: 0
});

const STORAGE_KEY = 'pujo_2026_wishlist_ids';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      }
    } catch (e) {
      console.error('Error reading wishlist from localStorage:', e);
    }
    setMounted(true);
  }, []);

  const persistWishlist = (items: string[]) => {
    setWishlist(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving wishlist to localStorage:', e);
    }
  };

  const isSaved = (pandalId: string) => {
    return wishlist.includes(pandalId);
  };

  const toggleWishlist = (pandalId: string) => {
    if (wishlist.includes(pandalId)) {
      persistWishlist(wishlist.filter((id) => id !== pandalId));
    } else {
      persistWishlist([...wishlist, pandalId]);
    }
  };

  const removeFromWishlist = (pandalId: string) => {
    persistWishlist(wishlist.filter((id) => id !== pandalId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isSaved,
        toggleWishlist,
        removeFromWishlist,
        count: mounted ? wishlist.length : 0
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
