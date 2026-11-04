import { ClassSchedule, TimeTableSlot } from '@/core/interfaces/dtos';
import { model, Schema } from 'mongoose';

const timeTableSlotSchema = new Schema<TimeTableSlot>(
  {
    asignature: { type: Schema.Types.ObjectId, ref: 'asignature' },
    startTime: { type: String },
    endTime: { type: String },
    isBreak: { type: Boolean }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

const classScheduleSchema = new Schema<ClassSchedule>(
  {
    course: { type: Schema.Types.ObjectId, ref: 'course' },
    dayOfWeek: { type: String, enum: ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'] },
    timeSlots: { type: [timeTableSlotSchema], default: [] },
    institution: { type: Schema.Types.ObjectId, ref: 'institution' }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

export const ClassScheduleModel = model<ClassSchedule>('classSchedule', classScheduleSchema)