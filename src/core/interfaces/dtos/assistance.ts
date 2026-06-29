import { Course } from './course'
import { Teacher } from './teacher'
import { Student } from './student'

export type Assistance = {
  course: Course
  teacher: Teacher
  date: Date
  observation: string
  studentsPresents: Student[]
  studentsAbsent: Student[]
}
