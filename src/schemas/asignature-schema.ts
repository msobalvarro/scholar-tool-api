import { z } from 'zod'

export const asignatureSchema = z.object({
  name: z.string(),
})

export type AsignatureSchema = z.infer<typeof asignatureSchema>

export const asignatureUpdateSchema = asignatureSchema.extend({
  _id: z.string(),
})
export type AsignatureUpdateSchema = z.infer<typeof asignatureUpdateSchema>
