import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from './ThemeContext';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';

export function ThemeProviderComponent({ children }) {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [themeMode, setThemeMode] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode, // Light or dark mode
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProviderComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
