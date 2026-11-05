import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SizeGuideModal from './components/SizeGuideModal';
import AuthModal from './components/AuthModal';

// Views
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import ProductDetailView from './views/ProductDetailView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import OrderConfirmationView from './views/OrderConfirmationView';
import OrderTrackingView from './views/OrderTrackingView';
import WishlistView from './views/WishlistView';
import AboutContactView from './views/AboutContactView';
import AdminDashboardView from './views/AdminDashboardView';

function StoreApp() {
  const { currentView, isAdminMode, toast, isAuthModalOpen, setIsAuthModalOpen, showToast } = useStore();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar onOpenSizeGuide={() => setSizeGuideOpen(true)} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {isAdminMode || currentView === 'admin' ? (
          <AdminDashboardView />
        ) : (
          <>
            {currentView === 'home' && <HomeView onOpenSizeGuide={() => setSizeGuideOpen(true)} />}
            {currentView === 'shop' && <ShopView onOpenSizeGuide={() => setSizeGuideOpen(true)} />}
            {currentView === 'product-detail' && <ProductDetailView onOpenSizeGuide={() => setSizeGuideOpen(true)} />}
            {currentView === 'cart' && <CartView />}
            {currentView === 'checkout' && <CheckoutView />}
            {currentView === 'order-success' && <OrderConfirmationView />}
            {currentView === 'tracking' && <OrderTrackingView />}
            {currentView === 'wishlist' && <WishlistView />}
            {currentView === 'about' && <AboutContactView onOpenSizeGuide={() => setSizeGuideOpen(true)} />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenSizeGuide={() => setSizeGuideOpen(true)} />

      {/* Size Guide Modal (Accessible from anywhere) */}
      <SizeGuideModal 
        isOpen={sizeGuideOpen} 
        onClose={() => setSizeGuideOpen(false)} 
      />

      {/* Firebase Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user, type) => {
          showToast(`🎉 ស្វាគមន៍ ${user.displayName || user.email}!`);
        }}
      />

      {/* Global Floating Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(17, 23, 38, 0.95)',
          color: '#ffffff',
          padding: '14px 22px',
          borderRadius: 'var(--radius-md)',
          backdropFilter: 'blur(12px)',
          border: toast.type === 'error' ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--accent-primary)',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.92rem',
          fontWeight: 600,
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease'
        }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}
