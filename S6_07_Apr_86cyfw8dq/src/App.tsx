
import { useState } from "react";
import { ThemeProvider, CssBaseline, IconButton, createTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import HomePage from "./pages/HomePage";

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = createTheme({
    palette:{
      mode,
    },
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "1rem" }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <HomePage />
      </div>
    </ThemeProvider>
  );
};

export default App;
