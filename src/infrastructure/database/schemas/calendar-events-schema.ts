import { z } from 'zod'

export const createCalendarEventSchema = z.object({
  date: z.date(),
  type: z.enum(['exam', 'task', 'meeting', 'holiday', 'class', 'other']),
  title: z.string(),
  description: z.string(),
  courseId: z.string().optional()
})

export type CreateCalendarEventDto = z.infer<typeof createCalendarEventSchema>

export const updateCalendarEventSchema = z.object({
  _id: z.string().length(24),
  date: z.date().optional(),
  type: z.enum(['exam', 'task', 'meeting', 'holiday', 'class', 'other']).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  courseId: z.string().optional()
})

export type UpdateCalendarEventDto = z.infer<typeof updateCalendarEventSchema>
