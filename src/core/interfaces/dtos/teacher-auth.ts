import { Teacher } from './teacher'

export type TeacherAuth = {
  teacher: Teacher
  lastLogin: Date
  password: string
}
