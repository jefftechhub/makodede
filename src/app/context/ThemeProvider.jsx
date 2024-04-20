"use client";
import React, { useState, useEffect, createContext } from "react";
import { Toaster } from "react-hot-toast";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    // typeof window !== "undefined"
    //   ? localStorage.getItem("theme") || "dark"
    //   : "dark"
    "dark"
  );
  const [images, setImages] = useState([]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        setImages,
        images,
      }}
    >
      <Toaster />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
