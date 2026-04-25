import { Schema, model } from 'mongoose'
import { Assistance } from '@/interfaces/dtos/models'

const assistanceSchema = new Schema<Assistance>(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    date: { type: Date, required: true },
    observation: { type: String, required: true },
    studentsPresents: [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
    studentsAbsent: [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const AssistanceModel = model('Assistance', assistanceSchema)