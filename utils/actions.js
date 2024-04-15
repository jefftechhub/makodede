"use server";
import mongoose from "mongoose";
import { Messages } from "../mongooseSchema";
import { main } from "./nodemail";

mongoose.connect(process.env.DATABASE_URL);

export const submitHandler = async (prevState, formdata) => {
  const names = formdata.get("names");
  const email = formdata.get("email");
  const message = formdata.get("message");

  try {
    await Messages.create({
      names: names,
      email: email,
      message: message,
    });

    main(names).catch(console.error);

    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};
