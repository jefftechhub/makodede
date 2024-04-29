"use client";
import React, { useRef, useEffect, useContext } from "react";
import { PhoneCall, Linkedin, Email } from "./Icon";
import Image from "next/image";
import { submitHandler } from "../../utils/actions";
import { useFormStatus, useFormState } from "react-dom";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeProvider";

const initialState = {
  message: null,
};

const Contacts = () => {
  const { contactsRef } = useContext(ThemeContext);
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
      <h2
        ref={contactsRef}
        className="text-textColor py-3 text-2xl sm:text-3xl pb-1"
      >
        Lets Talk<span className="text-blue-500">.</span>
      </h2>
      <p className=" inline-block bg-blue-500 w-12 sm:w-14 h-1 rounded-xl"></p>

      <div className="sm:flex pt-14 sm:pt-20 justify-between items-center gap-6">
        <nav
          ref={navContacts}
          className="relative flex navContacts text-textColor flex-col sm:pl-5 gap-4"
        >
          <div className="flex items-center  gap-5">
            <PhoneCall />
            <div className="flex flex-col">
              <p className="text-gray-700 text-xs">Mobile Number</p>
              <p className="text-sm">+254 794 365485</p>
              <p className="tex-sm">+254 792 415842</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Email />
            <div>
              <p className="text-gray-700 text-xs">Email Address</p>
              <p className="text-sm">geoffreyodede19@gmail.com</p>
            </div>
          </div>

          <a
            href="https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=geofrey-odede-3028832bb"
            target="_blank"
            className="flex gap-5 text-textColor"
          >
            <Linkedin />
            <div>
              <p className="text-gray-700 text-xs">LinkedIn</p>
              <p className="text-sm">Geofrey Odede</p>
            </div>
          </a>
          <a href="" target="_blank" className="flex items-center gap-5">
            <Image
              src="/Logo/upwork.png"
              alt="Upwork logo"
              width={100}
              height={100}
              priority
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-700 text-xs">Upwork</p>
              <p className="text-sm">Geofrey Odede</p>
            </div>
          </a>
          <a href="" target="_blank" className="flex items-center gap-5">
            <Image
              src="/Logo/tiktok.png"
              alt="Tiktok logo"
              width={100}
              height={100}
              priority
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-700 text-xs">Tiktok</p>
              <p className="text-sm">@makodede.developer</p>
            </div>
          </a>
          <a href="" target="_blank" className="flex items-center gap-5">
            <Image
              src="/Logo/instagram.png"
              alt="Instagram logo"
              width={100}
              height={100}
              priority
              className="h-7 w-7"
            />
            <div>
              <p className="text-gray-700 text-xs">Instagram</p>
              <p className="text-sm">@makodede.developer</p>
            </div>
          </a>
        </nav>
        <form
          action={formAction}
          ref={form}
          className="form mt-10 sm:mt-0 w-full md:w-1/2  bg-blue-500/5 p-5 md:p-8 md:rounded-r-3xl"
        >
          <h2 className="text-textColor text-lg sm:text-3xl mb-3 sm:mb-5">
            Leave me a message✍
          </h2>
          <div className="relative my-8">
            <label
              className="absolute text-textColor  top-1/2 -translate-y-1/2 transition-all duration-300 bg-transparent origin-left text-sm"
              htmlFor="names"
            >
              Names
            </label>
            <input
              className="focus:outline-none py-3 text-lg border-b  bg-transparent duration-0 border-slate-600 text-textColor w-full"
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
              className="absolute  top-1/2 -translate-y-1/2 transition-all duration-300 origin-left text-textColor bg-transparent text-sm"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="focus:outline-none py-3 border-b bg-transparent duration-0 border-slate-600 text-textColor w-full text-lg"
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
              className="absolute top-3  text-sm transition-all duration-300 bg-transparent origin-left text-textColor"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="focus:outline-none duration-0 py-5  border-b resize-none text-textColor bg-transparent h-14 overflow-hidden focus:h-auto border-slate-600 text-lg w-full"
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
      className="text-white text-xs bg-blue-500 py-3 rounded-md px-8 my-5"
    >
      {pending ? "submiting..." : "submit"}
    </button>
  );
};

export default Contacts;
