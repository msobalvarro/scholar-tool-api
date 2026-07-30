import { IEnrollmentPayment } from '@/core/interfaces/dtos/enrollment-payments';
import { model, Schema } from 'mongoose';

const enrollmentPaymentSchema = new Schema<IEnrollmentPayment>(
  {
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment', required: true },
    total: { type: Number, required: true },
    cancelled: { type: Boolean, required: true },
    balance: { type: Number, required: true },
    isUSD: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const EnrollmentPaymentModel = model<IEnrollmentPayment>('EnrollmentPayment', enrollmentPaymentSchema)