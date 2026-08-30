import { IDailyReportStudentDto } from '@/core/interfaces/dtos/daily-reports'
import { model, Schema } from 'mongoose'

const dailyReportSchema = new Schema<IDailyReportStudentDto>(
  {
    date: { type: Date, required: true },
    type_movement: { type: String, required: true },
    concept: { type: String, required: true },
    description: { type: String, required: true },
    receipt_number: { type: String, required: true },
    income_recorded_amount: { type: Number, required: false },
    deposited_amount: { type: Number, required: false },
    expense_amount: { type: Number, required: false },
    isUSD: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const DailyReportModel = model<IDailyReportStudentDto>('DailyReport', dailyReportSchema)
