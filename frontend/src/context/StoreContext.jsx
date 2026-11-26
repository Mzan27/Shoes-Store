import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { subscribeToAuth, logoutUser } from '../services/authService';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Navigation / View state
  const isInitialAdmin = typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.pathname === '/admin');
  const [currentView, setCurrentView] = useState(isInitialAdmin ? 'admin' : 'home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('stepup_theme') || 'dark');

  // Language state: 'km' (Khmer) or 'en' (English)
  const [lang, setLang] = useState(() => localStorage.getItem('stepup_lang') || 'km');

  useEffect(() => {
    localStorage.setItem('stepup_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'km' ? 'en' : 'km'));
  };

  // Helper translation function
  const t = (km, en) => (lang === 'en' ? en : km);

  // Cart state persisted safely
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('stepup_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted safely
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('stepup_wishlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Applied coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Active confirmed order
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Admin / User status
  const [isAdminMode, setIsAdminMode] = useState(isInitialAdmin);

  // Store settings
  const [storeSettings, setStoreSettings] = useState(null);

  // Firebase Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminMode(true);
        setCurrentView('admin');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    showToast('បានចាកចេញពីគណនី (Logged out successfully)', 'info');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('stepup_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('stepup_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('stepup_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    api.fetchStoreSettings().then(res => {
      if (res.success) setStoreSettings(res.data);
    }).catch(err => console.error('Failed to load store settings:', err));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Cart actions
  const addToCart = (product, size, color, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 40;
    const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            khmerName: product.khmerName,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images && product.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity
          }
        ];
      }
    });

    showToast(`បានបន្ថែម ${product.name} (Size: ${selectedSize}) ទៅក្នុងកន្ត្រក!`);
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item));
  };

  const updateCartSize = (cartItemId, newSize) => {
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, size: newSize } : item));
    showToast(`បានប្តូរទំហំទៅ Size ${newSize}`);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('បានដកទំនិញចេញពីកន្ត្រក', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Totals calculated safely
  const cartSafe = Array.isArray(cart) ? cart : [];
  const cartSubtotal = cartSafe.reduce((sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 1), 0);
  const cartItemsCount = cartSafe.reduce((sum, item) => sum + (Number(item?.quantity) || 1), 0);
  
  // Shipping calculation (free over $50)
  const shippingFee = cartSubtotal >= 50 || cartSafe.length === 0 ? 0 : 1.50;
  
  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = (cartSubtotal * (Number(appliedCoupon.discount) || 0)) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(cartSubtotal, Number(appliedCoupon.discount) || 0);
    } else if (appliedCoupon.type === 'shipping') {
      discountAmount = shippingFee;
    }
  }

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Wishlist actions safe
  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    const currentWishlist = Array.isArray(wishlist) ? wishlist : [];
    const exists = currentWishlist.some(item => item && item.id === product.id);
    if (exists) {
      setWishlist(prev => (Array.isArray(prev) ? prev : []).filter(item => item && item.id !== product.id));
      showToast(`បានដក ${product.name || 'ស្បែកជើង'} ពី Wishlist`, 'info');
    } else {
      setWishlist(prev => [...(Array.isArray(prev) ? prev : []), product]);
      showToast(`បានបន្ថែម ${product.name || 'ស្បែកជើង'} ទៅក្នុង Wishlist!`);
    }
  };

  const isProductInWishlist = (productId) => {
    if (!productId) return false;
    return (Array.isArray(wishlist) ? wishlist : []).some(item => item && item.id === productId);
  };

  // Navigate helper
  const navigateTo = (view, productId = null) => {
    setCurrentView(view);
    if (view === 'admin') {
      setIsAdminMode(true);
      if (typeof window !== 'undefined' && window.location.hash !== '#admin') {
        window.location.hash = 'admin';
      }
    } else {
      setIsAdminMode(false);
      if (typeof window !== 'undefined' && window.location.hash === '#admin') {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    if (productId) setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        theme,
        toggleTheme,
        cart,
        addToCart,
        updateCartQuantity,
        updateCartSize,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemsCount,
        shippingFee,
        discountAmount,
        grandTotal,
        appliedCoupon,
        setAppliedCoupon,
        wishlist,
        toggleWishlist,
        isProductInWishlist,
        lastPlacedOrder,
        setLastPlacedOrder,
        toast,
        showToast,
        isAdminMode,
        setIsAdminMode,
        storeSettings,
        setStoreSettings,
        currentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        handleLogout,
        lang,
        setLang,
        toggleLang,
        t
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
