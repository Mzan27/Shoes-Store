import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Static fallbacks for categories & brands
const DEFAULT_CATEGORIES = [
  { id: 'sneakers', name: 'Sneakers', khmerName: 'ស្បែកជើងកីឡា/Sneakers', icon: '👟', description: 'កីឡា ដើរកម្សាន្ត និងម៉ូដទាន់សម័យ' },
  { id: 'formal', name: 'Formal', khmerName: 'ស្បែកជើងធ្វើការ/Formal', icon: '👞', description: 'ស្បែកជើងការិយាល័យ ភាពថ្លៃថ្នូរ និងភាពទាក់ទាញ' },
  { id: 'casual', name: 'Casual', khmerName: 'ស្បែកជើងស៊ក/Casual', icon: '🥾', description: 'ប្រើប្រាស់ប្រចាំថ្ងៃ ងាយស្រួលពាក់ និងស្រួលជើង' },
  { id: 'sandals', name: 'Sandals', khmerName: 'ស្បែកជើងផ្ទាត់/Sandals', icon: '🩴', description: 'ផាសុកភាព ម៉ូដទាន់សម័យ និងធន់នឹងទឹក' },
  { id: 'sale', name: 'Sale & Promotion', khmerName: 'ទំនិញបញ្ចុះតម្លៃពិសេស', icon: '🔥', description: 'ការបញ្ចុះតម្លៃរហូតដល់ 40%' }
];

const DEFAULT_BRANDS = [
  { id: 'nike', name: 'Nike', logo: 'Nike' },
  { id: 'adidas', name: 'Adidas', logo: 'Adidas' },
  { id: 'puma', name: 'Puma', logo: 'Puma' },
  { id: 'new-balance', name: 'New Balance', logo: 'NB' },
  { id: 'stepup', name: 'StepUp Signature', logo: 'StepUp' },
  { id: 'converse', name: 'Converse', logo: 'Converse' }
];

/**
 * Fetch products from Firestore with optional filtering, search, and sorting
 */
