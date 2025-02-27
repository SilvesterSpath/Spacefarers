import { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // ✅ Import AuthContext
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
import LogoutButton from './components/LogoutButton';

const API_URL = config.apiUrl || 'http://localhost:4004/spacefarers';

export default function App() {
  const { token } = useContext(AuthContext); // ✅ Use authentication context
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

  // ✅ Prevent Unauthorized Users from Viewing Spacefarers
  const handleRowClick = (id) => {
    if (!token) {
      alert('🔒 You must be logged in to view this spacefarer.');
      return;
    }
    navigate(`/spacefarer/${id}`);
  };

  // ✅ Promote a Spacefarer (Only if Authenticated)
  const promoteMutation = useMutation({
    mutationFn: async (id) => {
      if (!token) {
        alert('🔒 You must be logged in to promote a spacefarer.');
        return;
      }

      const res = await axios.post(
        `${API_URL}/${id}/promote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
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
    if (!token) {
      alert('🔒 You must be logged in to promote a spacefarer.');
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
                onClick={() => handleRowClick(s._id)} // ✅ Now checks auth before navigating
                style={{ cursor: 'pointer' }}
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
