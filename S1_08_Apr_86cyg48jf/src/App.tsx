import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AddTransaction from './pages/AddTransaction';
import { Container, IconButton, Stack, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { CustomThemeContext } from './theme/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const AppContent = () => {
  const { toggleTheme, mode } = useContext(CustomThemeContext);
  const location = useLocation();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Stack direction="row" spacing={1}>
          {location.pathname !== '/' && (
            <Button
              component={Link}
              to="/"
              variant="outlined"
              size="small"
              color="primary"
            >
              Home
            </Button>
          )}
          {location.pathname !== '/add' && (
            <Button
              component={Link}
              to="/add"
              variant="outlined"
              size="small"
              color="secondary"
            >
              Add Transaction
            </Button>
          )}
        </Stack>

        <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Stack>

      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/edit/:id" element={<AddTransaction />} />
        </Routes>
      </Box>
    </Container>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
