import { z } from 'zod'

export const scheduleSchema = z.object({
  day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
  time: z.string(),
  teacherId: z.string(),
  courseId: z.string(),
  asignatureId: z.string(),
})

export type Schedule = z.infer<typeof scheduleSchema>

export const scheduleUpdateSchema = scheduleSchema.extend({
  _id: z.string(),
})

export type ScheduleUpdate = z.infer<typeof scheduleUpdateSchema>


