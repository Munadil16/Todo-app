import { Schema, model } from "mongoose";

const subTodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["LESS", "MEDIUM", "HIGH"],
    },
    completed: {
      type: Boolean,
      enum: [true, false],
    },
  },
  {
    timestamps: true,
  }
);

export const SubTodo = model("SubTodo", subTodoSchema);
