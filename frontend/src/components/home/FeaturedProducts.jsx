import { Link } from 'react-router-dom';
import products from '../../data/products';
import ProductCard from '../product/ProductCard';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="section featured-section">
      <div className="container">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <div className="heading-divider">♡</div>
        </div>

        <div className="featured-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="featured-cta">
          <Link to="/shop" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
