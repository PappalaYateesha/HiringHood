import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  tag: string;
  setTag: (value: string) => void;
  allTags: string[];
}

const TagFilterDropdown: React.FC<Props> = ({ tag, setTag, allTags }) => {
  const theme = useTheme();

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="tag-filter-label" sx={{ color: theme.palette.text.primary }}>
        Filter by Tag
      </InputLabel>
      <Select
        labelId="tag-filter-label"
        value={tag}
        label="Filter by Tag"
        onChange={(e) => setTag(e.target.value)}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          "& .MuiSvgIcon-root": { color: theme.palette.text.primary },
        }}
      >
        <MenuItem value="All">All</MenuItem>
        {allTags.map((t, i) => (
          <MenuItem key={i} value={t}>
            {t}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagFilterDropdown;
