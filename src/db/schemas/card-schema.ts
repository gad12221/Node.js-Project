import { Schema } from "mongoose";
import { ICard } from "../../@types/@types";
import addressSchema from "./address-schema";
import imageSchema from "./image-schema";
import { required } from "joi";

//TODO: update ICard to include extra properties
const cardSchema = new Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 256 },
  subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
  description: { type: String, required: true, minlength: 2, maxlength: 1024 },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },
  email: { type: String, required: true, minlength: 5, maxlength: 30 },
  web: { type: String, required: false, minlength: 14, maxlength: 100 },
  address: { type: addressSchema, required: true },
  image: { type: imageSchema, required: true },

  //   likes, createdAt, userId, bizNumber
  likes: [
    {
      type: String,
    },
  ],
  createdAt: { type: Date, required: false, default: new Date() },
  userId: { type: String, required: true },
  bizNumber: { type: Number, required: false, default: Math.random() },
});
