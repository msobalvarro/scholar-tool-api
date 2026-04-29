import { Asignature } from '@/core/interfaces/dtos/models'
import { model, Schema } from 'mongoose'

const asignatureSchema = new Schema<Asignature>(
  {
    name: { type: String, required: true },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    description: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const AsignatureModel = model('Asignature', asignatureSchema)