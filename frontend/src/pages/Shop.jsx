import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import products from '../data/products';
import categories from '../data/categories';
import ProductCard from '../components/product/ProductCard';
import { SearchIcon } from '../components/common/Icons';
import './Shop.css';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const MAX_PRICE = 2500;

function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState('');

  function toggleCategory(slug) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  }

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter((p) => p.name.toLowerCase().includes(query));
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [selectedCategories, maxPrice, sort, search]);

  return (
    <div className="shop-page">
      <div className="page-hero">
        <h1>Shop All Products</h1>
        <p>Browse our full collection of handmade crochet treasures.</p>
      </div>

      <div className="container shop-layout">
        <button
          type="button"
          className="btn btn-outline mobile-filter-toggle"
          onClick={() => setMobileFiltersOpen((v) => !v)}
        >
          {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>

        <aside className={`shop-filters ${mobileFiltersOpen ? 'open' : ''}`}>
          <div className="filter-group">
            <h4>Category</h4>
            {categories.map((cat) => (
              <label className="filter-checkbox" key={cat.id}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                />
                {cat.name}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h4>
            <input
              type="range"
              min="300"
              max={MAX_PRICE}
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          {selectedCategories.length > 0 && (
            <button type="button" className="btn btn-outline btn-block" onClick={() => setSelectedCategories([])}>
              Clear Filters
            </button>
          )}
        </aside>

        <div className="shop-results">
          <div className="shop-search">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="shop-toolbar">
            <span>{filteredProducts.length} products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="shop-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="shop-empty">No products match your filters. Try adjusting them.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
