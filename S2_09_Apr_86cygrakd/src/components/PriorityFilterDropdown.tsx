import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PriorityFilterDropdownProps {
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
}

const PriorityFilterDropdown: React.FC<PriorityFilterDropdownProps> = ({ priority, setPriority }) => {
  const theme = useTheme();

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="priority-label" sx={{ color: theme.palette.text.primary }}>
        Filter by Priority
      </InputLabel>
      <Select
        labelId="priority-label"
        value={priority}
        label="Filter by Priority"
        onChange={(e) => setPriority(e.target.value)}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          "& .MuiSvgIcon-root": { color: theme.palette.text.primary },
        }}
      >
        <MenuItem value="All">All Priorities</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PriorityFilterDropdown;
