import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  Menu, 
  X, 
  Ruler, 
  Truck, 
  User, 
  LogOut,
  ChevronRight,
  Flame
} from 'lucide-react';

export default function Navbar({ onOpenSizeGuide }) {
  const { 
    currentView, 
    navigateTo, 
    cartItemsCount, 
    wishlist, 
    theme, 
    toggleTheme, 
    searchQuery, 
    setSearchQuery,
    isAdminMode,
    setIsAdminMode,
    currentUser,
    setIsAuthModalOpen,
    handleLogout,
    lang,
    setLang,
    t
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setMobileMenuOpen(false);
    }
  };

  const handleNav = (view) => {
    setIsAdminMode(false);
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR */}
      <div style={{
        background: '#070a10',
        color: '#94a3b8',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '6px 20px',
        fontSize: '0.8rem',
        fontWeight: 500,
        zIndex: 101,
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {/* Promo Offer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center' }}>
              <Flame size={13} style={{ marginRight: '3px' }} />
            </span>
            <span>
              {t('កូដបញ្ចុះតម្លៃ 10%: ', '10% OFF Code: ')}
              <strong style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>STEPUP10</strong>
              <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
              {t('ដឹកជញ្ជូនឥតគិតថ្លៃលើសពី $50', 'Free delivery on orders over $50')}
            </span>
          </div>

          {/* Quick Utility Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem' }}>
            <button 
              onClick={onOpenSizeGuide}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                fontSize: '0.78rem',
                fontFamily: 'inherit',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
            >
              <Ruler size={13} /> {t('តារាងទំហំ (Size Guide)', 'Size Guide')}
            </button>
            <span style={{ opacity: 0.3 }}>|</span>
            <span style={{ color: 'var(--text-muted)' }}>📞 012 345 678</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN GLASS NAVBAR */}
      <nav className="glass-nav">
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer', 
              userSelect: 'none',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, #ff784e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)',
              flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 13h17l-1.5 5.5a2 2 0 0 1-1.9 1.5H6.9a2 2 0 0 1-1.9-1.5L3.5 13z"/>
                <path d="M5.5 13l2.5-7h8l2.5 7"/>
                <path d="M10 6v3"/>
                <path d="M14 6v3"/>
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', lineHeight: 1.1 }}>
                <span style={{ fontSize: '1.28rem', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
                  STEP<span style={{ color: 'var(--accent-primary)' }}>UP</span>
                </span>
                <span style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  background: 'rgba(255, 87, 34, 0.12)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(255, 87, 34, 0.25)'
                }}>
                  STUDIO
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px' }}>
                {t('ហាងស្បែកជើងទាន់សម័យ', 'Modern Footwear Studio')}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="nav-links-desktop">
            <button 
              onClick={() => handleNav('home')}
              className={'nav-link-btn' + (!isAdminMode && currentView === 'home' ? ' active' : '')}
            >
              {t('ទំព័រដើម', 'Home')}
            </button>
            <button 
              onClick={() => handleNav('shop')}
              className={'nav-link-btn' + (!isAdminMode && currentView === 'shop' ? ' active' : '')}
            >
              {t('ស្បែកជើងទាំងអស់', 'Shop All')}
            </button>
            <button 
              onClick={() => handleNav('tracking')}
              className={'nav-link-btn' + (!isAdminMode && currentView === 'tracking' ? ' active' : '')}
            >
              <Truck size={15} />
              <span>{t('តាមដានការដឹក', 'Tracking')}</span>
            </button>
            <button 
              onClick={() => handleNav('about')}
              className={'nav-link-btn' + (!isAdminMode && currentView === 'about' ? ' active' : '')}
            >
              {t('អំពីយើង', 'About Us')}
            </button>
          </div>

          {/* Right Action Icons & Utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Search Input (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="nav-search-desktop" style={{ position: 'relative' }}>
              <input 
                type="text"
                placeholder={t('ស្វែងរកស្បែកជើង...', 'Search shoes...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '7px 12px 7px 32px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  width: '140px',
                  transition: 'all 0.25s ease',
                  outline: 'none'
                }}
                onFocus={(e) => { e.target.style.width = '190px'; e.target.style.borderColor = 'var(--accent-primary)'; }}
                onBlur={(e) => { e.target.style.width = '140px'; e.target.style.borderColor = 'var(--border-light)'; }}
              />
              <Search 
                size={14} 
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none'
                }} 
              />
            </form>

            {/* Language Switcher Button (Clean, Non-Wrapping Segmented Control) */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-light)',
                borderRadius: '20px',
                padding: '2px',
                height: '32px',
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
              title="ជ្រើសរើសភាសា / Switch Language"
            >
              <button
                type="button"
                onClick={() => setLang('km')}
                style={{
                  background: lang === 'km' ? 'var(--accent-primary)' : 'transparent',
                  color: lang === 'km' ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '3px 8px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  height: '26px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: lang === 'km' ? '0 2px 6px rgba(255, 87, 34, 0.3)' : 'none'
                }}
              >
                <span>🇰🇭</span>
                <span>ខ្មែរ</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                style={{
                  background: lang === 'en' ? 'var(--accent-primary)' : 'transparent',
                  color: lang === 'en' ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '3px 8px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  height: '26px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: lang === 'en' ? '0 2px 6px rgba(255, 87, 34, 0.3)' : 'none'
                }}
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Wishlist Button */}
            <button 
              onClick={() => handleNav('wishlist')}
              className="nav-icon-btn"
              title={t('បញ្ជីចង់បាន', 'Wishlist')}
            >
              <Heart size={18} color={wishlist.length > 0 ? 'var(--accent-primary)' : 'currentColor'} fill={wishlist.length > 0 ? 'var(--accent-primary)' : 'none'} />
              {wishlist.length > 0 && <span className="nav-badge-dot" />}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => handleNav('cart')}
              className="nav-icon-btn"
              title={t('កន្ត្រកទំនិញ', 'Cart')}
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span className="nav-cart-badge">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="nav-icon-btn"
              title={theme === 'dark' ? t('ប្តូរទៅពន្លឺថ្ងៃ', 'Switch to Light') : t('ប្តូរទៅផ្ទៃងងឹត', 'Switch to Dark')}
            >
              {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#818cf8" />}
            </button>

            {/* User Account / Sign In */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px 3px 4px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    maxWidth: '120px'
                  }}
                  title={currentUser.email}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : (currentUser.email ? currentUser.email[0].toUpperCase() : 'U')}
                  </div>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="nav-icon-btn"
                  title={t('ចាកចេញ', 'Sign Out')}
                  style={{ width: '32px', height: '32px' }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                <User size={14} />
                <span>{t('ចូលគណនី', 'Sign In')}</span>
              </button>
            )}

            {/* Admin Switcher Button */}
            <button 
              onClick={() => {
                if (isAdminMode || currentView === 'admin') {
                  navigateTo('home');
                } else {
                  navigateTo('admin');
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '16px',
                border: '1px solid ' + ((isAdminMode || currentView === 'admin') ? 'var(--accent-primary)' : 'var(--border-light)'),
                background: (isAdminMode || currentView === 'admin') ? 'rgba(255, 87, 34, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                color: (isAdminMode || currentView === 'admin') ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}
              title={isAdminMode || currentView === 'admin' ? t('ប្តូរទៅកាន់ហាង', 'Switch to Store') : t('ប្តូរទៅកាន់ Admin Panel', 'Switch to Admin')}
            >
              <LayoutDashboard size={13} />
              <span>{(isAdminMode || currentView === 'admin') ? t('ហាង', 'Store') : 'Admin'}</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="nav-icon-btn nav-mobile-toggle"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. RESPONSIVE MOBILE SLIDE-DOWN DRAWER */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '105px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 7, 12, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div className="glass-panel" style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Search inside Mobile Menu */}
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%' }}>
              <input 
                type="text"
                placeholder={t('ស្វែងរកស្បែកជើង...', 'Search shoes...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <Search 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} 
              />
            </form>

            {/* Mobile Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => handleNav('home')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: currentView === 'home' && !isAdminMode ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: currentView === 'home' && !isAdminMode ? 'var(--accent-primary)' : 'var(--text-primary)',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{t('ទំព័រដើម', 'Home')}</span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => handleNav('shop')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: currentView === 'shop' && !isAdminMode ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: currentView === 'shop' && !isAdminMode ? 'var(--accent-primary)' : 'var(--text-primary)',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{t('ស្បែកជើងទាំងអស់', 'Shop All Footwear')}</span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => handleNav('tracking')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: currentView === 'tracking' && !isAdminMode ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: currentView === 'tracking' && !isAdminMode ? 'var(--accent-primary)' : 'var(--text-primary)',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={16} />
                  <span>{t('តាមដានការដឹក', 'Order Tracking')}</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => handleNav('about')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: currentView === 'about' && !isAdminMode ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: currentView === 'about' && !isAdminMode ? 'var(--accent-primary)' : 'var(--text-primary)',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{t('អំពីយើង & ទំនាក់ទំនង', 'About & Contact')}</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Mobile Size Guide Button */}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSizeGuide(); }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Ruler size={16} />
              <span>{t('តារាងវាស់ទំហំ (Size Guide)', 'Shoe Size Guide')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
