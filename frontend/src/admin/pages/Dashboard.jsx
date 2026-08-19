import { Link } from 'react-router-dom';
import products from '../../data/products';
import orders from '../../data/orders';
import messages from '../../data/messages';
import StatCard from '../components/StatCard';

function Dashboard() {
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const totalMessages = messages.length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Good morning, Admin! 👋</h1>
          <p>Here's what's happening with your shop today.</p>
        </div>
      </div>

      <div className="stat-cards">
        <StatCard icon="🧶" value={totalProducts} label="Total Products" />
        <StatCard icon="📦" value={totalOrders} label="Total Orders" />
        <StatCard icon="⏳" value={pendingOrders} label="Pending Orders" />
        <StatCard icon="✉" value={totalMessages} label="Contact Messages" />
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Recent Orders</h3>
          <Link to="/admin/orders" className="btn btn-outline btn-sm">
            View All
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>₹{order.amount.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
