import { Link } from 'react-router-dom';
import categories from '../data/categories';
import products from '../data/products';
import PlaceholderImage from '../components/common/PlaceholderImage';
import ProductCard from '../components/product/ProductCard';
import './Collections.css';

function Collections() {
  return (
    <div className="collections-page">
      <div className="page-hero">
        <h1>Collections</h1>
        <p>Explore our crochet creations, organized by category.</p>
      </div>

      <div className="container">
        <div className="collections-grid">
          {categories.map((cat) => (
            <Link to={`/shop?category=${cat.slug}`} key={cat.id} className="collection-banner">
              <PlaceholderImage emoji={cat.emoji} bg={cat.bg} photo={cat.photo} alt={cat.name} rounded={false} />
              <div className="collection-banner-overlay">
                <h3>{cat.name}</h3>
                <span>Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>

        {categories.map((cat) => {
          const items = products.filter((p) => p.category === cat.slug).slice(0, 4);
          if (items.length === 0) return null;
          return (
            <section className="collection-row" key={cat.id}>
              <div className="collection-row-header">
                <div>
                  <h2>{cat.name}</h2>
                  <p>{cat.description}</p>
                </div>
                <Link to={`/shop?category=${cat.slug}`} className="btn btn-outline">
                  View All
                </Link>
              </div>
              <div className="collection-row-grid">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Collections;
