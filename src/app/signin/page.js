"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { signin } from "../../../utils/actions";

function Signin() {
  const [redirecting, setRedirecting] = useState(false);
  function redirectToDashboard() {
    window.location.href = "/dashboard";
  }

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
      const { success, message } = await signin(formdata);

      if (success) {
        toast.success(message);
        setRedirecting(true);
        redirectToDashboard();
      } else if (!success) {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to log in server");
    }
  };

  return (
    <main className="bg-gray-950 flex justify-center items-center min-h-screen p-3 sm:p-5">
      <form
        action={submitSignin}
        className="bg-white rounded-md w-full sm:w-3/4 md:w-1/2  p-3 sm:p-5 md:p-10"
      >
        <h1 className="text-2xl py-3">Log In</h1>

        <label
          className="block pt-3 pb-1 capitalize text-sm font-bold"
          htmlFor="email"
        >
          email address
        </label>
        <input
          className="w-full border border-black py-2 text-sm px-3  md:px-5  focus:outline-none rounded-sm focus:border-blue-500 focus:border-2"
          id="email"
          type="email"
          name="email"
          required
          value={userValues.email}
          onChange={changeHandler}
        />

        <label
          className="block pt-3 pb-1 capitalize text-sm font-bold"
          htmlFor="password"
        >
          Password
        </label>

        <input
          className="w-full border border-black py-2 pr-12 text-sm px-3  md:px-5 mb-3 focus:outline-none rounded-sm focus:border-blue-500 focus:border-2"
          id="password"
          type="password"
          name="password"
          required
          value={userValues.password}
          onChange={changeHandler}
        />

        <Link className="text-blue-500 underline" href="/forgot_password">
          Forgot Password
        </Link>
        <SubmitBtn redirecting={redirecting} />
      </form>
    </main>
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
          className="py-2 px-6 bg-blue-500 text-xs text-white block rounded-md "
        >
          {pending ? "loading..." : "log in"}
        </button>
      )}
    </div>
  );
};

export default Signin;
