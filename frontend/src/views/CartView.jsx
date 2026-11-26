import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Check, 
  X,
  ShieldCheck,
  Truck,
  ShoppingCart
} from 'lucide-react';

export default function CartView() {
  const { 
    cart, 
    updateCartQuantity, 
    updateCartSize, 
    removeFromCart, 
    clearCart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    setAppliedCoupon,
    navigateTo,
    showToast,
    lang,
    t
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [checkingCoupon, setCheckingCoupon] = useState(false);

  const availableSizes = [38, 39, 40, 41, 42, 43, 44, 45];

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) {
      showToast('សូមបញ្ចូលកូដបញ្ចុះតម្លៃ', 'error');
      return;
    }

    try {
      setCheckingCoupon(true);
      const res = await api.validateCoupon(couponInput.trim(), cartSubtotal);
      if (res.success) {
        setAppliedCoupon(res.data);
        showToast(`បានអនុវត្តកូដ ${res.data.code}៖ ${res.data.description}`);
        setCouponInput('');
      } else {
        showToast(res.message || 'កូដមិនត្រឹមត្រូវ', 'error');
      }
    } catch (err) {
      showToast('មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់កូដ', 'error');
    } finally {
      setCheckingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('បានដកកូដបញ្ចុះតម្លៃចេញ', 'info');
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '520px' }}>
          <div className="glass-panel" style={{ padding: '50px 30px', borderRadius: 'var(--radius-lg)' }}>
            <ShoppingCart size={60} color="var(--accent-primary)" style={{ marginBottom: '16px', opacity: 0.85 }} />
            <h2 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{t('កន្ត្រកទំនិញរបស់អ្នកទទេស្អាត', 'Your Cart is Empty')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px' }}>
              {t(
                'អ្នកមិនទាន់បានជ្រើសរើសស្បែកជើងណាមួយចូលក្នុងកន្ត្រកនៅឡើយទេ។ សូមទស្សនាកាតាឡុករបស់យើងខ្ញុំ!',
                'You have not added any footwear to your cart yet. Browse our shoe catalog!'
              )}
            </p>
            <button onClick={() => navigateTo('shop')} className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              <span>{t('ស្វែងរកស្បែកជើងឥឡូវនេះ', 'Shop Shoes Now')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <div className="badge badge-hot" style={{ marginBottom: '6px' }}>{t('កន្ត្រកទំនិញ', 'Cart')}</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{t('កន្ត្រកស្បែកជើងរបស់អ្នក', 'Your Shopping Cart')}</h1>
          </div>
          <button 
            onClick={clearCart} 
            className="btn btn-secondary btn-sm"
            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            <Trash2 size={14} /> {t('សម្អាតកន្ត្រក', 'Clear Cart')}
          </button>
        </div>

        {/* Layout: Cart Items List + Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Left Items Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map(item => (
              <div 
                key={item.cartItemId}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  gap: '18px',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.2)',
                  flexShrink: 0
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    {item.brand}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '2px' }}>
                    {lang === 'km' && item.khmerName ? item.khmerName : item.name}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    {lang === 'km' ? (item.brand ? `ម៉ាក ${item.brand}` : 'ស្បែកជើង') : item.name} • {t('ពណ៌', 'Color')}: {item.color}
                  </div>

                  {/* Size Selector in Cart */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{t('ទំហំ៖', 'Size:')}</span>
                    <select
                      value={item.size}
                      onChange={(e) => updateCartSize(item.cartItemId, parseInt(e.target.value, 10))}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border-light)',
                        color: 'var(--text-primary)',
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {availableSizes.map(sz => (
                        <option key={sz} value={sz}>{t(`ទំហំ ${sz}`, `EU ${sz}`)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quantity Controls & Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: 'auto' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-light)',
                    padding: '2px 6px'
                  }}>
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', fontSize: '1.1rem' }}
                    >
                      -
                    </button>
                    <span style={{ width: '28px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', fontSize: '1.1rem' }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '70px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        (${item.price.toFixed(2)} / {t('គូ', 'pair')})
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '6px'
                    }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <button onClick={() => navigateTo('shop')} className="btn btn-secondary btn-sm">
                <ArrowLeft size={16} /> {t('បន្តការទិញទំនិញ', 'Continue Shopping')}
              </button>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>{t('សង្ខេបការបញ្ជាទិញ', 'Order Summary')}</h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: '20px' }}>
              <label className="form-label">{t('កូដបញ្ចុះតម្លៃ', 'Promo Code')}</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text"
                  placeholder={t('ឧ. STEPUP10 ឬ WELCOME20', 'e.g. STEPUP10 or WELCOME20')}
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="form-input"
                  style={{ textTransform: 'uppercase' }}
                />
                <button type="submit" disabled={checkingCoupon} className="btn btn-secondary btn-sm">
                  {checkingCoupon ? '...' : t('អនុវត្ត', 'Apply')}
                </button>
              </div>
            </form>

            {appliedCoupon && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                color: '#34d399',
                fontSize: '0.85rem',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={14} />
                  <span><strong>{appliedCoupon.code}</strong> ({t('បញ្ចុះ', 'Discount')} ${discountAmount.toFixed(2)})</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>{t('តម្លៃទំនិញសរុប:', 'Subtotal:')}</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                  <span>{t('ការបញ្ចុះតម្លៃ:', 'Discount:')}</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>{t('សេវាដឹកជញ្ជូន:', 'Delivery:')}</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#10b981' }}>{t('ឥតគិតថ្លៃ', 'Free')}</strong> : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}>
                <span>{t('សរុបចុងក្រោយ:', 'Total:')}</span>
                <span className="gradient-text">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={() => navigateTo('checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '16px' }}
            >
              <span>{t('បន្តទៅការទូទាត់', 'Proceed to Checkout')}</span>
              <ArrowRight size={18} />
            </button>

            {/* Value Guarantees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#10b981" />
                <span>{t('ធានាការប្តូរទំហំក្នុងរយៈពេល ៧ ថ្ងៃ', '7-Day shoe size exchange guarantee')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={14} color="#00d2ff" />
                <span>{t('ដឹកជញ្ជូនរហ័សដល់ផ្ទះ ២៥ ខេត្តក្រុង', 'Fast home delivery across 25 provinces')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
