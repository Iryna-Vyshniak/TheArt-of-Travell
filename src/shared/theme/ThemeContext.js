import { createContext, useState } from 'react';
import { theme } from './theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const currentTheme = darkMode ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
