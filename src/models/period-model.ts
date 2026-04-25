import { Period } from '@/interfaces/dtos/models'
import { model, Schema } from 'mongoose'

const PeriodSchema = new Schema<Period>(
  {
    name: String,
    startDate: Date,
    endDate: Date,
    institution: {
      type: Schema.Types.ObjectId,
      ref: 'Institution'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const PeriodModel = model('Period', PeriodSchema);