import { Student } from './student'
import { ResponsablePerson } from './responsable'

export type Devices = {
  token: string
  role: 'responsable' | 'student'
  student?: Student
  responsable?: ResponsablePerson
}
