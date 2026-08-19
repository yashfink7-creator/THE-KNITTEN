import { useState } from 'react';
import '../admin.css';
import './AdminGate.css';

// Soft stopgap only — not real security (visible in the frontend source).
// Swap this out once the real backend login exists.
const ADMIN_PASSWORD = 'knitten2026';
const SESSION_KEY = 'knitten_admin_unlocked';

function AdminGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setUnlocked(true);
    } else {
      setError('Incorrect password. Try again.');
    }
  }

  if (unlocked) return children;

  return (
    <div className="admin-gate">
      <form className="admin-gate-card" onSubmit={handleSubmit}>
        <h2>Admin Access</h2>
        <p>Enter the password to continue to The Knitten admin panel.</p>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          placeholder="Password"
          autoFocus
        />
        {error && <p className="admin-gate-error">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block">
          Unlock
        </button>
      </form>
    </div>
  );
}

export default AdminGate;
