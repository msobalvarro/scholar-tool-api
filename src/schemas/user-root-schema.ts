import { z } from 'zod'

export const userRootSchema = z.object({
  name: z.string().min(3).max(128),
  email: z.string(),
  password: z.string().min(6),
})

export type UserRootSchema = z.infer<typeof userRootSchema>

export const updateUserRootSchema = userRootSchema.extend({ _id: z.string() })

export type UpdateUserRootSchema = z.infer<typeof updateUserRootSchema>

