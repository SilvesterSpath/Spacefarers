import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext'; // ✅ Import the separated context

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
