import { createContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

export const CustomThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'light',
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                background: {
                  default: '#f7f7f7',
                },
              }
            : {
                background: {
                  default: '#121212',
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <CustomThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
