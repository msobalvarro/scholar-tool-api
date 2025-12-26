import { Student } from '@/utils/types'
import { model, Schema } from "mongoose"

const studentSchema = new Schema<Student>(
  {
    birthday: { type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    gender: { type: String, enum: ['male', 'female'], required: true },
    photo: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    responsable: { type: Schema.Types.ObjectId, ref: 'ResponsablePerson' }
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const StudentModel = model('Student', studentSchema)