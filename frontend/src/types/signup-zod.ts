import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  displayname: z.string().min(4, "Must be 4 or more characters long"),
  password: z.string().min(5, "Must be 5 or more characters long"),
});

export const updateData = z.object({
  email: z.string().min(1, "Email is required").email(),
  displayname: z.string().min(5, "Must be 5 or more characters long"),
  password: z.string().optional(),
});

export type signupType = z.infer<typeof signupSchema>;
export type updateUserType = z.infer<typeof updateData>;
