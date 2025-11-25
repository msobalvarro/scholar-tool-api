import { model, Schema } from 'mongoose'
import { Teacher } from '@/utils/types'

const teacherSchema = new Schema<Teacher>(
  {
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    phoneNumber: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const TeacherModel = model('Teacher', teacherSchema)