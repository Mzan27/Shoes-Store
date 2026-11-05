import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export default function WishlistView() {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useStore();

  if (wishlist.length === 0) {
    return (
      <div style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '520px' }}>
          <div className="glass-panel" style={{ padding: '50px 30px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>❤️</div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>មិនទាន់មានទំនិញក្នុង Wishlist</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px' }}>
              ចុចលើរូបបេះដូងនៅលើស្បែកជើងដែលអ្នកពេញចិត្ត ដើម្បីរក្សាទុកមើលនៅពេលក្រោយ!
            </p>
            <button onClick={() => navigateTo('shop')} className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              <span>ស្វែងរកស្បែកជើងឥឡូវនេះ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <div className="badge badge-hot" style={{ marginBottom: '6px' }}>Wishlist • បញ្ជីចូលចិត្ត</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>ស្បែកជើងដែលអ្នកបានរក្សាទុក ({wishlist.length})</h1>
          </div>
          <button onClick={() => navigateTo('shop')} className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} /> ទស្សនាបន្ថែម
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {wishlist.map(product => (
            <div key={product.id} className="glass-panel" style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                <img src={product.images && product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => toggleWishlist(product)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.9)',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {product.brand}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>
                    {product.name}
                  </h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
                    ${product.price.toFixed(2)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      addToCart(product, product.sizes ? product.sizes[0] : 40, product.colors ? product.colors[0] : 'Standard', 1);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <ShoppingBag size={14} />
                    <span>ដាក់ចូលកន្ត្រក</span>
                  </button>
                  <button
                    onClick={() => navigateTo('product-detail', product.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    មើល
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
