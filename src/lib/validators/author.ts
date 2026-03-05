import { z } from "zod";

export const createAuthorSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters"),

    age: z
        .number()
        .int()
        .min(1, "Age must be positive")
});

export type AuthorFormData = z.infer<typeof createAuthorSchema>