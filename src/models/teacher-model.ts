import { model, Schema } from 'mongoose'
import { Teacher } from '@/utils/types'

const teacherSchema = new Schema<Teacher>(
  {
    name: String,
    birthday: String,
    email: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    phoneNumber: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const TeacherModel = model('Teacher', teacherSchema)