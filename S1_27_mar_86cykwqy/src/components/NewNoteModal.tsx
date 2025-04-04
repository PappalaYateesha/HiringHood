import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme

interface NewNoteModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (text: string) => void;
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({ open, onClose, onAddTask }) => {
  const [note, setNote] = useState("");
  const theme = useTheme(); // Get the current theme

  const handleApply = () => {
    if (note.trim()) {
      onAddTask(note);
      setNote(""); // Clear input
      onClose(); // Close modal
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default, // Adapts to dark/light mode
          color: theme.palette.text.primary,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          NEW NOTE
        </Typography>
        <TextField
          fullWidth
          label="Input your note..."
          variant="outlined"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            input: { color: theme.palette.text.primary }, // Ensure input text is visible in dark mode
            label: { color: theme.palette.text.primary },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.primary.main },
              "&:hover fieldset": { borderColor: theme.palette.primary.dark },
            },
          }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewNoteModal;
