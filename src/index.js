import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext"; // Import LanguageProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        {" "}
        {/* Wrap with LanguageProvider */}
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
