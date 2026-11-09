import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RefreshCw, Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Footer({ onOpenSizeGuide }) {
  const { navigateTo, setSelectedCategory, t } = useStore();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('shop');
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-light)',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: '80px',
      position: 'relative'
    }}>
      {/* Value Badges Banner */}
      <div className="container" style={{ marginBottom: '50px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          padding: '28px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(255, 94, 54, 0.15)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Truck size={26} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{t('ដឹកជញ្ជូនរហ័ស', 'Fast Delivery')}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('ភ្នំពេញ ១-២ ថ្ងៃ & ខេត្ត ២-៣ ថ្ងៃ', 'Phnom Penh 1-2 days & Provinces 2-3 days')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: 'var(--accent-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <RefreshCw size={26} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{t('ប្តូរទំហំ Size ៧ ថ្ងៃ', '7-Day Size Exchange')}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('មិនត្រូវទំហំ អាចប្តូរបានដោយឥតគិតថ្លៃ', 'Free exchange if size does not fit')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{t('ទូទាត់ KHQR & COD', 'KHQR & COD Payment')}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('ស្កេន Bakong KHQR ឬបង់លុយពេលដល់ផ្ទះ', 'Bakong KHQR or Cash on Delivery')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Send size={26} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{t('Telegram Notifier', 'Telegram Notifier')}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('ផ្ញើសារដំណឹងបញ្ជាទិញទៅ Telegram ភ្លាមៗ', 'Instant order alerts to Telegram')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '50px'
      }}>
        {/* Brand Col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.6rem' }}>👟</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>STEP<span style={{ color: 'var(--accent-primary)' }}>UP</span></span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
            {t(
              'Shoes Store E-Commerce Website - ហាងលក់ស្បែកជើងទូទៅគ្រប់ប្រភេទ (Everyday & All-Type Footwear) គុណភាពខ្ពស់ តម្លៃសមរម្យ ម៉ូដទាន់សម័យ និងមានសេវាកម្មដឹកជញ្ជូនរហ័សទូទាំងប្រទេសកម្ពុជា។',
              'Shoes Store E-Commerce - Everyday & all-type premium footwear with affordable pricing, modern styles, and fast delivery across Cambodia.'
            )}
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span className="badge badge-hot">KHQR Bakong</span>
            <span className="badge badge-new">Fast Courier</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '18px', color: 'var(--text-primary)' }}>
            {t('ប្រភេទទំនិញ (Categories)', 'Product Categories')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <button 
                onClick={() => handleCategoryClick('sneakers')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                👟 {t('ស្បែកជើងកីឡា (Sneakers)', 'Sneakers')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('formal')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                👞 {t('ស្បែកជើងធ្វើការ (Formal)', 'Formal Shoes')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('casual')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                🥾 {t('ស្បែកជើងស៊ក (Casual)', 'Casual Slip-on')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('sandals')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                🩴 {t('ស្បែកជើងផ្ទាត់ (Sandals)', 'Sandals & Slippers')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('sale')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
              >
                🔥 {t('ទំនិញប្រូម៉ូសិន (Sale & Promotion)', 'Sale & Special Offers')}
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '18px', color: 'var(--text-primary)' }}>
            {t('សេវាកម្មអតិថិជន', 'Customer Service')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <li>
              <button 
                onClick={onOpenSizeGuide}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                📏 {t('តារាងវាស់ទំហំជើង (Size Guide)', 'Size Guide')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('tracking')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                🚚 {t('តាមដានការបញ្ជាទិញ (Order Tracking)', 'Order Tracking')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('about')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                🔄 {t('គោលការណ៍ប្តូរទំហំជើង (7-Day Return)', '7-Day Return Policy')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('about')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                ❓ {t('សំណួរដែលសួរញឹកញាប់ (FAQ)', 'FAQ')}
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '18px', color: 'var(--text-primary)' }}>
            {t('ទំនាក់ទំនងយើងខ្ញុំ', 'Contact Us')}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <MapPin size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Russian Federation Blvd, Khan Tuol Kouk, Phnom Penh, Cambodia</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Phone size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
              <span>+855 12 345 678 / +855 98 765 432</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Mail size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
              <span>chhoyyeanseou5@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container" style={{
        borderTop: '1px solid var(--border-light)',
        paddingTop: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          © 2026 StepUp Shoes Store E-Commerce. All Rights Reserved. Managed by chhoyyeanseou5@gmail.com.
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>KHQR Bakong</span>
          <span>•</span>
          <span>ABA Pay</span>
          <span>•</span>
          <span>Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
}
