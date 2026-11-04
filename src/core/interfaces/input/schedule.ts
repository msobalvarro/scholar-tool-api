
import { scheduleSchema, scheduleUpdateSchema } from "@/infrastructure/schemas/schedule-schema"
import { z } from "zod"

export type ClassScheduleSchema = z.infer<typeof scheduleSchema>

export type ClassScheduleUpdateSchema = z.infer<typeof scheduleUpdateSchema>