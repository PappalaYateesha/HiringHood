import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome) return null;

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton component={Link} to="/" color="inherit">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Task Manager
          </Typography>
        </Box>

        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
