import { Course } from './course'
import { Institution } from './institution'

export interface IEnrollment {
  _id: string
  name: string
  courses: Course[]
  year: number
  enrolementPrice: number
  monthlyPaymentPrice: number
  createdAt: string
  updatedAt: string
  institution: Institution
}