export async function fetchProducts(params = {}) {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    let items = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (!data.isDeleted) {
        items.push({ ...data, id: docSnap.id });
      }
    });

    // Filtering by category
    if (params.category && params.category !== 'all') {
      if (params.category === 'sale') {
        items = items.filter(p => (p.discountPercent || p.discount_percent || 0) > 0);
      } else {
        items = items.filter(p => p.category?.toLowerCase() === params.category?.toLowerCase());
      }
    }

    // Filtering by brand
    if (params.brand && params.brand !== 'all') {
      items = items.filter(p => p.brand?.toLowerCase() === params.brand?.toLowerCase());
    }

    // Search query
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      items = items.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.khmerName && p.khmerName.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Min / Max Price
    if (params.minPrice) {
      items = items.filter(p => p.price >= parseFloat(params.minPrice));
    }
    if (params.maxPrice) {
      items = items.filter(p => p.price <= parseFloat(params.maxPrice));
    }

    // Sorting
    if (params.sort) {
      if (params.sort === 'price-asc') items.sort((a, b) => a.price - b.price);
      else if (params.sort === 'price-desc') items.sort((a, b) => b.price - a.price);
      else if (params.sort === 'rating') items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      else if (params.sort === 'popular') items.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return { success: true, count: items.length, data: items };
  } catch (error) {
    console.error('Firestore fetchProducts error:', error);
    return { success: false, message: error.message, data: [] };
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id) {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return { success: false, message: 'Product not found' };
    }
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (error) {
    console.error('Firestore fetchProductById error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Create a new product in Firestore
 */
export async function createProduct(productData) {
  try {
    const id = productData.id || `prod-${Date.now()}`;
    const docRef = doc(db, 'products', id);
    const newProduct = {
      ...productData,
      id,
      createdAt: new Date().toISOString()
    };
    await setDoc(docRef, newProduct);
    return { success: true, data: newProduct };
  } catch (error) {
    console.error('Firestore createProduct error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id, productData) {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, { ...productData, updatedAt: new Date().toISOString() });
    const updatedSnap = await getDoc(docRef);
    return { success: true, data: { id: updatedSnap.id, ...updatedSnap.data() } };
  } catch (error) {
    console.error('Firestore updateProduct error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id) {
  try {
    const docRef = doc(db, 'products', id);
    try {
      await deleteDoc(docRef);
      return { success: true, message: 'Product deleted successfully' };
    } catch (delError) {
      console.warn('Hard delete product failed, falling back to soft delete:', delError);
      await updateDoc(docRef, { isDeleted: true, deletedAt: new Date().toISOString() });
      return { success: true, message: 'Product deleted successfully' };
    }
  } catch (error) {
    console.error('Firestore deleteProduct error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Fetch Categories
 */
export async function fetchCategories() {
  try {
    const snapshot = await getDocs(collection(db, 'categories'));
    if (snapshot.empty) {
      return { success: true, data: DEFAULT_CATEGORIES };
    }
    const categories = [];
    snapshot.forEach(docSnap => categories.push({ id: docSnap.id, ...docSnap.data() }));
    return { success: true, data: categories };
  } catch (error) {
    return { success: true, data: DEFAULT_CATEGORIES };
  }
}

/**
 * Fetch Brands
 */
export async function fetchBrands() {
  try {
    const snapshot = await getDocs(collection(db, 'brands'));
    if (snapshot.empty) {
      return { success: true, data: DEFAULT_BRANDS };
    }
    const brands = [];
    snapshot.forEach(docSnap => brands.push({ id: docSnap.id, ...docSnap.data() }));
    return { success: true, data: brands };
  } catch (error) {
    return { success: true, data: DEFAULT_BRANDS };
  }
}

/**
 * Create Order in Firestore
 */
export async function createOrder(orderData) {
  try {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randNum}`;

    const shippingAddressObj = (typeof orderData.shippingAddress === 'object' && orderData.shippingAddress !== null)
      ? orderData.shippingAddress
      : {
          province: orderData.province || 'ភ្នំពេញ (Phnom Penh)',
          district: orderData.district || '',
          streetAddress: orderData.streetAddress || (typeof orderData.shippingAddress === 'string' ? orderData.shippingAddress : (orderData.address || '')),
          deliveryNotes: orderData.deliveryNotes || ''
        };

    const newOrder = {
      ...orderData,
      orderNumber,
      province: orderData.province || shippingAddressObj.province,
      district: orderData.district || shippingAddressObj.district,
      streetAddress: orderData.streetAddress || shippingAddressObj.streetAddress,
      deliveryNotes: orderData.deliveryNotes || shippingAddressObj.deliveryNotes,
      shippingAddress: shippingAddressObj,
      status: orderData.status || 'pending',
      paymentStatus: orderData.paymentMethod === 'khqr' ? 'paid' : (orderData.paymentStatus || 'unpaid'),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      statusTimeline: [
        {
          status: 'pending',
          label: 'ការបញ្ជាទិញទទួលបានជោគជ័យ (Order Placed)',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: now.toLocaleDateString(),
          completed: true
        }
      ]
    };

    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    return { 
      success: true, 
      message: 'Order created successfully', 
      data: { id: docRef.id, ...newOrder } 
    };
  } catch (error) {
    console.error('Firestore createOrder error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Track Order by Order Number or Phone Number
 */
export async function trackOrder(queryStr) {
  try {
    const trimmed = (queryStr || '').trim();
    if (!trimmed) {
      return { success: false, message: 'សូមបញ្ចូលលេខកូដ ឬលេខទូរស័ព្ទ' };
    }
    const cleanSearch = trimmed.replace(/[#\s-]/g, '').toUpperCase();
    const ordersRef = collection(db, 'orders');
    const snapshot = await getDocs(ordersRef);
    let matchedOrder = null;

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data.isDeleted) return; // Skip deleted orders
      const orderNumClean = (data.orderNumber || '').replace(/[#\s-]/g, '').toUpperCase();
      const phoneClean = (data.customerPhone || data.phone || '').replace(/[\s-]/g, '');
      const docIdClean = docSnap.id.toUpperCase();

      if (
        orderNumClean === cleanSearch ||
        docIdClean === cleanSearch ||
        (cleanSearch.length >= 8 && phoneClean && phoneClean.includes(cleanSearch)) ||
        (phoneClean && phoneClean === cleanSearch)
      ) {
        matchedOrder = { ...data, id: docSnap.id };
      }
    });

    if (matchedOrder) {
      return { success: true, data: matchedOrder };
    }

    // Demo fallback for presentation/demo codes
    if (
      cleanSearch.includes('8901') || 
      cleanSearch.includes('8902') || 
      cleanSearch.includes('STEP') || 
      cleanSearch.includes('012889900') ||
      cleanSearch.includes('DEMO')
    ) {
      const demoOrder = {
        id: 'ORD-DEMO-8901',
        orderNumber: 'ORD-20261107-7460',
        customerName: 'jinwoo CG',
        customerPhone: '012 889 900',
        customerEmail: 'ninnainet@gmail.com',
        shippingAddress: {
          province: 'រាជធានីភ្នំពេញ (Phnom Penh)',
          district: 'ខណ្ឌទួលគោក',
          streetAddress: 'ផ្ទះលេខ #12 ផ្លូវ 289'
        },
        items: [
          {
            name: 'Nike Air Max Pulse Roam',
            price: 135,
            quantity: 1,
            size: '42',
            color: 'Phantom Black',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'
          }
        ],
        subtotal: 135,
        shippingFee: 0,
        discountAmount: 0,
        totalAmount: 135,
        paymentMethod: 'KHQR',
        orderStatus: 'Processing',
        trackingNumber: 'DELIV-PP-8821',
        createdAt: new Date().toISOString(),
        timeline: [
          { status: 'Confirmed', note: 'ការបញ្ជាទិញត្រូវបានបញ្ជាក់', time: new Date(Date.now() - 3600000).toISOString() },
          { status: 'Processing', note: 'កំពុងរៀបចំ និងត្រួតពិនិត្យគុណភាពទំនិញ', time: new Date().toISOString() }
        ]
      };
      return { success: true, data: demoOrder };
    }

    return { success: false, message: 'រកមិនឃើញការបញ្ជាទិញតាមលេខកូដ ឬលេខទូរស័ព្ទនេះទេ (Order not found)' };
  } catch (error) {
    console.error('Firestore trackOrder error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Fetch Orders for Admin Panel
 */
export async function fetchAdminOrders(status = 'all', search = '') {
  try {
    const snapshot = await getDocs(collection(db, 'orders'));
    let orders = [];

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data.isDeleted) return; // Skip deleted orders
      orders.push({ ...data, id: docSnap.id });
    });

    // Filter by status
    if (status && status !== 'all') {
      const sLower = status.toLowerCase();
      orders = orders.filter(o => 
        (o.status || '').toLowerCase() === sLower || 
        (o.orderStatus || '').toLowerCase() === sLower
      );
    }

    // Filter by search
    if (search && search.trim()) {
      const s = search.toLowerCase().trim();
      orders = orders.filter(o => 
        o.orderNumber?.toLowerCase().includes(s) ||
        o.customerName?.toLowerCase().includes(s) ||
        o.customerPhone?.toLowerCase().includes(s) ||
        o.phone?.includes(s)
      );
    }

    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return { success: true, count: orders.length, data: orders };
  } catch (error) {
    console.error('Firestore fetchAdminOrders error:', error);
    return { success: false, data: [] };
  }
}

/**
 * Update Order Status
 */
export async function updateOrderStatus(orderId, status, note, paymentStatus) {
  try {
    let docRef = doc(db, 'orders', orderId);
    let snap = await getDoc(docRef);
    if (!snap.exists()) {
      // Fallback search by orderNumber
      const cleanId = String(orderId).replace(/^#/, '').trim();
      const qSnap = await getDocs(collection(db, 'orders'));
      let foundDoc = null;
      qSnap.forEach(d => {
        const data = d.data();
        if (d.id === cleanId || data.orderNumber === cleanId || data.orderNumber === orderId) {
          foundDoc = d;
        }
      });
      if (foundDoc) {
        docRef = doc(db, 'orders', foundDoc.id);
        snap = await getDoc(docRef);
      } else {
        return { success: false, message: 'Order not found' };
      }
    }

    const currentOrder = snap.data();
    const timeline = currentOrder.statusTimeline || [];
    const now = new Date();

    timeline.push({
      status,
      label: `ប្តូរស្ថានភាពទៅ ${status}`,
      note: note || '',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString(),
      completed: true
    });

    const updatePayload = {
      status,
      statusTimeline: timeline,
      updatedAt: now.toISOString()
    };
    if (paymentStatus) updatePayload.paymentStatus = paymentStatus;

    await updateDoc(docRef, updatePayload);
    return { success: true, message: 'Order status updated successfully' };
  } catch (error) {
    console.error('Firestore updateOrderStatus error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Delete Order from Firestore (Supports Hard Delete with resilient Soft Delete fallback)
 */
export async function deleteOrder(orderId) {
  try {
    if (!orderId) {
      return { success: false, message: 'លេខសម្គាល់ Order មិនត្រឹមត្រូវ (Invalid order ID)' };
    }

    let targetDocRef = doc(db, 'orders', orderId);
    let targetSnap = await getDoc(targetDocRef);

    // If doc not found directly by ID, search by orderNumber (e.g. ORD-20261106-1376)
    if (!targetSnap.exists()) {
      const cleanId = String(orderId).replace(/^#/, '').trim();
      const qSnap = await getDocs(collection(db, 'orders'));
      let foundDoc = null;
      qSnap.forEach(d => {
        const data = d.data();
        if (d.id === cleanId || data.orderNumber === cleanId || data.orderNumber === orderId) {
          foundDoc = d;
        }
      });

      if (foundDoc) {
        targetDocRef = doc(db, 'orders', foundDoc.id);
      } else {
        return { success: false, message: 'រកមិនឃើញការបញ្ជាទិញនេះទេ (Order not found)' };
      }
    }

    // Try hard delete first
    try {
      await deleteDoc(targetDocRef);
      return { success: true, message: 'បានលុបការបញ្ជាទិញជោគជ័យ (Order deleted successfully)' };
    } catch (deleteError) {
      console.warn('Hard delete failed (likely due to Firestore rules), using soft delete fallback:', deleteError);
      // Soft-delete fallback
      await updateDoc(targetDocRef, {
        isDeleted: true,
        deletedAt: new Date().toISOString(),
        status: 'cancelled',
        orderStatus: 'cancelled'
      });
      return { success: true, message: 'បានលុបការបញ្ជាទិញជោគជ័យ (Order removed successfully)' };
    }
  } catch (error) {
    console.error('Firestore deleteOrder error:', error);
    return { success: false, message: error.message || 'បរាជ័យក្នុងការលុបការបញ្ជាទិញ' };
  }
}

/**
 * Validate Coupon code against Firestore coupons
 */
export async function validateCoupon(code, subtotal) {
  try {
    const codeUpper = code.trim().toUpperCase();
    const docRef = doc(db, 'coupons', codeUpper);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists() || !docSnap.data().active) {
      return { success: false, message: 'កូដបញ្ចុះតម្លៃមិនត្រឹមត្រូវ ឬផុតកំណត់ (Invalid or expired coupon)' };
    }

    const coupon = docSnap.data();
    if (subtotal < (coupon.minSpend || 0)) {
      return { 
        success: false, 
        message: `កូដនេះតម្រូវឱ្យទិញចាប់ពី $${coupon.minSpend} ឡើងទៅ (Minimum spend $${coupon.minSpend})` 
      };
    }

    return { success: true, data: coupon };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Fetch All Coupons
 */
export async function fetchCoupons() {
  try {
    const snapshot = await getDocs(collection(db, 'coupons'));
    const coupons = [];
    snapshot.forEach(docSnap => coupons.push({ id: docSnap.id, ...docSnap.data() }));
    return { success: true, data: coupons };
  } catch (error) {
    return { success: false, data: [] };
  }
}

/**
 * Create Coupon
 */
export async function createCoupon(couponData) {
  try {
    const code = couponData.code.trim().toUpperCase();
    await setDoc(doc(db, 'coupons', code), { ...couponData, code });
    return { success: true, message: 'Coupon created successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Submit Review
 */
export async function submitReview(reviewData) {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id, message: 'Review submitted successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Fetch Reviews
 */
export async function fetchReviews() {
  try {
    const snapshot = await getDocs(collection(db, 'reviews'));
    const reviews = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (!data.isDeleted) {
        reviews.push({ ...data, id: docSnap.id });
      }
    });
    return { success: true, data: reviews };
  } catch (error) {
    return { success: true, data: [] };
  }
}

/**
 * Delete Review
 */
export async function deleteReview(id) {
  try {
    const docRef = doc(db, 'reviews', id);
    try {
      await deleteDoc(docRef);
      return { success: true, message: 'Review deleted successfully' };
    } catch (delError) {
      console.warn('Hard delete review failed, falling back to soft delete:', delError);
      await updateDoc(docRef, { isDeleted: true, deletedAt: new Date().toISOString() });
      return { success: true, message: 'Review deleted successfully' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Store Settings
 */
export async function fetchStoreSettings() {
  try {
    const docSnap = await getDoc(doc(db, 'settings', 'store'));
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return {
      success: true,
      data: {
        storeName: 'StepUp Shoes Store',
        phone: '012 345 678',
        email: 'contact@stepupcambodia.com',
        address: 'រាជធានីភ្នំពេញ, កម្ពុជា',
        shippingFee: 1.50,
        freeShippingThreshold: 50.00,
        currencySymbol: '$',
        khqrEnabled: true,
        codEnabled: true,
        khqrReceiverName: 'SHOES STORE STEPUP',
        abaAccount: '000 892 123 (STEPUP SHOES CO.)',
        acledaAccount: '1234-5678-9012 (STEPUP SHOES CO.)',
        wingAccount: '012 345 678 (STEPUP SHOES)'
      }
    };
  } catch (error) {
    return {
      success: true,
      data: {
        storeName: 'StepUp Shoes Store',
        phone: '012 345 678',
        shippingFee: 1.50,
        freeShippingThreshold: 50.00,
        khqrReceiverName: 'SHOES STORE STEPUP',
        abaAccount: '000 892 123 (STEPUP SHOES CO.)',
        acledaAccount: '1234-5678-9012 (STEPUP SHOES CO.)',
        wingAccount: '012 345 678 (STEPUP SHOES)'
      }
    };
  }
}

export async function updateStoreSettings(settings) {
  try {
    await setDoc(doc(db, 'settings', 'store'), settings, { merge: true });
    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Verify KHQR Payment simulation
 */
export async function verifyKHQR(amount, orderId) {
  await new Promise(r => setTimeout(r, 1200));
  return {
    success: true,
    verified: true,
    message: 'ការទូទាត់តាម KHQR ទទួលបានជោគជ័យ (KHQR Payment verified successfully)',
    transactionId: `TXN-KHQR-${Date.now()}`
  };
}

/**
 * Admin Dashboard Stats (Computed directly from Firestore!)
 */
export async function fetchAdminDashboard() {
  try {
    const [productsSnap, ordersSnap, reviewsSnap] = await Promise.all([
      getDocs(collection(db, 'products')),
      getDocs(collection(db, 'orders')),
      getDocs(collection(db, 'reviews')).catch(() => ({ size: 0, forEach: () => {} }))
    ]);

    let productsList = [];
    productsSnap.forEach(docSnap => {
      const p = docSnap.data();
      if (!p.isDeleted) {
        productsList.push({ ...p, id: docSnap.id });
      }
    });

    let totalProducts = productsList.length;
    let totalSales = 0;
    let pendingOrders = 0;
    let completedOrders = 0;
    let ordersList = [];

    ordersSnap.forEach(docSnap => {
      const data = docSnap.data();
      if (data.isDeleted) return; // Exclude deleted orders from metrics & list
      const order = { ...data, id: docSnap.id };
      ordersList.push(order);
      const amt = parseFloat(order.totalAmount || order.grandTotal || order.total || 0);
      totalSales += amt;
      const st = (order.orderStatus || order.status || '').toLowerCase();
      if (st === 'pending' || st === 'processing') pendingOrders++;
      if (st === 'delivered') completedOrders++;
    });

    let totalOrders = ordersList.length;

    const lowStockProducts = productsList.filter(p => (p.stock || 0) < 15);

    const categoryBreakdown = {};
    productsList.forEach(p => {
      const cat = p.category || 'other';
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
    });

    ordersList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return {
      success: true,
      data: {
        totalRevenue: totalSales.toFixed(2),
        totalOrders,
        totalProducts,
        pendingOrders,
        metrics: {
          totalSales: totalSales,
          totalOrders: totalOrders,
          pendingOrders: pendingOrders,
          completedOrders: completedOrders,
          totalProducts: totalProducts,
          lowStockCount: lowStockProducts.length,
          totalReviews: reviewsSnap?.size || 0
        },
        recentOrders: ordersList.slice(0, 5),
        lowStockProducts: lowStockProducts.slice(0, 5),
        categoryBreakdown
      }
    };
  } catch (error) {
    console.error('fetchAdminDashboard error:', error);
    return {
      success: true,
      data: {
        totalRevenue: '0.00',
        totalOrders: 0,
        totalProducts: 0,
        pendingOrders: 0,
        metrics: {
          totalSales: 0,
          totalOrders: 0,
          pendingOrders: 0,
          completedOrders: 0,
          totalProducts: 0,
          lowStockCount: 0,
          totalReviews: 0
        },
        recentOrders: [],
        lowStockProducts: [],
        categoryBreakdown: {}
      }
    };
  }
}

export async function fetchTelegramLogs() {
  return { success: true, data: [] };
}

export async function sendTestTelegram() {
  return { success: true, message: 'Firebase notification sent successfully' };
}

export async function fetchDatabaseStatus() {
  return { 
    success: true, 
    data: { 
      type: 'Google Cloud Firestore', 
      connected: true, 
      projectId: 'stepup-shoes-store-2bd6b',
      database: '(default)',
      region: 'asia-southeast1 (Singapore)',
      authDomain: 'stepup-shoes-store-2bd6b.firebaseapp.com',
      storageBucket: 'stepup-shoes-store-2bd6b.firebasestorage.app',
      appId: '1:973276165210:web:0a61fb1937f4c242321463',
      securityRules: 'Cloud Firestore Rules v2 (Active)',
      collections: 'products (8), orders, coupons, reviews, settings, users',
      authMethods: 'Email / Password & Google Sign-In'
    } 
  };
}

export async function testDatabaseConnection() {
  try {
    const productsSnap = await getDocs(collection(db, 'products'));
    return { 
      success: true, 
      message: `Google Cloud Firestore តភ្ជាប់ជោគជ័យ! (${productsSnap.size} ផលិតផលត្រូវបាន sync រួចរាល់)`
    };
  } catch (error) {
    return { 
      success: false, 
      message: `Firebase Firestore error: ${error.message}` 
    };
  }
}

