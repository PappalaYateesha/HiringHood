import React, { useState } from "react";
import { Container, Typography, Stack, Box, IconButton, Fab } from "@mui/material";
import TodoList from "../components/TodoList";
import FilterDropdown from "../components/FilterDropdown";
import SearchBar from "../components/searchBar";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { deleteTodo } from "../redux/todoSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddIcon from "@mui/icons-material/Add";
import PriorityFilterDropdown from "../components/PriorityFilterDropdown";
import TagFilterDropdown from "../components/TagFilterDropdown";


interface HomeProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Home: React.FC<HomeProps> = ({ darkMode, toggleDarkMode }) => {
  const [filter, setFilter] = useState("All");
  const [priority, setPriority] = useState("All");
  const [tag, setTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useAppSelector((state) => state.todo.todos);
  const allTags = Array.from(new Set(todos.flatMap((t) => t.tags || [])));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        position: "relative",
        backgroundColor: "background.paper",
        color: "text.primary",
        //p: 2,
        transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        height: "100vh",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          TASK MANAGER
        </Typography>
        
      </Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
  <Box flexGrow={1}>
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </Box>
  <IconButton
    onClick={toggleDarkMode}
    sx={{
      height: 40,
      backgroundColor: "primary.main",
      color: "#fff",
      borderRadius: "8px",
      "&:hover": { backgroundColor: "primary.dark" },
    }}
  >
    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
</Stack>

      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center" mb={2}>
  <FilterDropdown filter={filter} setFilter={setFilter} />
  <PriorityFilterDropdown priority={priority} setPriority={setPriority} />
  <TagFilterDropdown tag={tag} setTag={setTag} allTags={allTags} />
</Stack>


      <Box flexGrow={1} overflow="auto">
        <TodoList
          tasks={todos}
          filter={filter}
          priority = {priority}
          tag = {tag}
          searchQuery={searchQuery}
          onDelete={handleDelete}
        />
      </Box>

      <Fab
        color="primary"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "primary.main",
          color: "#fff",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
        onClick={() => navigate("/add")}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default Home;
