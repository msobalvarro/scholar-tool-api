import { Schedule } from '@/utils/types'
import { model, Schema } from 'mongoose'

const scheduleSchema = new Schema<Schedule>({
  day: { type: String, required: true, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: false },
  asignature: { type: Schema.Types.ObjectId, ref: 'Asignature', required: false },
  isFree: { type: Boolean, required: false },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
})

export const ScheduleModel = model('Schedule', scheduleSchema)