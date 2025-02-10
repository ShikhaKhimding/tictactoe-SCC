// ThemeContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context to manage the theme
const ThemeContext = createContext();

// ThemeProvider to provide theme state throughout the app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);
