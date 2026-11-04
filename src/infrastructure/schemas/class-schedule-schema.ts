import { z } from 'zod'

export const timeTableSlotSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isBreak: z.boolean().optional()
})

export const createClassScheduleSchema = z.object({
  courseId: z.string(),
  dayOfWeek: z.enum(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']),
  institutionId: z.string(),
  timeSlots: z.array(timeTableSlotSchema).optional()
})
