import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const { token, logout } = useContext(AuthContext);

  return token ? (
    <Button variant='contained' color='secondary' onClick={logout}>
      🔴 Logout
    </Button>
  ) : null;
}
