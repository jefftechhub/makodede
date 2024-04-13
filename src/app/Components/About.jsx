"use client";
import React, { useRef, useEffect, useState } from "react";
import Makodede from "../makodede.jpeg";
import Image from "next/image";

const About = ({ aboutRef }) => {
  const [showless, setShowLess] = useState(false);
  const imageAbout = useRef(null);
  const articleAbout = useRef(null);

  useEffect(() => {
    const itemsObservered = [articleAbout.current, imageAbout.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          const number = itemsObservered.indexOf(item.target);
          if (item.isIntersecting) {
            if (number === 0) {
              item.target.style.transform = "translate(0)";
              item.target.style.opacity = "1";
            }
            if (number === 1) {
              item.target.style.transform = "translate(0)";
              item.target.style.opacity = "1";
            }
          }
        });
      },
      {
        threshold: 0,
      }
    );

    // items to be observerd
    itemsObservered.forEach((item) => {
      observer.observe(item);
    });
  }, []);

  return (
    <section>
      <h1 ref={aboutRef} className="text-white py-3 text-2xl sm:text-3xl pb-1">
        About Me<span className="text-blue-500">.</span>
      </h1>
      <p className=" inline-block bg-blue-500 sm:w-14 w-12 h-1 rounded-xl"></p>
      <article className="md:flex sm:py-20 py-14 items-center gap-6">
        <div className="imageContainer" ref={imageAbout}>
          <Image
            src={Makodede.src}
            width={500}
            height={600}
            priority
            alt="Geofrey Odede's picture"
            className="aboutMe_Image"
          />
          <p></p>
          <Image
            src={Makodede.src}
            fill
            sizes="(max-width: 639px) 100vw, 50vw"
            alt="Geofrey Odede's picture"
            className="object-cover  absolute -z-10"
          />
        </div>
        <div
          ref={articleAbout}
          className="about w-full sm:w-2/3 text-sm text-white"
        >
          <p className="mt-2 sm:mt-0">
            Greetings! I'm excited to introduce myself as a dedicated full stack
            web developer, embarking on a coding journey since January 2022.
            Crafting digital experiences has evolved from a passion into a
            profession, driving me to explore, innovate, and create with every
            line of code.
          </p>
          <h1 className="text-xl py-5 text-blue-500">Experience</h1>
          <h2>Full Stack Web Developer (2022 - Present)</h2>
          <ul>
            <li>
              Designed and developed dynamic and responsive web applications
              utilizing HTML, CSS, JavaScript, and modern frameworks such as
              React.js and Next js.
            </li>
            <li>
              Implemented backend functionalities using Node.js, Express.js, and
              databases like MongoDB and MySQL.
            </li>
            <li>
              Proficient in version control systems like Git, ensuring
              collaborative and efficient development workflows.
            </li>
            <li>
              Integrated third-party APIs to enhance application functionality
              and user experience.
            </li>
            <li>
              Led and participated in agile development methodologies, fostering
              a culture of continuous improvement and adaptability.
            </li>
            <li>
              Assisted in the development of user interfaces for web
              applications using HTML, CSS, and JavaScript.
            </li>
            <li>
              Collaborated with senior developers to implement responsive
              designs and optimize website performance.
            </li>
            <li>
              Conducted thorough testing and debugging to ensure smooth user
              experiences across various browsers and devices.
            </li>
          </ul>
          <div className={showless ? "" : "h-0 overflow-hidden"}>
            <h1 className="text-xl py-5 text-blue-500">Education</h1>
            <h2>Self-Taught Programmer (2022 - Present)</h2>
            <ul>
              <li>
                Leveraged online resources such as YouTube tutorials and coding
                communities to acquire knowledge and skills in web development.
              </li>
              <li>
                Demonstrated a proactive approach to learning, consistently
                exploring new technologies and best practices to enhance
                proficiency and adaptability.
              </li>
            </ul>
            <h1 className="text-xl py-5 text-blue-500">Conclusion</h1>
            <p>
              In my journey as a full stack web developer, I've embraced
              challenges, celebrated victories, and continually expanded my
              horizons. My dedication to self-improvement and my passion for
              creating impactful solutions drive me forward. If you're seeking a
              versatile developer to join your team or collaborate on exciting
              projects, I'd love to connect and explore opportunities together.
            </p>
          </div>
          <p className="mt-5">
            Thank you 🙏🙏 for taking the time to learn a bit about me. Let's
            build something extraordinary!
          </p>
          <button
            className="text-white text-sm bg-blue-500 py-3 px-8 rounded-md my-5"
            onClick={() => {
              setShowLess(!showless);
            }}
          >
            {showless ? "Show Less" : "Read More"}
          </button>
        </div>
      </article>
    </section>
  );
};

export default About;
