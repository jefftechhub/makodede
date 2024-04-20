"use client";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import Link from "next/link";
import AddProjects from "../Components/AddProjects";
import DashbordProjects from "../Components/DashbordProjects";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [projects, setProjects] = useState(true);

  return (
    <main
      className={`font-fontFamilyMain min-h-screen flex justify-center  ${theme}`}
    >
      <main className="w-full py-10 lg:w-eightyvw px-3 flex flex-col gap-2 sm:px-9">
        <header className="text-textColor">
          <h1 className="py-3 text-xl md:text-3xl">Dashboard</h1>
        </header>
        <nav className="flex pt-10 pb-2 gap-3">
          <Link href="/" className="text-textColor text-xs py-2 pr-4 md:pr-5">
            Home
          </Link>
          <button
            className="text-white bg-blue-500 text-xs py-2 px-4 md:px-5"
            onClick={() => setProjects(true)}
          >
            Projects
          </button>
          <button
            className="text-white bg-blue-500 text-xs py-2 px-4 md:px-5"
            onClick={() => setProjects(false)}
          >
            Add Project
          </button>
        </nav>
        <article className="text-textColor py-2 md:py-4 px-1  md:px-10 bg-slate-600/5">
          {projects ? <DashbordProjects /> : <AddProjects />}
        </article>
      </main>
    </main>
  );
};

export default Dashboard;
