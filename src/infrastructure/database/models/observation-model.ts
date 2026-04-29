import { model, Schema } from 'mongoose'
import { Observations } from '@/core/interfaces/dtos/models'

const observationSchema = new Schema<Observations>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    type: { type: String, required: true, enum: ['negative', 'positive'] },
    observation: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    photo: { type: String, required: false }
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const ObservationModel = model('Observation', observationSchema)
