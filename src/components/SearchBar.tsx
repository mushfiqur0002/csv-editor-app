// In SearchBar.tsx

import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const delay = setTimeout(() => {
      onChange(input);
    }, 300); // debounce 300ms

    return () => clearTimeout(delay);
  }, [input, onChange]);

  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      sx={{ maxWidth: 300 }}  // max width here
      fullWidth={false}       // prevent full width stretch
    />
  );
};

export default SearchBar;
