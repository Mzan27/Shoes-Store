import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import ProductCard from '../components/ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Ruler, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  ArrowLeft, 
  Send,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function ProductDetailView({ onOpenSizeGuide }) {
  const { 
    selectedProductId, 
    navigateTo, 
    addToCart, 
    toggleWishlist, 
    isProductInWishlist,
    showToast
  } = useStore();

  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Review form
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    async function loadDetail() {
      if (!selectedProductId) return;
      try {
        setLoading(true);
        const res = await api.fetchProductById(selectedProductId);
        if (res.success) {
          setProduct(res.data);
          setActiveImageIndex(0);
          setSelectedSize(res.data.sizes ? res.data.sizes[0] : 40);
          setSelectedColor(res.data.colors ? res.data.colors[0] : 'Standard');
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [selectedProductId]);

  if (loading || !product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>👟</div>
        <h3>កំពុងផ្ទុកព័ត៌មានលម្អិតនៃស្បែកជើង...</h3>
      </div>
    );
  }

  const isFavorite = isProductInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('cart');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast('សូមបញ្ចូលមតិយោបល់របស់អ្នក', 'error');
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await api.submitReview({
        productId: product.id,
        customerName: reviewName.trim() || 'អតិថិជន StepUp',
        rating: reviewRating,
        comment: reviewComment.trim()
      });

      if (res.success) {
        showToast('🌟 អរគុណសម្រាប់ការវាយតម្លៃ!');
        setProduct(prev => ({
          ...prev,
          reviews: [res.data, ...(prev.reviews || [])]
        }));
        setReviewComment('');
        setReviewName('');
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div style={{ padding: '30px 0 80px' }}>
      <div className="container">
        {/* Back navigation */}
        <button
          onClick={() => navigateTo('shop')}
          className="btn btn-secondary btn-sm"
          style={{ marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> ត្រឡប់ទៅកាតាឡុកវិញ
        </button>

        {/* Top Product View: Gallery + Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          alignItems: 'start',
          marginBottom: '60px'
        }}>
          {/* Gallery Col */}
          <div>
            <div style={{
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-light)',
              marginBottom: '16px',
              position: 'relative'
            }}>
              <img 
                src={product.images && product.images[activeImageIndex]} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {product.discountPercent > 0 && (
                <span className="badge badge-sale" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  បញ្ចុះតម្លៃ {product.discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)',
                      padding: 0,
                      cursor: 'pointer',
                      background: 'none'
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Col */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-hot">{product.brand}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600 }}>
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span>{product.rating}</span>
                <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount} ការវាយតម្លៃ)</span>
              </div>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
              {product.name}
            </h1>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '18px' }}>
              {product.khmerName}
            </h2>

            {/* Price Row */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-light)',
              marginBottom: '24px'
            }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> ស្តុកមាន: <strong>{product.stock} គូ</strong>
              </span>
            </div>

            {/* Color Swatch */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">ជម្រើសពណ៌ (Color): <strong>{selectedColor}</strong></label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: selectedColor === col ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)',
                        background: selectedColor === col ? 'rgba(255, 94, 54, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        color: selectedColor === col ? 'var(--accent-primary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: selectedColor === col ? 700 : 500
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shoe Size Picker (EU Sizes from Doc) */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  ទំហំស្បែកជើង (EU Size): <strong>{selectedSize}</strong>
                </label>
                <button
                  onClick={onOpenSizeGuide}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00d2ff',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'underline'
                  }}
                >
                  <Ruler size={14} /> តារាងវាស់ទំហំជើង (Size Guide)
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes && product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      width: '48px',
                      height: '44px',
                      borderRadius: '8px',
                      border: selectedSize === sz ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)',
                      background: selectedSize === sz ? 'rgba(255, 94, 54, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      color: selectedSize === sz ? 'var(--accent-primary)' : 'var(--text-primary)',
                      fontSize: '0.95rem',
                      fontWeight: selectedSize === sz ? 800 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '4px'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  -
                </button>
                <span style={{ width: '36px', textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-secondary btn-lg"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <ShoppingBag size={18} />
                <span>ដាក់ចូលកន្ត្រក</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="btn btn-primary btn-lg"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <span>ទិញឥឡូវនេះ (Buy Now)</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="btn btn-secondary btn-icon"
                style={{ width: '50px', height: '50px' }}
                title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={22} fill={isFavorite ? '#ff5e36' : 'none'} color={isFavorite ? '#ff5e36' : 'currentColor'} />
              </button>
            </div>

            {/* Store Guarantees */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-light)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={16} color="var(--accent-primary)" />
                <span>ប្តូរទំហំ Size ឥតគិតថ្លៃ ៧ ថ្ងៃ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="#00d2ff" />
                <span>ដឹកជញ្ជូនរហ័ស ២៥ ខេត្តក្រុង</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#10b981" />
                <span>KHQR & បង់ប្រាក់ពេលទទួល</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specifications */}
        <div className="glass-panel" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '50px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>ការពិពណ៌នាផលិតផល (Product Details)</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
            {product.description}
          </p>

          <h4 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>លក្ខណៈពិសេស (Specifications)</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            fontSize: '0.88rem'
          }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>ម៉ាក / Brand:</span>
              <strong>{product.brand}</strong>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>សារធាតុផ្សំ (Material):</span>
              <strong>{product.material}</strong>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>ភេទ (Gender):</span>
              <strong>{product.gender}</strong>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>ប្រភេទ (Category):</span>
              <strong style={{ textTransform: 'capitalize' }}>{product.category}</strong>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Submit Review Form */}
        <div className="glass-panel" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '50px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
            ការវាយតម្លៃពីអតិថិជន (Customer Reviews & Ratings)
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '30px'
          }}>
            {/* Reviews List */}
            <div>
              {product.reviews && product.reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {product.reviews.map(rev => (
                    <div 
                      key={rev.id} 
                      style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <strong>{rev.customerName}</strong>
                        <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {rev.comment}
                      </p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        {rev.date}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  មិនទាន់មានការវាយតម្លៃនៅឡើយទេ។ សូមក្លាយជាអ្នកដំបូងគេដែលផ្តល់មតិយោបល់!
                </div>
              )}
            </div>

            {/* Write a review form */}
            <form onSubmit={handleSubmitReview} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>ផ្តល់ការវាយតម្លៃរបស់អ្នក</h4>
              
              <div className="form-group">
                <label className="form-label">ឈ្មោះរបស់អ្នក</label>
                <input 
                  type="text"
                  placeholder="ឧ. Sokha Meng"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">ពិន្ទុផ្កាយ (Rating)</label>
                <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star 
                        size={22} 
                        fill={star <= reviewRating ? '#f59e0b' : 'none'} 
                        color={star <= reviewRating ? '#f59e0b' : 'var(--text-muted)'} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">មតិយោបល់</label>
                <textarea 
                  rows="3"
                  placeholder="សរសេរពីគុណភាពស្បែកជើង ផាសុកភាព ឬសេវាកម្ម..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <button type="submit" disabled={submittingReview} className="btn btn-primary btn-sm">
                <Send size={14} />
                <span>{submittingReview ? 'កំពុងបញ្ជូន...' : 'បញ្ជូនការវាយតម្លៃ'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Related Shoes */}
        {product.related && product.related.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px' }}>
              ស្បែកជើងដែលប្រហាក់ប្រហែល (Related Shoes)
            </h3>
            <div className="grid-products">
              {product.related.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
