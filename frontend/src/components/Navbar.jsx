import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  Compass, 
  Menu, 
  X,
  PhoneCall,
  Ruler,
  Truck,
  User,
  LogOut
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
    toggleLang,
    t
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div style={{
        background: '#0a0d14',
        color: '#94a3b8',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '6px 16px',
        fontSize: '0.82rem',
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 101,
        position: 'relative'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>
              {t('កូដបញ្ចុះតម្លៃ 10%: ', '10% OFF Code: ')}
              <strong style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>STEPUP10</strong>
              {t(' | ដឹកជញ្ជូនឥតគិតថ្លៃលើសពី $50', ' | Free Shipping on orders over $50')}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button 
              onClick={onOpenSizeGuide}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem'
              }}
            >
              <Ruler size={13} /> {t('តារាងទំហំ (Size Guide)', 'Size Guide')}
            </button>
            <span style={{ display: 'none', md: 'inline', color: 'var(--text-muted)' }}>📞 012 345 678</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-nav">
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          gap: '20px'
        }}>
          {/* Logo & Brand */}
          <div 
            onClick={() => { setIsAdminMode(false); navigateTo('home'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 12px rgba(255, 87, 34, 0.25)'
            }}>
              👟
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  STEP<span style={{ color: 'var(--accent-primary)' }}>UP</span>
                </span>
                <span className="badge badge-hot" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>SHOES</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '-2px' }}>
                {t('ហាងស្បែកជើងទាន់សម័យ', 'Modern Footwear Store')}
              </div>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '0.92rem',
            fontWeight: 600
          }}>
            <button 
              onClick={() => { setIsAdminMode(false); navigateTo('home'); }}
              style={{
                background: 'none',
                border: 'none',
                color: !isAdminMode && currentView === 'home' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: !isAdminMode && currentView === 'home' ? 700 : 500,
                transition: 'color var(--transition-fast)'
              }}
            >
              {t('ទំព័រដើម', 'Home')}
            </button>
            <button 
              onClick={() => { setIsAdminMode(false); navigateTo('shop'); }}
              style={{
                background: 'none',
                border: 'none',
                color: !isAdminMode && currentView === 'shop' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: !isAdminMode && currentView === 'shop' ? 700 : 500,
                transition: 'color var(--transition-fast)'
              }}
            >
              {t('ស្បែកជើងទាំងអស់', 'Shop All')}
            </button>
            <button 
              onClick={() => { setIsAdminMode(false); navigateTo('tracking'); }}
              style={{
                background: 'none',
                border: 'none',
                color: !isAdminMode && currentView === 'tracking' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: !isAdminMode && currentView === 'tracking' ? 700 : 500,
                transition: 'color var(--transition-fast)'
              }}
            >
              <Truck size={16} /> {t('តាមដានការដឹក', 'Track Order')}
            </button>
            <button 
              onClick={() => { setIsAdminMode(false); navigateTo('about'); }}
              style={{
                background: 'none',
                border: 'none',
                color: !isAdminMode && currentView === 'about' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: !isAdminMode && currentView === 'about' ? 700 : 500,
                transition: 'color var(--transition-fast)'
              }}
            >
              {t('អំពីយើង & ទំនាក់ទំនង', 'About & Contact')}
            </button>
          </div>

          {/* Right Action Icons & Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <input 
                type="text"
                placeholder={t('ស្វែងរកស្បែកជើង...', 'Search shoes...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 14px 8px 34px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  width: '180px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.width = '220px'}
                onBlur={(e) => e.target.style.width = '180px'}
              />
              <Search 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none'
                }} 
              />
            </form>

            {/* Language Switcher Button (Khmer & English) */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-light)',
                borderRadius: '20px',
                padding: '2px',
                gap: '2px'
              }}
              title="ជ្រើសរើសភាសា / Select Language"
            >
              <button
                type="button"
                onClick={() => setLang('km')}
                style={{
                  background: lang === 'km' ? 'var(--accent-primary)' : 'transparent',
                  color: lang === 'km' ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '4px 9px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  transition: 'all 0.2s ease'
                }}
                title="ប្តូរទៅភាសាខ្មែរ"
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
                  padding: '4px 9px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  transition: 'all 0.2s ease'
                }}
                title="Switch to English"
              >
                🇬🇧 EN
              </button>
            </div>

            {/* Wishlist Icon */}
            <button 
              onClick={() => { setIsAdminMode(false); navigateTo('wishlist'); }}
              className="btn btn-secondary btn-icon"
              title="Wishlist"
              style={{ position: 'relative' }}
            >
              <Heart size={18} color={wishlist.length > 0 ? '#ff5e36' : 'currentColor'} fill={wishlist.length > 0 ? '#ff5e36' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => { setIsAdminMode(false); navigateTo('cart'); }}
              className="btn btn-primary btn-icon"
              title="Cart"
              style={{ position: 'relative' }}
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#fff',
                  color: 'var(--accent-primary)',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}>
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="btn btn-secondary btn-icon"
              title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            >
              {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
            </button>

            {/* User Profile / Sign In */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px 4px 6px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.84rem',
                    fontWeight: 600
                  }}
                  title={currentUser.email}
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="" 
                      style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem'
                    }}>
                      {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-icon"
                  title={t('ចាកចេញ', 'Sign Out')}
                  style={{ width: '32px', height: '32px', padding: 0 }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  background: 'rgba(255, 87, 34, 0.12)',
                  borderColor: 'rgba(255, 87, 34, 0.3)',
                  color: 'var(--accent-primary)'
                }}
              >
                <User size={15} />
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
              className="btn btn-secondary btn-sm"
              style={{
                borderColor: (isAdminMode || currentView === 'admin') ? 'var(--accent-primary)' : 'var(--border-light)',
                background: (isAdminMode || currentView === 'admin') ? 'rgba(255, 87, 34, 0.18)' : 'rgba(255,255,255,0.05)',
                color: (isAdminMode || currentView === 'admin') ? 'var(--accent-primary)' : 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title={isAdminMode || currentView === 'admin' ? t('ប្តូរទៅកាន់ហាង', 'Switch to Store') : t('ប្តូរទៅកាន់ Admin Panel', 'Switch to Admin')}
            >
              <LayoutDashboard size={15} />
              <span>{(isAdminMode || currentView === 'admin') ? t('ហាងទំនិញ', 'Customer Store') : t('ផ្ទាំង Admin', 'Admin Panel')}</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
