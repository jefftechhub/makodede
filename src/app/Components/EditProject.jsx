"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cancel, Remove, Tick } from "./Icon";
import { useFormStatus } from "react-dom";

const EditProject = ({
  setShowMore,
  description,
  images,
  features,
  title,
  websiteURL,
  category,
}) => {
  const [index, setIndex] = useState(0);
  const [projectImages, setProjectImages] = useState(images);
  const [newImages, setNewImages] = useState([]);
  const [imagesLength, setImagesLength] = useState(projectImages.length);
  const [previewUrls, setPreviewUrls] = useState([]);
  const setFeatures = [
    "Send Email",
    "S.E.O",
    "dashboard",
    "payment intergration",
    "database intergration",
  ];

  const setCategories = [
    "E-Comerce",
    "portfolio",
    "blogging",
    "news",
    "dashboard",
  ];

  // Function to generate preview URLs for new images
  const generatePreviewUrls = async () => {
    const urls = [];
    for (const file of newImages) {
      const url = await readFileAsDataUrl(file);
      urls.push(url);
    }
    setPreviewUrls(urls);
  };

  // Function to read a file as a data URL
  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Call generatePreviewUrls whenever newImages changes
  useEffect(() => {
    generatePreviewUrls();
  }, [newImages]);

  const changeHandler = (e) => {
    setNewImages((prev) => [...prev, ...e.target.files]);
  };

  const remove = (name) => {
    const updatedList = newImages.filter((item) => item.name !== name);

    setNewImages(updatedList);
    setIndex(index - 1);
  };

  return (
    <article className="fixed w-screen h-screen left-0 top-0 bg-black/90 md:flex  justify-center items-start overflow-auto z-50">
      <form className="relative mt-14 md:w-4/5 bg-background px-4 sm:px-20 py-5 gap-5 w-full">
        <header className="mb-5 flex justify-between items-center">
          <h1 className="text-lg py-3 border-b border-slate-600 capitalize">
            Update project
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-400 ease-in-out duration-300 transition-all p-2 rounded-full"
            onClick={() => setShowMore(false)}
          >
            <Cancel />
          </button>
        </header>
        <UpdateBtn />
        <div className="w-full">
          <div className="text-sm text-textColor bg-transparent  mt-2">
            {index < imagesLength ? (
              <Image
                src={projectImages[index]}
                alt="website's image"
                width={400}
                height={200}
                className="w-full md:h-thirtyvh h-fortyvh object-contain border-2 border-slate-800"
              />
            ) : (
              <Image
                src={previewUrls[index - imagesLength]}
                alt="website's image"
                width={400}
                height={200}
                className="w-full md:h-thirtyvh h-fortyvh object-contain border-2 border-slate-800"
              />
            )}

            <div className="mt-2 flex flex-wrap gap-1">
              {projectImages.map((item, index) => {
                return (
                  <div className="relative">
                    <button
                      className="absolute -top-1 -right-1 bg-background rounded-full"
                      onClick={() => {
                        // remove(item.name);
                      }}
                    >
                      <Remove />
                    </button>
                    <Image
                      key={index}
                      src={item}
                      alt={item.name}
                      width={200}
                      height={150}
                      className="w-28 h-24 object-contain border border-slate-800"
                      onClick={() => {
                        setIndex(index);
                      }}
                    />
                  </div>
                );
              })}
              {newImages.map((item, index) => {
                return (
                  <div className="relative">
                    <button
                      className="absolute -top-1 -right-1 bg-background rounded-full"
                      onClick={() => {
                        remove(item.name);
                      }}
                    >
                      <Remove />
                    </button>
                    <Image
                      key={index}
                      src={URL.createObjectURL(item)}
                      alt={item.name}
                      width={200}
                      height={150}
                      className="w-28 h-24 object-contain border border-slate-800"
                      onClick={() => {
                        setIndex(index + imagesLength);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <label htmlFor="images" className=" text-textColor mt-5 block w-40">
            Add Images
          </label>
          <input
            id="images"
            name="image"
            type="file"
            required
            onChange={changeHandler}
            className="py-2 text-md text-textColor bg-transparent mt-1"
          />

          {/* title  */}

          <label htmlFor="title" className=" text-textColor mt-5 block w-40">
            Title
          </label>
          <input
            id="title"
            required
            name="title"
            type="text"
            value={title}
            className="py-2 px-5 text-md text-textColor bg-transparent border focus:border-blue-500 border-slate-600 block mt-1 focus:outline-none focus:border-2 w-full"
          />

          {/* category  */}

          <label
            htmlFor="category"
            className=" text-textColor mt-5 block  w-40"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            type="text"
            required
            className="py-2 px-5 text-md text-textColor bg-transparent border focus:border-blue-500 border-slate-600 block mt-1 focus:outline-none focus:border-2 w-full"
          >
            <option value={category}>{category}</option>
            {setCategories.map((item) => {
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

          {/* website url  */}

          <label
            htmlFor="websiteURL"
            className=" text-textColor mt-5 block w-40"
          >
            Website URL
          </label>
          <input
            required
            id="websiteURL"
            name="websiteURL"
            type="text"
            value={websiteURL}
            className="py-2 px-5 text-md text-textColor bg-transparent border focus:border-blue-500 border-slate-600 block mt-1 focus:outline-none focus:border-2 w-full"
          />

          {/* description */}

          <label
            htmlFor="description"
            className=" text-textColor mt-5 block w-40"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            value={description}
            required
            className="py-2 px-5
            text-md text-textColor bg-transparent border focus:border-blue-500
            border-slate-600 block mt-1 focus:outline-none focus:border-2 w-full resize-none min-h-56"
          ></textarea>

          {/* Features  */}

          <div>
            <h2 className=" text-textColor mt-5 block">Features</h2>
            <div className="grid grid-cols-3 gap-2">
              {setFeatures.map((item) => {
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
        </div>
      </form>
    </article>
  );
};

const UpdateBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="border-2 rounded-3xl text-xs my-4 border-blue-500 text-blue-200 hover:text-blue-100 hover:border-blue-400 ease-in-out duration-300 transition-all px-6 py-2"
    >
      {pending ? "updating..." : "update"}
    </button>
  );
};

export default EditProject;
