import { model, Schema } from 'mongoose'
import { Institution } from '@/utils/types'

const institutionSchema = new Schema<Institution>({
  name: { type: String, required: true },
  logo: { type: String, required: false },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  users: [{ type: Schema.Types.ObjectId, ref: 'UserInstitution' }],
  teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }]
})

export const InstitutionModel = model('Institution', institutionSchema)