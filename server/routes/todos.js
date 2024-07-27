import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  addTodo,
  retrieveTodos,
  updateTodo,
  deleteTodo,
  markAsCompleteTodo,
} from "../controllers/todos.js";

const router = express.Router();

router.post("/add-todo", auth, addTodo);

router.get("/retrieve-todos", auth, retrieveTodos);

router.put("/update-todo/:todoId", auth, updateTodo);

router.patch("/complete-todo", auth, markAsCompleteTodo);

router.delete("/delete-todo/:todoId", auth, deleteTodo);

export default router;
