"use client";

import React, { useEffect, useState } from "react";
import { data } from "../data";
import Image from "next/image";
import { Quote, RightSlider, LeftSlider, Star } from "./Icon";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setReviews(data);
  }, [reviews]);

  useEffect(() => {
    const timer = window.innerWidth > 500 ? 20000 : 10000;
    const interval = setInterval(() => {
      if (window.innerWidth > 500) {
        setIndex(index + 2);
      } else {
        setIndex(index + 1);
      }
    }, timer);
    if (index > reviews.length - 2) setIndex(0);

    return () => clearInterval(interval);
  }, [index]);

  const next = () => {
    if (window.innerWidth > 500) {
      setIndex(index + 2);
      if (index >= reviews.length - 2) setIndex(0);
    } else {
      setIndex(index + 1);
      if (index >= reviews.length - 1) setIndex(0);
    }
  };

  const previous = () => {
    if (window.innerWidth > 500) {
      setIndex(index - 2);
      if (index <= 0) setIndex(reviews.length - 2);
    } else {
      setIndex(index - 1);
      if (index <= 0) setIndex(reviews.length - 1);
    }
  };

  return (
    <section>
      <h2 className="text-textColor text-2xl sm:text-3xl pb-1">
        What clients say<span className="text-blue-500">.</span>
      </h2>
      <p className=" inline-block bg-blue-500 w-12 sm:w-14 h-1 rounded-xl"></p>

      <article className="relative sm:pt-20 pt-14 w-full items-start text-textColor overflow-hidden flex">
        {index > 0 && (
          <button
            className="absolute text-textColor z-40 top-1/2 left-0"
            onClick={previous}
          >
            <LeftSlider />
          </button>
        )}

        {reviews.map((item, reviewIndex) => {
          let position = "normal";

          if (window.innerWidth > 500) {
            if (reviewIndex === index) {
              position = "active";
            }
            if (reviewIndex === index + 1) {
              position = "active";
            }

            if (reviewIndex === index - 1) {
              position = "previous";
            }
            if (reviewIndex === index - 2) {
              position = "previous";
            }
          }

          if (window.innerWidth <= 500) {
            if (reviewIndex === index) {
              position = "active";
            }

            if (reviewIndex === index - 1) {
              position = "previous";
            }
          }

          return (
            <article
              key={reviewIndex}
              className={`px-6 absolute ${position} bg-background `}
            >
              <div className="flex flex-col gap-6 items-center">
                <div className="relative overflow-hidden">
                  <Quote />
                  {item && item.image ? (
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      priority
                      alt="profile picture"
                      className="bg-textColor object-top object-cover  sm:h-28 sm:w-28 h-24  w-24 rounded-full sm:border-8 border-4  border-blue-500"
                    />
                  ) : (
                    <Image
                      src="/Logo/profile-simple.svg"
                      width={100}
                      height={100}
                      priority
                      alt="profile picture"
                      className="bg-white h-24 sm:h-28 w-24 sm:w-28 rounded-full border-4 sm:border-8  border-blue-500"
                    />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <h5 className="capitalize mb-3 text-blue-500 font-bold text-xl sm:text-2xl">
                    {item && item.name}
                  </h5>
                  <h6 className="capitalize mb-3 text-blue-500 text-sm sm:text-lg">
                    {item && item.company}
                  </h6>
                  <div className="flex mb-2 text-orange-400">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-textColor">
                {item && item.review}
              </p>
            </article>
          );
        })}

        {index < reviews.length - 2 && (
          <button
            className="absolute text-textColor top-1/2 right-0 z-40"
            onClick={next}
          >
            <RightSlider />
          </button>
        )}
      </article>
    </section>
  );
};

export default Review;
