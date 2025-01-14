import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }) // Validates password length
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter", // Password must have at least one uppercase letter
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter", // Password must have at least one lowercase letter
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }), // Password must have at least one number
});

export type signinType = z.infer<typeof signinSchema>;
