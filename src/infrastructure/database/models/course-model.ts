import { Course } from '@/core/interfaces/dtos/models'
import { model, Schema } from 'mongoose'

const courseSchema = new Schema<Course>(
  {
    name: { type: String, required: true },
    groupName: { type: String, required: true },
    teacherLead: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
    order: { type: Number, required: true },
    breakTime: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const CourseModel = model('Course', courseSchema)