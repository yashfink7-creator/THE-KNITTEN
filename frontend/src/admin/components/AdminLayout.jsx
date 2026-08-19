import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { MenuIcon, CloseIcon } from '../../components/common/Icons';
import './AdminLayout.css';
import '../admin.css';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', end: true, icon: '▤' },
  { label: 'Products', to: '/admin/products', icon: '🧶' },
  { label: 'Orders', to: '/admin/orders', icon: '📦' },
  { label: 'Messages', to: '/admin/messages', icon: '✉' },
  { label: 'Categories', to: '/admin/categories', icon: '🏷' },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Link to="/admin" className="admin-logo" onClick={() => setSidebarOpen(false)}>
          <span className="admin-logo-dot" />
          THE KNITTEN
        </Link>
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/" className="admin-back-link">
          ← Back to Store
        </Link>
      </aside>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-toggle"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <div className="admin-topbar-spacer" />
          <div className="admin-user">
            <span className="admin-avatar">A</span>
            <span>Admin</span>
            <Link to="/" className="admin-logout">
              Logout
            </Link>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
