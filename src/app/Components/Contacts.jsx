"use client";
import React, { useRef, useEffect } from "react";
import { PhoneCall, Linkedin, Email } from "./Icon";
import Image from "next/image";
import WhatsApp from "./Logo/WhatsApp.svg.webp";
import Github from "./Logo/github.svg";
import Upwork from "./Logo/upwork.png";
import Tiktok from "./Logo/tiktok.png";
import Instagram from "./Logo/instagram.png";
import { submitHandler } from "../../../utils/actions";
import { useFormStatus, useFormState } from "react-dom";
import toast from "react-hot-toast";

const initialState = {
  message: null,
};

const Contacts = ({ contactsRef }) => {
  const [state, formAction] = useFormState(submitHandler, initialState);

  useEffect(() => {
    if (state.message === "error") {
      toast.error("Failed to submit message");
    } else if (state.message === "success") {
      toast.success("message sent");
    }
  }, [state]);

  function moveLabelUp(e) {
    const input = e.target;

    input.previousElementSibling.classList.add(
      "text-sm",
      "-translate-y-full",
      "top-2",
      "font-bold"
    );
  }

  function moveLabelDown(e) {
    const input = e.target;

    if (!input.value) {
      input.previousElementSibling.classList.remove(
        "text-sm",
        "-translate-y-full",
        "top-2",
        "font-bold"
      );
    }
  }

  const navContacts = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    const itemsObservered = [navContacts.current, form.current];

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
      <h1
        ref={contactsRef}
        className="text-white py-3 text-2xl sm:text-3xl pb-1"
      >
        Lets Talk<span className="text-blue-500">.</span>
      </h1>
      <p className=" inline-block bg-blue-500 w-12 sm:w-14 h-1 rounded-xl"></p>

      <div className="sm:flex items-start py-14 sm:py-20 justify-between gap-6">
        <nav
          ref={navContacts}
          className="relative flex navContacts text-white flex-col sm:pl-5 gap-4"
        >
          <div className="flex items-center gap-5">
            <PhoneCall />
            <div>
              <p className="text-gray-500 text-sm">Mobile Number</p>
              <p>+254 794 365485 / +254 792 415842</p>
            </div>
          </div>
          <div className="flex  gap-5">
            <Image
              src={WhatsApp.src}
              alt="whatsapp logo"
              width={100}
              height={100}
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-500 text-sm">WhatsApp</p>
              <p>+254 794 365485</p>
            </div>
          </div>
          <div className="flex  gap-5">
            <Email />
            <div>
              <p className="text-gray-500 text-sm">Email Address</p>
              <p>geoffreyodede19@gmail.com</p>
            </div>
          </div>
          <a href="" target="_blank" className="flex  gap-5">
            <Image
              src={Github.src}
              alt="Github logo"
              width={100}
              height={100}
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-500 text-sm">GitHub</p>
              <p>@jefftechhub</p>
            </div>
          </a>
          <a
            href="https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=geofrey-odede-3028832bb"
            target="_blank"
            className="flex gap-5"
          >
            <Linkedin />
            <div>
              <p className="text-gray-500 text-sm">LinkedIn</p>
              <p>Geofrey Odede</p>
            </div>
          </a>
          <a href="" target="_blank" className="flex gap-5">
            <Image
              src={Upwork.src}
              alt="Upwork logo"
              width={100}
              height={100}
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-500 text-sm">Upwork</p>
              <p>Geofrey Odede</p>
            </div>
          </a>
          <a href="" target="_blank" className="flex gap-5">
            <Image
              src={Tiktok.src}
              alt="Tiktok logo"
              width={100}
              height={100}
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-500 text-sm">Tiktok</p>
              <p>@makodede.developer</p>
            </div>
          </a>
          <a href="" target="_blank" className="flex gap-5">
            <Image
              src={Instagram.src}
              alt="Instagram logo"
              width={100}
              height={100}
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-500 text-sm">Instagram</p>
              <p>@makodede.developer</p>
            </div>
          </a>
        </nav>
        <form
          action={formAction}
          ref={form}
          className="form mt-10 sm:mt-0 w-full sm:w-1/2 rounded-md"
        >
          <h2 className="text-white text-xl sm:text-3xl mb-3 sm:mb-5">
            Leave me a message✍
          </h2>
          <div className="relative my-8">
            <label
              className="absolute text-white  top-1/2 -translate-y-1/2 transition-all duration-300 bg-gray-950 origin-left"
              htmlFor="names"
            >
              Names
            </label>
            <input
              className="focus:outline-none py-3  border-b-2  bg-transparent border-slate-600 text-white w-full"
              type="text"
              name="names"
              id="names"
              onFocus={moveLabelUp}
              onBlur={moveLabelDown}
              required
            />
          </div>
          <div className="relative my-8">
            <label
              className="absolute  top-1/2 -translate-y-1/2 transition-all duration-300 origin-left text-white bg-gray-950 "
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="focus:outline-none py-3 border-b-2 bg-transparent border-slate-600 text-white w-full"
              type="text"
              name="email"
              id="email"
              onFocus={moveLabelUp}
              onBlur={moveLabelDown}
              required
            />
          </div>
          <div class="relative my-8">
            <label
              className="absolute top-3  transition-all duration-300 bg-gray-950 origin-left text-white"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="focus:outline-none py-5  border-b-2 resize-none text-white bg-transparent border-slate-600 w-full"
              type="text"
              name="message"
              id="message"
              onFocus={moveLabelUp}
              onBlur={moveLabelDown}
              required
            ></textarea>
          </div>
          <SubmitBtn />
        </form>
      </div>
    </section>
  );
};

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="text-white text-sm bg-blue-500 py-3 rounded-md px-8 my-5"
    >
      {pending ? "submiting..." : "submit"}
    </button>
  );
};

export default Contacts;
