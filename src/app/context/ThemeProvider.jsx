"use client";
import React, { useState, useEffect, createContext } from "react";
import { Toaster } from "react-hot-toast";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme")
      : "dark"
  );

  useEffect(() => {
    typeof window !== "undefined" && localStorage.setItem("theme", theme);
  }, [theme]);

  console.log(typeof window);

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
