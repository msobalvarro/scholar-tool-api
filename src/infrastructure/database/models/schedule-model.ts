import { Schedule } from '@/core/interfaces/dtos/models'
import { model, Schema } from 'mongoose'

const scheduleSchema = new Schema<Schedule>(
  {
    day: { type: String, required: true, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] },
    time: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: false },
    asignature: { type: Schema.Types.ObjectId, ref: 'Asignature', required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const ScheduleModel = model('Schedule', scheduleSchema)