import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().trim().email(),
  userName: z.string().trim().min(1),
  password: z.string().trim().min(6),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});
