import React from "react";
import { MenuItem, Select, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 

interface FilterDropdownProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filter, setFilter }) => {
  const theme = useTheme(); 

  return (
    <FormControl variant="outlined" sx={{ minWidth: 100 }}>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        displayEmpty
        sx={{
          height: 40,
          minWidth: 100,
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          borderRadius: 2,
          padding: "8px 16px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.dark,
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Complete">Complete</MenuItem>
        <MenuItem value="Incomplete">Incomplete</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
