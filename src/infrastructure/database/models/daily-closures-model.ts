import { IDailyClosureDto } from "@/core/interfaces/dtos";
import { model, Schema } from "mongoose";

const dailyClosureSchema = new Schema<IDailyClosureDto>(
  {
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    user_institution: { type: Schema.Types.ObjectId, ref: 'UserInstitution', required: true },
    reports: [{ type: Schema.Types.ObjectId, ref: 'DailyReport' }],
    date: { type: Date, required: true },
    total_income_recorded_amount: { type: Number, required: true },
    total_income_recorded_amount_usd: { type: Number, required: true },
    total_expense_amount: { type: Number, required: true },
    total_expense_amount_usd: { type: Number, required: true },
    difference: { type: Number, required: true },
    difference_usd: { type: Number, required: true },
    reciept_number: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const DailyClosureModel = model<IDailyClosureDto>('DailyClosure', dailyClosureSchema)