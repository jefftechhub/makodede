"use client";
import React, { useState, useContext } from "react";
import FileInput from "./FileInput";
import { ThemeContext } from "../context/ThemeProvider";
import { submitProject } from "../../../utils/actions";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";

const AddProjects = () => {
  const { images, setImages } = useContext(ThemeContext);

  const handleSubmit = async (formdata) => {
    try {
      images.forEach((image) => {
        formdata.append("images", image);
      });
      const { success } = await submitProject(formdata);
      if (success) {
        setImages([]);
        toast.success("project sent");
      } else if (!success) {
        toast.error("project not sent");
      }
    } catch (error) {
      toast.error("project not sent");
      console.error("Error submitting project:", error);
    }
  };

  const features = [
    "Send Email",
    "S.E.O",
    "dashboard",
    "payment intergration",
    "database intergration",
  ];

  const categories = [
    "E-Comerce",
    "portfolio",
    "blogging",
    "news",
    "dashboard",
  ];

  return (
    <section className="py-4 md:py-5">
      <header className="mb-5">
        <h1 className="text-lg py-3 mx-3 mb-5 border-b border-slate-600 capitalize">
          add new project
        </h1>
      </header>
      <form action={handleSubmit} className="px-3">
        <SendBtn />
        <FileInput />
        <label htmlFor="title" className=" text-textColor mt-5 block">
          Title
        </label>
        <input
          id="title"
          required
          name="title"
          type="text"
          className="py-2 px-5 text-md text-textColor bg-transparent border focus:border-blue-500 border-slate-600 block mt-1 focus:outline-none focus:border-4 w-full md:w-3/4"
        />
        <label htmlFor="category" className=" text-textColor mt-5 block">
          Category
        </label>
        <select
          id="category"
          name="category"
          type="text"
          required
          className="py-2 px-5 text-md text-textColor bg-transparent border focus:border-blue-500 border-slate-600 block mt-1 focus:outline-none focus:border-4 w-full md:w-3/4"
        >
          <option value="">--choose category--</option>
          {categories.map((item) => {
            return (
              <option
                value={item}
                key={item}
                className="bg-transparent text-textColor"
              >
                {item}
              </option>
            );
          })}
        </select>
        <label htmlFor="websiteURL" className=" text-textColor mt-5 block">
          Website URL
        </label>
        <input
          required
          id="websiteURL"
          name="websiteURL"
          type="text"
          className="py-2 px-5 text-md text-textColor bg-transparent border focus:border-blue-500 border-slate-600 block mt-1 focus:outline-none focus:border-4 w-full md:w-3/4"
        />
        <label htmlFor="description" className=" text-textColor mt-5 block">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          type="text"
          required
          className="py-2 px-5
            text-md text-textColor bg-transparent border focus:border-blue-500
            border-slate-600 block mt-1 focus:outline-none focus:border-4 w-full md:w-3/4 resize-none min-h-56"
        ></textarea>
        <div>
          <h2 className=" text-textColor mt-5 block">Features</h2>
          <div className="grid grid-cols-3 gap-2">
            {features.map((item) => {
              return (
                <div key={item} className="mt-2">
                  <input
                    id={item}
                    name={item}
                    type="checkbox"
                    className="text-xs md:sm mr-2"
                  />
                  <label htmlFor={item} className="text-textColor capitalize">
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </section>
  );
};

const SendBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="border-2 rounded-3xl text-xs border-blue-500 text-blue-200 hover:text-blue-100 hover:border-blue-400 ease-in-out duration-300 transition-all px-6 py-2"
    >
      {pending ? "sending..." : "send"}
    </button>
  );
};

export default AddProjects;
