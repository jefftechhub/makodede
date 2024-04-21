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

mongoose.models = {};

export const Messages =
  mongoose.models.Messages || mongoose.model("Messages", messageSchema);

export const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);
