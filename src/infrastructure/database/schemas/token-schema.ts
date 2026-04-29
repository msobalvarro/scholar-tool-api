import { z } from 'zod'

export const tokenSchema = z.object({ token: z.string() })

export type TokenSchema = z.infer<typeof tokenSchema>