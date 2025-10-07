import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Default to dark mode (ChatGPT style), but check localStorage first
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    // Apply theme to document - default is dark, light is the override
    if (darkMode) {
      document.documentElement.removeAttribute('data-theme'); // Use default dark theme
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const setTheme = (theme) => {
    if (theme === 'dark') {
      setDarkMode(true);
    } else if (theme === 'light') {
      setDarkMode(false);
    } else if (theme === 'auto') {
      // For auto mode, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  };

  const getCurrentTheme = () => {
    return darkMode ? 'dark' : 'light';
  };

  const value = {
    darkMode,
    toggleTheme,
    setTheme,
    getCurrentTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};