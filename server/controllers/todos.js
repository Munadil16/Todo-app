import { Todo } from "../models/todo.js";
import { SubTodo } from "../models/subTodo.js";
import { todoSchema } from "../schemas/todoSchemas.js";

const addTodo = async (req, res) => {
  const { success } = todoSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ msg: "Invalid data", success: false });
  }

  const { title, priority } = req.body;

  try {
    const { _id } = await SubTodo.create({
      title,
      priority,
      completed: false,
    });

    const userTodos = await Todo.findOne({
      createdBy: req.userId,
    });

    if (!userTodos) {
      await Todo.create({
        createdBy: req.userId,
        subTodo: [_id],
      });
    } else {
      userTodos.subTodo.push(_id);
      await userTodos.save();
    }

    const populatedTodos = await Todo.findOne({
      createdBy: req.userId,
    }).populate("subTodo");

    return res.status(201).json({
      msg: "Todo added",
      success: true,
      todos: populatedTodos.subTodo,
    });
  } catch (error) {
    console.log("Error while adding todo: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const retrieveTodos = async (req, res) => {
  try {
    const userTodos = await Todo.findOne({
      createdBy: req.userId,
    }).populate("subTodo");

    if (!userTodos || userTodos.length === 0) {
      return res
        .status(200)
        .json({ msg: "Todo not found", success: false, todos: [] });
    }

    return res
      .status(200)
      .json({ msg: "Todos found", success: true, todos: userTodos.subTodo });
  } catch (error) {
    console.log("Error while retrieving todos: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const updateTodo = async (req, res) => {
  const { success } = todoSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ msg: "Invalid data", success: false });
  }

  const { title, priority } = req.body;

  try {
    await SubTodo.findByIdAndUpdate(req.params.todoId, {
      title,
      priority,
    });

    const userTodos = await Todo.findOne({
      createdBy: req.userId,
    }).populate("subTodo");

    return res
      .status(200)
      .json({ msg: "Todo updated", success: true, todos: userTodos.subTodo });
  } catch (error) {
    console.log("Error while updating todo: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const markAsCompleteTodo = async (req, res) => {
  try {
    await SubTodo.findByIdAndUpdate(req.body.todoId, {
      completed: true,
    });

    const userTodos = await Todo.findOne({
      createdBy: req.userId,
    }).populate("subTodo");

    return res.status(200).json({
      msg: "Todo marked as complete",
      success: true,
      todos: userTodos.subTodo,
    });
  } catch (error) {
    console.log("Error while marking todo as complete: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.todoId;

  try {
    const userTodos = await Todo.findOne({
      createdBy: req.userId,
    });

    userTodos.subTodo = userTodos.subTodo.filter((todo) => !todo.equals(id));
    await userTodos.save();
    await SubTodo.findByIdAndDelete(id);

    const populatedTodos = await Todo.findOne({
      createdBy: req.userId,
    }).populate("subTodo");

    return res
      .status(200)
      .json({
        msg: "Todo deleted",
        success: true,
        todos: populatedTodos.subTodo,
      });
  } catch (error) {
    console.log("Error while deleting a todo: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export { addTodo, retrieveTodos, updateTodo, deleteTodo, markAsCompleteTodo };
