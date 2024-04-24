"use server";
import mongoose from "mongoose";
import { Messages, Projects, Users, Session } from "../mongooseSchema";
import { main } from "./nodemail";
import axiosInstance from "./axios";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { serialize } from "cookie";

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

export const updateProject = async (formdata) => {
  try {
    const oldImages = formdata.getAll("oldImages");
    const newImages = formdata.getAll("newImages");

    const id = formdata.get("id");
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

    if (newImages.length > 0) {
      newImages.forEach((item) => {
        formData.append("images", item);
      });
    }

    await axiosInstance
      .post("/api/uploadImages", formData)
      .then(async (res) => {
        if (res.data.success || res.data.error === "No files received.") {
          // join both images to one list
          const images = res.data.path
            ? [...oldImages, ...res.data.path]
            : oldImages;

          await Projects.findByIdAndUpdate(id, {
            images,
            title,
            category,
            websiteURL,
            description,
            features,
          });

          return { success: true };
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

export const changeStatus = async (formdata) => {
  try {
    const id = formdata.get("id");
    const active = formdata.get("active");
    if (active === "true") {
      await Projects.findByIdAndUpdate(id, { active: false });
    } else if (active === "false") {
      await Projects.findByIdAndUpdate(id, { active: true });
    }
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false };
  }
};

export const signup = async (formdata) => {
  try {
    const email = formdata.get("email");
    let password = formdata.get("confirmPassword");

    const findUser = await Users.findOne({ email });

    if (findUser) {
      return { success: false, message: "User already exist" };
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      await Users.create({ email, password });

      return { success: true, message: "User added successfully" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Failed to add user" };
  }
};

// sign

export const signin = async (formdata) => {
  try {
    const email = formdata.get("email");
    const password = formdata.get("password");

    const findUser = await Users.findOne({ email });

    if (!findUser) {
      return {
        success: false,
        message: "Wrong email address",
      };
    } else {
      const results = await bcrypt.compare(password, findUser.password);

      if (results) {
        if (findUser.active) {
          await Session.findOneAndDelete({
            userId: findUser._id,
          });

          await Session.create({
            userId: String,
          });

          const cookie = serialize("session", findUser._id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // One week
            path: "/",
          });

          cookies().set("session", cookie);

          return {
            success: true,
            message: "Log in successful",
          };
        } else {
          return {
            success: false,
            message: "Activate your account to continue",
          };
        }
      } else {
        return {
          success: false,
          message: "Wrong password",
        };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
