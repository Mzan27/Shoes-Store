import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

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
              <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>👟</span>
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
                placeholder={t('🔍 ស្វែងរកស្បែកជើង...', '🔍 Search shoes...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  width: '140px',
                  transition: 'all 0.25s ease',
                  outline: 'none'
                }}
                onFocus={(e) => { e.target.style.width = '180px'; e.target.style.borderColor = 'var(--accent-primary)'; }}
                onBlur={(e) => { e.target.style.width = '140px'; e.target.style.borderColor = 'var(--border-light)'; }}
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
                  padding: '3px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '26px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: lang === 'km' ? '0 2px 6px rgba(255, 87, 34, 0.3)' : 'none'
                }}
              >
                🇰🇭 ខ្មែរ
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                style={{
                  background: lang === 'en' ? 'var(--accent-primary)' : 'transparent',
                  color: lang === 'en' ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '3px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '26px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: lang === 'en' ? '0 2px 6px rgba(255, 87, 34, 0.3)' : 'none'
                }}
              >
                🇬🇧 English
              </button>
            </div>

            {/* Wishlist Button (Text Pill) */}
            <button 
              onClick={() => handleNav('wishlist')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 12px',
                borderRadius: '16px',
                background: wishlist.length > 0 ? 'rgba(255, 94, 54, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid ' + (wishlist.length > 0 ? 'var(--accent-primary)' : 'var(--border-light)'),
                color: wishlist.length > 0 ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              ❤️ {t('ចូលចិត្ត', 'Wishlist')}{wishlist.length > 0 ? ` (${wishlist.length})` : ''}
            </button>

            {/* Cart Button (Text Pill) */}
            <button 
              onClick={() => handleNav('cart')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 14px',
                borderRadius: '16px',
                background: cartItemsCount > 0 ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid ' + (cartItemsCount > 0 ? 'var(--accent-primary)' : 'var(--border-light)'),
                color: cartItemsCount > 0 ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              🛒 {t('កន្ត្រក', 'Cart')}{cartItemsCount > 0 ? ` (${cartItemsCount})` : ''}
            </button>

            {/* Theme Toggle Button (Text Pill) */}
            <button 
              onClick={toggleTheme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 10px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {theme === 'dark' ? t('☀️ ពន្លឺ', '☀️ Light') : t('🌙 ងងឹត', '🌙 Dark')}
            </button>

            {/* User Account / Sign In */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    maxWidth: '120px'
                  }}
                  title={currentUser.email}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '14px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {t('ចាកចេញ', 'Sign Out')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 12px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <span>👤 {t('ចូលគណនី', 'Sign In')}</span>
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
                padding: '5px 10px',
                borderRadius: '16px',
                border: '1px solid ' + ((isAdminMode || currentView === 'admin') ? 'var(--accent-primary)' : 'var(--border-light)'),
                background: (isAdminMode || currentView === 'admin') ? 'rgba(255, 87, 34, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                color: (isAdminMode || currentView === 'admin') ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <span>{(isAdminMode || currentView === 'admin') ? t('🏪 ហាង', '🏪 Store') : '⚙️ Admin'}</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="nav-icon-btn nav-mobile-toggle"
              style={{ padding: '4px 10px', fontSize: '0.82rem', fontWeight: 700 }}
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? t('បិទ', 'Close') : t('មីនុយ', 'Menu')}
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
            {/* Language Switcher (2 Tabs: ខ្មែរ / English) in Mobile Menu */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {t('ជ្រើសរើសភាសា', 'Select Language')}
              </span>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2px',
                  height: '32px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setLang('km')}
                  style={{
                    background: lang === 'km' ? 'var(--accent-primary)' : 'transparent',
                    color: lang === 'km' ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '3px 12px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: lang === 'km' ? '0 2px 6px rgba(255, 87, 34, 0.3)' : 'none'
                  }}
                >
                  ខ្មែរ
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  style={{
                    background: lang === 'en' ? 'var(--accent-primary)' : 'transparent',
                    color: lang === 'en' ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '3px 12px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: lang === 'en' ? '0 2px 6px rgba(255, 87, 34, 0.3)' : 'none'
                  }}
                >
                  English
                </button>
              </div>
            </div>

            {/* Search inside Mobile Menu */}
            <form onSubmit={handleSearchSubmit} style={{ width: '100%' }}>
              <input 
                type="text"
                placeholder={t('🔍 ស្វែងរកស្បែកជើង...', '🔍 Search shoes...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
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
                <span>{t('តាមដានការដឹក', 'Order Tracking')}</span>
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
              </button>
            </div>

            {/* Mobile Size Guide Button */}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSizeGuide(); }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>{t('តារាងវាស់ទំហំ', 'Shoe Size Guide')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
