import { Schedule } from './schedule'
import { Teacher } from './teacher'
import { Institution } from './institution'

export interface Course {
  _id?: string
  name: string
  schedules: Schedule[]
  groupName: string
  teacherLead: Teacher
  institution: Institution
  order: number
  maxCapacity: number
}
