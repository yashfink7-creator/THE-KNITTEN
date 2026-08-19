import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';
import StarRating from './StarRating';
import { HeartIcon, CartIcon } from '../common/Icons';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product, 1);
  }

  function handleWishlist(e) {
    e.preventDefault();
    toggleWishlist(product);
  }

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card-image">
        <PlaceholderImage
          emoji={product.emoji}
          bg={product.bg}
          sources={[product.image, product.photo]}
          alt={product.name}
        />
        {product.isNew && <span className="badge badge-new product-badge">New</span>}
      </div>
      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
        <div className="product-card-footer">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          <div className="product-card-actions">
            <button
              type="button"
              className={`icon-btn sm ${wishlisted ? 'active' : ''}`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={handleWishlist}
            >
              <HeartIcon fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button type="button" className="icon-btn sm" aria-label="Add to cart" onClick={handleAddToCart}>
              <CartIcon />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
