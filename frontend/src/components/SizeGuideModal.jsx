import React, { useState } from 'react';
import { X, Check, Ruler, Info } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [cmInput, setCmInput] = useState('');
  const [recommendedSize, setRecommendedSize] = useState(null);

  if (!isOpen) return null;

  const sizeChart = [
    { cm: '24.0 cm', eu: 38, usMen: '6.0', usWomen: '7.5' },
    { cm: '24.5 cm', eu: 39, usMen: '6.5', usWomen: '8.0' },
    { cm: '25.0 cm', eu: 40, usMen: '7.0', usWomen: '8.5' },
    { cm: '25.5 cm', eu: 41, usMen: '8.0', usWomen: '9.5' },
    { cm: '26.0 cm', eu: 42, usMen: '8.5', usWomen: '10.0' },
    { cm: '26.5 cm', eu: 43, usMen: '9.5', usWomen: '11.0' },
    { cm: '27.0 cm', eu: 44, usMen: '10.0', usWomen: '11.5' },
    { cm: '27.5 cm', eu: 45, usMen: '11.0', usWomen: '12.5' }
  ];

  const handleCalculate = (e) => {
    e.preventDefault();
    const val = parseFloat(cmInput);
    if (!val || val < 22 || val > 30) {
      setRecommendedSize('សូមបញ្ចូលប្រវែងជើងចន្លោះ ២២ ទៅ ៣០ សង់ទីម៉ែត្រ');
      return;
    }

    if (val <= 24.2) setRecommendedSize('EU 38 (ប្រវែងជើងប្រហែល 24.0cm)');
    else if (val <= 24.7) setRecommendedSize('EU 39 (ប្រវែងជើងប្រហែល 24.5cm)');
    else if (val <= 25.2) setRecommendedSize('EU 40 (ប្រវែងជើងប្រហែល 25.0cm)');
    else if (val <= 25.7) setRecommendedSize('EU 41 (ប្រវែងជើងប្រហែល 25.5cm)');
    else if (val <= 26.2) setRecommendedSize('EU 42 (ប្រវែងជើងប្រហែល 26.0cm)');
    else if (val <= 26.7) setRecommendedSize('EU 43 (ប្រវែងជើងប្រហែល 26.5cm)');
    else if (val <= 27.2) setRecommendedSize('EU 44 (ប្រវែងជើងប្រហែល 27.0cm)');
    else setRecommendedSize('EU 45 (ប្រវែងជើងប្រហែល 27.5cm)');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '30px',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'var(--text-primary)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255, 94, 54, 0.15)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Ruler size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem' }}>តារាងណែនាំការវាស់ទំហំជើង (Shoe Size Guide)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              វិធីសាស្រ្តវាស់ប្រវែងបាតជើងដើម្បីជ្រើសរើសទំហំ EU ឱ្យត្រូវឥតខ្ចោះ
            </p>
          </div>
        </div>

        {/* 3 Step Instruction */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '26px'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>🦶 1. ដាក់ជើង</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              ដាក់បាតជើងលើក្រដាសស ដោយកែងជើងផ្អែកនឹងជញ្ជាំងត្រង់។
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>✏️ 2. គូសចំណុច</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              គូសបន្ទាត់នៅត្រង់ចុងមេជើងដែលវែងជាងគេ និងកែងជើង។
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>📏 3. វាស់សង់ទីម៉ែត្រ</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              វាស់ចំងាយជា cm រួចផ្ទៀងផ្ទាត់ជាមួយតារាងខាងក្រោម។
            </p>
          </div>
        </div>

        {/* Quick Size Calculator */}
        <form onSubmit={handleCalculate} style={{
          background: 'rgba(255, 94, 54, 0.08)',
          border: '1px dashed var(--accent-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '18px',
          marginBottom: '26px'
        }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚡ គណនាទំហំស្វ័យប្រវត្តិ (Quick Calculator)</span>
          </h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input 
              type="number"
              step="0.1"
              placeholder="បញ្ចូលប្រវែងជើង (ឧ. 25.5 cm)"
              value={cmInput}
              onChange={(e) => setCmInput(e.target.value)}
              className="form-input"
              style={{ flex: 1, minWidth: '180px' }}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              គណនាទំហំ
            </button>
          </div>
          {recommendedSize && (
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '8px',
              color: '#34d399',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Check size={18} />
              <span>ទំហំដែលត្រូវ៖ <strong>{recommendedSize}</strong></span>
            </div>
          )}
        </form>

        {/* Size Chart Table */}
        <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>តារាងប្រៀបធៀបទំហំ (Standard Size Table)</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.88rem',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.06)', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '12px' }}>ប្រវែងជើង (CM)</th>
                <th style={{ padding: '12px' }}>ទំហំ EU</th>
                <th style={{ padding: '12px' }}>US បុរស (Men)</th>
                <th style={{ padding: '12px' }}>US នារី (Women)</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid var(--border-light)',
                  background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)'
                }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{row.cm}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    EU {row.eu}
                  </td>
                  <td style={{ padding: '10px 12px' }}>{row.usMen}</td>
                  <td style={{ padding: '10px 12px' }}>{row.usWomen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notice */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          <Info size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
          <span>
            <strong>ចំណាំ៖</strong> ប្រសិនបើអ្នកមានទម្រង់បាតជើងក្រាស់ ឬធំទូលាយ សូមជ្រើសរើសបន្ថែម ១ ទំហំ (Size +1) ដើម្បីពាក់បានស្រួលជើង។ ហាងយើងខ្ញុំគាំទ្រការប្តូរទំហំក្នុងរយៈពេល ៧ ថ្ងៃ!
          </span>
        </div>
      </div>
    </div>
  );
}
