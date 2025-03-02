import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import config from '../../config';
import { AuthContext } from '../context/AuthContext';

const API_URL = config.apiUrl;

export default function SpacefarerDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const {
    data: spacefarer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['spacefarer', id],
    queryFn: async () => {
      if (!token) {
        throw new Error('Unauthorized: No token available');
      }
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant='h4'>{spacefarer.name}</Typography>
          <Typography variant='h6'>
            Origin: {spacefarer.originPlanet}
          </Typography>
          <Typography>Spacesuit Color: {spacefarer.spacesuitColor}</Typography>
          <Typography>Wormhole Skill: {spacefarer.wormholeSkill}</Typography>
          <Typography>Department: {spacefarer.department}</Typography>
          <Typography>Position: {spacefarer.position}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
