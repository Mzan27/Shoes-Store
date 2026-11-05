import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import { 
  CreditCard, 
  Truck, 
  QrCode, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  ArrowLeft,
  Building2,
  DollarSign
} from 'lucide-react';

export default function CheckoutView() {
  const { 
    cart, 
    cartSubtotal, 
    shippingFee, 
    discountAmount, 
    grandTotal, 
    appliedCoupon, 
    clearCart, 
    navigateTo, 
    setLastPlacedOrder,
    showToast,
    storeSettings 
  } = useStore();

  // Shipping form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [province, setProvince] = useState('Phnom Penh');
  const [district, setDistrict] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment method: 'KHQR', 'COD', 'BANK'
  const [paymentMethod, setPaymentMethod] = useState('KHQR');
  const [khqrVerified, setKhqrVerified] = useState(false);
  const [verifyingKhqr, setVerifyingKhqr] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const cambodianProvinces = [
    'Phnom Penh (រាជធានីភ្នំពេញ)',
    'Siem Reap (ខេត្តសៀមរាប)',
    'Battambang (ខេត្តបាត់ដំបង)',
    'Kandal (ខេត្តកណ្តាល)',
    'Sihanoukville (ខេត្តព្រះសីហនុ)',
    'Kampong Cham (ខេត្តកំពង់ចាម)',
    'Kampot (ខេត្តកំពត)',
    'Takeo (ខេត្តតាកែវ)',
    'Kampong Chhnang (ខេត្តកំពង់ឆ្នាំង)',
    'Pursat (ខេត្តពោធិ៍សាត់)',
    'Banteay Meanchey (ខេត្តបន្ទាយមានជ័យ)',
    'Svay Rieng (ខេត្តស្វាយរៀង)',
    'Prey Veng (ខេត្តព្រៃវែង)'
  ];

  // KHR Conversion (1 USD = 4,100 KHR)
  const totalKHR = Math.round(grandTotal * 4100).toLocaleString();

  const handleSimulateKHQRScan = async () => {
    try {
      setVerifyingKhqr(true);
      const res = await api.verifyKHQR(grandTotal, 'TEMP');
      if (res.success) {
        setKhqrVerified(true);
        showToast('✅ បានស្កេន KHQR Bakong និងផ្ទៀងផ្ទាត់ជោគជ័យ!');
      }
    } catch (err) {
      showToast('ការផ្ទៀងផ្ទាត់ KHQR បរាជ័យ', 'error');
    } finally {
      setVerifyingKhqr(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !streetAddress.trim()) {
      showToast('សូមបំពេញព័ត៌មានដឹកជញ្ជូនឱ្យបានគ្រប់គ្រាន់', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('កន្ត្រកទំនិញទទេ', 'error');
      navigateTo('shop');
      return;
    }

    try {
      setSubmittingOrder(true);
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || 'customer@example.com',
        province,
        district: district.trim(),
        streetAddress: streetAddress.trim(),
        deliveryNotes: deliveryNotes.trim(),
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          khmerName: item.khmerName,
          brand: item.brand,
          price: item.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: cartSubtotal,
        discountAmount,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        shippingFee,
        totalAmount: grandTotal,
        paymentMethod
      };

      const res = await api.createOrder(orderPayload);
      if (res.success) {
        setLastPlacedOrder(res.data);
        clearCart();
        showToast('🎉 ការបញ្ជាទិញទទួលបានជោគជ័យ! សារ Telegram ត្រូវបានបញ្ជូន។');
        navigateTo('order-success');
      } else {
        showToast(res.message || 'ការបញ្ជាទិញបរាជ័យ', 'error');
      }
    } catch (err) {
      console.error('Failed to place order:', err);
      showToast('មានបញ្ហាក្នុងការបញ្ជាទិញ សូមព្យាយាមម្តងទៀត', 'error');
    } finally {
      setSubmittingOrder(false);
    }
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Back */}
        <button onClick={() => navigateTo('cart')} className="btn btn-secondary btn-sm" style={{ marginBottom: '24px' }}>
          <ArrowLeft size={16} /> ត្រឡប់ទៅកន្ត្រកវិញ
        </button>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          ការទូទាត់ និងដឹកជញ្ជូន (Checkout)
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          សូមបំពេញព័ត៌មានដឹកជញ្ជូន និងជ្រើសរើសវិធីសាស្ត្រទូទាត់ប្រាក់ (KHQR ឬ COD)
        </p>

        <form onSubmit={handlePlaceOrder}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'start'
          }}>
            {/* Left: Shipping & Payment info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Shipping Form */}
              <div className="glass-panel" style={{ padding: '26px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={20} color="var(--accent-primary)" />
                  <span>១. អាសយដ្ឋានដឹកជញ្ជូន (Shipping Address)</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">ឈ្មោះអ្នកទទួល *</label>
                    <input 
                      type="text"
                      required
                      placeholder="ឧ. Sokha Heng"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">លេខទូរស័ព្ទ (Contact Phone) *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="ឧ. 012 345 678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">អ៊ីមែល (Email សម្រាប់វិក្កយបត្រ)</label>
                  <input 
                    type="email"
                    placeholder="ឧ. customer@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">ខេត្ត / រាជធានី (Province) *</label>
                    <select 
                      value={province} 
                      onChange={(e) => setProvince(e.target.value)}
                      className="form-select"
                    >
                      {cambodianProvinces.map(p => (
                        <option key={p} value={p.split(' ')[0]}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">ខណ្ឌ / ស្រុក (District / Khan)</label>
                    <input 
                      type="text"
                      placeholder="ឧ. Tuol Kouk"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">ផ្ទះលេខ និងផ្លូវ (Street Address) *</label>
                  <input 
                    type="text"
                    required
                    placeholder="ឧ. ផ្ទះលេខ 14, ផ្លូវ 289, សង្កាត់បឹងកក់២"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">ចំណាំសម្រាប់ការដឹកជញ្ជូន (Delivery Notes)</label>
                  <textarea 
                    rows="2"
                    placeholder="ឧ. សូមទូរស័ព្ទមុនពេលមកដល់ ឬដាក់នៅមុខផ្ទះ..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="form-textarea"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="glass-panel" style={{ padding: '26px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={20} color="var(--accent-primary)" />
                  <span>២. វិធីសាស្ត្រទូទាត់ប្រាក់ (Payment Method)</span>
                </h3>

                {/* Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('KHQR')}
                    style={{
                      padding: '14px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'KHQR' ? '2px solid #ff5e36' : '1px solid var(--border-light)',
                      background: paymentMethod === 'KHQR' ? 'rgba(255, 94, 54, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: paymentMethod === 'KHQR' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    <QrCode size={22} style={{ margin: '0 auto 6px' }} />
                    <div>KHQR (Bakong)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    style={{
                      padding: '14px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'COD' ? '2px solid #10b981' : '1px solid var(--border-light)',
                      background: paymentMethod === 'COD' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: paymentMethod === 'COD' ? '#10b981' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    <Truck size={22} style={{ margin: '0 auto 6px' }} />
                    <div>ទូទាត់ពេលទទួល (COD)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('BANK')}
                    style={{
                      padding: '14px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'BANK' ? '2px solid #00d2ff' : '1px solid var(--border-light)',
                      background: paymentMethod === 'BANK' ? 'rgba(0, 210, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: paymentMethod === 'BANK' ? '#00d2ff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    <Building2 size={22} style={{ margin: '0 auto 6px' }} />
                    <div>ABA / ACLEDA</div>
                  </button>
                </div>

                {/* KHQR Card Display */}
                {paymentMethod === 'KHQR' && (
                  <div style={{
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    color: '#fff',
                    boxShadow: 'var(--shadow-md)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.4rem' }}>🇰🇭</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>KHQR • BAKONG</span>
                      </div>
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                        SHOES STORE
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '20px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#fff',
                      borderRadius: '12px',
                      padding: '20px',
                      color: '#0f172a'
                    }}>
                      {/* Real or Simulated KHQR Visual */}
                      <div style={{
                        width: '160px',
                        height: '160px',
                        background: '#fff',
                        border: '3px solid #be123c',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        padding: storeSettings?.khqrImage ? '4px' : '0'
                      }}>
                        {storeSettings?.khqrImage ? (
                          <img 
                            src={storeSettings.khqrImage} 
                            alt="KHQR Code" 
                            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} 
                          />
                        ) : (
                          <>
                            <QrCode size={110} color="#be123c" />
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#be123c', marginTop: '4px' }}>
                              KHQR SCAN TO PAY
                            </span>
                          </>
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ម្ចាស់គណនី (Receiver):</div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                          {storeSettings?.khqrReceiverName || storeSettings?.storeName || 'SHOES STORE STEPUP'}
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ចំនួនទឹកប្រាក់ (Amount):</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#be123c' }}>
                          ${grandTotal.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px' }}>
                          ≈ {totalKHR} KHR
                        </div>

                        <button
                          type="button"
                          onClick={handleSimulateKHQRScan}
                          disabled={verifyingKhqr || khqrVerified}
                          className="btn btn-sm"
                          style={{
                            background: khqrVerified ? '#10b981' : '#be123c',
                            color: '#fff',
                            width: '100%',
                            fontSize: '0.82rem'
                          }}
                        >
                          {verifyingKhqr ? 'កំពុងផ្ទៀងផ្ទាត់...' : khqrVerified ? '✓ បានផ្ទៀងផ្ទាត់រួចរាល់' : '⚡ ស្កេន និងផ្ទៀងផ្ទាត់ KHQR ឥឡូវនេះ'}
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: '14px', fontSize: '0.78rem', textAlign: 'center', opacity: 0.9 }}>
                      គាំទ្រគ្រប់កម្មវិធីធនាគារនៅកម្ពុជា៖ ABA, ACLEDA, Wing, Canadia, Sathapana, TrueMoney
                    </div>
                  </div>
                )}

                {/* COD Option */}
                {paymentMethod === 'COD' && (
                  <div style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#34d399'
                  }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={18} />
                      <span>ទូទាត់ប្រាក់នៅពេលទទួលបានស្បែកជើង (Cash On Delivery)</span>
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      អ្នកដឹកជញ្ជូននឹងប្រគល់កញ្ចប់ស្បែកជើងជូនអ្នកដល់ផ្ទះ។ អ្នកអាចពិនិត្យទំនិញ និងទំហំ Size រួចទូទាត់សាច់ប្រាក់ចំនួន <strong>${grandTotal.toFixed(2)}</strong> (ឬ {totalKHR} KHR)។
                    </p>
                  </div>
                )}

                {/* Bank Option */}
                {paymentMethod === 'BANK' && (
                  <div style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 210, 255, 0.08)',
                    border: '1px solid rgba(0, 210, 255, 0.3)'
                  }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>ព័ត៌មានផ្ទេរប្រាក់ផ្ទាល់៖</h4>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      <div>• <strong>ABA Bank:</strong> {storeSettings?.abaAccount || '000 892 123 (STEPUP SHOES CO.)'}</div>
                      <div>• <strong>ACLEDA:</strong> {storeSettings?.acledaAccount || '1234-5678-9012 (STEPUP SHOES CO.)'}</div>
                      <div>• <strong>Wing:</strong> {storeSettings?.wingAccount || storeSettings?.phone || '012 345 678 (STEPUP SHOES)'}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Confirmation */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>សង្ខេបទំនិញកុម្ម៉ង់ ({cart.length})</h3>

              {/* Items List Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '20px' }}>
                {cart.map(item => (
                  <div key={item.cartItemId} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Size: EU {item.size} • x{item.quantity}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>តម្លៃសរុប (Subtotal):</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                    <span>បញ្ចុះតម្លៃ ({appliedCoupon?.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>សេវាដឹកជញ្ជូន ({province}):</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: '#10b981' }}>ឥតគិតថ្លៃ</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                  <span>សរុប (Total USD):</span>
                  <span className="gradient-text">${grandTotal.toFixed(2)}</span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  ≈ {totalKHR} KHR
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={submittingOrder}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginBottom: '14px' }}
              >
                <Send size={18} />
                <span>{submittingOrder ? 'កំពុងបញ្ជូនការបញ្ជាទិញ...' : 'បញ្ជាក់ការបញ្ជាទិញ (Place Order)'}</span>
              </button>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                ដោយចុចបញ្ជាក់ការបញ្ជាទិញ អ្នកយល់ព្រមតាមគោលការណ៍ហាង StepUp Shoes និងការជូនដំណឹងតាម Telegram។
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
