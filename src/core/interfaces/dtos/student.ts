import { Institution } from './institution'
import { ResponsablePerson } from './responsable'

export type Student = {
  _id?: any
  birthday: Date
  firstName: string
  lastName: string
  institution: Institution
  status: 'active' | 'inactive'
  gender: 'male' | 'female'
  photo?: string
  email?: string
  responsable?: ResponsablePerson
}
