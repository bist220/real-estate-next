import { z } from 'zod';


export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['buyer', 'owner', 'admin']).default('buyer'),
});


export const loginSchema = z.object({
    // email: z.string().email(),
    email: z.email(),
    password: z.string().min(1)
});


export const propertyCreateSchema = z.object({
    name: z.string().min(1),
    builder: z.string().optional(),
    price: z.number().nonnegative(),
    location: z.string().min(1).optional(),
    description: z.string().optional(),
    images: z.string().optional()
});

export const propertyUpdateSchema = z.object({
    id: z.string().min(1).optional(),
    // slug: z.string().optional(),
    name: z.string().min(1),
    builder: z.string().optional(),
    price: z.number().nonnegative(),
    location: z.string().min(1).optional(),
    description: z.string().optional(),
    images: z.string().optional(),
    updated_at: z.number().optional()
});

// const updateSchema = z.object({
//     slug: z.string().optional(),
//     name: z.string().min(1),
//     builder: z.string().min(1),
//     price: z.number().positive(),
//     location: z.string().min(1),
//     description: z.string().optional(),
//     images: z.string().optional(),
// });