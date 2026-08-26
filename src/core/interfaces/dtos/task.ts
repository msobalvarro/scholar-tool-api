import { Institution } from './institution'
import { Teacher } from './teacher'
import { Course } from './course'
import { Asignature } from './asignature'

export type Task = {
  institution: Institution
  teacher: Teacher
  course: Course
  asignature: Asignature
  name: string
  description: string
  dueDate: Date
  score: number
}
