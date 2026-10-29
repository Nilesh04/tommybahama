import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, MainCategory } from '../types';
import { MOCK_PRODUCTS } from '../data/products';

interface PromoState {
  code: string;
  discountPercent: number;
  freeShipping: boolean;
}

interface ShopContextType {
  activeTab: 'home' | 'shop' | 'search' | 'favorites' | 'bag';
  setActiveTab: (tab: 'home' | 'shop' | 'search' | 'favorites' | 'bag') => void;
  selectedProductId: string | null;
  openProductDetails: (productId: string) => void;
  closeProductDetails: () => void;
  
  // Modals
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isStoreLocatorOpen: boolean;
  setIsStoreLocatorOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  
  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  
  // Cart
  cartItems: CartItem[];
  addToBag: (product: Product, color: string, size: string, quantity: number) => { success: boolean; message: string };
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromBag: (cartItemId: string) => void;
  clearBag: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingCost: number;
  freeShippingThreshold: number;
  appliedPromo: PromoState | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountAmount: number;
  estimatedTax: number;
  cartTotal: number;
  
  // Navigation & Category Filters
  selectedCategory: MainCategory | 'all';
  setSelectedCategory: (cat: MainCategory | 'all') => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (sub: string | null) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
  
  // Toast
  toastMessage: { text: string; id: number } | null;
  showToast: (text: string) => void;
  
  // Actions
  navigateToCategory: (cat: MainCategory) => void;
  navigateToTab: (tab: 'home' | 'shop' | 'search' | 'favorites' | 'bag') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'search' | 'favorites' | 'bag'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Favorites with localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tb_favorites');
      return saved ? JSON.parse(saved) : ['tb-m-01', 'tb-w-01'];
    } catch {
      return ['tb-m-01', 'tb-w-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tb_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from favorites' : 'Saved to your island favorites');
      return next;
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Cart with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tb_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial mock cart item for quick demonstration
    const defaultProd = MOCK_PRODUCTS.find(p => p.id === 'tb-m-01') || MOCK_PRODUCTS[0];
    return [
      {
        id: `${defaultProd.id}_Seafoam Mist_L`,
        productId: defaultProd.id,
        product: defaultProd,
        selectedColor: 'Seafoam Mist',
        selectedSize: 'L',
        quantity: 1,
        unitPrice: defaultProd.price
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('tb_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const [appliedPromo, setAppliedPromo] = useState<PromoState | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; id: number } | null>(null);
  const showToast = (text: string) => {
    setToastMessage({ text, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.text === text ? null : prev));
    }, 2800);
  };

  // Add to Bag with deduplication
  const addToBag = (product: Product, color: string, size: string, quantity: number) => {
    if (!size) {
      showToast('Please select a size first');
      return { success: false, message: 'Please select a size' };
    }

    const cartItemId = `${product.id}_${color}_${size}`;
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
            unitPrice: product.price
          }
        ];
      }
    });

    showToast(`Added ${quantity} ${product.name} to bag`);
    return { success: true, message: 'Added to bag' };
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromBag(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromBag = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from shopping bag');
  };

  const clearBag = () => {
    setCartItems([]);
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const freeShippingThreshold = 125;
  const isFreeShipping = appliedPromo?.freeShipping || cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 9.99;

  const discountAmount = appliedPromo ? (cartSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.0825; // 8.25% demo tax
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost + (cartSubtotal > 0 ? estimatedTax : 0));

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ALOHA20') {
      setAppliedPromo({ code: 'ALOHA20', discountPercent: 20, freeShipping: false });
      showToast('Promo ALOHA20 applied: 20% Off Order!');
      return { success: true, message: '20% discount applied!' };
    }
    if (clean === 'ISLANDFREE') {
      setAppliedPromo({ code: 'ISLANDFREE', discountPercent: 0, freeShipping: true });
      showToast('Promo ISLANDFREE applied: Complimentary Shipping!');
      return { success: true, message: 'Free shipping applied!' };
    }
    showToast('Invalid promo code. Try ALOHA20 or ISLANDFREE');
    return { success: false, message: 'Invalid promo code. Valid test codes: ALOHA20, ISLANDFREE' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  // Categories & Filtering
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | 'all'>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tb_recent_searches');
      return saved ? JSON.parse(saved) : ['Silk Camp Shirt', 'Boracay Shorts', 'Linen Dress', 'Panama Hat'];
    } catch {
      return ['Silk Camp Shirt', 'Boracay Shorts', 'Linen Dress'];
    }
  });

  const addRecentSearch = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== term.toLowerCase());
      const next = [term.trim(), ...filtered].slice(0, 8);
      try {
        localStorage.setItem('tb_recent_searches', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('tb_recent_searches');
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const el = document.getElementById('mobile-scroll-container');
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    scrollToTop();
  };

  const closeProductDetails = () => {
    setSelectedProductId(null);
    scrollToTop();
  };

  const navigateToCategory = (cat: MainCategory) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(null);
    setSelectedProductId(null);
    setActiveTab('shop');
    scrollToTop();
  };

  const navigateToTab = (tab: 'home' | 'shop' | 'search' | 'favorites' | 'bag') => {
    setSelectedProductId(null);
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProductId,
        openProductDetails,
        closeProductDetails,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStoreLocatorOpen,
        setIsStoreLocatorOpen,
        isAccountOpen,
        setIsAccountOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        cartItems,
        addToBag,
        updateCartQuantity,
        removeFromBag,
        clearBag,
        cartCount,
        cartSubtotal,
        shippingCost,
        freeShippingThreshold,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        estimatedTax,
        cartTotal,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        toastMessage,
        showToast,
        navigateToCategory,
        navigateToTab
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
