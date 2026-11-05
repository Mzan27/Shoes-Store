import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RefreshCw, Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Footer({ onOpenSizeGuide }) {
  const { navigateTo, setSelectedCategory } = useStore();

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
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>ដឹកជញ្ជូនរហ័ស</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>ភ្នំពេញ ១-២ ថ្ងៃ & ខេត្ត ២-៣ ថ្ងៃ</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(0, 210, 255, 0.15)',
              color: '#00d2ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <RefreshCw size={26} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>ប្តូរទំហំ Size ៧ ថ្ងៃ</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>មិនត្រូវទំហំ អាចប្តូរបានដោយឥតគិតថ្លៃ</p>
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
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>ទូទាត់ KHQR & COD</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>ស្កេន Bakong KHQR ឬបង់លុយពេលដល់ផ្ទះ</p>
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
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Telegram Notifier</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>ផ្ញើសារដំណឹងបញ្ជាទិញទៅ Telegram ភ្លាមៗ</p>
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
            Shoes Store E-Commerce Website - ហាងលក់ស្បែកជើងទូទៅគ្រប់ប្រភេទ (Everyday & All-Type Footwear) គុណភាពខ្ពស់ តម្លៃសមរម្យ ម៉ូដទាន់សម័យ និងមានសេវាកម្មដឹកជញ្ជូនរហ័សទូទាំងប្រទេសកម្ពុជា។
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span className="badge badge-hot">KHQR Bakong</span>
            <span className="badge badge-new">Fast Courier</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '18px', color: 'var(--text-primary)' }}>ប្រភេទទំនិញ (Categories)</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <button 
                onClick={() => handleCategoryClick('sneakers')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                👟 ស្បែកជើងកីឡា (Sneakers)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('formal')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                👞 ស្បែកជើងធ្វើការ (Formal)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('casual')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                🥾 ស្បែកជើងស៊ក (Casual)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('sandals')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                🩴 ស្បែកជើងផ្ទាត់ (Sandals)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('sale')}
                style={{ background: 'none', border: 'none', color: '#ff7552', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
              >
                🔥 ទំនិញប្រូម៉ូសិន (Sale & Promotion)
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '18px', color: 'var(--text-primary)' }}>សេវាកម្មអតិថិជន</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <li>
              <button 
                onClick={onOpenSizeGuide}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                📏 តារាងវាស់ទំហំជើង (Size Guide)
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('tracking')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                🚚 តាមដានការបញ្ជាទិញ (Order Tracking)
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('about')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                🔄 គោលការណ៍ប្តូរទំហំជើង (7-Day Return)
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('about')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}
              >
                ❓ សំណួរដែលសួរញឹកញាប់ (FAQ)
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '18px', color: 'var(--text-primary)' }}>ទំនាក់ទំនងយើងខ្ញុំ</h4>
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
