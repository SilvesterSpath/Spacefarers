import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import PaletteIcon from '@mui/icons-material/Palette';
import SortIcon from '@mui/icons-material/Sort';

export default function FilterControls({
  searchOrigin,
  setSearchOrigin,
  searchColor,
  setSearchColor,
  sortBy,
  setSortBy,
}) {
  return (
    <Box display='flex' gap='10px' mb={2} width='100%'>
      {/* 🌍 Origin Planet Filter */}
      <TextField
        label='Search Origin Planet'
        variant='outlined'
        value={searchOrigin}
        onChange={(e) => setSearchOrigin(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PublicIcon color='primary' />
            </InputAdornment>
          ),
        }}
      />

      {/* 🎨 Spacesuit Color Filter */}
      <TextField
        label='Search Spacesuit Color'
        variant='outlined'
        value={searchColor}
        onChange={(e) => setSearchColor(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PaletteIcon color='primary' />
            </InputAdornment>
          ),
        }}
      />

      {/* 🔽 Sorting Dropdown */}
      <FormControl variant='outlined' fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          label='Sort By'
          startAdornment={
            <InputAdornment position='start'>
              <SortIcon color='primary' />
            </InputAdornment>
          }
        >
          <MenuItem value=''>None</MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='wormholeSkill'>Wormhole Skill</MenuItem>
          <MenuItem value='stardustCollection'>Stardust Collection</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

// ✅ Define PropTypes for maintainability
FilterControls.propTypes = {
  searchOrigin: PropTypes.string.isRequired,
  setSearchOrigin: PropTypes.func.isRequired,
  searchColor: PropTypes.string.isRequired,
  setSearchColor: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
};
