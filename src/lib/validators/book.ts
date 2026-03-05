import { z } from "zod";

export const createBookSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  genre: z
    .string()
    .min(2, "Genre must be at least 2 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters"),

  authorId: z
    .string()
    .uuid("Invalid author ID"),
});

export type BookFormData = z.infer<typeof createBookSchema>

export const getBookSchema = z.object({
  id: z.string().uuid(),
});