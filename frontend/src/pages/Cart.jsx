import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PlaceholderImage from '../components/common/PlaceholderImage';
import QuantitySelector from '../components/product/QuantitySelector';
import { TrashIcon } from '../components/common/Icons';
import './Cart.css';

const SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  const shipping = items.length === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <span className="cart-empty-icon">🧺</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-hero">
        <h1>Your Cart</h1>
        <p>Review your items before checking out.</p>
      </div>

      <div className="container cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <PlaceholderImage
                  emoji={item.emoji}
                  bg={item.bg}
                  sources={[item.image, item.photo]}
                  alt={item.name}
                />
              </div>
              <div className="cart-item-info">
                <Link to={`/product/${item.slug}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-category">{item.categoryName}</p>
                <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <QuantitySelector
                quantity={item.quantity}
                onChange={(q) => updateQuantity(item.id, q)}
                max={item.stock}
              />
              <p className="cart-item-line-total">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </p>
              <button
                type="button"
                className="cart-item-remove"
                aria-label={`Remove ${item.name}`}
                onClick={() => removeFromCart(item.id)}
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </div>
          {shipping > 0 && (
            <p className="shipping-note">
              Add ₹{(SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for free shipping.
            </p>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button type="button" className="btn btn-primary btn-block">
            Proceed to Checkout
          </button>
          <Link to="/shop" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
