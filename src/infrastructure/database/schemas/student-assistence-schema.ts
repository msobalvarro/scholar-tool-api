import { z } from 'zod'

export const studentAssistenceSchema = z.object({
  studentId: z.string(),
  assistence: z.boolean(),
  justification: z.string().optional(),
})

export type StudentAssistenceSchema = z.infer<typeof studentAssistenceSchema>
