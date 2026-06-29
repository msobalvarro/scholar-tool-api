import { Institution } from './institution'

export type UserInstitution = {
  _id?: string
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  institution: Institution
  lastLogin: Date
}
