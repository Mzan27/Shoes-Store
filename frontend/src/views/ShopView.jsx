import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import ProductCard from '../components/ProductCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function ShopView({ onOpenSizeGuide }) {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSize, setSelectedSize] = useState(null);
  const [maxPrice, setMaxPrice] = useState(180);
  const [sortOption, setSortOption] = useState('featured');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const availableSizes = [38, 39, 40, 41, 42, 43, 44, 45];

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [catRes, brandRes] = await Promise.all([
          api.fetchCategories(),
          api.fetchBrands()
        ]);
        if (catRes.success) setCategories(catRes.data);
        if (brandRes.success) setBrands(brandRes.data);
      } catch (err) {
        console.error('Failed to load shop filter options:', err);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadFilteredProducts() {
      try {
        setLoading(true);
        const params = {
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          brand: selectedBrand !== 'all' ? selectedBrand : undefined,
          size: selectedSize || undefined,
          search: searchQuery || undefined,
          sort: sortOption
        };
        const res = await api.fetchProducts(params);
        if (res.success) {
          // Client side max price filter
          const filteredByPrice = res.data.filter(p => p.price <= maxPrice);
          setProducts(filteredByPrice);
        }
      } catch (err) {
        console.error('Failed to fetch filtered products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFilteredProducts();
  }, [selectedCategory, selectedBrand, selectedSize, searchQuery, sortOption, maxPrice]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedSize(null);
    setMaxPrice(180);
    setSearchQuery('');
    setSortOption('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'all' || selectedSize !== null || maxPrice < 180 || searchQuery !== '';

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ marginBottom: '30px' }}>
          <div className="badge badge-hot" style={{ marginBottom: '8px' }}>
            Shop Catalog • ស្បែកជើងទាំងអស់
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            កាតាឡុកស្បែកជើង <span className="gradient-text">Shoes Store</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            ជ្រើសរើសស្បែកជើងដែលត្រូវនឹងស្ទីល និងទំហំជើងរបស់អ្នក ជាមួយនឹងគុណភាពល្អបំផុត
          </p>
        </div>

        {/* Layout: Sidebar Filter + Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Left Filter Sidebar */}
          <aside className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)', position: 'sticky', top: '90px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem' }}>
                <Filter size={18} color="var(--accent-primary)" />
                <span>តម្រងស្វែងរក (Filters)</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RotateCcw size={12} /> សម្អាត
                </button>
              )}
            </div>

            {/* Category Selector */}
            <div style={{ marginBottom: '22px' }}>
              <label className="form-label" style={{ fontWeight: 700 }}>ប្រភេទស្បែកជើង (Categories)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => setSelectedCategory('all')}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedCategory === 'all' ? 'rgba(255, 94, 54, 0.15)' : 'transparent',
                    color: selectedCategory === 'all' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: selectedCategory === 'all' ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  👟 ទាំងអស់ (All Categories)
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: selectedCategory === c.id ? 'rgba(255, 94, 54, 0.15)' : 'transparent',
                      color: selectedCategory === c.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: selectedCategory === c.id ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.88rem'
                    }}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Selector */}
            <div style={{ marginBottom: '22px' }}>
              <label className="form-label" style={{ fontWeight: 700 }}>ម៉ាក / Brand</label>
              <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="form-select"
              >
                <option value="all">គ្រប់ម៉ាកទាំងអស់ (All Brands)</option>
                {brands.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Shoe Size Selector (EU 38-45) */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0, fontWeight: 700 }}>ទំហំ EU Size</label>
                <button 
                  onClick={onOpenSizeGuide}
                  style={{ background: 'none', border: 'none', color: '#00d2ff', fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Size Guide
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {availableSizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                    style={{
                      padding: '8px 0',
                      borderRadius: '8px',
                      border: selectedSize === sz ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-light)',
                      background: selectedSize === sz ? 'rgba(255, 94, 54, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      color: selectedSize === sz ? 'var(--accent-primary)' : 'var(--text-primary)',
                      fontWeight: selectedSize === sz ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.82rem'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0, fontWeight: 700 }}>តម្លៃអតិបរមា</label>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  ${maxPrice}.00
                </span>
              </div>
              <input 
                type="range"
                min="20"
                max="180"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>$20</span>
                <span>$180</span>
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <div>
            {/* Top Toolbar: Search, Active Tags & Sort */}
            <div className="glass-panel" style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Product Counter */}
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                បានរកឃើញ <strong style={{ color: 'var(--text-primary)' }}>{products.length}</strong> គូស្បែកជើង
                {searchQuery && <span> សម្រាប់ពាក្យ "<strong>{searchQuery}</strong>"</span>}
              </div>

              {/* Sort Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>តម្រៀបតាម:</span>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
                >
                  <option value="featured">ពេញនិយមបំផុត (Featured)</option>
                  <option value="price-low">តម្លៃពីទាបទៅខ្ពស់ (Price Low-High)</option>
                  <option value="price-high">តម្លៃពីខ្ពស់ទៅទាប (Price High-Low)</option>
                  <option value="rating">ពិន្ទុវាយតម្លៃខ្ពស់ (Top Rated)</option>
                  <option value="discount">បញ្ចុះតម្លៃច្រើនជាងគេ (Discount %)</option>
                </select>
              </div>
            </div>

            {/* Active Filters Badges */}
            {hasActiveFilters && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {selectedCategory !== 'all' && (
                  <span className="badge badge-hot" style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('all')}>
                    ប្រភេទ: {selectedCategory} ✕
                  </span>
                )}
                {selectedBrand !== 'all' && (
                  <span className="badge badge-new" style={{ cursor: 'pointer' }} onClick={() => setSelectedBrand('all')}>
                    Brand: {selectedBrand} ✕
                  </span>
                )}
                {selectedSize !== null && (
                  <span className="badge badge-success" style={{ cursor: 'pointer' }} onClick={() => setSelectedSize(null)}>
                    Size: EU {selectedSize} ✕
                  </span>
                )}
                {searchQuery && (
                  <span className="badge badge-hot" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')}>
                    Search: "{searchQuery}" ✕
                  </span>
                )}
              </div>
            )}

            {/* Loading / Empty / Products Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>👟</div>
                <div>កំពុងផ្ទុកទិន្នន័យស្បែកជើង...</div>
              </div>
            ) : products.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>មិនមានស្បែកជើងដែលត្រូវនឹងតម្រូវការនេះទេ</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
                  សូមសាកល្បងផ្លាស់ប្តូរពាក្យស្វែងរក ឬកែសម្រួលតម្រង Size / Category
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  <RotateCcw size={14} /> កំណត់តម្រងឡើងវិញ
                </button>
              </div>
            ) : (
              <div className="grid-products">
                {products.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
