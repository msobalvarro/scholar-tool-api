import { model, Schema } from 'mongoose'
import { RootUser } from '@/utils/types'

const rootUserSchema = new Schema<RootUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
})

export const RootUserModel = model('RootUser', rootUserSchema)
