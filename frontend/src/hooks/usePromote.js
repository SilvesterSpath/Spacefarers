import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import config from '../../config';
import { toast } from 'react-hot-toast';

const API_URL = config.apiUrl || 'http://localhost:4004/spacefarers';

export function usePromote(setPromotionData, setOpen) {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!token) {
        toast.error('🔒 You must be logged in to promote a spacefarer.');
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
}
