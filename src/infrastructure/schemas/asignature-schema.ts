import { z } from 'zod'

export const asignatureSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['active', 'inactive']),
})

export type AsignatureSchema = z.infer<typeof asignatureSchema>

export const asignatureUpdateSchema = asignatureSchema.extend({
  _id: z.string(),
})
export type AsignatureUpdateSchema = z.infer<typeof asignatureUpdateSchema>
