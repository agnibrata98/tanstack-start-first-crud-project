import { z } from "zod"

export const userSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  age: z.coerce.number().min(1).max(120),
})

export type UserFormData = z.infer<typeof userSchema>