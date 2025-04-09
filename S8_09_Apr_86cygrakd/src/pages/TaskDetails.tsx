
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deleteTodo } from "../redux/todoSlice";
import {
  Button,
  Typography,
  Container,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Box,
} from "@mui/material";

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const task = useAppSelector((state) =>
    state.todo.todos.find((t) => t.id === Number(id))
  );

  if (!task) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Task not found
        </Typography>
      </Container>
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmDelete = () => {
    dispatch(deleteTodo(task.id));
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">
            {task.title}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(`/edit/${task.id}`)}
            >
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleOpen}>
              Delete
            </Button>
          </Stack>
        </Box>

        <Typography variant="subtitle1" mb={1}>
          <strong>Description:</strong> {task.description}
        </Typography>
        <Typography variant="subtitle1" mb={1}>
          <strong>Due Date:</strong> {task.dueDate}
        </Typography>
        <Typography variant="subtitle1" mb={1}>
          <strong>Priority:</strong> {task.priority}
        </Typography>
        <Typography variant="subtitle1" mb={1}>
          <strong>Status:</strong> {task.status}
        </Typography>

        {task.tags && task.tags.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Tags:</strong>
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {task.tags.map((tag, idx) => (
                <Chip key={idx} label={tag} color="secondary" variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskDetails;
