"use client";
import React, { useState, useEffect, createContext } from "react";
import { Toaster } from "react-hot-toast";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "dark"
      : "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <Toaster />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
