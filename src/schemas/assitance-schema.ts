import { z } from 'zod'

export const assistanceSchema = z.object({
  courseId: z.string(),
  teacherId: z.string(),
  date: z.string(),
  observation: z.string(),
  studentsPresentsId: z.array(z.string()),
  studentsAbsentId: z.array(z.string()),
})

export type AssitanceSchema = z.infer<typeof assistanceSchema>

export const asssitanceSchemaUpdate = assitanceSchema.extends({
  _id: z.string()
})

export type AssitanceSchemaUpdate = z.infer<typeof assitanceSchemaUpdate>