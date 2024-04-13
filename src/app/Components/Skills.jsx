"use client";
import React, { useRef, useEffect } from "react";
import { Javascript, Node, ReactLogo, Figma } from "./Icon";
import NextSvg from "./Logo/nextjs-icon-svgrepo-com.svg";
import MongoSvg from "./Logo/mongodb-icon.svg";
import AmazonLogo from "./Logo/amazon.png";
import GraphQLogo from "./Logo/graphQL.png";
import MySqLogo from "./Logo/mysql-icon.svg";
import PostgresQLogo from "./Logo/postgresQL.png";
import ExpressLogo from "./Logo/expressjs-icon.svg";
import PythonLogo from "./Logo/python-logo.svg";

import Image from "next/image";

const Skills = () => {
  const skillsContainer = useRef(null);

  useEffect(() => {
    const itemsObservered = [skillsContainer.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          const number = itemsObservered.indexOf(item.target);
          if (item.isIntersecting) {
            if (number === 0) {
              if (window.innerWidth > 500) {
                item.target.style.gap = "20px 10px";
              } else {
                item.target.style.gap = "10px";
              }
              item.target.style.opacity = "1";
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    // items to be observerd
    itemsObservered.forEach((item) => {
      observer.observe(item);
    });
  }, []);

  return (
    <section>
      <h1 className="text-white  text-2xl sm:text-3xl pb-1">
        My Skills<span className="text-blue-500">.</span>
      </h1>
      <p
        className=" inline-block bg-blue-500 sm:w-14 
      w-12 h-1 rounded-xl"
      ></p>
      <nav
        ref={skillsContainer}
        className="grid grid-cols-2 sm:flex w-full py-14 sm:py-20 skillsContainer flex-wrap justify-center"
      >
        <a
          href="https://devdocs.io/javascript/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Javascript /> Javascript
        </a>
        <a
          href="https://docs.python.org/3/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={PythonLogo.src}
            width={100}
            height={100}
            priority
            alt="python logo"
            className="sm:h-7 sm:w-7 h-5 w-5"
          />{" "}
          Python
        </a>
        <a
          href="https://react.dev/learn"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <ReactLogo /> React Js
        </a>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={NextSvg.src}
            width={100}
            height={100}
            priority
            alt="next.js logo"
            className="sm:h-7 sm:w-7 h-5 w-5"
          />{" "}
          Next Js
        </a>
        <a
          href=""
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Node /> Node Js
        </a>
        <a
          href="https://nodejs.org/docs/latest/api/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={ExpressLogo.src}
            width={100}
            height={100}
            priority
            className="sm:h-7 sm:w-7 h-5 w-5"
            alt="Express.js logo"
          />{" "}
          Express Js
        </a>
        <a
          href="https://graphql.org/learn/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={GraphQLogo.src}
            width={100}
            height={100}
            priority
            className="sm:h-7 sm:w-7 h-5 w-5"
            alt="GraphQL logo"
          />{" "}
          GraphQL
        </a>
        <a
          href="https://www.mongodb.com/docs/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={MongoSvg.src}
            width={100}
            height={100}
            priority
            className="sm:h-7 sm:w-7 h-5 w-5"
            alt="mongoDB logo"
          />{" "}
          MongoDB
        </a>
        <a
          href="https://www.postgresql.org/docs/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={PostgresQLogo.src}
            width={100}
            height={100}
            priority
            className="sm:h-7 sm:w-7 h-5 w-5"
            alt="PostgresQL logo"
          />{" "}
          PostgresQL
        </a>
        <a
          href="https://dev.mysql.com/doc/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={MySqLogo.src}
            width={100}
            height={100}
            priority
            className="sm:h-7 sm:w-7 h-5 w-5"
            alt="mysQL logo"
          />{" "}
          MySQL
        </a>
        <a
          href="https://docs.aws.amazon.com/"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Image
            src={AmazonLogo.src}
            width={100}
            height={100}
            priority
            className="sm:h-7 sm:w-7 h-5 w-5"
            alt="Amazon logo"
          />{" "}
          AWS Cloud
        </a>
        <a
          href="https://help.figma.com/hc/en-us"
          target="_blank"
          className="bg-slate-100 w-full sm:w-52 sm:text-lg text-sm py-2 sm:py-4  rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-3"
        >
          <Figma /> Figma
        </a>
      </nav>
    </section>
  );
};

export default Skills;
