import React from "react";
import { ListItem, ListItemText, Checkbox, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onEditClick: (id: number, text: string) => void;
  onEditChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSubmit: () => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  editText: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onToggle,
  onEditClick,
  onEditChange,
  onEditSubmit,
  onDelete,
  isEditing,
  editText,
}) => {
  return (
    <ListItem>
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      {isEditing ? (
        <TextField
          value={editText}
          onChange={onEditChange}
          onBlur={onEditSubmit}
          onKeyPress={(e) => e.key === "Enter" && onEditSubmit()}
          autoFocus
          size="small"
        />
      ) : (
        <ListItemText
          primary={task.text}
          sx={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "gray" : "inherit",
          }}
        />
      )}
      <IconButton onClick={() => (isEditing ? onEditSubmit() : onEditClick(task.id, task.text))}>
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </IconButton>
      <IconButton onClick={() => onDelete(task.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
