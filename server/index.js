import dotenv from "dotenv";
import express from "express";
import connectDb from "./db/index.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
