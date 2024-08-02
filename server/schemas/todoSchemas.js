import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().trim().min(1, "Title is a required field"),
  priority: z.string().min(4),
});
