import { Institution } from './institution'

export type Period = {
  _id?: any
  name: string
  startDate: Date
  endDate: Date
  institution: Institution
}
