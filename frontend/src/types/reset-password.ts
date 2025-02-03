import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
});

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
