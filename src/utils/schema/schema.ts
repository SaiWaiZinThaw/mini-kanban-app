import { z } from "zod";
const TaskStatusSchema = z.enum(["todo", "in-progress", "done"]);
export const TaskCreateSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: TaskStatusSchema,
});

export const AuthSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
