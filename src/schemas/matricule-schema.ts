import { z } from 'zod'

export const matriculeSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  year: z.number(),
})

export type Matricule = z.infer<typeof matriculeSchema>

export const matriculeSchemaUpdate = matriculeSchema.extend({ _id: z.string() })
export type MatriculeUpdate = z.infer<typeof matriculeSchemaUpdate>