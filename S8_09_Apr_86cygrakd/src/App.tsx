import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEditTask from "./pages/AddEdit";
import TaskDetails from "./pages/TaskDetails";
import Header from "./components/Header";

export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    primary: { main: "#6C63FF" },
    background: {
      default: mode === "dark" ? "#1E1E1E" : "#FFFFFF",
      paper: mode === "dark" ? "#252525" : "#FFFFFF",
    },
    text: { primary: mode === "dark" ? "#FFFFFF" : "#000000" },
  },
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/add" element={<AddEditTask />} />
            <Route path="/edit/:id" element={<AddEditTask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
