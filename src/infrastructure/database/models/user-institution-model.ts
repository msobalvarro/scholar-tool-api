import { model, Schema } from 'mongoose'
import { UserInstitution } from '@/core/interfaces/dtos'

const userInstitutionSchema = new Schema<UserInstitution>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    lastLogin: { type: Date, default: null },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const UserInstitutionModel = model('UserInstitution', userInstitutionSchema)
