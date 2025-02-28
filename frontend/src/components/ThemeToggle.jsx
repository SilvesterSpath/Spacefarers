import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FormControlLabel, Switch } from '@mui/material';

export default function ThemeToggle() {
  const { themeMode, toggleTheme } = useContext(ThemeContext);

  return (
    <FormControlLabel
      control={<Switch checked={themeMode === 'dark'} onChange={toggleTheme} />}
      label={themeMode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    />
  );
}
