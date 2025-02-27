import { useState } from 'react';
import axios from 'axios';

const LoginButton = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4004/login');
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      alert('Logged in successfully! Please refresh.');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed!');
    }
  };

  return (
    <div>
      {token ? (
        <p>✅ Logged In</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default LoginButton;
