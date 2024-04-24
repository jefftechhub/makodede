"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Github } from "./Icon";
import { WhatsApp } from "./Icon";

const Banner = () => {
  const image = useRef(null);
  const my_name = useRef(null);
  const headingBanner = useRef(null);
  const whatsAppBtn = useRef(null);
  const gitHubBtn = useRef(null);

  useEffect(() => {
    const itemsObservered = [
      image.current,
      my_name.current,
      headingBanner.current,
      whatsAppBtn.current,
      gitHubBtn.current,
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        const number = itemsObservered.indexOf(item.target);
        if (item.isIntersecting) {
          if (number === 0 || number === 1 || number === 2) {
            item.target.style.transform = "translate(0)";
            item.target.style.opacity = "1";
          }
          if (number === 3 || number === 4) {
            setTimeout(() => {
              item.target.style.opacity = "1";
            }, 700);
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
    <section className="banner  sm:flex py-14">
      <div className="flex flex-col items-start justify-evenly w-full sm:w-1/2">
        <h2
          ref={my_name}
          className=" text-textColor relative inline-block  rounded-xl md:text-start text-center text-sm translate-y-full w-full"
        >
          Hello! 👋👋 I am
          <span className="font-bold text-sm"> GEOFREY ODHIAMBO ODEDE</span>
        </h2>
        <div
          ref={headingBanner}
          className="headingBanner text-textColor translate-y-28 py-10 z-10"
        >
          <h1
            className="font-bold uppercase text-5xl text-textColorBanner 
          text-center md:text-start font-fontFamilySecondary"
          >
            Welcome🤝 to my digital space🚀
          </h1>
          <p className="text-textColor text-sm py-5 text-center md:text-start">
            I am a <span className="text-blue-500">full stack</span> web
            developer with a <span className="text-blue-500">passion</span> for
            crafting captivating digital experiences. I specialize in building{" "}
            <span className="text-blue-500">dynamic</span> and{" "}
            <span className="text-blue-500">responsive</span> websites that
            leave a <span className="text-blue-500">lasting impression</span>.
          </p>
        </div>
        <div className="flex w-full md:justify-start justify-center gap-3 md:gap-5 ">
          <a
            ref={whatsAppBtn}
            className="py-2  md:py-3 px-6 rounded-3xl  text-xs items-center flex gap-1 text-white bg-blue-600 transition-opacity 
            ease-in-out duration-1000 hover:bg-blue-500  opacity-0"
            href="https://wa.me/message/IIX5U4JPHMAJC1"
            target="_blank"
          >
            <WhatsApp /> WhatsApp
          </a>
          <a
            ref={gitHubBtn}
            className="py-3 px-6  text-xs text-textColor items-center rounded-3xl  flex gap-1 border-2 border-blue-500 transition-opacity 
            opacity-0 ease-in-out duration-1000 hover:border-blue-300"
            href=""
            target="_blank"
          >
            <Github /> Github
          </a>
        </div>
      </div>
      <div className="bannerimage overflow-hidden w-1/2 relative">
        <Image
          ref={image}
          src="/MyPictures/bannerImage.svg"
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
