"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Contact, About, Projects, Menu, OpennedMenu, Close } from "./Icon";

const NavbarJsx = ({ project, about, contacts }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [height, setHeight] = useState(0);
  const nav = useRef(null);
  const header = useRef(null);
  const close = useRef(null);

  useEffect(() => {
    const height = header.current.getBoundingClientRect().height;
    setHeight(height);
  }, []);

  useEffect(() => {
    if (openMenu) {
      nav.current.style.transform = "translate(0)";
      nav.current.style.top = `${height}px`;
      close.current.style.opacity = "1";
    } else {
      nav.current.style.transform = "translateY(-100%)";
      nav.current.style.top = "0";
      close.current.style.opacity = "0";
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
        <h2 className="text-white text-3xl uppercase">Logo</h2>
        <nav
          ref={nav}
          className="flex -translate-y-full sm:flex-row  sm:bg-transparent sm:gap-6 sm:p-0 flex-col items-start gap-6 sm:left-0 -left-8 py-14 pl-8 pb-40 z-30 h-auto sm:right-0 -right-8 absolute sm:relative backdrop-blur-sm sm:backdrop-blur-0 bg-blue-800/65"
        >
          <button
            className="text-white flex gap-4 text-xl items-center"
            onClick={() => {
              scrollToView(project);
            }}
          >
            <Projects />
            Projects
          </button>
          <button
            className="text-white flex gap-4 textlate-xl items-center"
            onClick={() => {
              scrollToView(about);
            }}
          >
            <About />
            About
          </button>
          <button
            className="text-white flex gap-4 text-xl items-center"
            onClick={() => {
              scrollToView(contacts);
            }}
          >
            <Contact />
            Contacts
          </button>
          <Link className="text-white hidden" href="/blogs">
            Blogs
          </Link>
          <Link className="text-white hidden" href="/developers">
            Developer
          </Link>
          <button
            ref={close}
            className="bg-blue-500 p-3 rounded-full absolute -bottom-12 right-8 opacity-0"
            onClick={() => setOpenMenu(false)}
          >
            <Close />
          </button>
        </nav>
      </div>
      <div className="z-30 sm:hidden">
        {openMenu ? (
          <OpennedMenu />
        ) : (
          <button onClick={() => setOpenMenu(true)}>
            <Menu />
          </button>
        )}
      </div>
    </header>
  );
};

export default NavbarJsx;
