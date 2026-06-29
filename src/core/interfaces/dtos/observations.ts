import { Student } from './student'
import { Teacher } from './teacher'

export type Observations = {
  student: Student
  teacher: Teacher
  type: 'negative' | 'positive'
  observation: string
  photo?: string
}
