import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export default function PromotionDialog({ open, setOpen, promotionData }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>🎖 Promotion Success!</DialogTitle>
      <DialogContent>
        {promotionData ? (
          <>
            <Typography variant='h6'>{promotionData.message}</Typography>
            <Typography>
              🚀 <strong>New Wormhole Skill:</strong>{' '}
              {promotionData.spacefarer.wormholeSkill}
            </Typography>
            <Typography>
              🎖 <strong>New Rank:</strong> {promotionData.spacefarer.position}
            </Typography>
          </>
        ) : (
          <Typography>No promotion data available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ✅ Add PropTypes to prevent ESLint warnings
PromotionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  promotionData: PropTypes.shape({
    message: PropTypes.string.isRequired,
    spacefarer: PropTypes.shape({
      wormholeSkill: PropTypes.number.isRequired,
      position: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
