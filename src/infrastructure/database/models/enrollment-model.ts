import { IEnrollment } from '@/core/interfaces/dtos/enrollement';
import { Schema, model, now } from 'mongoose';

const enrollment = new Schema<IEnrollment>(
  {
    name: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    year: { type: Number, required: true, default: now().getFullYear() },
    enrollmentPrice: { type: Number, required: true },
    monthlyPaymentPrice: { type: Number, required: true },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const EnrollmentModel = model<IEnrollment>('Enrollment', enrollment)