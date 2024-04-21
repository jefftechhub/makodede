"use client";
import React, { useState, useEffect } from "react";
import Projects from "./Projects";
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
  DotedMenu,
  Cancel,
  Search,
} from "./Icon";
import { getProjects } from "../../../utils/actions";

const Projects_Container = ({ projectRef }) => {
  const [menu, setMenu] = useState(false);
  const [projects, setProjects] = useState([]);

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
    const fetchData = async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section ref={projectRef}>
      <h1
        ref={projectRef}
        className="text-textColor text-2xl sm:text-3xl py-3 pb-1"
      >
        Projects<span className="text-blue-500">.</span>
      </h1>
      <p className=" inline-block bg-blue-500 w-12 sm:w-14 h-1 rounded-xl"></p>
      <article
        className="pt-14 
       sm:pt-20"
      >
        <header
          className="px-3 sm:px-5 
        py-3 mb-2 flex justify-between items-center bg-slate-500/5"
        >
          <div
            className="flex gap-4 items-center"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <h2 className="text-textColor text-sm sm:text-lg">
              Choose Category
            </h2>
            <div className="cursor-pointer">
              {menu ? <Cancel /> : <DotedMenu />}
            </div>
          </div>
          <div>
            <Search />
          </div>
        </header>

        <main className="relative overflow-hidden">
          <nav
            className={`flex z-10 bg-slate-800  top-0  py-5 flex-col w-auto items-start absolute ease-in-out transition-all duration-300 -left-1 ${
              menu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {btns.map((btn, index) => (
              <Btn key={index} btn={btn} index={index} setMenu={setMenu} />
            ))}
          </nav>
          <section className="flex flex-col md:grid grid-cols-2 gap-2">
            {projects.map((item) => {
              return (
                <div>
                  {item.active && <Projects setMenu={setMenu} {...item} />}
                </div>
              );
            })}
          </section>
        </main>
      </article>
    </section>
  );
};

const Btn = ({ btn, index, setMenu }) => {
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
    <button
      className={`w-full flex items-center text-sm text-white capitalize  py-4 px-3 sm:px-5 gap-3 duration-200 transition-all ease-in-out sm:hover:bg-blue-500/5 `}
      onClick={() => setMenu(false)}
    >
      {icons[index]}
      {btn}
      {btn === "other Projects" && showmore}
    </button>
  );
};

export default Projects_Container;
