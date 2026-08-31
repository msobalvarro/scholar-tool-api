import { ConceptType, IDailyReportStudentDto, TypeMovementType } from '@/core/interfaces/dtos/daily-reports'
import { model, Schema } from 'mongoose'

const dailyReportSchema = new Schema<IDailyReportStudentDto>(
  {
    date: { type: Date, required: true },
    type_movement: { type: String, enum: TypeMovementType, required: true },
    concept: { type: String, enum: ConceptType, required: true },
    description: { type: String, required: true },
    receipt_number: { type: String, required: true },
    income_recorded_amount: { type: Number, required: false },
    income_recorded_amount_usd: { type: Number, required: false },
    expense_amount: { type: Number, required: false },
    expense_amount_usd: { type: Number, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const DailyReportModel = model<IDailyReportStudentDto>('DailyReport', dailyReportSchema)
