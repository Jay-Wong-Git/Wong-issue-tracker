import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title length should not be more than 255 chars."),
  description: z
    .string({ required_error: "Description is required." })
    .min(1, "Description is required.")
    .max(65535, "Description length should not be more than 65535 chars."),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title length should not be more than 255 chars.")
    .optional(),
  description: z
    .string({ required_error: "Description is required." })
    .min(1, "Description is required.")
    .max(65535, "Description length should not be more than 65535 chars.")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255, "AssignedToUserId length should not be more than 255 chars.")
    .optional()
    .nullable(),
});
