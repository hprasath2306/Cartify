import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
  address: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.string()
}).pick({
  email: true,
  password: true
})
