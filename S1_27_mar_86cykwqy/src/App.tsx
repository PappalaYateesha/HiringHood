import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  IconButton,
  Box,
  Typography,
  Fab,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TodoList from "./components/TodoList";
import SearchBar from "./components/searchBar";
import NewNoteModal from "./components/NewNoteModal";
import FilterDropdown from "./components/FilterDropdown";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


const getDesignTokens = (mode: "light" | "dark") => ({
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
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const theme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));

  const handleAddTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            p: 2,
            //borderRadius: "12px",
            //boxShadow: darkMode ? 5 : 3,
            transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          }}
        >
          {/* Header */}
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            TODO LIST
          </Typography>

          {/* Search Bar, Filter, and Theme Toggle */}
          <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <Box flexGrow={1}>
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Box>

            {/* Updated Filter Dropdown with Filled Purple Background */}
            <FilterDropdown filter={filter} setFilter={setFilter} />

            {/* Updated Theme Toggle Button */}

<IconButton
  onClick={() => setDarkMode(!darkMode)}
  sx={{
    height:40,
    backgroundColor: theme.palette.primary.main, // Purple background
    color: "#fff", // White moon icon
    borderRadius: "8px", // Rounded shape
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Darker purple on hover
    },
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Depth effect
  }}
  >
  {darkMode ? <LightModeIcon/> : < DarkModeIcon/>}
</IconButton>
          </Box>

          {/* To-Do List */}
          <Box flexGrow={1} overflow="auto">
            <TodoList tasks={tasks} setTasks={setTasks} filter={filter} searchQuery={searchQuery} />
          </Box>

          {/* Add (+) Button - Bottom Right Inside Container */}
          <Fab
            color="primary"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: theme.palette.primary.main,
              color: "#FFF",
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </Fab>
        </Container>

        {/* Modal for Adding Tasks */}
        <NewNoteModal open={open} onClose={() => setOpen(false)} onAddTask={handleAddTask} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
