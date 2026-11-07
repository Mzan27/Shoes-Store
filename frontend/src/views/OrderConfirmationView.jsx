import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle, 
  Send, 
  Printer, 
  ShoppingBag, 
  Truck, 
  Clock, 
  MapPin, 
  Phone,
  FileText
} from 'lucide-react';

export default function OrderConfirmationView() {
  const { lastPlacedOrder, navigateTo } = useStore();

  if (!lastPlacedOrder) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h3>មិនមានព័ត៌មានការបញ្ជាទិញថ្មីឡើយ</h3>
        <button onClick={() => navigateTo('shop')} className="btn btn-primary btn-sm" style={{ marginTop: '16px' }}>
          ទៅកាន់ទំព័រទំនិញ
        </button>
      </div>
    );
  }

  const order = lastPlacedOrder;

  const handlePrint = () => {
    window.print();
  };

  // Safe Multi-Format Address Resolver (Handles object, string, or flat fields)
  const getAddressInfo = (o) => {
    if (!o) return { province: 'ភ្នំពេញ (Phnom Penh)', details: '', notes: '' };

    if (o.shippingAddress && typeof o.shippingAddress === 'object') {
      const prov = o.shippingAddress.province || o.province || 'ភ្នំពេញ (Phnom Penh)';
      const dist = o.shippingAddress.district || o.district || '';
      const street = o.shippingAddress.streetAddress || o.streetAddress || o.address || '';
      const notes = o.shippingAddress.deliveryNotes || o.deliveryNotes || '';
      const details = [dist, street].filter(Boolean).join(', ');
      return { province: prov, details, notes };
    }

    if (typeof o.shippingAddress === 'string' && o.shippingAddress.trim()) {
      return {
        province: o.province || 'ភ្នំពេញ (Phnom Penh)',
        details: o.shippingAddress,
        notes: o.deliveryNotes || ''
      };
    }

    const prov = o.province || 'ភ្នំពេញ (Phnom Penh)';
    const dist = o.district || '';
    const street = o.streetAddress || o.address || '';
    const notes = o.deliveryNotes || '';
    const details = [dist, street].filter(Boolean).join(', ');
    return { province: prov, details, notes };
  };

  const addressInfo = getAddressInfo(order);
  const orderCode = order.orderNumber || order.id || 'N/A';
  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = typeof order.subtotal === 'number' ? order.subtotal : parseFloat(order.subtotal || 0) || 0;
  const discountAmount = typeof order.discountAmount === 'number' ? order.discountAmount : parseFloat(order.discountAmount || 0) || 0;
  const shippingFee = typeof order.shippingFee === 'number' ? order.shippingFee : parseFloat(order.shippingFee || 0) || 0;
  const totalAmount = typeof order.totalAmount === 'number' ? order.totalAmount : parseFloat(order.totalAmount || 0) || 0;
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleString('km-KH') : new Date().toLocaleString('km-KH');

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Success Header Card */}
        <div className="glass-panel" style={{
          padding: '36px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(17, 23, 38, 0.9))',
          border: '1px solid rgba(16, 185, 129, 0.35)'
        }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <CheckCircle size={38} />
          </div>

          <div className="badge badge-success" style={{ marginBottom: '8px' }}>
            ORDER CONFIRMED • ជោគជ័យ
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
            អរគុណសម្រាប់ការបញ្ជាទិញរបស់អ្នក!
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
            យើងខ្ញុំបានទទួលការកុម្ម៉ង់ស្បែកជើងរបស់អ្នករួចរាល់ហើយ។
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-full)',
            fontSize: '1rem',
            fontWeight: 800
          }}>
            <span>លេខកូដបញ្ជាទិញ:</span>
            <span style={{ color: 'var(--accent-primary)' }}>#{orderCode}</span>
          </div>

          {/* Telegram Notification Dispatched Badge */}
          <div style={{
            marginTop: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(0, 210, 255, 0.12)',
            border: '1px solid rgba(0, 210, 255, 0.35)',
            borderRadius: 'var(--radius-full)',
            color: '#00d2ff',
            fontSize: '0.82rem',
            fontWeight: 600
          }}>
            <Send size={15} />
            <span>ដំណឹងត្រូវបានបញ្ជូនទៅ Telegram របស់ម្ចាស់ហាងរួចរាល់</span>
          </div>
        </div>

        {/* Printable Order Receipt */}
        <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '18px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>វិក្កយបត្របញ្ជាទិញ (Order Receipt)</h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                កាលបរិច្ឆេទ: {orderDate}
              </div>
            </div>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm">
              <Printer size={15} /> ព្រីនវិក្កយបត្រ
            </button>
          </div>

          {/* Customer & Shipping Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px', fontSize: '0.88rem' }}>
            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>អតិថិជន:</div>
              <div style={{ fontWeight: 700 }}>{order.customerName || 'អតិថិជន'}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{order.customerPhone || 'មិនមានលេខទូរស័ព្ទ'}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{order.customerEmail || ''}</div>
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>អាសយដ្ឋានដឹកជញ្ជូន:</div>
              <div style={{ fontWeight: 700 }}>{addressInfo.province}</div>
              {addressInfo.details && <div style={{ color: 'var(--text-secondary)' }}>{addressInfo.details}</div>}
              {addressInfo.notes && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ចំណាំ: "{addressInfo.notes}"
                </div>
              )}
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>ការទូទាត់ & ស្ថានភាព:</div>
              <div style={{ fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{order.paymentMethod || 'KHQR'}</div>
              <div style={{ color: '#10b981', fontWeight: 600 }}>ស្ថានភាពទូទាត់: {order.paymentStatus || 'unpaid'}</div>
              <div style={{ color: '#00d2ff', fontWeight: 600 }}>ស្ថានភាពដឹកជញ្ជូន: {order.orderStatus || order.status || 'pending'}</div>
            </div>
          </div>

          {/* Ordered Items Table */}
          <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>ទំនិញដែលបានកុម្ម៉ង់ ({items.length})</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
              }}>
                <img src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    ទំហំ: EU {item.size || 'Free'} • ពណ៌: {item.color || 'Standard'} • ចំនួន: x{item.quantity || 1}
                  </div>
                </div>
                <div style={{ fontWeight: 800 }}>
                  ${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>តម្លៃទំនិញសរុប (Subtotal):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>ការបញ្ចុះតម្លៃ ({order.couponCode || 'PROMO'}):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>សេវាដឹកជញ្ជូន:</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.25rem',
              fontWeight: 800,
              borderTop: '1px solid var(--border-light)',
              paddingTop: '12px'
            }}>
              <span>ចំនួនទឹកប្រាក់សរុប (Grand Total):</span>
              <span className="gradient-text">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigateTo('tracking')} className="btn btn-secondary btn-lg">
            <Truck size={18} />
            <span>តាមដានការដឹកជញ្ជូន (Track Order)</span>
          </button>
          <button onClick={() => navigateTo('shop')} className="btn btn-primary btn-lg">
            <ShoppingBag size={18} />
            <span>បន្តការទិញទំនិញ (Continue Shopping)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
