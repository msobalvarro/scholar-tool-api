import { Course } from '@/utils/types'
import { model, Schema } from 'mongoose'

const courseSchema = new Schema<Course>({
  name: { type: String, required: true },
  groupName: { type: String, required: true }
})

export const CourseModel = model('Course', courseSchema)