"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "../../../utils/actions";
import EditProject from "./EditProject";
import { showmore } from "./Icon";
import { changeStatus } from "../../../utils/actions";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

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
    <article className="flex gap-2 sm:gap-6 justify-between md:p-3 py-3 px-1 items-center hover:bg-slate-600/5">
      <div className="flex justify-between items-center">
        <h2 className="text-xs md:text-text-sm w-20 md:w-32 capitalize">
          {title}
        </h2>
        <p className="text-xs w-12 md:w-auto md:text-sm">{websiteURL}</p>
      </div>
      <div className="flex gap-2 md:gap-6 justify-between items-center">
        <form action={submitChangeStatus}>
          <input type="hidden" name="id" value={_id} />
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
          features={features}
          title={title}
          websiteURL={websiteURL}
          category={category}
          id={_id}
          status={status}
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
