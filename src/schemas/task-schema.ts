import { z } from 'zod'

export const TaskSchema = z.object({
  courseId: z.string(),
  asignatureId: z.string(),
  name: z.string(),
  description: z.string(),
  dueDate: z.coerce.date(),
  status: z.enum(['pending', 'completed', 'unfulfilled', 'incomplete']),
  highestScore: z.number(),
  score: z.number()
})

export type Task = z.infer<typeof TaskSchema>

export const TaskUpdateSchema = TaskSchema.extend({
  _id: z.string()
})

export type TaskUpdate = z.infer<typeof TaskUpdateSchema>

export const TaskGetByAsignatureSchema = z.object({
  asignatureId: z.string(),
  courseId: z.string()
})

export type TaskGetByAsignature = z.infer<typeof TaskGetByAsignatureSchema>
