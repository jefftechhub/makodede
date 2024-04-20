"use server";
import mongoose from "mongoose";
import { Messages, Projects } from "../mongooseSchema";
import { main } from "./nodemail";
import axiosInstance from "./axios";

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

    // main(names).catch(console.error);

    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};

export const submitProject = async (formdata) => {
  try {
    const images = formdata.getAll("images");
    const title = formdata.get("title");
    const category = formdata.get("category");
    const websiteURL = formdata.get("websiteURL");
    const description = formdata.get("description");
    const sendEmail = formdata.get("Send Email");
    const s_e_o = formdata.get("S.E.O");
    const dashboard = formdata.get("dashboard");
    const paymentIntergration = formdata.get("payment intergration");
    const databaseIntergration = formdata.get("database intergration");

    const features = [
      { s_e_o },
      { dashboard },
      { paymentIntergration },
      { databaseIntergration },
      { sendEmail },
    ];

    const formData = new FormData();
    images.forEach((item) => {
      formData.append("images", item);
    });

    await axiosInstance
      .post("/api/uploadImages", formData)
      .then(async (res) => {
        if (res.data.success) {
          await Projects.create({
            images: res.data.path,
            title,
            category,
            websiteURL,
            description,
            features,
          });

          return;
        }
      });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const getProjects = async () => {
  try {
    const projects = await Projects.find();
    // Convert Mongoose documents to plain JavaScript objects
    const plainProjects = projects.map((project) => project.toObject());
    return plainProjects;
  } catch (error) {
    // Handle error
    console.error("Error fetching projects:", error);
    return []; // Return empty array or handle error accordingly
  }
};
