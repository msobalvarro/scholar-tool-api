import { z } from 'zod'

export const timeTableSlotSchema = z.object({
  asignatureId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  isBreak: z.boolean()
})

export const createClassScheduleSchema = z.object({
  courseId: z.string(),
  dayOfWeek: z.enum(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']),
  timeSlots: z.array(timeTableSlotSchema),
  year: z.number()
})
