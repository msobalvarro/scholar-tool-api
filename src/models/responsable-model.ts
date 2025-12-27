import { ResponsablePerson } from '@/utils/types'
import { model, Schema } from "mongoose"

const responsableSchema = new Schema<ResponsablePerson>(
  {
    fullName: { type: String, required: true },
    identification: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    direction: { type: String, required: true },
    city: { type: String, required: true },
    type: {
      type: String,
      enum: ['father', 'mother', 'grandfather', 'uncle', 'other'],
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const ResponsableModel = model('ResponsablePerson', responsableSchema)