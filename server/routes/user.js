import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  login,
  register,
  getUserDetails,
  updateUserDetails,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/get-user-details", auth, getUserDetails);

router.post("/update-user-details", auth, updateUserDetails);

export default router;
