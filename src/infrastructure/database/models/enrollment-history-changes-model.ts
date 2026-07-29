import { EnrollmentHistoryChanges } from '@/core/interfaces/dtos/enrollment-history-changes';
import { model, Schema } from 'mongoose';

const enrollmentHistoryChangesSchema = new Schema<EnrollmentHistoryChanges>(
  {
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment' },
    prevEnrollmentPrice: { type: Number, required: true },
    prevMonthlyPaymentPrice: { type: Number, required: true },
    newEnrollmentPrice: { type: Number, required: true },
    newMonthlyPaymentPrice: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'UserInstitution' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const EnrollmentHistoryChangesModel = model<EnrollmentHistoryChanges>('EnrollmentHistoryChanges', enrollmentHistoryChangesSchema)