import { IEnrollment } from './enrollment'

export interface IEnrollmentPayment {
  _id: string
  month: number
  year: number
  paymentDate: Date
  enrollment: IEnrollment
  total: number
  cancelled: boolean
  balance: number
  isUSD: boolean
}
