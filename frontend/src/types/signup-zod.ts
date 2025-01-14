import { z } from "zod";

// Define the signup schema using Zod
export const signupSchema = z.object({
  email: z.string().email(), // Validates that the email is a string and follows the email format
  displayname: z.string().min(4, "Must be 4 or more characters long"), // Validates display name is at least 4 characters long
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

// Infer TypeScript type from the schema
export type signupType = z.infer<typeof signupSchema>;
