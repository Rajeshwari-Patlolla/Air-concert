import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create the ThemeContext
const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light"); // Default to 'light' or use saved preference from localStorage

  // Create the theme object based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#1976d2", // Blue for light theme
                },
                background: {
                  default: "#f5f5f5", // Light background
                  paper: "#fff", // Light paper background
                },
                text: {
                  primary: "#000", // Dark text for light mode
                },
              }
            : {
                primary: {
                  main: "#bb86fc", // Purple for dark theme
                },
                background: {
                  default: "#121212", // Dark background
                  paper: "#1f1f1f", // Dark paper background
                },
                text: {
                  primary: "#fff", // Light text for dark mode
                },
              }),
        },
      }),
    [mode]
  );

  // Function to toggle theme
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save user preference in localStorage
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProviderWrapper, ThemeContext };
