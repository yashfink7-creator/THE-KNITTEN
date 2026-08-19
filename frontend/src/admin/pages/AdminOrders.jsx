import { useState } from 'react';
import ordersData, { ORDER_STATUSES } from '../../data/orders';

function AdminOrders() {
  const [orders, setOrders] = useState(ordersData);

  function handleStatusChange(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Orders</h1>
          <p>Track and update the status of customer orders.</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>₹{order.amount.toLocaleString('en-IN')}</td>
                  <td>{order.date}</td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="admin-empty">No orders yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
