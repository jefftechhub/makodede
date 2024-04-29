import React, { useState } from "react";
import Image from "next/image";
import { Expand } from "./Icon";
import SingleProject from "./SingleProject";

const projects = (props) => {
  const {
    setMenu,
    category,
    description,
    images,
    features,
    title,
    websiteURL,
  } = props;
  const [showmore, setShowMore] = useState(false);

  return (
    <article className="w-full text-textColor flex flex-col gap-4 bg-slate-500/5 py-5 rounded-lg">
      <section className="flex gap-2 px-5">
        <p className="w-3 h-3 bg-red-600 rounded-full"></p>
        <p className="w-3 h-3 bg-yellow-600 rounded-full"></p>
        <p className="w-3 h-3 bg-blue-600 rounded-full"></p>
        <p className="w-3 h-3 bg-textColor rounded-full"></p>
      </section>
      <div className="relative w-full h-auto">
        <Image
          src={images[0]}
          alt="picture of the website"
          width={400}
          height={300}
          className="text-textColor w-full"
        />
      </div>
      <section className="px-5 flex justify-between items-start">
        <div>
          <h2 className="text-sm md:text-lg">{title}</h2>
          <h3 className=" text-gray-500 text-xs md:text-sm capitalize">
            {category}
          </h3>
        </div>
        <button
          className="flex gap-3 items-center p-2 rounded-md hover:bg-slate-300/5 underline text-sm text-gray-500"
          onClick={() => {
            setMenu(false);
            setShowMore(true);
          }}
        >
          View More
          <Expand />
        </button>
      </section>
      {showmore && (
        <SingleProject
          setShowMore={setShowMore}
          description={description}
          images={images}
          features={features}
          title={title}
          websiteURL={websiteURL}
        />
      )}
    </article>
  );
};

export default projects;
