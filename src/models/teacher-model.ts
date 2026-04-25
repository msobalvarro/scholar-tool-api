import { model, Schema } from 'mongoose'
import { Teacher } from '@/interfaces/dtos/models'

const teacherSchema = new Schema<Teacher>(
  {
    name: String,
    birthday: String,
    email: { type: String, unique: true, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    phoneNumber: String,
    institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
    photo: { type: String, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const TeacherModel = model('Teacher', teacherSchema)