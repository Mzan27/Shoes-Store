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
    handleLogout
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
        background: 'linear-gradient(90deg, #ff5e36, #ff9900)',
        color: '#fff',
        padding: '6px 16px',
        fontSize: '0.82rem',
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 101,
        position: 'relative'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔥 កូដបញ្ចុះតម្លៃ 10%: <strong style={{ textDecoration: 'underline' }}>STEPUP10</strong> | ដឹកជញ្ជូនឥតគិតថ្លៃលើសពី $50</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={onOpenSizeGuide}
              style={{
                background: 'rgba(0,0,0,0.15)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.78rem'
              }}
            >
              <Ruler size={13} /> Size Guide (តារាងទំហំ)
            </button>
            <span style={{ display: 'none', md: 'inline' }}>📞 012 345 678</span>
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
              background: 'linear-gradient(135deg, #ff5e36, #ff9900)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 14px rgba(255, 94, 54, 0.4)'
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
                ហាងស្bែកជើងទាន់សម័យ
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
              ទំព័រដើម (Home)
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
              ស្បែកជើងទាំងអស់ (Shop)
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
              <Truck size={16} /> តាមដានការដឹក (Tracking)
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
              អំពីយើង & ទំនាក់ទំនង
            </button>
          </div>

          {/* Right Action Icons & Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <input 
                type="text"
                placeholder="ស្វែងរកស្បែកជើង..."
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
                onFocus={(e) => e.target.style.width = '230px'}
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
                  title="ចាកចេញ (Sign Out)"
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
                  background: 'rgba(255, 94, 54, 0.12)',
                  borderColor: 'rgba(255, 94, 54, 0.3)',
                  color: 'var(--accent-primary)'
                }}
              >
                <User size={15} />
                <span>ចូលគណនី</span>
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
                background: (isAdminMode || currentView === 'admin') ? 'rgba(255, 94, 54, 0.2)' : 'rgba(255,255,255,0.05)',
                color: (isAdminMode || currentView === 'admin') ? 'var(--accent-primary)' : 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="ប្តូរទៅកាន់ផ្ទាំងគ្រប់គ្រង Admin / Customer Store"
            >
              <LayoutDashboard size={15} />
              <span>{(isAdminMode || currentView === 'admin') ? 'Customer Store' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
