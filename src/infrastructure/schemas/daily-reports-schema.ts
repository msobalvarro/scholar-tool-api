import { ConceptType, TypeMovementType } from '@/core/interfaces/dtos'
import { z } from 'zod'

export const createDailyReportSchema = z.object({
  date: z.coerce.date(),
  type_movement: z.enum(TypeMovementType),
  concept: z.enum(ConceptType),
  description: z.string().min(1, 'La descripción es requerida'),
  receipt_number: z.string().min(1, 'El número de recibo es requerido'),
  income_recorded_amount: z.number().nonnegative().optional(),
  income_recorded_amount_usd: z.number().nonnegative().optional(),
  expense_amount: z.number().nonnegative().optional(),
  expense_amount_usd: z.number().nonnegative().optional(),
})

export type CreateDailyReportSchema = z.infer<typeof createDailyReportSchema>

export const updateDailyReportSchema = createDailyReportSchema.extend({
  _id: z.string(),
})

export type UpdateDailyReportSchema = z.infer<typeof updateDailyReportSchema>
