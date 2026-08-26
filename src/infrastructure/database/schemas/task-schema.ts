import { z } from 'zod'

export const ITaskSchema = z.object({
  courseId: z.string(),
  asignatureId: z.string(),
  name: z.string(),
  description: z.string(),
  dueDate: z.coerce.date(),
  score: z.number()
})

export type ITaskSchema = z.infer<typeof ITaskSchema>

export const TaskUpdateSchema = ITaskSchema.extend({
  _id: z.string()
})

export type ITaskUpdate = z.infer<typeof TaskUpdateSchema>

export const TaskGetByAsignatureSchema = z.object({
  asignatureId: z.string(),
  courseId: z.string()
})

export type ITaskGetByAsignature = z.infer<typeof TaskGetByAsignatureSchema>
