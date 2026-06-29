import { model, Schema } from 'mongoose'
import { Institution } from '@/core/interfaces/dtos'

const institutionSchema = new Schema<Institution>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: false },
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const InstitutionModel = model('Institution', institutionSchema)