import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  names: String,
  email: String,
  message: String,
});

mongoose.models = {};

export const Messages =
  mongoose.models.Messages || mongoose.model("Messages", messageSchema);
