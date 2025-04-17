import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearUser } from "../redux/slices/authSlice";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);


  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#7b1fa2", mb: 2 }}>
      <Toolbar>

        {location.pathname !== "/dashboard" && (
          <Tooltip title="Go to Dashboard">
            <IconButton edge="start" color="inherit" onClick={() => navigate("/dashboard")}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* Title */}
        <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
          CMS Admin Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* User Info */}
        {user && (
          <Typography sx={{ mr: 2 }} variant="body1">
            👤 {user.name} ({user.role})
          </Typography>
        )}

        {/* Logout Button */}
        <Tooltip title="Logout">
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              borderColor: "#fff",
              color: "#fff",
              ":hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Logout
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
