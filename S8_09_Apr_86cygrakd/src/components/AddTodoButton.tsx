import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddTodoButtonProps {
  onClick: () => void;
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={onClick}
      sx={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddTodoButton;
