"use client";
import { useContext, useRef } from "react";
import Banner from "./Components/Banner";
import Skills from "./Components/Skills";
import Projects_Container from "./Components/Projects_Container";
import About from "./Components/About";
import NavbarJsx from "./Components/Navbar";
import BackToTop from "./Components/BackToTop";
import Contacts from "./Components/Contacts";
import Review from "./Components/Review";
import Footer from "./Components/Footer";
import { ThemeContext } from "./context/ThemeProvider";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    // flex Child to add gaps
    //inside each child to div padding is added for enough spacing
    <main className={`font-fontFamilyMain flex flex-col items-center ${theme}`}>
      <main className="flex flex-col gap-20 md:w-full sm:w-full lg:w-eightyvw px-4 sm:px-9">
        <NavbarJsx />
        <BackToTop />
        <Banner />
        <Skills />
        <Projects_Container />
        <About />
        <Contacts />
        <Review />
      </main>
      <Footer />
    </main>
  );
}
