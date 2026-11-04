import { Asignature } from './asignature'
import { Course } from './course'
import { Institution } from './institution'

export type DayOfWeek = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES'

export interface TimeTableSlot {
  asignature: Asignature
  isBreak: boolean
  startTime: string
  endTime: string
}

export interface ClassSchedule {
  course: Course
  dayOfWeek: DayOfWeek
  institution: Institution
  year: number
  timeSlots: TimeTableSlot[]
}