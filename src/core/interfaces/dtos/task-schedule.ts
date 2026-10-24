import { Asignature } from './asignature';
import { Course } from './course';
import { Institution } from './institution';
import { Teacher } from './teacher';
import { UserInstitution } from './user-institution';

export interface TaskSchedule {
  _id?: string
  teacher: Teacher
  asignature: Asignature
  month: number
  year: number
  aproved?: boolean
  aprovedBy?: UserInstitution | null
  scheduleUnit: ScheduleUnit[]
  course: Course
  institution: Institution
}

export interface ScheduleUnit {
  unitName: string
  tasks: TaskDetail[]
}

export interface TaskDetail {
  content: string
  evaluationMethod: string
  page: string | null
  inNotebook: boolean
  date: Date
  points: number
}
