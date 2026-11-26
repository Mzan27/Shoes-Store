import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function HomeView({ onOpenSizeGuide }) {
  const { navigateTo, setSelectedCategory, showToast, lang, t } = useStore();
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [copiedCoupon, setCopiedCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Product Cycling State (Clean Alternating, No 360 Tilt)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const prodRes = await api.fetchProducts();

        if (prodRes.success && prodRes.data.length > 0) {
          setAllProducts(prodRes.data);
          setFeaturedProducts(prodRes.data.filter(p => p.isFeatured));
          setNewArrivals(prodRes.data.filter(p => p.isNewArrival || p.badge === 'New'));
        }
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  // Auto-cycle through all products smoothly every 5 seconds (5s auto change)
  useEffect(() => {
    if (allProducts.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % allProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allProducts.length, isHovered]);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    showToast(t(`បានចម្លងកូដ ${code} រួចរាល់!`, `Code ${code} copied!`));
    setTimeout(() => setCopiedCoupon(null), 3000);
  };

  const currentHeroProduct = (allProducts.length > 0 && allProducts[currentHeroIndex]) || {
    id: 'nike-air-vapormax',
    name: 'Nike Air VaporMax Flyknit',
    khmerName: 'ស្បែកជើង Nike Air VaporMax',
    price: 135,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2400&q=95'],
    brand: 'Nike'
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    navigateTo('shop');
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <section style={{
        position: 'relative',
        padding: '60px 0 80px',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, transparent 100%)',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* Left Text */}
          <div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', lineHeight: 1.18, marginBottom: '18px', fontWeight: 800 }}>
              {t('ជំហានប្រកបដោយ', 'Step Forward With')} <br />
              <span className="gradient-text">{t('ទំនុកចិត្ត និងផាសុកភាព', 'Confidence & Comfort')}</span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '520px' }}>
              {t(
                'ស្វែងរកស្បែកជើងគ្រប់ប្រភេទ កីឡា ធ្វើការ ស៊ក និងផ្ទាត់ គុណភាពខ្ពស់ ធានាប្តូរទំហំ ៧ ថ្ងៃ និងគាំទ្រការទូទាត់រហ័សតាម KHQR Bakong។',
                'Discover premium shoes for every occasion: Sneakers, Formal, Casual and Sandals. 7-day size exchange guarantee with instant KHQR Bakong checkout.'
              )}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
                className="btn btn-primary btn-lg"
              >
                <span>👟 {t('ទស្សនាស្បែកជើងទាំងអស់', 'Shop All Shoes')}</span>
              </button>

              <button
                onClick={onOpenSizeGuide}
                className="btn btn-secondary btn-lg"
              >
                <span>📏 {t('តារាងវាស់ទំហំ', 'Size Guide')}</span>
              </button>
            </div>

            {/* Quick Stat Highlights */}
            <div style={{
              display: 'flex',
              gap: '28px',
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>1,500+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('គូស្បែកជើងក្នុងស្តុក', 'Shoes in Stock')}</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary)' }}>100%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('ធានាគុណភាពពិត', 'Authentic Quality')}</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary)' }}>KHQR</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('Bakong ភ្លាមៗ', 'Instant Bakong')}</div>
              </div>
            </div>
          </div>

          {/* Right Alternating Product Showcase (Clean, No 360 Tilt) */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '460px', margin: '0 auto' }}>
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                position: 'relative',
                width: '100%',
                height: '350px',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(15, 23, 42, 0.7)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                overflow: 'hidden'
              }}
            >
              {/* Clean Flat Shoe Photography */}
              <img
                key={currentHeroProduct.id || currentHeroIndex}
                src={(currentHeroProduct?.images && currentHeroProduct.images[0]) || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}
                alt={currentHeroProduct.name}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none'
                }}
              />

              {/* Floating Bottom Badge */}
              <div 
                onClick={() => navigateTo('product-detail', currentHeroProduct.id)}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff' }}>
                    {lang === 'km' && currentHeroProduct.khmerName ? currentHeroProduct.khmerName : currentHeroProduct.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, marginTop: '2px' }}>
                    ${(Number(currentHeroProduct?.price) || 0).toFixed(2)} • {t('ពេញនិយមបំផុត', 'Best Seller')}
                  </div>
                </div>

                <div style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  {t('ទស្សនា', 'View')}
                </div>
              </div>
            </div>

            {/* Alternating Controls: Prev / Next / Indicator Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '14px' }}>
              <button
                type="button"
                onClick={() => setCurrentHeroIndex(prev => (prev - 1 + (allProducts.length || 1)) % (allProducts.length || 1))}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  padding: '5px 14px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                ⬅️ {t('ថយក្រោយ', 'Prev')}
              </button>

              <div style={{ display: 'flex', gap: '6px' }}>
                {(allProducts.length > 0 ? allProducts.slice(0, 12) : [1, 2, 3, 4]).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentHeroIndex(idx)}
                    style={{
                      width: currentHeroIndex === idx ? '22px' : '7px',
                      height: '7px',
                      borderRadius: '4px',
                      background: currentHeroIndex === idx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentHeroIndex(prev => (prev + 1) % (allProducts.length || 1))}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  padding: '5px 14px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                {t('បន្ទាប់', 'Next')} ➡️
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Bar with Click-to-copy codes */}
      <section style={{
        padding: '16px 0',
        background: 'rgba(255, 255, 255, 0.02)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              🔥 {t('ប្រូម៉ូសិនពិសេស៖ ទទួលបានការបញ្ចុះតម្លៃបន្ថែមភ្លាមៗ!', 'Special Offers: Get Instant Extra Discounts!')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px dashed var(--accent-primary)',
              fontSize: '0.85rem'
            }}>
              <span>{t('កូដ 10%៖', '10% Code:')} <strong>STEPUP10</strong></span>
              <button
                onClick={() => handleCopyCode('STEPUP10')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
              >
                {copiedCoupon === 'STEPUP10' ? t('ចម្លងរួច', 'Copied') : t('ចម្លង', 'Copy')}
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px dashed var(--border-hover)',
              fontSize: '0.85rem'
            }}>
              <span>{t('កូដបញ្ចុះតម្លៃ $20៖', '$20 Off Code:')} <strong>WELCOME20</strong></span>
              <button
                onClick={() => handleCopyCode('WELCOME20')}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
              >
                {copiedCoupon === 'WELCOME20' ? t('ចម្លងរួច', 'Copied') : t('ចម្លង', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shoes */}
      <section style={{ padding: '30px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div className="badge badge-hot" style={{ marginBottom: '8px' }}>
                🔥 {t('បណ្តុំស្បែកជើងពេញនិយម', 'Bestseller Collections')}
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {t('ស្បែកជើងពេញនិយម', 'Featured Shoes')}
              </h2>
            </div>
            <button
              onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
              className="btn btn-secondary btn-sm"
            >
              <span>{t('ទស្សនាបន្ថែម', 'View More')}</span>
            </button>
          </div>

          <div className="grid-products">
            {(Array.isArray(featuredProducts) ? featuredProducts : []).slice(0, 8).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* New Shoe Arrivals */}
      <section style={{ padding: '20px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div className="badge badge-new" style={{ marginBottom: '8px' }}>✨ {t('ទំនិញមកដល់ថ្មី ២០២៦', 'New Arrivals 2026')}</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {t('ស្បែកជើងមកដល់ថ្មី', 'New Shoe Arrivals')}
              </h2>
            </div>
            <button
              onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
              className="btn btn-secondary btn-sm"
            >
              <span>{t('មើលទាំងអស់', 'View All')}</span>
            </button>
          </div>

          <div className="grid-products">
            {(Array.isArray(newArrivals) ? newArrivals : []).slice(0, 8).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
