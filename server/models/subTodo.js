import { Schema, model } from "mongoose";

const subTodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["LESS", "MEDIUM", "HIGH"],
    },
  },
  {
    timestamps: true,
  }
);

export const SubTodo = model("SubTodo", subTodoSchema);
