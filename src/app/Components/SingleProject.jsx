"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Cancel, RightSlider, LeftSlider, Tick } from "./Icon";

const SingleProject = ({
  setShowMore,
  description,
  images,
  features,
  title,
  websiteURL,
}) => {
  const [index, setIndex] = useState(0);

  return (
    <article className="fixed w-screen h-screen left-0 top-0 bg-black/90 md:flex  justify-center items-start overflow-auto z-50">
      <main className="relative md:flex mt-14 md:w-4/5 bg-background px-4 py-5 gap-5 w-full">
        <button
          className="absolute text-black right-4 md:right-0 bg-slate-600 p-1 rounded-full -top-10"
          onClick={() => setShowMore(false)}
        >
          <Cancel />
        </button>
        <div className="w-full relative  md:w-2/3">
          <div className="relative">
            <button
              className="absolute top-1/2 p-1 left-0 rounded-full bg-slate-600/60 text-white"
              onClick={() => {
                console.log(index);
                if (index <= 0) {
                  setIndex(images.length - 1);
                } else {
                  setIndex(index - 1);
                }
              }}
            >
              <LeftSlider />
            </button>
            <button
              className="absolute top-1/2 p-1 right-0 rounded-full bg-slate-600/60 text-white"
              onClick={() => {
                console.log(index);
                if (index >= images.length - 1) {
                  setIndex(0);
                } else {
                  setIndex(index + 1);
                }
              }}
            >
              <RightSlider />
            </button>
            <Image
              src={images[index]}
              alt="picture of website"
              width={400}
              height={300}
              sizes="(max-width: 639px) 100vw, 50vw"
              className="text-textColor w-full"
            />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 flex-wrap gap-1 pt-2">
            {images.map((item, imgIndex) => {
              return (
                <Image
                  src={item}
                  alt="picture of website"
                  width={400}
                  height={300}
                  className={`${
                    imgIndex == index && "border-4 border-blue-500"
                  } text-textColor w-full`}
                  onClick={() => setIndex(imgIndex)}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <h2 className="text-textColor py-2 text-lg capitalize underline">
            {title}
          </h2>
          <p className="text-textColor text-sm py-2">{description}</p>
          <a
            className="text-blue-500 underline text-sm"
            href={websiteURL}
            target="_blank"
          >
            {websiteURL}
          </a>
        </div>
      </main>
    </article>
  );
};

export default SingleProject;
