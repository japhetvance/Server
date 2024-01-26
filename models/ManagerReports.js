import mongoose from "mongoose";

const { Schema, model } = mongoose;

const managerSchema = new Schema(
  {
    userName: String,
    year: Number,
    month: String,
    day: Number,
    eggs: Number,
    rejected: Number,
    sold: Number,
    others: Number,
    flock: Number,
    cages: Number,
  },
  { strict: false, timestamps: true }
);

export const Manager = model("Manager", managerSchema);