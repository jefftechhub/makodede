"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "../../../utils/actions";
import EditProject from "./EditProject";
import { showmore } from "./Icon";

const DashbordProjects = () => {
  const [projects, setProjects] = useState([]);

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
    <section className="py-4 md:py-5">
      <header className="mb-5">
        <h1 className="text-lg py-3 mx-1 md:mx-3 border-b border-slate-600 capitalize">
          My projets
        </h1>
      </header>
      <main>
        {projects.map((project) => {
          return <SingleProject {...project} />;
        })}
      </main>
    </section>
  );
};

const SingleProject = ({
  title,
  description,
  images,
  _id,
  features,
  websiteURL,
  category,
}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <article className="flex gap-2 sm:gap-6 justify-between md:p-3 py-3 px-1 items-center hover:bg-slate-600/5">
      <div className="flex justify-between items-center">
        <h2 className="text-xs md:text-text-sm w-20 md:w-32 capitalize">
          {title}
        </h2>
        <p className="text-xs w-12 md:w-auto md:text-sm">{websiteURL}</p>
      </div>
      <div className="flex gap-2 md:gap-6 justify-between items-center">
        <button
          className="bg-blue-500 text-white text-xs px-2 md:px-3 py-1 rounded-sm hover:bg-blue-400 
        duration-300"
          onClick={() => setShowMore(true)}
        >
          Edit
        </button>
        <button
          className="border-blue-500 border text-blue-200 hover:text-blue-100 text-xs px-2 md:px-3 py-1 rounded-sm hover:border-blue-400 
        duration-300"
        >
          Deactivate
        </button>
      </div>
      {showMore && (
        <EditProject
          setShowMore={setShowMore}
          description={description}
          images={images}
          features={features}
          title={title}
          websiteURL={websiteURL}
          category={category}
        />
      )}
    </article>
  );
};

export default DashbordProjects;
