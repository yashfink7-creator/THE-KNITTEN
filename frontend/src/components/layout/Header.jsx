import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SearchIcon, UserIcon, CartIcon, MenuIcon, CloseIcon, YarnBallIcon } from '../common/Icons';
import { useCart } from '../../context/CartContext';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'Custom Orders', to: '/custom-orders' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <YarnBallIcon className="logo-icon" />
          <span className="logo-text">
            <span className="logo-script">The Knitten</span>
            <span className="logo-sub">Crochet Creations</span>
          </span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-icons">
          <button
            type="button"
            className="icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <SearchIcon />
          </button>
          <Link to="/admin" className="icon-btn" aria-label="Account">
            <UserIcon />
          </Link>
          <Link to="/cart" className="icon-btn cart-icon-btn" aria-label="Cart">
            <CartIcon />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <div className="container">
            <input type="search" placeholder="Search for crochet bunnies, bags, bouquets…" autoFocus />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
