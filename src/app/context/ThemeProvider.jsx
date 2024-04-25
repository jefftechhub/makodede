"use client";
import React, { useState, useEffect, useRef, createContext } from "react";
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
  const projectRef = useRef(null);
  const aboutRef = useRef(null);
  const contactsRef = useRef(null);

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
        projectRef,
        aboutRef,
        contactsRef,
      }}
    >
      <Toaster />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
