import { Student } from './student'
import { Course } from './course'
import { Institution } from './institution'

/*
# DEPRECATED
Este modelo está siendo usado en varias partes del proyecto.

*/
export type Matricule = {
  _id?: any
  student: Student
  course: Course
  status: 'active' | 'inactive'
  institution: Institution
  year: number
}
