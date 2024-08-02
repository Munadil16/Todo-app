import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDb from "./db/index.js";
import userRouter from "./routes/user.js";
import todosRouter from "./routes/todos.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

// Dummy endpoint to wake up the server
// while spin down time...
app.get("/api/wake-up", (req, res) => {
  res.status(200).json({ msg: "Server is awake", success: true });
});

app.use("/api/v1/user", userRouter);

app.use("/api/v1/todo", todosRouter);

// Global-catch
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ msg: "Internal Server Error!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
