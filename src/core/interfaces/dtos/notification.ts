import { ResponsablePerson } from './responsable'
import { Institution } from './institution'
import { Course } from './course'
import { Student } from './student'

export type Notifications = {
  title: string
  body: string
  responsablePerson?: ResponsablePerson
  course?: Course
  student?: Student
  readed: boolean
  deleted: boolean
  institution?: Institution
}
