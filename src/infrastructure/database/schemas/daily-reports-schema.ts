import { z } from 'zod'

export const createDailyReportSchema = z.object({
  institutionId: z.string().optional(),
  date: z.coerce.date(),
  type_movement: z.string().min(1, 'El tipo de movimiento es requerido'),
  concept: z.string().min(1, 'El concepto es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  receipt_number: z.string().min(1, 'El número de recibo es requerido'),
  income_recorded_amount: z.number().nonnegative().optional(),
  deposited_amount: z.number().nonnegative().optional(),
  expense_amount: z.number().nonnegative().optional(),
  isUSD: z.boolean().default(false),
})

export type CreateDailyReportSchema = z.infer<typeof createDailyReportSchema>

export const updateDailyReportSchema = createDailyReportSchema.extend({
  _id: z.string(),
})

export type UpdateDailyReportSchema = z.infer<typeof updateDailyReportSchema>
