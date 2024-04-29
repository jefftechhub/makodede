"use client";
import React, { useState, usE } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";

function Signin() {
  const [redirecting, setRedirecting] = useState(false);

  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserValues({ ...userValues, [name]: value });
  };

  const submitSignin = async (formdata) => {
    try {
    } catch (error) {}
  };

  return (
    <form action={submitSignin} className="w-full">
      <input
        className="w-full border border-gray-800 py-2 text-sm px-3  md:px-5 my-2 focus:outline-none rounded-md focus:border-blue-500 focus:border-2"
        id="email"
        type="email"
        name="email"
        placeholder="Email Address"
        required
        value={userValues.email}
        onChange={changeHandler}
      />

      <input
        className="w-full border border-gray-800 py-2 pr-12 text-sm px-3  my-2  md:px-5 mb-3 focus:outline-none rounded-md focus:border-blue-500 focus:border-2"
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        required
        value={userValues.password}
        onChange={changeHandler}
      />
      <div className="mt-8">
        <Link className="text-blue-500  underline" href="/forgot_password">
          Forgot Password
        </Link>
        <SubmitBtn redirecting={redirecting} />
      </div>
    </form>
  );
}

const SubmitBtn = ({ redirecting }) => {
  const { pending } = useFormStatus();

  return (
    <div className="my-4">
      {redirecting ? (
        <p>Redirecting...</p>
      ) : (
        <button
          type="submit"
          disabled={pending}
          className="py-3 px-6 bg-blue-500 text-sm text-white block rounded-md w-full"
        >
          {pending ? "loading..." : "log in"}
        </button>
      )}
    </div>
  );
};

export default Signin;
