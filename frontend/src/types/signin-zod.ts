import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(), // Make password optional
});

export type signinType = z.infer<typeof signinSchema>;
