import { createClassScheduleSchema, timeTableSlotSchema } from '@/infrastructure/schemas/class-schedule-schema'
import { z } from 'zod'

export type TimeTableSlotSchema = z.infer<typeof timeTableSlotSchema>
export type ClassScheduleSchema = z.infer<typeof createClassScheduleSchema>