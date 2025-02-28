import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Container, Button, Typography } from '@mui/material';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SpacefarersTable from './components/SpacefarersTable';
import PromotionDialog from './components/PromotionDialog';
import { usePromote } from './hooks/usePromote';
import { toast } from 'react-hot-toast';
import AddSpacefarerDialog from './components/AddSpacefarerDialog';
import ThemeToggle from './components/ThemeToggle';

const API_URL = config.apiUrl || 'http://localhost:4004/spacefarers';

export default function App() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { role, token } = useContext(AuthContext);
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

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // ✅ Number of spacefarers per page

  // ✅ Handle Row Click (Prevent Unauthorized Access)
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
    if (role !== 'admin') {
      toast.error('🚫 Only admins can promote spacefarers!');
      return;
    }
    promoteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading spacefarers...</p>;

  // ✅ Paginate Spacefarers
  const totalPages = Math.ceil(spacefarers.length / pageSize);
  const paginatedSpacefarers = spacefarers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Pagination Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <Container>
      <h1>🚀 Galactic Spacefarers</h1>
      <div style={{ marginBottom: '15px' }}>
        <ThemeToggle />
        <LoginButton />
        <LogoutButton />
        {role === 'admin' && (
          <Button
            variant='contained'
            color='success'
            onClick={() => setAddDialogOpen(true)}
          >
            ➕ Add Spacefarer
          </Button>
        )}
      </div>
      <AddSpacefarerDialog open={addDialogOpen} setOpen={setAddDialogOpen} />

      {/* ✅ Spacefarers Table */}
      <SpacefarersTable
        spacefarers={paginatedSpacefarers}
        handleRowClick={handleRowClick}
        handlePromotion={handlePromotion}
      />

      {/* ✅ Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '15px',
        }}
      >
        <Button
          variant='outlined'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          ⬅ Previous
        </Button>
        <Typography variant='body1'>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant='outlined'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </Button>
      </div>

      <PromotionDialog
        open={open}
        setOpen={setOpen}
        promotionData={promotionData}
      />
    </Container>
  );
}
