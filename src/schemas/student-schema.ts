import { z } from 'zod'

export const studentSchema = z.object({
  birthday: z.date(),
  startDate: z.date(),
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  responsableId: z.string(),
})

export type Student = z.infer<typeof studentSchema>

export const studentSchemaUpdate = studentSchema.extend({ _id: z.string() })
export type StudentUpdate = z.infer<typeof studentSchemaUpdate> 