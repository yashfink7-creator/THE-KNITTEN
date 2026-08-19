import { useState } from 'react';
import messagesData from '../../data/messages';
import './AdminMessages.css';

function AdminMessages() {
  const [messages, setMessages] = useState(messagesData);

  function markAsRead(id) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Messages</h1>
          <p>Contact form submissions from customers — {unreadCount} unread.</p>
        </div>
      </div>

      <div className="admin-card message-list">
        {messages.length === 0 ? (
          <p className="admin-empty">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${msg.read ? '' : 'unread'}`}
              onClick={() => markAsRead(msg.id)}
            >
              <div className="message-avatar">{msg.name.charAt(0)}</div>
              <div className="message-body">
                <div className="message-top">
                  <strong className="message-name">
                    {msg.name} {!msg.read && <span className="status-badge status-Pending">New</span>}
                  </strong>
                  <span className="message-date">{msg.date}</span>
                </div>
                <p className="message-email">{msg.email}</p>
                <p className="message-text">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminMessages;
