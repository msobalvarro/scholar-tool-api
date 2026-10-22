import { z } from 'zod'

const taskDetailSchema = z.object({
  content: z.string(),
  evaluationMethod: z.string(),
  page: z.string().optional().nullable(),
  inNotebook: z.boolean(),
  date: z.string(),
  points: z.number(),
})

export type TaskDetailSchema = z.infer<typeof taskDetailSchema>

const scheduleUnitSchema = z.object({
  unitName: z.string(),
  tasks: z.array(taskDetailSchema),
})

export type ScheduleUnitSchema = z.infer<typeof scheduleUnitSchema>

export const taskScheduleSchema = z.object({
  asignatureId: z.string(),
  month: z.number(),
  year: z.number(),
  scheduleUnit: z.array(scheduleUnitSchema)
})

export type TaskScheduleSchema = z.infer<typeof taskScheduleSchema>

// export const taskScheduleJsonSchema = zodToJsonSchema(taskScheduleSchema, 'TaskSchedule')