"use client";
import React, { useState, useContext, useEffect } from "react";
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
import { getProjects } from "../../utils/actions";
import { ThemeContext } from "../context/ThemeProvider";

const Projects_Container = () => {
  const [menu, setMenu] = useState(false);
  const [projects, setProjects] = useState([]);
  const { projectRef } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  const btns = [
    "portfolio",
    "E-commerce",
    "News",
    "blogging site",
    "other Projects",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projects = await getProjects();
        setProjects(projects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  const placeHolder = ["", "", "", ""];

  return (
    <section ref={projectRef}>
      <h2
        ref={projectRef}
        className="text-textColor text-2xl sm:text-3xl py-3 pb-1"
      >
        Projects<span className="text-blue-500">.</span>
      </h2>
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

          {loading ? (
            <div className="w-full flex flex-col md:grid grid-cols-2 justify-start items-start min-h-screen gap-2">
              {placeHolder.map((item) => {
                return (
                  <div className="w-full text-textColor flex flex-col gap-4 bg-slate-500/5 py-5 rounded-lg">
                    <section className="flex gap-2 px-5">
                      <p className="w-3 h-3 bg-red-600 rounded-full"></p>
                      <p className="w-3 h-3 bg-yellow-600 rounded-full"></p>
                      <p className="w-3 h-3 bg-blue-600 rounded-full"></p>
                      <p className="w-3 h-3 bg-textColor rounded-full"></p>
                    </section>
                    <div className="relative w-full h-64 bg-slate-300/5"></div>
                    <section className="px-5 flex justify-between items-start">
                      <div className="w-3/4 flex flex-col gap-1">
                        <div className="h-5 w-1/2 bg-slate-300/5"></div>
                        <div className="h-5 w-1/3 bg-slate-300/5"></div>
                      </div>
                      <div className="h-8 w-14 bg-slate-300/5"></div>
                    </section>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {!projects.length > 0 ? (
                <div className="flex justify-center items-center w-full min-h-60">
                  <p className="text-lg md:text-xl text-textColor">
                    Sorry! There are no projects at the momment.
                  </p>
                </div>
              ) : (
                <section className="flex flex-col md:grid grid-cols-2 justify-start items-start min-h-screen gap-2">
                  {projects.map((item) => {
                    return (
                      <div className="w-full">
                        {item.active && (
                          <Projects setMenu={setMenu} {...item} />
                        )}
                      </div>
                    );
                  })}
                </section>
              )}
            </div>
          )}
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
