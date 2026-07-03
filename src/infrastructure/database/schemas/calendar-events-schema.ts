import { z } from 'zod'
import { DATE_REGEX, DATE_TIME_REGEX } from '@/utils/regex'

export const createCalendarEventSchema = z.object({
  date: z.string().regex(DATE_REGEX, 'Formato de fecha inválido. Use YYYY-MM-DD'),
  time: z.string().regex(DATE_TIME_REGEX, 'Formato de hora inválido. Use HH:mm').optional(),
  type: z.enum(['exam', 'task', 'meeting', 'holiday', 'class', 'other']),
  title: z.string(),
  description: z.string(),
  courseId: z.string().nullable().optional(),
})

export type CreateCalendarEventDto = z.infer<typeof createCalendarEventSchema>

export const updateCalendarEventSchema = createCalendarEventSchema.extend({
  _id: z.string().length(24),
})

export type UpdateCalendarEventDto = z.infer<typeof updateCalendarEventSchema>
