import { model, Schema } from 'mongoose'
import { TeacherAuth } from '@/core/interfaces/dtos'

const teacherAuthSchema = new Schema<TeacherAuth>(
  {
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    lastLogin: Date,
    password: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const TeacherAuthModel = model('TeacherAuth', teacherAuthSchema)
