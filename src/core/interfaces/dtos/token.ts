import { Student } from './student'
import { ResponsablePerson } from './responsable'
import { Institution } from './institution'

export type Token = {
  token: string
  role: 'responsable' | 'student'
  student?: Student
  responsable?: ResponsablePerson
  institution: Institution
}
