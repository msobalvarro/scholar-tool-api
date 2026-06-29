import { Institution } from './institution'
import { Period } from './period'
import { Teacher } from './teacher'
import { Course } from './course'
import { Asignature } from './asignature'

export type Task = {
  institution: Institution
  period: Period
  teacher: Teacher
  course: Course
  asignature: Asignature
  name: string
  description: string
  status: 'pending' | 'completed' | 'unfulfilled' | 'incomplete'
  highestScore: number
  score: number | null
  dueDate: Date
}
