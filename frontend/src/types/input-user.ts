import { z } from "zod";

export const userInputSchema = z.object({
  message: z.string().min(1, "Required Field").max(100, "Max 100 character"),
});

export type userInputType = z.infer<typeof userInputSchema>;
