import { Student } from './student'
import { Course } from './course'
import { Institution } from './institution'
import { IEnrollment } from './enrollment'

export type Matricule = {
  _id?: any
  student: Student
  course: Course
  status: 'active' | 'inactive'
  institution: Institution
  year: number
  enrollment: IEnrollment
}
