import { model, Schema } from 'mongoose'
import { Devices } from '@/core/interfaces/dtos'

const deviceSchema = new Schema<Devices>(
  {
    token: { type: String, required: true },
    role: { type: String, required: true, enum: ['responsable', 'student'] },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: false },
    responsable: { type: Schema.Types.ObjectId, ref: 'ResponsablePerson', required: false }
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const DeviceModel = model('Device', deviceSchema)