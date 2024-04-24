import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  names: String,
  email: String,
  message: String,
});

const projectSchema = new Schema({
  images: Array,
  title: String,
  category: String,
  websiteURL: String,
  description: String,
  features: Array,
  active: {
    type: Boolean,
    default: true,
  },
});

const userSchema = new Schema({
  email: String,
  password: String,
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const sessionSchema = new Schema({
  userId: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

export const Messages =
  mongoose.models.Messages || mongoose.model("Messages", messageSchema);

export const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);

export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
