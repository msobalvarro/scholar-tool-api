import { Matricule } from '@/core/interfaces/dtos/models'
import { model, Schema } from 'mongoose'

const matriculeSchema = new Schema<Matricule>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    year: { type: Number, required: true, default: new Date().getFullYear() },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const MatriculeModel = model('Matricule', matriculeSchema)


