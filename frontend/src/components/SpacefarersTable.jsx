import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

export default function SpacefarersTable({
  spacefarers,
  handleRowClick,
  handlePromotion,
}) {
  return (
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
              onClick={() => handleRowClick(s._id)}
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
  );
}

// ✅ Add PropTypes to prevent ESLint warnings
SpacefarersTable.propTypes = {
  spacefarers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      originPlanet: PropTypes.string.isRequired,
      spacesuitColor: PropTypes.string.isRequired,
      wormholeSkill: PropTypes.number.isRequired,
      position: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handlePromotion: PropTypes.func.isRequired,
};
