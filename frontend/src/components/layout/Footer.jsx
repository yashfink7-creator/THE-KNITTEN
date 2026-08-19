import { useState } from 'react';
import { Link } from 'react-router-dom';
import { YarnBallIcon } from '../common/Icons';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer className="site-footer">
      <div className="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-text">
            <span className="newsletter-icon">✉</span>
            <div>
              <h3>Stay in the loop!</h3>
              <p>Get updates on new collections, offers and more.</p>
            </div>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
        {subscribed && <p className="subscribed-msg">Thanks for subscribing! 💌</p>}
      </div>

      <div className="footer-main container">
        <div className="footer-col brand-col">
          <Link to="/" className="logo">
            <YarnBallIcon className="logo-icon" />
            <span className="logo-text">
              <span className="logo-script">The Knitten</span>
              <span className="logo-sub">Crochet Creations</span>
            </span>
          </Link>
          <p>Crocheted with passion, delivered with happiness.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Pinterest">▷</a>
            <a href="#" aria-label="WhatsApp">☏</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/custom-orders">Custom Orders</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact">FAQs</Link></li>
            <li><Link to="/contact">Shipping &amp; Delivery</Link></li>
            <li><Link to="/contact">Returns &amp; Exchanges</Link></li>
            <li><Link to="/contact">Order Tracking</Link></li>
            <li><Link to="/contact">Terms &amp; Conditions</Link></li>
            <li><Link to="/contact">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help &amp; Support</h4>
          <ul className="contact-list">
            <li>📞 +91 98765 43210</li>
            <li>✉ hello@theknitten.com</li>
            <li>🕐 Mon – Sat: 10AM – 7PM</li>
            <li>📍 Pan India Shipping</li>
          </ul>
          <h4 className="accept-heading">We Accept</h4>
          <div className="payment-icons">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>Rupay</span>
            <span>UPI</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} The Knitten. All rights reserved.</span>
          <span>Made with ❤ for crochet lovers</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
