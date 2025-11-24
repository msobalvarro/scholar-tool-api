import { Student } from '@/utils/types'
import { model, Schema } from "mongoose"

const studentSchema = new Schema<Student>({
  birthday: { type: Date, required: true },
  startDate: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  intitution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
})

export const StudentModel = model('Student', studentSchema)