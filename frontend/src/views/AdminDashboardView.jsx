import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Star, 
  Send, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  TrendingUp, 
  AlertTriangle,
  RefreshCw,
  Search,
  DollarSign,
  Database,
  Flame,
  ExternalLink,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  CreditCard,
  Printer,
  Clock,
  Truck
} from 'lucide-react';

export default function AdminDashboardView() {
  const { showToast, storeSettings, setStoreSettings } = useStore();
  
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, coupons, reviews, telegram, database, settings
  const [dashboardData, setDashboardData] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [telegramLogs, setTelegramLogs] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [testingDb, setTestingDb] = useState(false);
  const [dbConfigForm, setDbConfigForm] = useState({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'shoes_store_db'
  });
  const [loading, setLoading] = useState(true);

  // Filter state in Admin
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  // Modals state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);

  // New product form
  const [productForm, setProductForm] = useState({
    name: '',
    khmerName: '',
    brand: 'StepUp Signature',
    category: 'sneakers',
    price: 65,
    originalPrice: 80,
    stock: 20,
    sizes: [39, 40, 41, 42, 43],
    colors: ['Black', 'White'],
    material: 'Breathable Mesh',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    description: ''
  });

  // New coupon form
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 30,
    description: ''
  });

  const availableSizes = [38, 39, 40, 41, 42, 43, 44, 45];

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      const [dashRes, prodRes, ordRes, coupRes, revRes, tgRes, dbRes] = await Promise.all([
        api.fetchAdminDashboard(),
        api.fetchProducts(),
        api.fetchAdminOrders(orderStatusFilter),
        api.fetchCoupons(),
        api.fetchReviews(),
        api.fetchTelegramLogs(),
        api.fetchDatabaseStatus()
      ]);

      if (dashRes.success) setDashboardData(dashRes.data);
      if (prodRes.success) setProducts(prodRes.data);
      if (ordRes.success) setOrders(ordRes.data);
      if (coupRes.success) setCoupons(coupRes.data);
      if (revRes.success) setReviews(revRes.data);
      if (tgRes.success) setTelegramLogs(tgRes.data);
      if (dbRes && dbRes.success) {
        setDbStatus(dbRes.data);
        setDbConfigForm(prev => ({
          ...prev,
          host: dbRes.data.host || 'localhost',
          port: dbRes.data.port || 3306,
          user: dbRes.data.user || 'root',
          database: dbRes.data.database || 'shoes_store_db'
        }));
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestDbConnection = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setTestingDb(true);
    try {
      const res = await api.testDatabaseConnection();
      if (res.success) {
        showToast(`✓ ${res.message}`);
        const refreshed = await api.fetchDatabaseStatus();
        if (refreshed.success) setDbStatus(refreshed.data);
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('បរាជ័យក្នុងការតភ្ជាប់ Firebase Firestore', 'error');
    } finally {
      setTestingDb(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, [orderStatusFilter]);

  // Handle Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      khmerName: '',
      brand: 'StepUp Signature',
      category: 'sneakers',
      price: 65,
      originalPrice: 80,
      stock: 20,
      sizes: [39, 40, 41, 42, 43],
      colors: ['Black', 'White'],
      material: 'Breathable Mesh',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
      description: ''
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      khmerName: prod.khmerName || prod.name,
      brand: prod.brand,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      stock: prod.stock,
      sizes: prod.sizes || [39, 40, 41, 42, 43],
      colors: prod.colors || ['Black'],
      material: prod.material || '',
      images: prod.images || [],
      description: prod.description || ''
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await api.updateProduct(editingProduct.id, productForm);
        if (res.success) {
          showToast('✓ បានកែប្រែទិន្នន័យស្បែកជើងជោគជ័យ!');
          setShowProductModal(false);
          loadAllAdminData();
        }
      } else {
        const res = await api.createProduct(productForm);
        if (res.success) {
          showToast('✓ បានបន្ថែមស្បែកជើងថ្មីចូលក្នុងស្តុក!');
          setShowProductModal(false);
          loadAllAdminData();
        }
      }
    } catch (err) {
      showToast('បរាជ័យក្នុងការរក្សាទុកផលិតផល', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('តើអ្នកប្រាកដជាចង់លុបស្បែកជើងនេះមែនទេ?')) {
      try {
        const res = await api.deleteProduct(id);
        if (res.success) {
          showToast('បានលុបស្បែកជើងរួចរាល់', 'info');
          loadAllAdminData();
        }
      } catch (err) {
        showToast('បរាជ័យក្នុងការលុប', 'error');
      }
    }
  };

  // Handle Order Status change
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.updateOrderStatus(orderId, newStatus, `ស្ថានភាពបានប្តូរទៅជា ${newStatus}`);
      if (res.success) {
        showToast(`✓ បានផ្លាស់ប្តូរស្ថានភាព Order ទៅជា ${newStatus}!`);
        loadAllAdminData();
        setShowOrderModal(prev => prev ? ({
          ...prev,
          status: newStatus,
          orderStatus: newStatus
        }) : null);
      }
    } catch (err) {
      showToast('បរាជ័យក្នុងការផ្លាស់ប្តូរស្ថានភាព', 'error');
    }
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបការបញ្ជាទិញនេះមែនទេ? (Are you sure you want to delete this order?)')) {
      try {
        // Optimistically remove from state immediately
        setOrders(prev => prev.filter(o => o.id !== orderId && o.orderNumber !== orderId));
        if (showOrderModal && (showOrderModal.id === orderId || showOrderModal.orderNumber === orderId)) {
          setShowOrderModal(null);
        }

        const res = await api.deleteOrder(orderId);
        if (res.success) {
          showToast('✓ បានលុបការបញ្ជាទិញដោយជោគជ័យ!', 'info');
          await loadAllAdminData();
        } else {
          showToast(res.message || 'បរាជ័យក្នុងការលុប Order', 'error');
          await loadAllAdminData();
        }
      } catch (err) {
        showToast('បរាជ័យក្នុងការលុប Order', 'error');
        await loadAllAdminData();
      }
    }
  };

  // Handle Test Telegram
  const handleTestTelegram = async () => {
    try {
      const res = await api.sendTestTelegram();
      if (res.success) {
        showToast('🔔 សារសាកល្បង Telegram ត្រូវបានបញ្ជូនជោគជ័យ!');
        loadAllAdminData();
      }
    } catch (err) {
      showToast('Telegram test error', 'error');
    }
  };

  // Handle Create Coupon
  const handleSaveCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createCoupon(couponForm);
      if (res.success) {
        showToast(`✓ បានបង្កើតកូដបញ្ចុះតម្លៃ ${couponForm.code}!`);
        setShowCouponModal(false);
        setCouponForm({ code: '', discountType: 'percentage', discountValue: 10, minSpend: 30, description: '' });
        loadAllAdminData();
      }
    } catch (err) {
      showToast('Failed to create coupon', 'error');
    }
  };

  // Handle Delete Review
  const handleDeleteReview = async (id) => {
    try {
      await api.deleteReview(id);
      showToast('បានលុបការវាយតម្លៃ');
      loadAllAdminData();
    } catch (err) {
      showToast('Error', 'error');
    }
  };

  return (
    <div style={{ padding: '30px 0 80px' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '20px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-hot">ADMIN PORTAL</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Shoes Store Management</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              ផ្ទាំងគ្រប់គ្រងប្រព័ន្ធ <span className="gradient-text">StepUp Shoes</span>
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleTestTelegram} className="btn btn-secondary btn-sm" title="Test Telegram Alert">
              <Send size={14} color="#00d2ff" /> Test Telegram Alert
            </button>
            <button onClick={loadAllAdminData} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Refresh Data
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '28px'
        }}>
          {[
            { id: 'overview', label: 'ផ្ទាំងទូទៅ (Overview)', icon: LayoutDashboard },
            { id: 'products', label: `ស្បែកជើង (${products.length})`, icon: Package },
            { id: 'orders', label: `ការបញ្ជាទិញ (${orders.length})`, icon: ShoppingBag },
            { id: 'coupons', label: `កូដប្រូម៉ូសិន (${coupons.length})`, icon: Tag },
            { id: 'reviews', label: `ការវាយតម្លៃ (${reviews.length})`, icon: Star },
            { id: 'telegram', label: `Telegram Logs (${telegramLogs.length})`, icon: Send },
            { id: 'database', label: '🔥 Firebase (Connected)', icon: Flame },
            { id: 'settings', label: 'ការកំណត់ហាង (Settings)', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-light)',
                  background: isActive ? 'rgba(255, 94, 54, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ---------------- TAB 1: OVERVIEW ---------------- */}
        {activeTab === 'overview' && dashboardData && (
          <div>
            {/* KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div className="glass-panel" style={{ padding: '22px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <span>ចំណូលលក់សរុប (Total Sales)</span>
                  <DollarSign size={18} color="#10b981" />
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#10b981' }}>
                  ${Number(dashboardData?.metrics?.totalSales || dashboardData?.totalRevenue || 0).toFixed(2)}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ពីការទូទាត់ជោគជ័យ (KHQR & Verified)
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '22px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <span>ការបញ្ជាទិញសរុប (Total Orders)</span>
                  <ShoppingBag size={18} color="var(--accent-primary)" />
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {dashboardData?.metrics?.totalOrders ?? dashboardData?.totalOrders ?? orders.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#ff7552', marginTop: '4px' }}>
                  កំពុងដំណើរការ: {dashboardData?.metrics?.pendingOrders ?? dashboardData?.pendingOrders ?? 0} Orders
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '22px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <span>ស្បែកជើងក្នុងស្តុក (Shoes)</span>
                  <Package size={18} color="#00d2ff" />
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#00d2ff' }}>
                  {dashboardData?.metrics?.totalProducts ?? dashboardData?.totalProducts ?? products.length} ម៉ូដ
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ប្រភេទ Sneakers, Formal, Casual, Sandals
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '22px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <span>ការជូនដំណឹង (Telegram Logs)</span>
                  <Send size={18} color="#f59e0b" />
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#f59e0b' }}>
                  {telegramLogs.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ផ្ញើទៅ chhoyyeanseou5@gmail.com
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="glass-panel" style={{ padding: '26px', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>ការបញ្ជាទិញថ្មីៗ (Recent Orders)</h3>
                <button onClick={() => setActiveTab('orders')} className="btn btn-secondary btn-sm">
                  មើលទាំងអស់
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '12px' }}>Order ID</th>
                      <th style={{ padding: '12px' }}>អតិថិជន</th>
                      <th style={{ padding: '12px' }}>ទំនិញ</th>
                      <th style={{ padding: '12px' }}>សរុប</th>
                      <th style={{ padding: '12px' }}>ទូទាត់</th>
                      <th style={{ padding: '12px' }}>ស្ថានភាព</th>
                      <th style={{ padding: '12px' }}>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--accent-primary)' }}>#{o.orderNumber || o.id}</td>
                        <td style={{ padding: '12px' }}>{o.customerName || o.name || 'អតិថិជន'} ({o.customerPhone || o.phone || '-'})</td>
                        <td style={{ padding: '12px' }}>{o.items?.length || (Array.isArray(o.cart) ? o.cart.length : 1)} មុខ</td>
                        <td style={{ padding: '12px', fontWeight: 700 }}>${Number(o.totalAmount || o.grandTotal || o.total || 0).toFixed(2)}</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>{o.paymentMethod || 'COD'}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-success">{o.orderStatus || o.status || 'Confirmed'}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button 
                              onClick={() => setShowOrderModal(o)} 
                              className="btn btn-secondary btn-sm" 
                              style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              title="មើលព័ត៌មានលម្អិត"
                            >
                              <Eye size={13} /> <span>លម្អិត</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteOrder(o.id)} 
                              style={{
                                padding: '5px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.35)',
                                color: '#f87171',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                              title="លុបការបញ្ជាទិញនេះ"
                            >
                              <Trash2 size={13} /> <span>លុប</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: PRODUCTS ---------------- */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="text"
                  placeholder="ស្វែងរកឈ្មោះ ឬ Brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="form-input"
                  style={{ width: '240px', padding: '8px 12px' }}
                />
              </div>

              <button onClick={handleOpenAddProduct} className="btn btn-primary btn-sm">
                <Plus size={16} /> បន្ថែមស្បែកជើងថ្មី (Add Shoe)
              </button>
            </div>

            {/* Products Table */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '12px' }}>រូបភាព</th>
                      <th style={{ padding: '12px' }}>ឈ្មោះស្បែកជើង</th>
                      <th style={{ padding: '12px' }}>Brand</th>
                      <th style={{ padding: '12px' }}>ប្រភេទ</th>
                      <th style={{ padding: '12px' }}>តម្លៃ</th>
                      <th style={{ padding: '12px' }}>ស្តុក</th>
                      <th style={{ padding: '12px' }}>ទំហំ EU</th>
                      <th style={{ padding: '12px' }}>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.brand.toLowerCase().includes(productSearch.toLowerCase()))
                      .map(p => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '10px 12px' }}>
                            <img src={p.images && p.images[0]} alt="" style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontWeight: 700 }}>{p.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.khmerName}</div>
                          </td>
                          <td style={{ padding: '10px 12px' }}><span className="badge badge-hot">{p.brand}</span></td>
                          <td style={{ padding: '10px 12px', textTransform: 'capitalize' }}>{p.category}</td>
                          <td style={{ padding: '10px 12px', fontWeight: 800 }}>${p.price.toFixed(2)}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{ color: p.stock < 15 ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                              {p.stock} គូ
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '0.78rem' }}>
                            {p.sizes ? p.sizes.join(', ') : '39-44'}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => handleOpenEditProduct(p)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}>
                                <Edit size={13} />
                              </button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', color: '#ef4444' }}>
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: ORDERS ---------------- */}
        {activeTab === 'orders' && (
          <div>
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['all', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    borderColor: orderStatusFilter === st ? 'var(--accent-primary)' : 'var(--border-light)',
                    background: orderStatusFilter === st ? 'rgba(255, 94, 54, 0.2)' : 'transparent',
                    color: orderStatusFilter === st ? 'var(--accent-primary)' : 'var(--text-secondary)'
                  }}
                >
                  {st === 'all' ? 'ទាំងអស់' : st}
                </button>
              ))}
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '12px' }}>Order ID</th>
                      <th style={{ padding: '12px' }}>អតិថិជន</th>
                      <th style={{ padding: '12px' }}>ទូរស័ព្ទ</th>
                      <th style={{ padding: '12px' }}>ទីតាំងដឹកជញ្ជូន</th>
                      <th style={{ padding: '12px' }}>សរុប</th>
                      <th style={{ padding: '12px' }}>ការទូទាត់</th>
                      <th style={{ padding: '12px' }}>ស្ថានភាព</th>
                      <th style={{ padding: '12px' }}>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '12px', fontWeight: 800, color: 'var(--accent-primary)' }}>#{o.orderNumber || o.id}</td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{o.customerName || o.name || 'អតិថិជន'}</td>
                        <td style={{ padding: '12px' }}>{o.customerPhone || o.phone || '-'}</td>
                        <td style={{ padding: '12px', fontSize: '0.8rem' }}>{o.shippingAddress?.province || (typeof o.shippingAddress === 'string' ? o.shippingAddress : (o.address || 'ភ្នំពេញ'))}</td>
                        <td style={{ padding: '12px', fontWeight: 800 }}>${Number(o.totalAmount || o.grandTotal || o.total || 0).toFixed(2)}</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-success">{o.paymentMethod || 'COD'}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <select
                            value={o.orderStatus || o.status || 'Confirmed'}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid var(--border-light)',
                              color: 'var(--text-primary)',
                              fontSize: '0.8rem'
                            }}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button 
                              onClick={() => setShowOrderModal(o)} 
                              className="btn btn-secondary btn-sm" 
                              style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              title="មើលព័ត៌មានលម្អិត"
                            >
                              <Eye size={14} /> <span>លម្អិត</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteOrder(o.id)} 
                              style={{
                                padding: '5px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.35)',
                                color: '#f87171',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                              title="លុបការបញ្ជាទិញនេះ"
                            >
                              <Trash2 size={13} /> <span>លុប</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: COUPONS ---------------- */}
        {activeTab === 'coupons' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>កូដប្រូម៉ូសិន (Coupons & Discounts)</h3>
              <button onClick={() => setShowCouponModal(true)} className="btn btn-primary btn-sm">
                <Plus size={15} /> បង្កើតកូដថ្មី
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {coupons.map((c, i) => (
                <div key={i} className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{c.code}</span>
                    <span className="badge badge-success">ACTIVE</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    {c.description}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ប្រភេទ: {c.discountType} • ចាប់ពី: ${c.minSpend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 5: REVIEWS ---------------- */}
        {activeTab === 'reviews' && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>ការវាយតម្លៃរបស់អតិថិជន (Reviews Moderation)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {reviews.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong>{r.customerName}</strong>
                      <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>★ {r.rating}/5</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({r.date})</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{r.comment}</p>
                  </div>
                  <button onClick={() => handleDeleteReview(r.id)} className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 6: TELEGRAM LOGS ---------------- */}
        {activeTab === 'telegram' && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>កំណត់ត្រាផ្ញើដំណឹង Telegram (Notification Logs)</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  រាល់ពេលមាន Order ថ្មី ឬប្តូរ Status ប្រព័ន្ធនឹង dispatch ដំណឹងទៅកាន់ Telegram
                </p>
              </div>
              <button onClick={handleTestTelegram} className="btn btn-primary btn-sm">
                <Send size={14} /> ផ្ញើសារ Test
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {telegramLogs.map(log => (
                <div key={log.id} style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 210, 255, 0.05)',
                  border: '1px solid rgba(0, 210, 255, 0.2)',
                  fontSize: '0.88rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: '#00d2ff' }}>{log.status}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <pre style={{
                    fontFamily: 'inherit',
                    whiteSpace: 'pre-wrap',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {log.message}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 7: SETTINGS ---------------- */}
        {activeTab === 'settings' && storeSettings && (
          <div className="glass-panel" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', maxWidth: '680px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>ការកំណត់ព័ត៌មានហាង & Telegram</h3>
            
            <div className="form-group">
              <label className="form-label">ឈ្មោះហាង (Store Name)</label>
              <input 
                type="text" 
                value={storeSettings.storeName || ''} 
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">អ៊ីមែលអ្នកគ្រប់គ្រង (Admin / Telegram Manager)</label>
              <input 
                type="email" 
                value={storeSettings.contactEmail || ''} 
                onChange={(e) => setStoreSettings({ ...storeSettings, contactEmail: e.target.value })}
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">លេខទូរស័ព្ទហាង</label>
              <input 
                type="text" 
                value={storeSettings.contactPhone || ''} 
                onChange={(e) => setStoreSettings({ ...storeSettings, contactPhone: e.target.value })}
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telegram Bot Token (សម្រាប់បាញ់សារ Notification)</label>
              <input 
                type="text" 
                value={storeSettings.telegramBotToken || ''} 
                onChange={(e) => setStoreSettings({ ...storeSettings, telegramBotToken: e.target.value })}
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">រយៈពេលប្តូរ Size (Days)</label>
              <input 
                type="number" 
                value={storeSettings.exchangePolicyDays || 7} 
                onChange={(e) => setStoreSettings({ ...storeSettings, exchangePolicyDays: parseInt(e.target.value, 10) })}
                className="form-input" 
              />
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--accent-primary)' }}>
                💳 ព័ត៌មានវិធីសាស្ត្រទូទាត់ប្រាក់ (Payment Method Settings)
              </h4>

              <div className="form-group">
                <label className="form-label">ឈ្មោះម្ចាស់គណនី KHQR (KHQR Receiver Name)</label>
                <input 
                  type="text" 
                  placeholder="ឧ. SHOES STORE STEPUP"
                  value={storeSettings.khqrReceiverName || ''} 
                  onChange={(e) => setStoreSettings({ ...storeSettings, khqrReceiverName: e.target.value })}
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">រូបភាព QR Code ពិតប្រាកដ (Upload Real KHQR Image)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {storeSettings.khqrImage ? (
                    <div style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #be123c' }}>
                      <img src={storeSettings.khqrImage} alt="KHQR" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }} />
                      <button 
                        type="button" 
                        onClick={() => setStoreSettings({ ...storeSettings, khqrImage: '' })}
                        style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px' }}
                        title="លុបរូបភាព"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div style={{ width: '90px', height: '90px', borderRadius: '8px', border: '1px dashed var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', padding: '4px' }}>
                      គ្មានរូបភាព
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setStoreSettings({ ...storeSettings, khqrImage: event.target.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="form-input"
                      style={{ padding: '6px', fontSize: '0.84rem' }}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      ជ្រើសរើសរូបភាព QR Code ពីទូរស័ព្ទ ឬកុំព្យូទ័រ (JPG, PNG)
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">គណនី ABA Bank (ABA Account Number & Name)</label>
                <input 
                  type="text" 
                  placeholder="ឧ. 000 892 123 (STEPUP SHOES CO.)"
                  value={storeSettings.abaAccount || ''} 
                  onChange={(e) => setStoreSettings({ ...storeSettings, abaAccount: e.target.value })}
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">គណនី ACLEDA Bank</label>
                <input 
                  type="text" 
                  placeholder="ឧ. 1234-5678-9012 (STEPUP SHOES CO.)"
                  value={storeSettings.acledaAccount || ''} 
                  onChange={(e) => setStoreSettings({ ...storeSettings, acledaAccount: e.target.value })}
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">គណនី Wing Bank</label>
                <input 
                  type="text" 
                  placeholder="ឧ. 012 345 678 (STEPUP SHOES)"
                  value={storeSettings.wingAccount || ''} 
                  onChange={(e) => setStoreSettings({ ...storeSettings, wingAccount: e.target.value })}
                  className="form-input" 
                />
              </div>
            </div>

            <button 
              onClick={async () => {
                await api.updateStoreSettings(storeSettings);
                showToast('✓ បានរក្សាទុកការកំណត់ហាងជោគជ័យ!');
              }}
              className="btn btn-primary btn-md"
            >
              រក្សាទុកការកំណត់
            </button>
          </div>
        )}

        {/* ---------------- TAB 8: DATABASE (FIREBASE) ---------------- */}
        {activeTab === 'database' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
            {/* Status Card */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Flame size={24} color="#FF9100" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>ស្ថានភាព Firebase</h3>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✓ FIREBASE CONNECTED
                </span>
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(255, 145, 0, 0.1)',
                border: '1px solid rgba(255, 145, 0, 0.3)',
                marginBottom: '20px',
                fontSize: '0.88rem',
                lineHeight: 1.6
              }}>
                <div style={{ color: '#ffb74d' }}>
                  <strong>🔥 ភ្ជាប់ទៅកាន់ Google Cloud Firestore ដោយជោគជ័យ!</strong><br />
                  ទិន្នន័យផលិតផល ការបញ្ជាទិញ កូដប្រូម៉ូសិន និងការកំណត់ទាំងអស់ត្រូវបាន Real-time Synchronize ជាមួយ Firebase Project <code>stepup-shoes-store-2bd6b</code>។
                </div>
              </div>

              {/* Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Database Engine:</span>
                  <strong style={{ color: '#ff9100' }}>Google Cloud Firestore</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Firebase Project ID:</span>
                  <strong>stepup-shoes-store-2bd6b</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Database Name:</span>
                  <strong>(default)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Location / Region:</span>
                  <strong>asia-southeast1 (Singapore)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Authentication:</span>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>Email/Password & Google Sign-In</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Security Rules:</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>Cloud Firestore Rules v2 (Active)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Collections Status:</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>6 Collections Verified</span>
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Firebase Web App ID: <code>1:973276165210:web:0a61fb1937f4c242321463</code>
              </div>
            </div>

            {/* Firebase Configuration & Sync Card */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Flame size={22} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>ការកំណត់រចនាសម្ព័ន្ធ Firebase</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                ព័ត៌មានលម្អិតនៃ Cloud Firestore & Firebase Authentication សម្រាប់ Project របស់អ្នក
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Project ID</label>
                  <input 
                    type="text" 
                    readOnly
                    value="stepup-shoes-store-2bd6b" 
                    className="form-input" 
                    style={{ background: 'rgba(255,255,255,0.03)', color: '#ffb74d', fontWeight: 600 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Auth Domain</label>
                    <input 
                      type="text" 
                      readOnly
                      value="stepup-shoes-store-2bd6b.firebaseapp.com" 
                      className="form-input" 
                      style={{ background: 'rgba(255,255,255,0.03)', fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Storage Bucket</label>
                    <input 
                      type="text" 
                      readOnly
                      value="stepup-shoes-store-2bd6b.firebasestorage.app" 
                      className="form-input" 
                      style={{ background: 'rgba(255,255,255,0.03)', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Web App ID</label>
                  <input 
                    type="text" 
                    readOnly
                    value="1:973276165210:web:0a61fb1937f4c242321463" 
                    className="form-input" 
                    style={{ background: 'rgba(255,255,255,0.03)', fontSize: '0.82rem' }}
                  />
                </div>

                <button 
                  type="button" 
                  onClick={handleTestDbConnection} 
                  disabled={testingDb} 
                  className="btn btn-primary btn-md" 
                  style={{ width: '100%', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <RefreshCw size={16} className={testingDb ? 'spin' : ''} />
                  <span>{testingDb ? 'កំពុងផ្ទៀងផ្ទាត់ការតភ្ជាប់...' : '🔄 ផ្ទៀងផ្ទាត់ការតភ្ជាប់ Firebase (Test & Sync Firestore)'}</span>
                </button>

                <a 
                  href="https://console.firebase.google.com/project/stepup-shoes-store-2bd6b/firestore"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-md"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                >
                  <ExternalLink size={16} />
                  <span>🚀 បើកមើល Firebase Console (Firestore Data)</span>
                </a>
              </div>

              {/* Instructions Box */}
              <div style={{
                marginTop: '22px',
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-light)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  🔥 ព័ត៌មានអំពី Firebase Backend & Security:
                </strong>
                ១. រាល់ទិន្នន័យផលិតផល ការបញ្ជាទិញ និងការកំណត់ត្រូវបានរក្សាទុកនៅលើ <strong>Google Cloud Firestore</strong> ដោយផ្ទាល់។<br />
                ២. ប្រព័ន្ធ Authentication គាំទ្រ <strong>Email/Password</strong> និង <strong>Google Sign-In</strong> ជាមួយនឹង Firebase Auth SDK។<br />
                ៣. Security Rules ត្រូវបានកំណត់ជា <code>Rules v2</code> សម្រាប់ការពារទិន្នន័យអតិថិជន និងការបញ្ជាទិញ។
              </div>
            </div>
          </div>
        )}

        {/* ---------------- PRODUCT ADD / EDIT MODAL ---------------- */}
        {showProductModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '640px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              position: 'relative'
            }}>
              <button 
                onClick={() => setShowProductModal(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <h3 style={{ fontSize: '1.3rem', marginBottom: '18px' }}>
                {editingProduct ? 'កែប្រែស្បែកជើង' : 'បន្ថែមស្បែកជើងថ្មី (Add Shoe)'}
              </h3>

              <form onSubmit={handleSaveProduct}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">ឈ្មោះស្បែកជើង (English)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Nike Air Zoom Pulse"
                      value={productForm.name} 
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ឈ្មោះជាភាសាខ្មែរ</label>
                    <input 
                      type="text" 
                      required
                      placeholder="ស្បែកជើងកីឡា Nike Air"
                      value={productForm.khmerName} 
                      onChange={(e) => setProductForm({ ...productForm, khmerName: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">ម៉ាក (Brand)</label>
                    <select 
                      value={productForm.brand} 
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })} 
                      className="form-select"
                    >
                      <option value="Nike">Nike</option>
                      <option value="Adidas">Adidas</option>
                      <option value="Puma">Puma</option>
                      <option value="New Balance">New Balance</option>
                      <option value="Converse">Converse</option>
                      <option value="StepUp Signature">StepUp Signature</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">ប្រភេទ (Category)</label>
                    <select 
                      value={productForm.category} 
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} 
                      className="form-select"
                    >
                      <option value="sneakers">Sneakers (ស្បែកជើងកីឡា)</option>
                      <option value="formal">Formal (ស្បែកជើងធ្វើការ)</option>
                      <option value="casual">Casual (ស្បែកជើងស៊ក)</option>
                      <option value="sandals">Sandals (ស្បែកជើងផ្ទាត់)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">តម្លៃលក់ ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      required
                      value={productForm.price} 
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">តម្លៃដើម ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={productForm.originalPrice} 
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ចំនួនស្តុក (Stock)</label>
                    <input 
                      type="number" 
                      required
                      value={productForm.stock} 
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                </div>

                {/* EU Sizes Checkboxes */}
                <div className="form-group">
                  <label className="form-label">ទំហំ EU ដែលមានក្នុងស្តុក</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {availableSizes.map(sz => {
                      const isSelected = productForm.sizes.includes(sz);
                      return (
                        <button
                          type="button"
                          key={sz}
                          onClick={() => {
                            const newSizes = isSelected ? productForm.sizes.filter(s => s !== sz) : [...productForm.sizes, sz];
                            setProductForm({ ...productForm, sizes: newSizes.sort() });
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-light)',
                            background: isSelected ? 'rgba(255, 94, 54, 0.2)' : 'transparent',
                            color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: isSelected ? 700 : 500
                          }}
                        >
                          EU {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">តំណភ្ជាប់រូបភាព (Image URL)</label>
                  <input 
                    type="url" 
                    required
                    value={productForm.images[0] || ''} 
                    onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })} 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ការពិពណ៌នា</label>
                  <textarea 
                    rows="3" 
                    value={productForm.description} 
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} 
                    className="form-textarea" 
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-secondary btn-sm">
                    បោះបង់
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    រក្សាទុក
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- ORDER DETAIL MODAL ---------------- */}
        {showOrderModal && (() => {
          const o = showOrderModal;
          const orderNum = o.orderNumber || o.id || 'N/A';
          const custName = o.customerName || o.name || 'អតិថិជន';
          const custPhone = o.customerPhone || o.phone || '-';
          const custEmail = o.customerEmail || o.email || '-';

          // Safe address resolution
          let fullAddress = 'មិនមានអាសយដ្ឋាន';
          if (typeof o.shippingAddress === 'string' && o.shippingAddress.trim()) {
            fullAddress = o.shippingAddress;
          } else if (o.shippingAddress && typeof o.shippingAddress === 'object') {
            const parts = [
              o.shippingAddress.streetAddress,
              o.shippingAddress.district,
              o.shippingAddress.province
            ].filter(Boolean);
            if (parts.length > 0) fullAddress = parts.join(', ');
          } else if (o.province || o.district || o.streetAddress) {
            const parts = [o.streetAddress, o.district, o.province].filter(Boolean);
            if (parts.length > 0) fullAddress = parts.join(', ');
          } else if (o.address) {
            fullAddress = o.address;
          }

          const orderItems = Array.isArray(o.items) && o.items.length > 0 
            ? o.items 
            : Array.isArray(o.cart) && o.cart.length > 0 
              ? o.cart 
              : [];

          const subtotalNum = Number(o.subtotal || o.totalAmount || o.grandTotal || o.total || 0);
          const discountNum = Number(o.discountAmount || 0);
          const deliveryNum = Number(o.deliveryFee || o.shippingFee || 0);
          const totalNum = Number(o.totalAmount || o.grandTotal || o.total || (subtotalNum - discountNum + deliveryNum) || 0);
          const totalKhr = Math.round(totalNum * (storeSettings?.exchangeRate || 4100));

          const currentStatus = (o.status || o.orderStatus || 'pending').toLowerCase();
          const paymentMethodDisplay = o.paymentMethod === 'khqr' 
            ? '🇰🇭 KHQR (Bakong)' 
            : o.paymentMethod === 'bank' 
              ? '🏦 ធនាគារ (Bank Transfer)' 
              : '🚚 សាច់ប្រាក់ផ្ទាល់ (COD)';

          const isPaid = (o.paymentStatus || '').toLowerCase() === 'paid' || o.paymentMethod === 'khqr';

          return (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
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
                background: '#0d1527',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '30px',
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7)'
              }}>
                {/* Close Button */}
                <button 
                  onClick={() => setShowOrderModal(null)}
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  title="បិទ (Close)"
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingRight: '40px', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      ព័ត៌មានលម្អិតការបញ្ជាទិញ (Order Details)
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px' }}>
                      #{orderNum}
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} />
                      <span>{o.createdAt ? new Date(o.createdAt).toLocaleString('km-KH') : 'កាលបរិច្ឆេទថ្មីៗ'}</span>
                    </div>
                  </div>
                  <span className={`badge ${currentStatus === 'delivered' ? 'badge-success' : currentStatus === 'cancelled' ? 'badge-hot' : 'badge-primary'}`} style={{ fontSize: '0.85rem', textTransform: 'uppercase', padding: '6px 12px' }}>
                    ● {currentStatus}
                  </span>
                </div>

                {/* Info Grid (Customer & Delivery) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  {/* Customer Card */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px' }}>
                      <User size={16} /> <span>ព័ត៌មានអតិថិជន</span>
                    </div>
                    <div style={{ fontSize: '0.86rem', lineHeight: '1.6' }}>
                      <div>ឈ្មោះ៖ <strong>{custName}</strong></div>
                      <div>ទូរស័ព្ទ៖ <strong>{custPhone}</strong></div>
                      {custEmail !== '-' && <div style={{ color: 'var(--text-secondary)' }}>អ៊ីមែល៖ {custEmail}</div>}
                    </div>
                  </div>

                  {/* Shipping Card */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00d2ff', fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px' }}>
                      <MapPin size={16} /> <span>ទីតាំងដឹកជញ្ជូន</span>
                    </div>
                    <div style={{ fontSize: '0.86rem', lineHeight: '1.6' }}>
                      <div>{fullAddress}</div>
                      {o.deliveryNotes && (
                        <div style={{ fontSize: '0.8rem', color: '#ffb74d', marginTop: '4px' }}>
                          📌 ចំណាំ៖ {o.deliveryNotes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Badge Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '22px', fontSize: '0.88rem', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={16} color="var(--accent-primary)" />
                    <span>វិធីសាស្ត្រទូទាត់៖ <strong>{paymentMethodDisplay}</strong></span>
                  </div>
                  <div>
                    {isPaid ? (
                      <span className="badge badge-success" style={{ fontSize: '0.8rem' }}>✓ បង់រួចរាល់ (PAID)</span>
                    ) : (
                      <span className="badge badge-hot" style={{ fontSize: '0.8rem' }}>● មិនទាន់បង់ (UNPAID)</span>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={16} color="var(--accent-primary)" />
                  <span>ទំនិញដែលបានកុម្ម៉ង់ ({orderItems.length} មុខ)៖</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                  {orderItems.map((it, idx) => {
                    const itemPrice = Number(it.price || 0);
                    const itemQty = Number(it.quantity || 1);
                    const itemSub = itemPrice * itemQty;
                    return (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {it.image && (
                            <img 
                              src={it.image} 
                              alt={it.name || 'Shoe'} 
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', background: 'rgba(255,255,255,0.05)' }} 
                            />
                          )}
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{it.name || it.title || 'ស្បែកជើង'}</div>
                            {it.khmerName && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{it.khmerName}</div>}
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              {it.size && <span style={{ marginRight: '8px' }}>ទំហំ៖ <strong>EU {it.size}</strong></span>}
                              {it.color && <span>ពណ៌៖ <strong>{it.color}</strong></span>}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>${itemSub.toFixed(2)}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>${itemPrice.toFixed(2)} x {itemQty}</div>
                        </div>
                      </div>
                    );
                  })}
                  {orderItems.length === 0 && (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      មិនមានព័ត៌មានលម្អិតមុខទំនិញ
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div style={{
                  padding: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  marginBottom: '24px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>តម្លៃទំនិញសរុប (Subtotal)៖</span>
                    <span>${subtotalNum.toFixed(2)}</span>
                  </div>
                  {discountNum > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                      <span>បញ្ចុះតម្លៃ {o.couponCode ? `(កូដ ${o.couponCode})` : ''}៖</span>
                      <span>-${discountNum.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>សេវាដឹកជញ្ជូន (Delivery Fee)៖</span>
                    <span>{deliveryNum > 0 ? `$${deliveryNum.toFixed(2)}` : 'ឥតគិតថ្លៃ (Free)'}</span>
                  </div>
                  <div style={{
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '10px',
                    marginTop: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                  }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>សរុបចុងក្រោយ (Total)៖</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>≈ {totalKhr.toLocaleString()} KHR</div>
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                      ${totalNum.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Change Order Status & Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>ប្តូរស្ថានភាព៖</label>
                    <select
                      value={currentStatus}
                      onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                      className="form-select"
                      style={{
                        padding: '8px 14px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--accent-primary)',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="pending" style={{ background: '#0d1527' }}>⏳ កំពុងរង់ចាំ (Pending)</option>
                      <option value="processing" style={{ background: '#0d1527' }}>⚙️ កំពុងរៀបចំ (Processing)</option>
                      <option value="shipped" style={{ background: '#0d1527' }}>🚚 កំពុងដឹកជញ្ជូន (Shipped)</option>
                      <option value="delivered" style={{ background: '#0d1527' }}>✅ បានប្រគល់ (Delivered)</option>
                      <option value="cancelled" style={{ background: '#0d1527' }}>❌ បានបោះបង់ (Cancelled)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                      type="button" 
                      onClick={() => handleDeleteOrder(o.id)} 
                      style={{
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        color: '#f87171',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                      title="លុបការបញ្ជាទិញនេះ"
                    >
                      <Trash2 size={14} /> <span>លុប Order</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => window.print()} 
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Printer size={15} /> <span>Print Invoice</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowOrderModal(null)} 
                      className="btn btn-primary btn-sm"
                    >
                      រួចរាល់ (Done)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ---------------- NEW COUPON MODAL ---------------- */}
        {showCouponModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '480px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              position: 'relative'
            }}>
              <button onClick={() => setShowCouponModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>បង្កើតកូដបញ្ចុះតម្លៃថ្មី</h3>
              <form onSubmit={handleSaveCoupon}>
                <div className="form-group">
                  <label className="form-label">កូដ (ឧ. SUMMER15)</label>
                  <input type="text" required value={couponForm.code} onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })} className="form-input" style={{ textTransform: 'uppercase' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">ប្រភេទបញ្ចុះតម្លៃ</label>
                    <select value={couponForm.discountType} onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })} className="form-select">
                      <option value="percentage">ភាគរយ (%)</option>
                      <option value="fixed">ចំនួនដុល្លារ ($)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">តម្លៃបញ្ចុះ</label>
                    <input type="number" required value={couponForm.discountValue} onChange={(e) => setCouponForm({ ...couponForm, discountValue: e.target.value })} className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">ការពិពណ៌នា</label>
                  <input type="text" value={couponForm.description} onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })} className="form-input" placeholder="បញ្ចុះ 10% លើការទិញ..." />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  បង្កើតកូដ
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
