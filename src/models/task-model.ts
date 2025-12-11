import { Task } from '@/utils/types'
import { model, Schema } from 'mongoose'

const TaskSchema = new Schema<Task>(
  {
    institution: {
      type: Schema.Types.ObjectId,
      ref: 'Institution'
    },
    period: {
      type: Schema.Types.ObjectId,
      ref: 'Period'
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    asignature: {
      type: Schema.Types.ObjectId,
      ref: 'Asignature'
    },
    name: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'completed', 'unfulfilled', 'incomplete'],
      default: 'pending'
    },
    highestScore: Number,
    score: Number
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const TaskModel = model('Task', TaskSchema)
