import { Institution } from './institution'

export type Teacher = {
  _id?: string
  name: string
  birthday: string
  phoneNumber: string
  email: string
  status: 'active' | 'inactive'
  institution: Institution
  photo?: string
}
