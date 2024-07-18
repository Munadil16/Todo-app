import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subTodo: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubTodo",
    },
  ],
});

export const Todo = model("Todo", todoSchema);
