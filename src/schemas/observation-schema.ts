import { z } from 'zod'

export const observationSchema = z.object({
  studentId: z.string(),
  type: z.enum(['positive', 'negative']),
  observation: z.string(),
})

export type ObservationSchema = z.infer<typeof observationSchema>