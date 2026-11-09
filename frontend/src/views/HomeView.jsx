import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import ProductCard from '../components/ProductCard';
import { 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Check, 
  Copy, 
  Ruler, 
  ChevronRight, 
  ShieldCheck, 
  Award,
  Send
} from 'lucide-react';

export default function HomeView({ onOpenSizeGuide }) {
  const { navigateTo, setSelectedCategory, showToast, t } = useStore();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [copiedCoupon, setCopiedCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          api.fetchProducts(),
          api.fetchCategories()
        ]);

        if (prodRes.success) {
          setFeaturedProducts(prodRes.data.filter(p => p.isFeatured));
          setNewArrivals(prodRes.data.filter(p => p.isNewArrival || p.badge === 'New'));
        }

        if (catRes.success) {
          setCategories(catRes.data);
        }
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    showToast(`📋 បានចម្លងកូដ ${code} រួចរាល់!`);
    setTimeout(() => setCopiedCoupon(null), 3000);
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
                'ស្វែងរកស្បែកជើងគ្រប់ប្រភេទ Sneakers, Formal, Casual និង Sandals គុណភាពខ្ពស់ ធានាប្តូរ Size រយៈពេល ៧ ថ្ងៃ និងគាំទ្រការទូទាត់រហ័សតាម KHQR Bakong។',
                'Discover premium shoes for every occasion: Sneakers, Formal, Casual and Sandals. 7-day size exchange guarantee with instant KHQR Bakong checkout.'
              )}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
                className="btn btn-primary btn-lg"
              >
                <span>{t('ទស្សនាស្បែកជើងទាំងអស់', 'Shop All Shoes')}</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={onOpenSizeGuide}
                className="btn btn-secondary btn-lg"
              >
                <Ruler size={18} />
                <span>{t('តារាងវាស់ទំហំ (Size Guide)', 'Size Guide')}</span>
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

          {/* Right Floating Shoe Graphic */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              position: 'absolute',
              width: '360px',
              height: '360px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 87, 34, 0.12) 0%, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: 0
            }} />

            <div className="animate-float" style={{ position: 'relative', zIndex: 1, maxWidth: '480px', width: '100%' }}>
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85" 
                alt="Nike Air VaporMax Featured Shoe"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-light)',
                  filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))'
                }}
              />
              {/* Floating Overlay Badge */}
              <div className="glass-panel" style={{
                position: 'absolute',
                bottom: '-15px',
                left: '20px',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-md)'
              }}>
                <span style={{ fontSize: '1.8rem' }}>👟</span>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Nike Air VaporMax Flyknit</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 600 }}>$135.00 • Best Seller</div>
                </div>
              </div>
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
              {t('ប្រូម៉ូសិនពិសេស៖ ទទួលបានការបញ្ចុះតម្លៃបន្ថែមភ្លាមៗ!', 'Special Offers: Get Instant Extra Discounts!')}
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
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Copy code"
              >
                {copiedCoupon === 'STEPUP10' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
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
              <span>{t('កូដ $20 Off៖', '$20 Off Code:')} <strong>WELCOME20</strong></span>
              <button 
                onClick={() => handleCopyCode('WELCOME20')}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Copy code"
              >
                {copiedCoupon === 'WELCOME20' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div className="badge badge-new" style={{ marginBottom: '8px' }}>
                {t('រចនាសម្ព័ន្ធប្រភេទទំនិញ', 'Categories')}
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {t('ប្រភេទស្បែកជើងចម្បង', 'Featured Categories')}
              </h2>
            </div>
            <button 
              onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
              className="btn btn-secondary btn-sm"
            >
              <span>{t('មើលទាំងអស់', 'View All')}</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '18px'
          }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="glass-panel"
                style={{
                  padding: '24px 20px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--border-light)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{cat.icon}</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{cat.name}</h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '6px' }}>
                  {cat.khmerName}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Shoes */}
      <section style={{ padding: '30px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div className="badge badge-hot" style={{ marginBottom: '8px' }}>
                Bestseller Collections
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
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid-products">
            {featuredProducts.slice(0, 4).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Telegram Real-Time Alert Banner Showcase */}
      <section style={{ padding: '20px 0 50px' }}>
        <div className="container">
          <div className="glass-panel" style={{
            padding: '36px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '10px' }} className="badge badge-new">
                Telegram Bot Integration
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '10px' }}>
                {t('ប្រព័ន្ធផ្ញើសារដំណឹងការបញ្ជាទិញទៅ Telegram ភ្លាមៗ', 'Real-Time Order Notifications via Telegram')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t(
                  'រាល់ការកុម្ម៉ង់ទិញស្បែកជើងនៅលើ Website នឹងត្រូវរៀបចំបញ្ជូនសារជូនដំណឹងភ្លាមៗទៅកាន់ Telegram របស់ម្ចាស់ហាង (Email: chhoyyeanseou5@gmail.com) រួមមានលេខកូដទំនិញ ឈ្មោះ អតិថិជន លេខទូរស័ព្ទ ទំហំ Size និងទីតាំងដឹកជញ្ជូន។',
                  'Every order placed on the website automatically sends instant notification alerts directly to Telegram for the store manager, including product codes, customer name, phone number, shoe size, and shipping address.'
                )}
              </p>
            </div>
            <button 
              onClick={() => navigateTo('shop')}
              className="btn btn-primary btn-lg"
            >
              <span>{t('សាកល្បងបញ្ជាទិញឥឡូវនេះ', 'Shop Now')}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* New Shoe Arrivals */}
      <section style={{ padding: '20px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div className="badge badge-new" style={{ marginBottom: '8px' }}>New Arrivals 2026</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {t('ស្បែកជើងមកដល់ថ្មី', 'New Shoe Arrivals')}
              </h2>
            </div>
            <button 
              onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
              className="btn btn-secondary btn-sm"
            >
              <span>{t('មើលទាំងអស់', 'View All')}</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid-products">
            {newArrivals.slice(0, 4).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
