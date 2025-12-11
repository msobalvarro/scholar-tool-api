import { z } from 'zod'

export const PeriodSchema = z.object({
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

export type Period = z.infer<typeof PeriodSchema>

export const PeriodUpdateSchema = PeriodSchema.extend({
  _id: z.string()
})

export type PeriodUpdate = z.infer<typeof PeriodUpdateSchema>
