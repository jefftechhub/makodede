"use client";
import React, { useState, useEffect } from "react";
import {
  portfolio,
  commerce,
  news,
  blogging,
  membership,
  non_profit,
  personal,
  entertainment,
  other,
  showmore,
  RightSlider,
  LeftSlider,
} from "./Icon";

const Projects = ({ projectRef }) => {
  console.log(portfolio);
  const [active, setActive] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("btn") || "portfolio"
      : "portfolio"
  );
  const btns = [
    "portfolio",
    "E-commerce",
    "News",
    "blogging site",
    "MemberShip",
    "Non-profit",
    "Personal",
    "Entertainment",
    "other Projects",
  ];

  useEffect(() => {
    localStorage.setItem("btn", active);
  }, [active]);

  const handleSetActive = (btn) => {
    setActive(btn);
  };

  const [menu, setMenu] = useState(false);

  return (
    <section ref={projectRef}>
      <h1
        ref={projectRef}
        className="text-textColor text-2xl sm:text-3xl py-3 pb-1"
      >
        Projects<span className="text-blue-500">.</span>
      </h1>
      <p className=" inline-block bg-blue-500 w-12 sm:w-14 h-1 rounded-xl"></p>
      <article className="pt-14 flex gap-5  sm:pt-20">
        <nav className="flex relative bg-slate-500/5 py-10 flex-col w-auto items-start">
          {btns.map((btn, index) => (
            <Btn
              key={index}
              btn={btn}
              isActive={active === btn}
              setActive={handleSetActive}
              index={index}
              menu={menu}
            />
          ))}
          <button
            className="sm:hidden absolute text-textColor top-1/2 rounded-r-full -right-9 p-3 pl-0 bg-slate-500/5"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            {menu ? <LeftSlider /> : <RightSlider />}
          </button>
        </nav>
        <main></main>
      </article>
    </section>
  );
};

const Btn = ({ btn, index, isActive, setActive, menu }) => {
  const icons = [
    portfolio,
    commerce,
    news,
    blogging,
    membership,
    non_profit,
    personal,
    entertainment,
    other,
  ];

  return (
    <div
      className={`w-full flex items-center text-sm text-textColor capitalize  py-4 px-3 sm:px-5 gap-3 duration-200 transition-all ease-in-out sm:hover:bg-blue-500/5  ${
        isActive && "bg-blue-500 text-white"
      }`}
      onClick={() => setActive(btn)}
    >
      <div>{icons[index]}</div>

      {menu && (
        <button className="sm:w-auto flex gap-3 items-center">
          {btn}
          {btn === "other Projects" && showmore}
        </button>
      )}
    </div>
  );
};

export default Projects;
