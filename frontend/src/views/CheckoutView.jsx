import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import { CAMBODIAN_PROVINCES, CAMBODIA_DISTRICTS, CAMBODIA_SANGKATS, CAMBODIA_BOREYS_CONDOS } from '../data/cambodiaLocations';
import { 
  CreditCard, 
  Truck, 
  QrCode, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  ArrowLeft,
  Building2,
  DollarSign,
  MapPin,
  Home,
  Navigation,
  Zap,
  Check
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
    storeSettings,
    currentUser,
    lang,
    t
  } = useStore();

  // Shipping form state with auto-fill from logged-in user
  const [customerName, setCustomerName] = useState(() => currentUser?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState(() => currentUser?.email || '');
  
  // Real Cambodian address fields
  const [province, setProvince] = useState('Phnom Penh');
  const [districtKey, setDistrictKey] = useState('Tuol Kouk');
  const [district, setDistrict] = useState('ខណ្ឌទួលគោក');
  const [sangkat, setSangkat] = useState('សង្កាត់បឹងកក់២');
  const [customSangkat, setCustomSangkat] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetNo, setStreetNo] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Sync if currentUser logs in while on checkout
  React.useEffect(() => {
    if (currentUser) {
      if (!customerName && currentUser.displayName) setCustomerName(currentUser.displayName);
      if (!customerEmail && currentUser.email) setCustomerEmail(currentUser.email);
    }
  }, [currentUser]);

  // Payment method: 'KHQR', 'COD', 'BANK'
  const [paymentMethod, setPaymentMethod] = useState('KHQR');
  const [khqrVerified, setKhqrVerified] = useState(false);
  const [verifyingKhqr, setVerifyingKhqr] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  // Handle province change and auto-set first district and sangkat
  const handleProvinceChange = (newProvince) => {
    setProvince(newProvince);
    const districts = CAMBODIA_DISTRICTS[newProvince] || [];
    if (districts.length > 0) {
      const first = districts[0];
      setDistrictKey(first.en);
      setDistrict(t(first.km, first.en));
      const sangkats = CAMBODIA_SANGKATS[first.en] || [];
      if (sangkats.length > 0) {
        setSangkat(t(sangkats[0].km, sangkats[0].en));
      } else {
        setSangkat('');
      }
    } else {
      setDistrictKey('');
      setDistrict('');
      setSangkat('');
    }
    setCustomSangkat('');
  };

  const handleDistrictChange = (selectedEnKey) => {
    setDistrictKey(selectedEnKey);
    const districts = CAMBODIA_DISTRICTS[province] || [];
    const found = districts.find(d => d.en === selectedEnKey);
    if (found) {
      setDistrict(t(found.km, found.en));
      const sangkats = CAMBODIA_SANGKATS[selectedEnKey] || [];
      if (sangkats.length > 0) {
        setSangkat(t(sangkats[0].km, sangkats[0].en));
      } else {
        setSangkat('');
      }
    } else {
      setDistrict(selectedEnKey);
      setSangkat('');
    }
    setCustomSangkat('');
  };

  const sangkatsForSelectedDistrict = CAMBODIA_SANGKATS[districtKey] || [];
  const activeSangkat = sangkat === '__custom__' ? customSangkat : sangkat;

  const formattedHouse = houseNo.trim() 
    ? (houseNo.startsWith('#') || houseNo.startsWith('ផ្ទះ') || houseNo.toLowerCase().startsWith('house') 
        ? houseNo.trim() 
        : `${t('ផ្ទះលេខ', 'House #')} ${houseNo.trim()}`)
    : '';

  const formattedStreet = streetNo.trim()
    ? (streetNo.startsWith('ផ្លូវ') || streetNo.toLowerCase().startsWith('st') || streetNo.toLowerCase().startsWith('street')
        ? streetNo.trim()
        : `${t('ផ្លូវ', 'St.')} ${streetNo.trim()}`)
    : '';

  const computedStreetAddress = [
    formattedHouse,
    formattedStreet,
    activeSangkat.trim()
  ].filter(Boolean).join(', ');

  const currentProvinceObj = CAMBODIAN_PROVINCES.find(p => p.id === province);
  const currentProvinceLabel = currentProvinceObj ? (lang === 'km' ? currentProvinceObj.km : currentProvinceObj.en) : province;

  const fullDisplayAddress = [
    computedStreetAddress,
    district,
    currentProvinceLabel
  ].filter(Boolean).join(', ');

  // KHR Conversion (1 USD = 4,100 KHR)
  const totalKHR = Math.round(grandTotal * 4100).toLocaleString();

  const handleSimulateKHQRScan = async () => {
    try {
      setVerifyingKhqr(true);
      const res = await api.verifyKHQR(grandTotal, 'TEMP');
      if (res.success) {
        setKhqrVerified(true);
        showToast(t('បានស្កេន KHQR Bakong និងផ្ទៀងផ្ទាត់ជោគជ័យ!', 'KHQR Bakong scanned & verified successfully!'));
      }
    } catch (err) {
      showToast(t('ការផ្ទៀងផ្ទាត់ KHQR បរាជ័យ', 'KHQR verification failed'), 'error');
    } finally {
      setVerifyingKhqr(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !houseNo.trim() || !streetNo.trim() || !activeSangkat.trim()) {
      showToast(t('សូមបំពេញឈ្មោះ, លេខទូរស័ព្ទ, ផ្ទះលេខ, ផ្លូវ និងសង្កាត់/ឃុំ', 'Please fill in name, phone, house no, street, and sangkat/commune'), 'error');
      return;
    }

    if (cart.length === 0) {
      showToast(t('កន្ត្រកទំនិញទទេ', 'Cart is empty'), 'error');
      navigateTo('shop');
      return;
    }

    try {
      setSubmittingOrder(true);
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || 'customer@example.com',
        province: currentProvinceLabel,
        district: district.trim(),
        streetAddress: computedStreetAddress,
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
        showToast(t('ការបញ្ជាទិញទទួលបានជោគជ័យ! សារ Telegram ត្រូវបានបញ្ជូន។', 'Order placed successfully! Telegram alert dispatched.'));
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
          <ArrowLeft size={16} /> {t('ត្រឡប់ទៅកន្ត្រកវិញ', 'Back to Cart')}
        </button>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          {t('ការទូទាត់ និងដឹកជញ្ជូន', 'Checkout & Delivery')}
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          {t('សូមបំពេញព័ត៌មានដឹកជញ្ជូន និងជ្រើសរើសវិធីសាស្ត្រទូទាត់ប្រាក់', 'Please provide shipping details and choose your preferred payment method')}
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
                  <span>{t('១. អាសយដ្ឋានដឹកជញ្ជូន', '1. Shipping Address')}</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">{t('ឈ្មោះអ្នកទទួល *', 'Recipient Name *')}</label>
                    <input 
                      type="text"
                      required
                      placeholder={t('ឧ. Sokha Heng', 'e.g. Sokha Heng')}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('លេខទូរស័ព្ទ *', 'Phone Number *')}</label>
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
                  <label className="form-label">{t('អ៊ីមែល', 'Email Address')}</label>
                  <input 
                    type="email"
                    placeholder="customer@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">{t('ខេត្ត / រាជធានី *', 'Province / City *')}</label>
                    <select 
                      value={province} 
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      className="form-select"
                      required
                    >
                      {CAMBODIAN_PROVINCES.map(p => (
                        <option key={p.id} value={p.id}>{lang === 'km' ? p.km : p.en}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('ខណ្ឌ / ស្រុក *', 'District / Khan *')}</label>
                    <select 
                      value={districtKey}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">{t('-- ជ្រើសរើសខណ្ឌ/ស្រុក --', '-- Select District/Khan --')}</option>
                      {(CAMBODIA_DISTRICTS[province] || []).map(d => (
                        <option key={d.en} value={d.en}>
                          {lang === 'km' ? d.km : d.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sangkat / Commune */}
                <div className="form-group">
                  <label className="form-label">{t('សង្កាត់ / ឃុំ *', 'Sangkat / Commune *')}</label>
                  {sangkatsForSelectedDistrict.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <select
                        value={sangkat}
                        onChange={(e) => setSangkat(e.target.value)}
                        className="form-select"
                        required={sangkat !== '__custom__'}
                      >
                        <option value="">{t('-- ជ្រើសរើសសង្កាត់ --', '-- Select Sangkat --')}</option>
                        {sangkatsForSelectedDistrict.map(s => (
                          <option key={s.en} value={lang === 'km' ? s.km : s.en}>
                            {lang === 'km' ? s.km : s.en}
                          </option>
                        ))}
                        <option value="__custom__">{t('ផ្សេងៗ (វាយបញ្ចូលផ្ទាល់)...', 'Other (Type manually)...')}</option>
                      </select>
                      {sangkat === '__custom__' && (
                        <input
                          type="text"
                          required
                          placeholder={t('វាយឈ្មោះសង្កាត់ ឬឃុំនៅទីនេះ...', 'Type Sangkat or Commune here...')}
                          value={customSangkat}
                          onChange={(e) => setCustomSangkat(e.target.value)}
                          className="form-input"
                          autoFocus
                        />
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      required
                      placeholder={t('ឧ. ឃុំ ឬ សង្កាត់...', 'e.g. Commune or Sangkat...')}
                      value={sangkat === '__custom__' ? customSangkat : sangkat}
                      onChange={(e) => {
                        setSangkat(e.target.value);
                        setCustomSangkat(e.target.value);
                      }}
                      className="form-input"
                    />
                  )}
                </div>

                {/* House No and Street */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">{t('ផ្ទះលេខ *', 'House No. *')}</label>
                    <input 
                      type="text"
                      required
                      placeholder={t('ឧ. ១៤A ឬ #14A', 'e.g. #14A or Building 2')}
                      value={houseNo}
                      onChange={(e) => setHouseNo(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('ផ្លូវ / មហាវិថី *', 'Street / Boulevard *')}</label>
                    <input 
                      type="text"
                      required
                      placeholder={t('ឧ. ២៨៩ ឬ ផ្លូវជាតិលេខ១', 'e.g. 289 or St. 2004')}
                      value={streetNo}
                      onChange={(e) => setStreetNo(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Live Full Address Preview */}
                {fullDisplayAddress && (
                  <div style={{
                    background: 'rgba(255, 107, 43, 0.08)',
                    border: '1px solid rgba(255, 107, 43, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <MapPin size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '2px' }}>
                        {t('អាសយដ្ឋានដឹកជញ្ជូនពេញលេញ៖', 'Full Delivery Address:')}
                      </div>
                      <div style={{ color: 'var(--text-primary)', wordBreak: 'break-word', lineHeight: 1.4 }}>
                        {fullDisplayAddress}
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{t('ចំណាំសម្រាប់ការដឹកជញ្ជូន', 'Delivery Notes')}</label>
                  <textarea 
                    rows="2"
                    placeholder={t('ឧ. សូមទូរស័ព្ទមុនពេលមកដល់ ឬដាក់នៅមុខផ្ទះ...', 'e.g. Please call before arrival or leave at doorstep...')}
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
                  <span>{t('២. វិធីសាស្ត្រទូទាត់ប្រាក់', '2. Payment Method')}</span>
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
                    <div>{t('ទូទាត់ពេលទទួល', 'Cash on Delivery')}</div>
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
                    <div>{t('ផ្ទេរតាមធនាគារ', 'Bank Transfer')}</div>
                    <div>ABA / ACLEDA</div>
                  </button>
                </div>

                {/* KHQR Card Display */}
                {paymentMethod === 'KHQR' && (
                  <div style={{
                    background: 'linear-gradient(135deg, #002d56, #00427a)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    color: '#fff',
                    boxShadow: 'var(--shadow-md)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 163, 224, 0.3)'
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.4rem' }}>🇰🇭</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>ABA' KHQR • BAKONG</span>
                      </div>
                      <span className="badge" style={{ background: 'rgba(0, 163, 224, 0.3)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                        {t('ស្កេនទូទាត់ភ្លាមៗ', 'Scan to Pay')}
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
                      {/* Real ABA KHQR Visual */}
                      <div style={{
                        maxWidth: '220px',
                        width: '100%',
                        background: '#fff',
                        border: '2px solid #00427a',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                        textAlign: 'center'
                      }}>
                        <img 
                          src={storeSettings?.khqrImage || '/aba-khqr.jpg'} 
                          alt="ABA KHQR Code" 
                          style={{ width: '100%', height: 'auto', display: 'block' }} 
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{t('ម្ចាស់គណនី:', 'Receiver Name:')}</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002d56', marginBottom: '6px' }}>
                          {storeSettings?.khqrReceiverName || 'NET NAI'}
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '2px' }}>{t('គណនី ABA (USD):', 'ABA Account (USD):')} <strong>012 402 485</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '10px' }}>{t('គណនី ABA (KHR):', 'ABA Account (KHR):')} <strong>012 402 486</strong></div>

                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{t('ចំនួនទឹកប្រាក់:', 'Total Amount:')}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#00427a' }}>
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
                            background: khqrVerified ? '#10b981' : 'linear-gradient(135deg, #00427a, #002d56)',
                            color: '#fff',
                            width: '100%',
                            fontSize: '0.82rem',
                            padding: '10px 14px'
                          }}
                        >
                          {verifyingKhqr ? (
                            <span>{t('កំពុងផ្ទៀងផ្ទាត់...', 'Verifying...')}</span>
                          ) : khqrVerified ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <Check size={14} /> {t('បានផ្ទៀងផ្ទាត់រួចរាល់', 'Verified Successfully')}
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <Zap size={14} /> {t('ស្កេនរួចចុចទីនេះដើម្បីផ្ទៀងផ្ទាត់', 'Scanned? Click to Verify')}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: '14px', fontSize: '0.78rem', textAlign: 'center', opacity: 0.9 }}>
                      {t('គាំទ្រគ្រប់កម្មវិធីធនាគារនៅកម្ពុជា៖ ABA Mobile, Bakong, ACLEDA, Wing, Canadia, Sathapana', 'Supported by all Cambodian banking apps: ABA Mobile, Bakong, ACLEDA, Wing, Canadia, Sathapana')}
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
                      <span>{t('ទូទាត់ប្រាក់នៅពេលទទួលបានស្បែកជើង', 'Cash On Delivery')}</span>
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {t(
                        `អ្នកដឹកជញ្ជូននឹងប្រគល់កញ្ចប់ស្បែកជើងជូនអ្នកដល់ផ្ទះ។ អ្នកអាចពិនិត្យទំនិញ និងទំហំ Size រួចទូទាត់សាច់ប្រាក់ចំនួន $${grandTotal.toFixed(2)} (ឬ ${totalKHR} KHR)។`,
                        `The courier will deliver your shoes to your doorstep. You can inspect the shoes and size, then pay $${grandTotal.toFixed(2)} (or ${totalKHR} KHR) in cash.`
                      )}
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
                    <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>{t('ព័ត៌មានផ្ទេរប្រាក់ផ្ទាល់៖', 'Direct Bank Transfer Details:')}</h4>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      <div>• <strong>ABA Bank:</strong> 012 402 485 (USD) / 012 402 486 (KHR) - NET NAI</div>
                      <div>• <strong>ACLEDA:</strong> {storeSettings?.acledaAccount || '1234-5678-9012 (NET NAI)'}</div>
                      <div>• <strong>Wing:</strong> {storeSettings?.wingAccount || '012 345 678 (NET NAI)'}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Confirmation */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>{t('សង្ខេបទំនិញកុម្ម៉ង់', 'Order Summary')} ({cart.length})</h3>

              {/* Items List Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '20px' }}>
                {cart.map(item => (
                  <div key={item.cartItemId} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lang === 'km' && item.khmerName ? item.khmerName : item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {t(`ទំហំ៖ ${item.size}`, `Size: ${item.size}`)} • x{item.quantity}
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
                  <span>{t('តម្លៃសរុប:', 'Subtotal:')}</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                    <span>{t('បញ្ចុះតម្លៃ', 'Discount')} ({appliedCoupon?.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>{t('សេវាដឹកជញ្ជូន:', 'Delivery:')}</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: '#10b981' }}>{t('ឥតគិតថ្លៃ', 'Free')}</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                  <span>{t('សរុប:', 'Total:')}</span>
                  <span className="gradient-text">${grandTotal.toFixed(2)}</span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  ≈ {totalKHR} {t('រៀល', 'KHR')}
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
                <span>{submittingOrder ? t('កំពុងបញ្ជូនការបញ្ជាទិញ...', 'Submitting Order...') : t('បញ្ជាក់ការបញ្ជាទិញ', 'Place Order')}</span>
              </button>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                {t(
                  'ដោយចុចបញ្ជាក់ការបញ្ជាទិញ អ្នកយល់ព្រមតាមគោលការណ៍ហាង StepUp Shoes និងការជូនដំណឹងតាម Telegram។',
                  'By placing your order, you agree to StepUp Shoes store policies and Telegram order notifications.'
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
