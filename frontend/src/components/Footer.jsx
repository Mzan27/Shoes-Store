import React from 'react';
import { useStore } from '../context/StoreContext';

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{t('ដឹកជញ្ជូនរហ័ស', 'Fast Delivery')}</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('ភ្នំពេញ ១-២ ថ្ងៃ & ខេត្ត ២-៣ ថ្ងៃ', 'Phnom Penh 1-2 days & Provinces 2-3 days')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{t('ប្តូរទំហំ ៧ ថ្ងៃ', '7-Day Size Exchange')}</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('មិនត្រូវទំហំ អាចប្តូរបានដោយឥតគិតថ្លៃ', 'Free exchange if size does not fit')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{t('ទូទាត់តាម KHQR និងពេលដល់ផ្ទះ', 'KHQR & COD Payment')}</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('ស្កេន KHQR ឬបង់លុយពេលដល់ផ្ទះ', 'Scan KHQR or Cash on Delivery')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{t('ដំណឹងតាម Telegram', 'Telegram Notifier')}</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t('ផ្ញើសារដំណឹងបញ្ជាទិញទៅ Telegram ភ្លាមៗ', 'Instant order alerts to Telegram')}</p>
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
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-primary), #ff8a50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>👟</span>
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>STEP<span style={{ color: 'var(--accent-primary)' }}>UP</span></span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
            {t(
              'ហាងលក់ស្បែកជើងទូទៅគ្រប់ប្រភេទ គុណភាពខ្ពស់ តម្លៃសមរម្យ ម៉ូដទាន់សម័យ និងមានសេវាកម្មដឹកជញ្ជូនរហ័សទូទាំងប្រទេសកម្ពុជា។',
              'Shoes Store E-Commerce - Everyday & all-type premium footwear with affordable pricing, modern styles, and fast delivery across Cambodia.'
            )}
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span className="badge badge-hot">{t('ទូទាត់ KHQR', 'KHQR Bakong')}</span>
            <span className="badge badge-new">{t('ដឹកជញ្ជូនរហ័ស', 'Fast Courier')}</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '18px', color: 'var(--text-primary)' }}>
            {t('ប្រភេទទំនិញ', 'Categories')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <button 
                onClick={() => handleCategoryClick('sneakers')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}
              >
                <span>{t('ស្បែកជើងកីឡា', 'Sneakers')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('formal')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}
              >
                <span>{t('ស្បែកជើងធ្វើការ', 'Formal')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('casual')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}
              >
                <span>{t('ស្បែកជើងស៊ក', 'Casual')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('sandals')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}
              >
                <span>{t('ស្បែកជើងផ្ទាត់', 'Sandals')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('sale')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left' }}
              >
                <span>{t('ទំនិញប្រូម៉ូសិន', 'Sale & Promotion')}</span>
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
                <span>{t('តារាងវាស់ទំហំជើង', 'Size Guide')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('tracking')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                <span>{t('តាមដានការបញ្ជាទិញ', 'Order Tracking')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('about')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                <span>{t('គោលការណ៍ប្តូរទំហំជើង', '7-Day Return Policy')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('about')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                <span>{t('សំណួរដែលសួរញឹកញាប់', 'FAQ')}</span>
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
            <div>
              <span>{t('មហាវិថីសហព័ន្ធរុស្ស៊ី ខណ្ឌទួលគោក រាជធានីភ្នំពេញ កម្ពុជា', 'Russian Federation Blvd, Khan Tuol Kouk, Phnom Penh, Cambodia')}</span>
            </div>
            <div>
              <span>+855 12 345 678 / +855 98 765 432</span>
            </div>
            <div>
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
          {t('រក្សាសិទ្ធិគ្រប់យ៉ាង © 2026 ហាងស្បែកជើង StepUp Shoes។', '© 2026 StepUp Shoes Store E-Commerce. All Rights Reserved.')}
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>{t('ទូទាត់ KHQR', 'KHQR Bakong')}</span>
          <span>•</span>
          <span>{t('ធនាគារ ABA', 'ABA Pay')}</span>
          <span>•</span>
          <span>{t('បង់លុយពេលដល់ផ្ទះ', 'Cash on Delivery')}</span>
        </div>
      </div>
    </footer>
  );
}
