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
  const { showToast } = useStore();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setSent(true);
    showToast('✉️ សាររបស់អ្នកត្រូវបានផ្ញើជូនក្រុមការងារ StepUp Shoes រួចរាល់!');
    setContactMessage('');
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div className="badge badge-hot" style={{ marginBottom: '8px' }}>ABOUT & CONTACT</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px' }}>
            អំពីយើងខ្ញុំ និងទំនាក់ទំនង
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
            StepUp Shoes គឺជាគេហទំព័រពាណិជ្ជកម្មអេឡិចត្រូនិចលក់ស្បែកជើងគ្រប់ប្រភេទ (Everyday & All-Type Footwear) ឈានមុខគេនៅកម្ពុជា ដែលផ្តោតលើគុណភាព ផាសុកភាព និងទំនុកចិត្តខ្ពស់បំផុត។
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
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>ព័ត៌មានទំនាក់ទំនងហាង</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 94, 54, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>ទីតាំងហាងផ្ទាល់ (Showroom):</div>
                  <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    #128, Russian Federation Blvd, Sangkat Teuk Laak 1, Khan Tuol Kouk, Phnom Penh, Cambodia
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0, 210, 255, 0.15)', color: '#00d2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>លេខទូរស័ព្ទ (Customer Support):</div>
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
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>អ៊ីមែលអ្នកគ្រប់គ្រងគម្រោង:</div>
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
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>ម៉ោងបម្រើការងារ:</div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    ច័ន្ទ - អាទិត្យ: 8:00 ព្រឹក ដល់ 9:00 យប់ (គ្មានថ្ងៃឈប់សម្រាក)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>ផ្ញើសារមកកាន់យើងខ្ញុំ</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              ប្រសិនបើអ្នកមានចម្ងល់ពីទំហំស្បែកជើង ឬការកុម្ម៉ង់ទិញ សូមបំពេញទម្រង់ខាងក្រោម៖
            </p>

            <form onSubmit={handleSendMessage}>
              <div className="form-group">
                <label className="form-label">ឈ្មោះរបស់អ្នក</label>
                <input 
                  type="text" 
                  required
                  placeholder="ឧ. Sokha" 
                  value={contactName} 
                  onChange={(e) => setContactName(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">លេខទូរស័ព្ទ ឬ Telegram</label>
                <input 
                  type="tel" 
                  required
                  placeholder="ឧ. 012 345 678" 
                  value={contactPhone} 
                  onChange={(e) => setContactPhone(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">ខ្លឹមសារសារ</label>
                <textarea 
                  rows="4" 
                  required
                  placeholder="សរសេរសំណួររបស់អ្នកនៅទីនេះ..." 
                  value={contactMessage} 
                  onChange={(e) => setContactMessage(e.target.value)} 
                  className="form-textarea" 
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Send size={18} />
                <span>ផ្ញើសារឥឡូវនេះ</span>
              </button>
            </form>
          </div>
        </div>

        {/* Policies and Guarantee Section (7-Day Exchange etc) */}
        <div className="glass-panel" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>
            គោលការណ៍ហាង StepUp Shoes
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-primary)', marginBottom: '10px' }}>
                <RefreshCw size={22} />
                <h4 style={{ fontSize: '1.1rem' }}>គោលការណ៍ប្តូរ Size ៧ ថ្ងៃ</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                អតិថិជនអាចស្នើសុំប្តូរទំហំ (Size) បានក្នុងរយៈពេល <strong>៧ ថ្ងៃ</strong> គិតចាប់ពីថ្ងៃទទួលបានទំនិញ ប្រសិនបើពាក់មិនត្រូវទំហំ ដោយទំនិញត្រូវរក្សាស្ថានភាពថ្មី មិនទាន់ពាក់ដើរខាងក្រៅ និងមានប្រអប់ដើម។
              </p>
            </div>

            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00d2ff', marginBottom: '10px' }}>
                <Truck size={22} />
                <h4 style={{ fontSize: '1.1rem' }}>សេវាដឹកជញ្ជូន ២៥ ខេត្តក្រុង</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                ដឹកជញ្ជូនរហ័សក្នុងរាជធានីភ្នំពេញតម្លៃត្រឹមតែ $1.50 (រយៈពេល ១-២ ថ្ងៃ) និងបណ្តាខេត្តនានាតម្លៃ $2.50 (រយៈពេល ២-៣ ថ្ងៃ)។ ការបញ្ជាទិញចាប់ពី $50 ឡើងទៅ <strong>ដឹកជញ្ជូនឥតគិតថ្លៃ!</strong>
              </p>
            </div>

            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', marginBottom: '10px' }}>
                <ShieldCheck size={22} />
                <h4 style={{ fontSize: '1.1rem' }}>KHQR Bakong & សុវត្ថិភាព</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                គាំទ្រការទូទាត់ប្រាក់តាមរយៈ KHQR Bakong របស់ធនាគារជាតិនៃកម្ពុជា ងាយស្រួល សុវត្ថិភាពខ្ពស់ គ្មានកម្រៃសេវាបន្ថែម និងអាចទូទាត់តាមសាច់ប្រាក់នៅពេលទទួលបានស្បែកជើង (COD)។
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
