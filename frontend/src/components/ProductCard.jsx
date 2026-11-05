import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';

export default function ProductCard({ product }) {
  const { navigateTo, addToCart, toggleWishlist, isProductInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState((product.sizes && product.sizes[0]) || 40);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = isProductInWishlist(product.id);

  const handleCardClick = (e) => {
    // Avoid triggering when clicking buttons
    if (e.target.closest('button')) return;
    navigateTo('product-detail', product.id);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors ? product.colors[0] : 'Standard', 1);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      className="glass-panel"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-6px)' : 'none',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        borderColor: isHovered ? 'var(--border-hover)' : 'var(--border-light)',
        position: 'relative'
      }}
    >
      {/* Top Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '80%',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.15)'
      }}>
        <img 
          src={product.images && product.images[0]} 
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
          loading="lazy"
        />

        {/* Floating Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {product.discountPercent > 0 && (
            <span className="badge badge-sale">
              -{product.discountPercent}%
            </span>
          )}
          {product.badge && (
            <span className="badge badge-hot">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleFavorite}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: isFavorite ? 'rgba(255, 94, 54, 0.9)' : 'rgba(17, 23, 38, 0.75)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 2
          }}
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isFavorite ? '#fff' : 'none'} color={isFavorite ? '#fff' : 'currentColor'} />
        </button>

        {/* Quick View overlay indicator */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          borderRadius: '20px',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.72rem',
          color: '#fff',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}>
          <Eye size={12} /> មើលលម្អិត
        </div>
      </div>

      {/* Product Details Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Brand & Rating Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
              {product.brand}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating || '5.0'}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>({product.reviewCount || 0})</span>
            </div>
          </div>

          {/* Title */}
          <h4 style={{
            fontSize: '0.98rem',
            fontWeight: 700,
            marginBottom: '4px',
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {product.name}
          </h4>

          {/* Khmer Title */}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {product.khmerName}
          </p>
        </div>

        <div>
          {/* Size Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginRight: '4px' }}>EU:</span>
            {product.sizes && product.sizes.slice(0, 5).map(sz => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: selectedSize === sz ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
                  background: selectedSize === sz ? 'rgba(255, 94, 54, 0.2)' : 'transparent',
                  color: selectedSize === sz ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: selectedSize === sz ? 700 : 500
                }}
              >
                {sz}
              </button>
            ))}
            {product.sizes && product.sizes.length > 5 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+{product.sizes.length - 5}</span>
            )}
          </div>

          {/* Price & Action Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleQuickAdd}
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 14px' }}
              title="Add to cart"
            >
              <ShoppingBag size={14} />
              <span>ទិញ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
