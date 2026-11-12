import { ClassSchedule, TimeTableSlot } from '@/core/interfaces/dtos';
import { model, Schema } from 'mongoose';

const timeTableSlotSchema = new Schema<TimeTableSlot>(
  {
    asignature: { type: Schema.Types.ObjectId, ref: 'Asignature' },
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
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    dayOfWeek: { type: String, enum: ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'], required: true },
    timeSlots: { type: [timeTableSlotSchema], default: [] },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    year: { type: Number, required: true }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

export const ClassScheduleModel = model<ClassSchedule>('classSchedule', classScheduleSchema)