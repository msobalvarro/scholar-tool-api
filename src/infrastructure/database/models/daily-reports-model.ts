import { ConceptType, IDailyReporttDto, TypeMovementType } from '@/core/interfaces/dtos/daily-reports'
import { model, Schema } from 'mongoose'

const dailyReportSchema = new Schema<IDailyReporttDto>(
  {
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    date: { type: Date, required: true },
    type_movement: { type: String, enum: TypeMovementType, required: true },
    concept: { type: String, enum: ConceptType, required: true },
    description: { type: String, required: true },
    receipt_number: { type: String, required: true, unique: true },
    income_recorded_amount: { type: Number, required: false },
    income_recorded_amount_usd: { type: Number, required: false },
    expense_amount: { type: Number, required: false },
    expense_amount_usd: { type: Number, required: false },
    user_institution: { type: Schema.Types.ObjectId, ref: 'UserInstitution', required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const DailyReportModel = model<IDailyReporttDto>('DailyReport', dailyReportSchema)
