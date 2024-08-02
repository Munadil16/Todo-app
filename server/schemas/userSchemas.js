import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  userName: z
    .string()
    .trim()
    .min(1, { message: "Username is a required field" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

export const updateUserSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  userName: z
    .string()
    .trim()
    .min(1, { message: "Username is a required field" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must contain at least 6 characters" }),
});
