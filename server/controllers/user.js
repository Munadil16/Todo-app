import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../schemas/userSchemas.js";

const register = async (req, res) => {
  const { success, error } = createUserSchema.safeParse(req.body);
  const saltRounds = 10;

  if (!success) {
    return res
      .status(400)
      .json({ msg: error.issues[0].message, success: false });
  }

  try {
    const { email, userName, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ msg: "User with this email already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      email,
      userName,
      password: hashedPassword,
    });

    return res.status(201).json({ msg: "User created", success: true });
  } catch (error) {
    console.log("Error while registering user: ", error);
    return res.status(500).json({
      msg: "Internal server error while user creation",
      success: false,
    });
  }
};

const login = async (req, res) => {
  const { success, error } = loginUserSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ msg: error.issues[0].message, success: false });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ msg: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.userName,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(200).json({
      msg: "User logged in",
      token,
      name: user.userName,
      success: true,
    });
  } catch (error) {
    console.log("Error while user login: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error while user login", success: false });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId)?.select("-password -_id");

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    return res
      .status(200)
      .json({ msg: "User details retrieved", success: true, details: user });
  } catch (error) {
    console.log("Error while retrieving user details: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

const updateUserDetails = async (req, res) => {
  const { success, error } = updateUserSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ msg: error.issues[0].message, success: false });
  }

  const { email, userName, password } = req.body;
  const saltRounds = 10;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && !(existingUser._id.toString() === req.userId)) {
      return res
        .status(409)
        .json({ msg: "User with this email already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { email, userName, password: hashedPassword },
      { new: true }
    );

    const token = jwt.sign(
      { id: updatedUser._id, name: updatedUser.userName },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(200).json({
      msg: "User details updated",
      success: true,
      token,
      name: updatedUser.userName,
    });
  } catch (error) {
    console.log("Error while updating user details: ", error);
    return res
      .status(500)
      .json({ msg: "Internal server error while user login", success: false });
  }
};

export { login, register, getUserDetails, updateUserDetails };
