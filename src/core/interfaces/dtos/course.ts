import { Schedule } from './schedule'
import { Teacher } from './teacher'
import { Institution } from './institution'

export type Course = {
  _id?: any
  name: string
  schedules: Schedule[]
  groupName: string
  teacherLead: Teacher
  institution: Institution
  order: number
  breakTime: string
  maxCapacity: number
}
