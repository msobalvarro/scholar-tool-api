import { Asignature } from '@/utils/types'
import { model, Schema } from 'mongoose'

const asignatureSchema = new Schema<Asignature>(
  {
    name: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const AsignatureModel = model('Asignature', asignatureSchema)