import { Course } from './course'
import { Institution } from './institution'

export type CalendarEventType = 'exam' | 'task' | 'meeting' | 'holiday' | 'class' | 'other'

export interface CalendarEvents {
  date: Date
  type: CalendarEventType
  title: string
  description: string
  course: Course | null
  institution: Institution
}
