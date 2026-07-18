import { CalendarEvents } from '@/core/interfaces/dtos/calendar-events'
import { model, Schema } from 'mongoose'

const calendarEventSchema = new Schema<CalendarEvents>(
  {
    date: { type: Date, required: true },
    type: { type: String, required: true, enum: ['exam', 'task', 'meeting', 'holiday', 'class', 'other'] },
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: false },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const CalendarEventModel = model('CalendarEvents', calendarEventSchema)