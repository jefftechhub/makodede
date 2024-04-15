"use client";
import React, { useState, useEffect } from "react";

const Projects = ({ projectRef }) => {
  const [active, setActive] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("btn") || "portfolio"
      : "portfolio"
  );
  const btns = ["portfolio", "E-commerce", "Publishing site"];

  useEffect(() => {
    localStorage.setItem("btn", active);
  }, [active]);

  const handleSetActive = (btn) => {
    setActive(btn);
  };

  return (
    <section ref={projectRef}>
      <h1
        ref={projectRef}
        className="text-textColor text-2xl sm:text-3xl py-3 pb-1"
      >
        Projects<span className="text-blue-500">.</span>
      </h1>
      <p className=" inline-block bg-blue-500 w-12 sm:w-14 h-1 rounded-xl"></p>
      <article className="pt-14 sm:pt-20">
        <nav className="w-full flex gap-4 sm:gap-8">
          {btns.map((btn, index) => (
            <Btn
              key={index}
              btn={btn}
              isActive={active === btn}
              setActive={handleSetActive}
            />
          ))}
        </nav>
      </article>
    </section>
  );
};

const Btn = ({ btn, isActive, setActive }) => {
  return (
    <button
      className={`py-4 sm:py-5 ease-in-out duration-300 text-xs sm:text-sm text-textColor capitalize border-background ${
        isActive ? "border_active" : "border_normal"
      }`}
      onClick={() => setActive(btn)}
    >
      {btn}
    </button>
  );
};

export default Projects;
