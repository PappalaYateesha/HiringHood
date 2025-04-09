import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface FilterDropdownProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filter, setFilter }) => {
  const theme = useTheme();

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="filter-label" sx={{ color: theme.palette.text.primary }}>
        Filter by Status
      </InputLabel>
      <Select
        labelId="filter-label"
        value={filter}
        label="Filter by Status"
        onChange={(e) => setFilter(e.target.value)}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          "& .MuiSvgIcon-root": { color: theme.palette.text.primary },
        }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
