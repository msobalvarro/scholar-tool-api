import { ResponsablePerson } from '@/core/interfaces/dtos'
import { model, Schema } from "mongoose"

const responsableSchema = new Schema<ResponsablePerson>(
  {
    fullName: { type: String, required: true },
    identification: { type: String, required: true },
    email: { type: String, required: true, unique: true, sparse: true },
    phoneNumber: { type: String, required: true, unique: true },
    direction: { type: String, required: true },
    isEmergencyContact: { type: Boolean, required: true, default: false },
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