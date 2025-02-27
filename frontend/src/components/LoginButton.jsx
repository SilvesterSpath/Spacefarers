import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';
import { toast } from 'react-hot-toast';

export default function LoginButton() {
  const { token, login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4004/login');
      login(res.data.token);
      toast.success(' Logged in successfully!');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('❌ Login failed!');
    }
  };

  return !token ? (
    <Button
      variant='contained'
      color='primary'
      onClick={handleLogin}
      style={{ marginRight: '10px' }} //  Adds spacing
    >
      🔑 Login
    </Button>
  ) : null;
}
