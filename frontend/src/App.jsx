import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // ✅ Use authentication context
import {
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SpacefarersTable from './components/SpacefarersTable';
import PromotionDialog from './components/PromotionDialog';
import { usePromote } from './hooks/usePromote';
import { toast } from 'react-hot-toast';

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

  // ✅ State for Filters
  const [selectedPlanet, setSelectedPlanet] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

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
    promoteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading spacefarers...</p>;

  // ✅ Filtered Spacefarers List
  const filteredSpacefarers = spacefarers.filter((s) => {
    return (
      (selectedPlanet === '' || s.originPlanet === selectedPlanet) &&
      (selectedColor === '' || s.spacesuitColor === selectedColor)
    );
  });

  // ✅ Extract Unique Values for Dropdowns
  const uniquePlanets = [...new Set(spacefarers.map((s) => s.originPlanet))];
  const uniqueColors = [...new Set(spacefarers.map((s) => s.spacesuitColor))];

  return (
    <Container>
      <h1>🚀 Galactic Spacefarers</h1>
      <div style={{ marginBottom: '15px' }}>
        <LoginButton />
        <LogoutButton />
      </div>

      {/* ✅ Filter Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {/* Origin Planet Filter */}
        <FormControl variant='outlined' style={{ minWidth: 200 }}>
          <InputLabel>🌍 Origin Planet</InputLabel>
          <Select
            value={selectedPlanet}
            onChange={(e) => setSelectedPlanet(e.target.value)}
            label='Origin Planet'
          >
            <MenuItem value=''>All</MenuItem>
            {uniquePlanets.map((planet) => (
              <MenuItem key={planet} value={planet}>
                {planet}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Spacesuit Color Filter */}
        <FormControl variant='outlined' style={{ minWidth: 200 }}>
          <InputLabel>🎨 Spacesuit Color</InputLabel>
          <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            label='Spacesuit Color'
          >
            <MenuItem value=''>All</MenuItem>
            {uniqueColors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <SpacefarersTable
        spacefarers={filteredSpacefarers}
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
