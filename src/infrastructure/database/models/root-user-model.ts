import { model, Schema } from 'mongoose'
import { RootUser } from '@/core/interfaces/dtos/models'

const userRootSchema = new Schema<RootUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    lastLogin: { type: Date, default: null },
  }, {
  versionKey: false,
  timestamps: true,
}
)

export const UserRootModel = model('UserRoot', userRootSchema)
