import { z } from "zod";

export const forgotPasswordSchema = z.object({
  id: z.string().optional(),
  password: z.string().min(5, "Must be 5 or more characters long"),
});

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;
