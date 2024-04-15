"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import Link from "next/link";
import {
  Contact,
  About,
  Projects,
  Menu,
  OpennedMenu,
  Close,
  Sun,
  Moon,
} from "./Icon";
import { ThemeContext } from "../context/ThemeProvider";

const NavbarJsx = ({ project, about, contacts }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [openMenu, setOpenMenu] = useState(false);
  const nav = useRef(null);
  const header = useRef(null);
  const close = useRef(null);

  useEffect(() => {
    if (openMenu) {
      nav.current.style.transform = "translate(0)";
      close.current.style.opacity = "1";
    } else {
      if (window.innerWidth <= 639) {
        nav.current.style.transform = "translateX(-100%)";
        nav.current.style.top = "0";
        close.current.style.opacity = "0";
      }
    }
  }, [openMenu]);

  const scrollToView = (element) => {
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={header}
      className="flex items-center relative justify-between py-5 "
    >
      <div className="flex items-center gap-6">
        {/* <Img src ={} alt ={}/> */}
        <h2 className="text-textColor text-xl uppercase">Logo</h2>
        <nav
          ref={nav}
          className="flex -translate-x-full  sm:translate-x-0 sm:flex-row  sm:bg-transparent sm:gap-6 sm:p-0 flex-col items-start gap-6 sm:left-0 -left-4 py-14 pl-8 w-3/4 sm:w-full pb-40 z-30 h-screenHeight sm:h-auto absolute sm:relative backdrop-blur-sm sm:backdrop-blur-0 bg-blue-800/65 rounded-br-3xl"
        >
          <button
            className="text-textColor flex gap-4 text-xl sm:text-sm items-center"
            onClick={() => {
              scrollToView(project);
            }}
          >
            <Projects />
            Projects
          </button>
          <button
            className="text-textColor flex gap-4 text-xl sm:text-sm items-center"
            onClick={() => {
              scrollToView(about);
            }}
          >
            <About />
            About
          </button>
          <button
            className="text-textColor flex gap-4 text-xl sm:text-sm items-center"
            onClick={() => {
              scrollToView(contacts);
            }}
          >
            <Contact />
            Contacts
          </button>
          <Link
            className="text-textColor text-xl sm:text-sm hidden"
            href="/blogs"
          >
            Blogs
          </Link>
          <Link
            className="text-textColor text-xl sm:text-sm hidden"
            href="/developers"
          >
            Developer
          </Link>
          <button
            ref={close}
            className="bg-blue-500 p-3 rounded-full absolute bottom-0 right-0 outline outline-background  opacity-0"
            onClick={() => setOpenMenu(false)}
          >
            <Close />
          </button>
        </nav>
      </div>
      <div className="z-50 flex justify-center items-center gap-4">
        <div>
          {theme === "dark" && (
            <button
              className="text-textColor"
              onClick={() => {
                setTheme("light");
              }}
            >
              <Sun />
            </button>
          )}
          {theme === "light" && (
            <button
              className="text-textColor"
              onClick={() => {
                setTheme("dark");
              }}
            >
              <Moon />
            </button>
          )}
        </div>

        <div className="sm:hidden">
          {openMenu ? (
            <OpennedMenu />
          ) : (
            <button onClick={() => setOpenMenu(true)}>
              <Menu />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarJsx;
