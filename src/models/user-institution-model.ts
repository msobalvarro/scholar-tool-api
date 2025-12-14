import { model, Schema } from 'mongoose'
import { UserInstitution } from '@/utils/types'

const userInstitutionSchema = new Schema<UserInstitution>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    lastLogin: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const UserInstitutionModel = model('UserInstitution', userInstitutionSchema)
