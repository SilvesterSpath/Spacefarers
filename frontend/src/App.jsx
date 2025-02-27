import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import LoginButton from './components/LoginButton';

const API_URL = config.apiUrl || 'http://localhost:4004/spacefarers';

export default function App() {
  const queryClient = useQueryClient();
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

  // Promote a Spacefarer
  const promoteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('🔒 You must be logged in to promote a spacefarer.');
        return;
      }

      const res = await axios.post(
        `${API_URL}/${id}/promote`, // ✅ Correct URL
        {}, // ✅ Empty request body (required for POST)
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Correctly placed headers
        }
      );

      return res.data;
    },
    onSuccess: (data) => {
      setPromotionData(data);
      setOpen(true);
      queryClient.invalidateQueries(['spacefarers']); // Refresh the list
    },
  });

  const handlePromotion = (id) => {
    promoteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading spacefarers...</p>;

  return (
    <Container>
      <h1>🚀 Galactic Spacefarers</h1>
      <LoginButton />

      {/* Spacefarer Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Wormhole Skill</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spacefarers.map((s) => (
              <TableRow
                key={s._id}
                onClick={() => navigate(`/spacefarer/${s._id}`)} // ✅ Navigate to detail page
                style={{ cursor: 'pointer' }} // Make rows clickable
              >
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.originPlanet}</TableCell>
                <TableCell>{s.spacesuitColor}</TableCell>
                <TableCell>{s.wormholeSkill}</TableCell>
                <TableCell>{s.position}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePromotion(s._id);
                    }}
                  >
                    Promote
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Promotion Popup Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>🎖 Promotion Success!</DialogTitle>
        <DialogContent>
          {promotionData && (
            <>
              <Typography variant='h6'>{promotionData.message}</Typography>
              <Typography>
                🚀 **New Wormhole Skill**:{' '}
                {promotionData.spacefarer.wormholeSkill}
              </Typography>
              <Typography>
                🎖 **New Rank**: {promotionData.spacefarer.position}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
