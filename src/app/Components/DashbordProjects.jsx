"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "../../utils/actions";
import EditProject from "./EditProject";
import { changeStatus } from "../../utils/actions";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const DashbordProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const projects = await getProjects();

        setProjects(projects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Error fetching projects");
      }
    };

    fetchData();
  }, []);

  const list = ["", "", "", "", "", ""];

  return (
    <section className="py-4 md:py-5">
      <header className="mb-5">
        <h1 className="text-lg py-3 mx-1 md:mx-3 border-b border-slate-600 capitalize">
          My projets
        </h1>
      </header>
      {loading ? (
        <div className="flex flex-col gap-2">
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className="flex gap-2 bg-gray-600/5 sm:gap-6 justify-between md:p-3 py-3 px-3 md:px-4 items-center"
              >
                <div className="flex gap-3 justify-between items-center">
                  <p className="bg-gray-600/60 rounded-md w-20 h-4"></p>
                  <p className="bg-gray-600/60 rounded-md w-0 md:w-20 h-6"></p>
                </div>
                <div className="flex gap-2 md:gap-6 justify-between items-center">
                  <button className="bg-gray-600/60 rounded-md w-10 h-6"></button>
                  <button className="bg-gray-600/60 rounded-md w-10 h-6"></button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <main className="flex flex-col gap-2">
          {projects.map((project, index) => {
            return <SingleProject key={index} {...project} />;
          })}
        </main>
      )}
    </section>
  );
};

const SingleProject = ({
  title,
  description,
  images,
  id,
  websiteURL,
  category,
  active,
}) => {
  const submitChangeStatus = async (formdata) => {
    try {
      const { success } = await changeStatus(formdata);

      if (success) {
        toast.success("Updated");
      } else if (!success) {
        toast.error("Update Failed");
      }
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const [showMore, setShowMore] = useState(false);
  return (
    <article className="flex gap-2 bg-slate-600/5 sm:gap-6 justify-between md:p-3 py-3 px-3 md:px-4 items-center hover:bg-slate-600/50">
      <div className="flex justify-between items-center">
        <h2 className="text-xs md:text-text-sm w-20 md:w-32 capitalize">
          {title}
        </h2>
        <p className="text-xs w-0 overflow-hidden md:w-auto md:text-sm">
          {websiteURL}
        </p>
      </div>
      <div className="flex gap-2 md:gap-6 justify-between items-center">
        <form action={submitChangeStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="active" value={active} />
          <SubmitBtn active={active} />
        </form>
        <button
          className="bg-blue-500 text-white text-xs px-2 md:px-3 py-1 rounded-sm hover:bg-blue-400 
        duration-300"
          onClick={() => setShowMore(true)}
        >
          Edit
        </button>
      </div>
      {showMore && (
        <EditProject
          setShowMore={setShowMore}
          description={description}
          images={images}
          title={title}
          websiteURL={websiteURL}
          category={category}
          id={id}
          active={active}
        />
      )}
    </article>
  );
};

const SubmitBtn = ({ active }) => {
  const { pending } = useFormStatus();

  return (
    <div>
      {active ? (
        <button
          disabled={pending}
          type="submit"
          className="border-blue-500 border text-blue-200 hover:text-blue-100 text-xs px-2 md:px-3 py-1 rounded-sm hover:border-blue-400 
        duration-300"
        >
          {pending ? "Deactivating..." : "Deactivate"}
        </button>
      ) : (
        <button
          disabled={pending}
          type="submit"
          className="border-blue-500 border text-blue-200 hover:text-blue-100 text-xs px-2 md:px-3 py-1 rounded-sm hover:border-blue-400 
        duration-300"
        >
          {pending ? "Activating..." : "Activate"}
        </button>
      )}
    </div>
  );
};

export default DashbordProjects;
