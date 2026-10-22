import { searchTaskScheduleByUserInstitutionQuerySchema } from '@/infrastructure/schemas/task-schedule-schema'
import { z } from 'zod'

export type SearhTaskScheduleByUserInstitutionQuery = z.infer<typeof searchTaskScheduleByUserInstitutionQuerySchema>