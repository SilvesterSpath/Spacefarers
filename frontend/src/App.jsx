import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // ✅ Use authentication context
import { Container } from '@mui/material';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SpacefarersTable from './components/SpacefarersTable';
import PromotionDialog from './components/PromotionDialog';
import { usePromote } from './hooks/usePromote';
import toast from 'react-hot-toast';

const API_URL = config.apiUrl || 'http://localhost:4004/spacefarers';

export default function App() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: spacefarers, isLoading } = useQuery({
    queryKey: ['spacefarers'],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  const [promotionData, setPromotionData] = useState(null);
  const promoteMutation = usePromote(setPromotionData, setOpen);

  // ✅ Prevent Unauthorized Users from Viewing Spacefarers
  const handleRowClick = (id) => {
    if (!token) {
      toast.error('🔒 You must be logged in to view this spacefarer.');
      return;
    }
    navigate(`/spacefarer/${id}`);
  };

  // ✅ Handle Promotion
  const handlePromotion = (id) => {
    if (!token) {
      toast.error('🔒 You must be logged in to promote a spacefarer.');
      return;
    }
    promoteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading spacefarers...</p>;

  return (
    <Container>
      <h1>🚀 Galactic Spacefarers</h1>
      <div style={{ marginBottom: '15px' }}>
        <LoginButton />
        <LogoutButton />
      </div>

      <SpacefarersTable
        spacefarers={spacefarers}
        handleRowClick={handleRowClick}
        handlePromotion={handlePromotion}
      />

      <PromotionDialog
        open={open}
        setOpen={setOpen}
        promotionData={promotionData}
      />
    </Container>
  );
}
