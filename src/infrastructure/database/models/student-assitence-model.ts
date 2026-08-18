import { StudentAssistence } from '@/core/interfaces/dtos/student-assistence';
import mongoose from "mongoose";

const assistenceSchema = new mongoose.Schema<StudentAssistence>(
  {
    student: { type: mongoose.Types.ObjectId, required: true, ref: 'Student' },
    date: { type: Date, required: true },
    assistence: { type: Boolean, required: true },
    matricule: { type: mongoose.Types.ObjectId, required: true, ref: 'Matricule' },
    institution: { type: mongoose.Types.ObjectId, required: true, ref: 'Institution' },
    justification: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const StudentAssistenceModel = mongoose.model<StudentAssistence>("StudentAssistence", assistenceSchema)