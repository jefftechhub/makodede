"use client";
import React, { useEffect, useRef } from "react";
import { BackTop } from "./Icon";

const BackToTop = () => {
  const backToTopbtn = useRef(null);

  const displayingElements = () => {
    if (window.scrollY >= 920) {
      backToTopbtn.current.style.transform = "scale(1)";
    } else {
      backToTopbtn.current.style.transform = "scale(0";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", displayingElements);
    return () => {
      window.removeEventListener("scroll", displayingElements);
    };
  });

  return (
    <button
      ref={backToTopbtn}
      className="fixed bg-blue-500 p-3 rounded-full bottom-10 right-8 sm:bottom-14 sm:right-10 z-50 scale-0 transition duration-300 ease-in-out"
      onClick={() => {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <BackTop />
    </button>
  );
};

export default BackToTop;
