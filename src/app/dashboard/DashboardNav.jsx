"use client";
import React, { useContext, useState } from "react";
import AddProjects from "../Components/AddProjects";
import DashbordProjects from "../Components/DashbordProjects";
import Link from "next/link";

const DashboardMain = () => {
  const [projects, setProjects] = useState(true);
  const btns = ["Projects", "Add Project"];

  return (
    <article className="text-textColor py-5 md:py-8 px-3  md:px-10 bg-slate-600/5 text-white mt-5">
      <nav className="flex">
        <Link href="/" className="text-xs text-blue-400 pr-2 md:pr-4">
          Home
        </Link>
        {btns.map((btn, index) => {
          return (
            <button
              key={index}
              className="text-xs border-l border-blue-400  text-blue-400 px-2 md:px-4"
              onClick={() => {
                if (index === 0) {
                  setProjects(true);
                } else if (index === 1) {
                  setProjects(false);
                }
              }}
            >
              {btn}
            </button>
          );
        })}
      </nav>
      {projects ? <DashbordProjects /> : <AddProjects />}
    </article>
  );
};

export default DashboardMain;
