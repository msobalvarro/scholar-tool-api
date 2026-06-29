import { Institution } from './institution'

export type Asignature = {
  _id?: string
  name: string
  description: string
  status: 'active' | 'inactive'
  institution: Institution
}
