"use client";
import { Children, useRef } from "react";
import Banner from "./Components/Banner";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import About from "./Components/About";
import NavbarJsx from "./Components/Navbar";
import BackToTop from "./Components/BackToTop";
import Contacts from "./Components/Contacts";
import Review from "./Components/Review";

export default function Home() {
  const projectRef = useRef(null);
  const aboutRef = useRef(null);
  const contactsRef = useRef(null);

  return (
    // flex Child to add gaps
    //div  is the child to main
    //inside each child to div padding is added for enough spacing
    <div className="flex flex-col gap-30 sm:gap-32">
      <NavbarJsx
        project={projectRef.current}
        about={aboutRef.current}
        contacts={contactsRef.current}
      />
      <BackToTop />
      <Banner />
      <Skills />
      <Projects projectRef={projectRef} />
      <About aboutRef={aboutRef} />
      <Contacts contactsRef={contactsRef} />
      <Review />
    </div>
  );
}
