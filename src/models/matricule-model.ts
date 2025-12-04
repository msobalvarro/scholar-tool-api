import { Matricule } from '@/utils/types'
import { model, Schema } from 'mongoose'

const matriculeSchema = new Schema<Matricule>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
})

export const MatriculeModel = model('Matricule', matriculeSchema)


