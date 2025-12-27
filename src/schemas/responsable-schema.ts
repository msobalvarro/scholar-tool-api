import { z } from 'zod'

export const responsableSchema = z.object({
  fullName: z.string().min(3).max(100),
  identification: z.string().min(3).max(100),
  email: z.string().email(),
  phoneNumber: z.string().min(3).max(100),
  direction: z.string().min(3).max(100),
  city: z.string().min(3).max(100),
  type: z.enum(['father', 'mother', 'grandfather', 'uncle', 'other'])
})

export type ResponsablePerson = z.infer<typeof responsableSchema>

export const responsableSchemaUpdate = responsableSchema.extend({ _id: z.string() })
export type ResponsablePersonUpdate = z.infer<typeof responsableSchemaUpdate>
