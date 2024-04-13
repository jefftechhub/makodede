"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import bannerImage from "../bannerImage.svg";
import { PhoneCall } from "./Icon";

const Banner = () => {
  const image = useRef(null);
  const my_name = useRef(null);
  const headingBanner = useRef(null);
  const bannerBtn = useRef(null);

  useEffect(() => {
    const itemsObservered = [
      image.current,
      my_name.current,
      headingBanner.current,
      bannerBtn.current,
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        const number = itemsObservered.indexOf(item.target);
        if (item.isIntersecting) {
          if (number === 0) {
            item.target.style.transform = "translate(0)";
            item.target.style.opacity = "1";
          }
          if (number === 1) {
            item.target.style.opacity = "1";
            item.target.style.transform = "translate(0)";
          }
          if (number === 2) {
            item.target.style.transform = "translate(0)";
            item.target.style.opacity = "1";
          }
          if (number === 3) {
            item.target.style.transform = "translate(0)";
            item.target.style.opacity = "1";
          }
        }
      });
    });

    // items to be observerd
    itemsObservered.forEach((item) => {
      observer.observe(item);
    });
  }, []);

  return (
    <section className="banner  sm:flex py-10">
      <div className="flex flex-col items-start justify-evenly w-full sm:w-1/2">
        <h2
          ref={my_name}
          className=" text-white relative inline-block  rounded-xl  text-sm text-center translate-y-full"
        >
          Hello! 👋👋 I am
          <span className="font-bold"> GEOFREY ODHIAMBO ODEDE</span>
        </h2>
        <div
          ref={headingBanner}
          className="headingBanner text-white translate-y-28 py-10 z-10"
        >
          <h1 className="text-2xl md:text-4xl text-yellow-400">
            Welcome to my digital space!
          </h1>
          <p className="text-white text-sm py-6">
            I am a web developer with a{" "}
            <span className="text-blue-500 text-lg">passion</span> for crafting
            captivating digital experiences. Through{" "}
            <span className="text-blue-500 text-lg">meticulous coding</span> and{" "}
            <span className="text-blue-500 text-lg">creative design</span>, I
            bring ideas to life on the web. I specialize in building{" "}
            <span className="text-blue-500 text-lg">dynamic</span> and{" "}
            <span className="text-blue-500 text-lg">responsive</span> websites
            that leave a{" "}
            <span className="text-blue-500 text-lg">lasting impression</span>.
          </p>
        </div>
        <button
          ref={bannerBtn}
          className="-translate-x-full uppercase text-sm text-black font-bold bg-slate-100 border-none py-2 px-8 sm:py-3 sm:px-10 rounded-lg sm:rounded-xl flex gap-3 items-center"
        >
          <PhoneCall /> book a call
        </button>
      </div>
      <div className="bannerimage overflow-hidden w-1/2 relative">
        <Image
          ref={image}
          src={bannerImage.src}
          fill
          sizes="(max-width: 639px) 100vw, 50vw"
          className="translate-x-full"
          alt="picture of developer holding laptop"
        />
      </div>
    </section>
  );
};

export default Banner;
