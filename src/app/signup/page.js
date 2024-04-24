"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signup } from "../../../utils/actions";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";

function Signup() {
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserValues({ ...userValues, [name]: value });
  };

  const submitSignup = async (formdata) => {
    try {
      const password = formdata.get("password");
      const ConfirmPassword = formdata.get("confirmPassword");

      if (password === ConfirmPassword) {
        const { success, message } = await signup(formdata);
        if (success) {
          toast.success(message);
          setUserValues({
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else if (!success) {
          toast.error(message);
        }
      } else {
        toast.error("Password do not match");
      }
    } catch (error) {
      toast.error("Failed to add user");
    }
  };

  return (
    <main className="bg-gray-950 flex justify-center items-center min-h-screen p-3 sm:p-5">
      <form
        action={submitSignup}
        noValidate
        className="bg-white rounded-md w-full sm:w-3/4 md:w-1/2  p-3 sm:p-5 md:p-10"
      >
        <h1 className="text-2xl py-3">Register</h1>

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
          autocomplete="off"
        />

        <label
          className="block pt-3 pb-1 capitalize text-sm font-bold"
          htmlFor="password"
        >
          Password
        </label>

        <input
          className="w-full border border-black py-2 pr-12 text-sm px-3  md:px-5  focus:outline-none rounded-sm focus:border-blue-500 focus:border-2"
          id="password"
          type="password"
          name="password"
          required
          value={userValues.password}
          onChange={changeHandler}
          autocomplete="off"
        />

        <label
          className="block pt-3 pb-1 capitalize text-sm font-bold"
          htmlFor="confirmPassword"
        >
          confirm password
        </label>

        <input
          className="w-full border border-black py-2 pr-12 text-sm px-3 md:px-5 mb-3 focus:outline-none rounded-sm focus:border-blue-500 focus:border-2"
          id="cornfirmPassword"
          type="password"
          required
          name="confirmPassword"
          value={userValues.confirmPassword}
          onChange={changeHandler}
          autocomplete="off"
        />

        <Link className="text-blue-500 underline" href="/signin">
          Log in
        </Link>
        <SubmitBtn />
      </form>
    </main>
  );
}

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="py-2 px-6 bg-blue-500 text-xs text-white block rounded-md my-4"
    >
      {pending ? "submitting..." : "submit"}
    </button>
  );
};

export default Signup;
