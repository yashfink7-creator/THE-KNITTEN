import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import products from '../data/products';
import PlaceholderImage from '../components/common/PlaceholderImage';
import StarRating from '../components/product/StarRating';
import QuantitySelector from '../components/product/QuantitySelector';
import ProductCard from '../components/product/ProductCard';
import { HeartIcon } from '../components/common/Icons';
import { shadeColor } from '../utils/color';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const product = products.find((p) => p.slug === slug);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setAdded(false);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Product not found</h2>
        <p>The item you're looking for doesn't exist or may have been removed.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const realSources = [product.image, product.photo].filter(Boolean);
  const hasPhoto = realSources.length > 0;
  const gallery = hasPhoto
    ? realSources
    : [product.bg, shadeColor(product.bg, -8), shadeColor(product.bg, 8)];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
  }

  function handleBuyNow() {
    addToCart(product, quantity);
    navigate('/cart');
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          <div className="product-gallery">
            <div className="gallery-main">
              {hasPhoto ? (
                <PlaceholderImage sources={[gallery[activeImage]]} alt={product.name} className="lg" />
              ) : (
                <PlaceholderImage emoji={product.emoji} bg={gallery[activeImage]} className="lg" />
              )}
              {product.isNew && <span className="badge badge-new gallery-badge">New</span>}
            </div>
            {!hasPhoto && (
              <div className="gallery-thumbs">
                {gallery.map((bg, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`gallery-thumb ${activeImage === i ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <PlaceholderImage emoji={product.emoji} bg={bg} className="sm" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <p className="product-category-tag">{product.categoryName}</p>
            <h1>{product.name}</h1>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            <p className="product-detail-price">₹{product.price.toLocaleString('en-IN')}</p>
            <p className="product-detail-desc">{product.description}</p>

            <ul className="product-detail-facts">
              {product.details.map((d) => (
                <li key={d}>✓ {d}</li>
              ))}
            </ul>

            <p className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>

            <div className="product-detail-actions">
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
              <button type="button" className="btn btn-outline" onClick={handleAddToCart}>
                {added ? 'Added ✓' : 'Add to Cart'}
              </button>
              <button type="button" className="btn btn-primary" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button
                type="button"
                className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <HeartIcon fill={wishlisted ? 'currentColor' : 'none'} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="related-products">
            <div className="section-heading">
              <h2>You May Also Like</h2>
              <div className="heading-divider">♡</div>
            </div>
            <div className="related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
