import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  RefreshCw, 
  Truck, 
  HelpCircle, 
  ShieldCheck 
} from 'lucide-react';

export default function AboutContactView({ onOpenSizeGuide }) {
  const { showToast, t } = useStore();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setSent(true);
    showToast(t('សាររបស់អ្នកត្រូវបានផ្ញើជូនក្រុមការងារ StepUp Shoes រួចរាល់!', 'Your message has been sent to the StepUp Shoes team!'));
    setContactMessage('');
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div className="badge badge-hot" style={{ marginBottom: '8px' }}>{t('អំពីយើង និងទំនាក់ទំនង', 'About & Contact')}</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px' }}>
            {t('អំពីយើងខ្ញុំ និងទំនាក់ទំនង', 'About Us & Contact')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
            {t(
              'StepUp Shoes គឺជាគេហទំព័រពាណិជ្ជកម្មអេឡិចត្រូនិចលក់ស្បែកជើងគ្រប់ប្រភេទ ឈានមុខគេនៅកម្ពុជា ដែលផ្តោតលើគុណភាព ផាសុកភាព និងទំនុកចិត្តខ្ពស់បំផុត។',
              'StepUp Shoes is Cambodia’s premier footwear destination, providing top-quality, comfortable, and trendy shoes for every lifestyle with fast nationwide delivery.'
            )}
          </p>
        </div>

        {/* 2-Column: About / Contact Details + Interactive Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {/* Info Side */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>{t('ព័ត៌មានទំនាក់ទំនងហាង', 'Store Contact Info')}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 94, 54, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('ទីតាំងហាងផ្ទាល់៖', 'Store Location:')}</div>
                  <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {t(
                      'អគារលេខ ១២៨ មហាវិថីសហព័ន្ធរុស្ស៊ី សង្កាត់ទឹកល្អក់១ ខណ្ឌទួលគោក រាជធានីភ្នំពេញ កម្ពុជា',
                      '#128 Russian Federation Blvd, Sangkat Teuk Laak 1, Khan Tuol Kouk, Phnom Penh, Cambodia'
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0, 210, 255, 0.15)', color: '#00d2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('លេខទូរស័ព្ទ៖', 'Phone Support:')}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    +855 12 345 678 / +855 98 765 432
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('អ៊ីមែល៖', 'Email:')}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    chhoyyeanseou5@gmail.com
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('ម៉ោងបម្រើការងារ៖', 'Working Hours:')}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {t('ច័ន្ទ - អាទិត្យ: 8:00 ព្រឹក ដល់ 9:00 យប់ (គ្មានថ្ងៃឈប់សម្រាក)', 'Monday - Sunday: 8:00 AM - 9:00 PM (Everyday)')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>{t('ផ្ញើសារមកកាន់យើងខ្ញុំ', 'Send Us a Message')}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {t(
                'ប្រសិនបើអ្នកមានចម្ងល់ពីទំហំស្បែកជើង ឬការកុម្ម៉ង់ទិញ សូមបំពេញទម្រង់ខាងក្រោម៖',
                'If you have questions about shoe sizing, stock, or orders, please fill out the form below:'
              )}
            </p>

            <form onSubmit={handleSendMessage}>
              <div className="form-group">
                <label className="form-label">{t('ឈ្មោះរបស់អ្នក', 'Your Name')}</label>
                <input 
                  type="text" 
                  required
                  placeholder={t('ឧ. Sokha', 'e.g. John Doe')} 
                  value={contactName} 
                  onChange={(e) => setContactName(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('លេខទូរស័ព្ទ ឬ Telegram', 'Phone or Telegram')}</label>
                <input 
                  type="tel" 
                  required
                  placeholder="012 345 678" 
                  value={contactPhone} 
                  onChange={(e) => setContactPhone(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('ខ្លឹមសារសារ', 'Message')}</label>
                <textarea 
                  rows="4" 
                  required
                  placeholder={t('សរសេរសំណួររបស់អ្នកនៅទីនេះ...', 'Type your message here...')} 
                  value={contactMessage} 
                  onChange={(e) => setContactMessage(e.target.value)} 
                  className="form-textarea" 
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Send size={18} />
                <span>{t('ផ្ញើសារឥឡូវនេះ', 'Send Message Now')}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Policies and Guarantee Section (7-Day Exchange etc) */}
        <div className="glass-panel" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>
            {t('គោលការណ៍ហាង StepUp Shoes', 'StepUp Store Policies')}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-primary)', marginBottom: '10px' }}>
                <RefreshCw size={22} />
                <h4 style={{ fontSize: '1.1rem' }}>{t('គោលការណ៍ប្តូរទំហំ ៧ ថ្ងៃ', '7-Day Size Exchange')}</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {t(
                  'អតិថិជនអាចស្នើសុំប្តូរទំហំបានក្នុងរយៈពេល ៧ ថ្ងៃ គិតចាប់ពីថ្ងៃទទួលបានទំនិញ ប្រសិនបើពាក់មិនត្រូវទំហំ ដោយទំនិញត្រូវរក្សាស្ថានភាពថ្មី មិនទាន់ពាក់ដើរខាងក្រៅ និងមានប្រអប់ដើម។',
                  'Customers can exchange shoe sizes within 7 days of delivery if the fit is not right. Shoes must remain in new, unworn condition with original packaging.'
                )}
              </p>
            </div>

            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00d2ff', marginBottom: '10px' }}>
                <Truck size={22} />
                <h4 style={{ fontSize: '1.1rem' }}>{t('សេវាដឹកជញ្ជូន ២៥ ខេត្តក្រុង', 'Delivery across 25 Provinces')}</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {t(
                  'ដឹកជញ្ជូនរហ័សក្នុងរាជធានីភ្នំពេញតម្លៃត្រឹមតែ $1.50 (រយៈពេល ១-២ ថ្ងៃ) និងបណ្តាខេត្តនានាតម្លៃ $2.50 (រយៈពេល ២-៣ ថ្ងៃ)។ ការបញ្ជាទិញចាប់ពី $50 ឡើងទៅ ដឹកជញ្ជូនឥតគិតថ្លៃ!',
                  'Fast delivery in Phnom Penh for just $1.50 (1-2 days) and provinces for $2.50 (2-3 days). Orders over $50 enjoy FREE delivery!'
                )}
              </p>
            </div>

            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', marginBottom: '10px' }}>
                <ShieldCheck size={22} />
                <h4 style={{ fontSize: '1.1rem' }}>{t('ទូទាត់ KHQR និងសុវត្ថិភាព', 'KHQR Payment & Security')}</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {t(
                  'គាំទ្រការទូទាត់ប្រាក់តាមរយៈ KHQR Bakong ងាយស្រួល សុវត្ថិភាពខ្ពស់ គ្មានកម្រៃសេវាបន្ថែម និងអាចទូទាត់តាមសាច់ប្រាក់នៅពេលទទួលបានស្បែកជើង (COD)។',
                  'Support Bakong KHQR scan with zero extra fees, and Cash on Delivery (COD) payment when your shoes arrive.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
