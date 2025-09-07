import React, { createContext, useContext, useState, useEffect } from 'react';
import { WishlistContextType, WishlistItem, Product } from '../types';
import { useToast } from '../hooks/useToast';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { showSuccess, showInfo } = useToast();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        setItems(parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems(currentItems => {
      const exists = currentItems.find(item => item.product.id === product.id);
      if (!exists) {
        showSuccess(`Added ${product.name} to wishlist`);
        return [...currentItems, { product, addedAt: new Date() }];
      }
      return currentItems;
    });
  };

  const removeFromWishlist = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    if (item) {
      showInfo(`Removed ${item.product.name} from wishlist`);
    }
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const isInWishlist = (productId: string): boolean => {
    return items.some(item => item.product.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};