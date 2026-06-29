import { Teacher } from './teacher'
import { Asignature } from './asignature'
import { Course } from './course'

export type Schedule = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  time: string
  teacher?: Teacher
  asignature?: Asignature
  course: Course
}
