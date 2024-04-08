import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title length should not be more than 255 chars"),
  description: z
    .string({ required_error: "Description is required." })
    .min(1, "Description is required."),
});