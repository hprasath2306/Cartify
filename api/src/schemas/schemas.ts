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

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    role: z.string(),
  })
  .pick({
    email: true,
    password: true,
  });

export const orderSchema = z
  .object({
    id: z.number(),
    userId: z.number(),
    status: z.string(),
    createdAt: z.date(),
  })
  .omit({
    id: true,
    userId: true,
    status: true,
    createdAt: true,
  });

  export const updateOrderSchema = z
  .object({
    id: z.number(),
    userId: z.number(),
    status: z.string(),
    createdAt: z.date(),
  })
  .pick({
    status: true,
  });

export const orderItemsSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
}).omit({
  id: true,
  orderId: true
});

export const insertOrderWithItemsSchema = z
  .object({
    order: orderSchema,
    items: z.array(orderItemsSchema)
  });
