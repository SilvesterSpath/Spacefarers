import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4004/spacefarers';

export default function App() {
  const { data: spacefarers, isLoading } = useQuery({
    queryKey: ['spacefarers'],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data;
    },
  });

  const [originFilter, setOriginFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const navigate = useNavigate();

  if (isLoading) return <p>Loading spacefarers...</p>;

  const filteredSpacefarers = spacefarers.filter(
    (s) =>
      s.originPlanet.includes(originFilter) &&
      s.spacesuitColor.includes(colorFilter)
  );

  return (
    <Container>
      <h1>🚀 Galactic Spacefarers</h1>

      {/* Filters */}
      <TextField
        label='Origin Planet'
        value={originFilter}
        onChange={(e) => setOriginFilter(e.target.value)}
      />
      <TextField
        label='Spacesuit Color'
        value={colorFilter}
        onChange={(e) => setColorFilter(e.target.value)}
      />
      <Button
        variant='contained'
        onClick={() => setOriginFilter('') & setColorFilter('')}
      >
        Reset Filters
      </Button>

      {/* Spacefarers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Wormhole Skill</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSpacefarers.map((s) => (
              <TableRow
                key={s._id}
                onClick={() => navigate(`/spacefarer/${s._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.originPlanet}</TableCell>
                <TableCell>{s.spacesuitColor}</TableCell>
                <TableCell>{s.wormholeSkill}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={(e) => {
                      e.stopPropagation();
                      axios
                        .post(`${API_URL}/${s._id}/promote`)
                        .then(() => window.location.reload());
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
    </Container>
  );
}
