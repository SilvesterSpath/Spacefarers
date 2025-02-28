import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null); // ✅ Store user role

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode(storedToken);
      setRole(decoded.role); // ✅ Extract role from token
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decoded = jwtDecode(newToken);
    setRole(decoded.role); // ✅ Set role on login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null); // ✅ Clear role on logout
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
