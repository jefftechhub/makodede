"use client";
import React, { useCallback, useState, useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../context/ThemeProvider";
import { Remove } from "./Icon";

const FileInput = () => {
  const { images, setImages } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);

  const remove = (name) => {
    const newImages = images.filter((item) => item.name !== name);

    setImages(newImages);
  };

  const changeHandler = (e) => {
    setImages((prev) => [...prev, ...e.target.files]);
  };

  return (
    <div>
      {images?.length > 0 && (
        <div className="text-sm text-textColor bg-transparent  mt-2 w-full md:w-3/4">
          <Image
            src={URL.createObjectURL(images[index])}
            alt={images[index].name}
            width={400}
            height={200}
            className="w-full md:h-thirtyvh h-fortyvh object-contain border-2 border-slate-800"
          />

          <div className="mt-2 flex flex-wrap gap-1">
            {images.map((item, index) => {
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
                      setIndex(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>
        <label htmlFor="images" className=" text-textColor mt-5 block">
          Images
        </label>
        <input
          id="images"
          name="image"
          type="file"
          required
          onChange={changeHandler}
          className="py-2 px-5 text-md text-textColor bg-transparent border focus:border-blue-500 border-slate-600 block mt-1 focus:outline-none focus:border-4 w-full md:w-3/4"
        />
      </div>
    </div>
  );
};

export default FileInput;
