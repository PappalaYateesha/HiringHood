import React from "react";
import {
  ListItem,
  Typography,
  IconButton,
  Stack,
  Chip,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Todo } from "../redux/todoSlice";
import { useNavigate } from "react-router-dom";

interface TodoItemProps {
  task: Todo;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const goToDetails = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <ListItem
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 2,
        mb: 1,
        boxShadow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 3,
        },
      }}
      onClick={goToDetails}
    >
      <Stack spacing={0.5}>
        <Typography variant="h6">{task.title}</Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}
        <Stack direction="row" spacing={1} mt={0.5}>
          <Chip label={task.priority} color="primary" size="small" />
          <Chip label={task.status} color="secondary" size="small" />
          <Chip label={`Due: ${task.dueDate}`} size="small" />
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${task.id}`);
          }}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default TodoItem;
