import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search Task..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{
        height:40,
        "& .MuiOutlinedInput-root":{
            height:"100%",
            borderRadius:"8px",
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
