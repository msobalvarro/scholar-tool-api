import { z } from 'zod'

export const authSchema = z.object({
  email: z.email(),
  password: z.string().min(4),
})

export type AuthSchema = z.infer<typeof authSchema>
