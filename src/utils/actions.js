"use server";
import prisma from "./db";
import { main } from "./nodemail";
import axiosInstance from "./axios";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const submitHandler = async (prevState, formdata) => {
  const names = formdata.get("names");
  const email = formdata.get("email");
  const message = formdata.get("message");

  try {
    await prisma.messages.create({
      data: {
        names,
        email,
        message,
      },
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

    const formData = new FormData();
    images.forEach((item) => {
      formData.append("images", item);
    });

    await axiosInstance
      .post("/api/uploadImages", formData)
      .then(async (res) => {
        if (res.data.success) {
          console.log(formData);
          await prisma.projects.create({
            data: {
              images: res.data.path,
              title,
              category,
              websiteURL,
              description,
            },
          });
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

          await prisma.projects.update({
            where: { id: id },
            data: {
              images,
              title,
              category,
              websiteURL,
              description,
            },
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
    return await prisma.projects.findMany();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// activate or deactivate

export const changeStatus = async (formdata) => {
  try {
    const id = formdata.get("id");
    const active = formdata.get("active");

    if (active === "true") {
      await prisma.projects.update({ where: { id }, data: { active: false } });
    } else {
      await prisma.projects.update({ where: { id }, data: { active: true } });
    }
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false };
  }
};

//sign up

export const signup = async (formdata) => {
  try {
    const email = formdata.get("email");
    let password = formdata.get("confirmPassword");

    const findUser = await prisma.user.findFirst({
      where: { email },
    });

    if (findUser) {
      return { success: false, message: "User already exist" };
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      await prisma.user.create({ data: { email, password } });

      return { success: true, message: "User added successfully" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Failed to add user" };
  }
};

// sign in

export const signin = async (formdata) => {
  try {
    const email = formdata.get("email");
    const password = formdata.get("password");

    const findUser = await prisma.user.findFirst({ where: { email } });

    if (!findUser) {
      return {
        success: false,
        message: "Wrong email address",
      };
    } else {
      const results = await bcrypt.compare(password, findUser.password);

      if (results) {
        if (findUser.active) {
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
