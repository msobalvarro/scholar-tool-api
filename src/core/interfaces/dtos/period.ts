import { Institution } from './institution'

export type Period = {
  _id?: string
  name: string
  startDate: Date
  endDate: Date
  institution: Institution
}
