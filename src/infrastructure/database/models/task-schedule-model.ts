import { TaskSchedule, ScheduleUnit, TaskDetail } from '@/core/interfaces/dtos/task-schedule'
import { model, Schema } from 'mongoose'

const TaskDetailSchema = new Schema<TaskDetail>(
  {
    content: { type: String, required: true },
    evaluationMethod: { type: String, required: true },
    page: { type: String, default: null },
    inNotebook: { type: Boolean, required: true },
    date: { type: Date, required: true },
    points: { type: Number, required: true },
  },
  { _id: false }
)

const ScheduleUnitSchema = new Schema<ScheduleUnit>(
  {
    unitName: { type: String, required: true },
    tasks: { type: [TaskDetailSchema], default: [] },
  },
  { _id: false }
)

const TaskScheduleSchema = new Schema<TaskSchedule>(
  {
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    asignature: { type: Schema.Types.ObjectId, ref: 'Asignature', required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    aproved: { type: Boolean, default: false },
    aprovedBy: { type: Schema.Types.ObjectId, ref: 'UserInstitution', default: null },
    scheduleUnit: { type: [ScheduleUnitSchema], default: [] },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const TaskScheduleModel = model<TaskSchedule>('TaskSchedule', TaskScheduleSchema)
