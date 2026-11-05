import React, { useState } from 'react';
import * as api from '../services/api';
import { 
  Search, 
  Truck, 
  CheckCircle, 
  Package, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export default function OrderTrackingView() {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError('');
      const res = await api.trackOrder(query.trim());
      if (res.success) {
        setOrder(res.data);
      } else {
        setError(res.message || 'រកមិនឃើញការបញ្ជាទិញនេះទេ');
        setOrder(null);
      }
    } catch (err) {
      setError('មិនមានទិន្នន័យការបញ្ជាទិញនេះទេ។ សូមពិនិត្យលេខកូដឡើងវិញ។');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

  const getStepIndex = (status) => {
    if (!status) return 0;
    const lower = status.toLowerCase();
    if (lower === 'confirmed') return 0;
    if (lower === 'processing') return 1;
    if (lower === 'shipped') return 2;
    if (lower === 'delivered') return 3;
    return 0;
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="badge badge-hot" style={{ marginBottom: '8px' }}>
            <Truck size={14} /> LIVE TRACKING
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
            តាមដានការដឹកជញ្ជូនស្បែកជើង (Order Tracking)
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            បញ្ចូលលេខកូដបញ្ជាទិញ (Order ID) ឬលេខទូរស័ព្ទរបស់អ្នកដើម្បីពិនិត្យស្ថានភាព
          </p>
        </div>

        {/* Tracking Search Input */}
        <form onSubmit={handleTrack} className="glass-panel" style={{
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <input 
                type="text"
                placeholder="ឧ. STEP-2026-8901 ឬ លេខទូរស័ព្ទ 012889900"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
              <span>{loading ? 'កំពុងស្វែងរក...' : 'តាមដានឥឡូវនេះ'}</span>
              <Truck size={18} />
            </button>
          </div>

          {/* Quick Demo Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span>សាកល្បងលេខកូដគំរូ:</span>
            <button
              type="button"
              onClick={() => { setQuery('STEP-2026-8901'); setTimeout(() => { api.trackOrder('STEP-2026-8901').then(r => r.success && setOrder(r.data)); }, 50); }}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: 'var(--accent-primary)', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              #STEP-2026-8901 (Processing)
            </button>
            <button
              type="button"
              onClick={() => { setQuery('STEP-2026-8902'); setTimeout(() => { api.trackOrder('STEP-2026-8902').then(r => r.success && setOrder(r.data)); }, 50); }}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#00d2ff', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              #STEP-2026-8902 (Confirmed)
            </button>
          </div>
        </form>

        {error && (
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Tracking Result View */}
        {order && (
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            {/* Header info */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '20px',
              marginBottom: '28px'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>កូដការបញ្ជាទិញ</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  #{order.id}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>កូដដឹកជញ្ជូន (Tracking #)</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {order.trackingNumber || 'DELIV-PP-8821'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ស្ថានភាពបច្ចុប្បន្ន</div>
                <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                position: 'relative',
                textAlign: 'center'
              }}>
                {statusSteps.map((step, idx) => {
                  const currentIdx = getStepIndex(order.orderStatus);
                  const isDone = idx <= currentIdx;
                  return (
                    <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: isDone ? 'linear-gradient(135deg, #ff5e36, #ff9900)' : 'rgba(255,255,255,0.06)',
                        color: isDone ? '#fff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        marginBottom: '10px',
                        boxShadow: isDone ? '0 4px 14px rgba(255, 94, 54, 0.4)' : 'none'
                      }}>
                        {idx === 0 && <CheckCircle size={20} />}
                        {idx === 1 && <Package size={20} />}
                        {idx === 2 && <Truck size={20} />}
                        {idx === 3 && <ShieldCheck size={20} />}
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: isDone ? 700 : 500, color: isDone ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {step === 'Confirmed' && 'បញ្ជាក់ការកុម្ម៉ង់'}
                        {step === 'Processing' && 'រៀបចំទំនិញ'}
                        {step === 'Shipped' && 'កំពុងដឹកជញ្ជូន'}
                        {step === 'Delivered' && 'បានប្រគល់ជូន'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Notes */}
            {order.timeline && order.timeline.length > 0 && (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginBottom: '28px',
                border: '1px solid var(--border-light)'
              }}>
                <h4 style={{ fontSize: '0.98rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="var(--accent-primary)" />
                  <span>កំណត់ត្រាលំហូរដឹកជញ្ជូន (Activity Timeline)</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {order.timeline.map((event, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '14px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>•</span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{event.status}:</span>{' '}
                        <span style={{ color: 'var(--text-secondary)' }}>{event.note}</span>
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {new Date(event.time).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Items in Order */}
            <h4 style={{ fontSize: '1rem', marginBottom: '14px' }}>ទំនិញក្នុងកញ្ចប់ដឹកជញ្ជូន</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-light)'
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      ទំហំ EU {item.size} • ពណ៌: {item.color} • ចំនួន x{item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
