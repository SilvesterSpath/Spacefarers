import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-hot-toast';

export default function LoginButton() {
  const { login } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${config.apiUrl}/login`, { username });
      login(res.data.token);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Login failed!');
    }
  };

  return (
    <>
      <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        🔑 Login
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>🔑 Enter Username to Login</DialogTitle>
        <DialogContent>
          <TextField
            label='Username'
            fullWidth
            margin='dense'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin} color='primary' variant='contained'>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
