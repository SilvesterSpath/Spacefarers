import { useState, useEffect } from 'react';

const LogoutButton = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ Remove token
    setToken(null); // ✅ Update state
    alert('🚪 Logged out successfully!');
    window.location.reload(); // ✅ Refresh to apply changes
  };

  useEffect(() => {
    setToken(localStorage.getItem('token')); // ✅ Update when token changes
  }, []);

  return token ? (
    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
      🔴 Logout
    </button>
  ) : null;
};

export default LogoutButton;
