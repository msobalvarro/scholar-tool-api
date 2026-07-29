import { IEnrollment } from './enrollment';
import { UserInstitution } from './user-institution';

export interface EnrollmentHistoryChanges {
  enrollment: IEnrollment
  prevEnrollmentPrice: number
  prevMonthlyPaymentPrice: number
  newEnrollmentPrice: number
  newMonthlyPaymentPrice: number
  user: UserInstitution
}