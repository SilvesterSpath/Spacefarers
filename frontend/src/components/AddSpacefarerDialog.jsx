import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import config from '../../config';
import { toast } from 'react-hot-toast';

export default function AddSpacefarerDialog({ open, setOpen }) {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    stardustCollection: '',
    wormholeSkill: '',
    originPlanet: '',
    spacesuitColor: '',
    department: '',
    position: '',
  });

  const mutation = useMutation({
    mutationFn: async (newSpacefarer) => {
      const res = await axios.post(
        `${config.apiUrl}/spacefarers`,
        newSpacefarer,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['spacefarers']); //  Refresh spacefarers list
      setOpen(false);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!token) {
      toast.error('🔒 You must be logged in to add a spacefarer.');
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>🌟 Add a New Spacefarer</DialogTitle>
      <DialogContent>
        <TextField
          label='Name'
          name='name'
          fullWidth
          margin='dense'
          onChange={handleChange}
        />
        <TextField
          label='Stardust Collection'
          name='stardustCollection'
          type='number'
          fullWidth
          margin='dense'
          onChange={handleChange}
        />
        <TextField
          label='Wormhole Skill'
          name='wormholeSkill'
          type='number'
          fullWidth
          margin='dense'
          onChange={handleChange}
        />
        <TextField
          label='Origin Planet'
          name='originPlanet'
          fullWidth
          margin='dense'
          onChange={handleChange}
        />
        <TextField
          label='Spacesuit Color'
          name='spacesuitColor'
          fullWidth
          margin='dense'
          onChange={handleChange}
        />
        <TextField
          label='Department'
          name='department'
          fullWidth
          margin='dense'
          onChange={handleChange}
        />
        <TextField
          label='Position'
          name='position'
          fullWidth
          margin='dense'
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit} color='primary' variant='contained'>
          Add Spacefarer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddSpacefarerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
