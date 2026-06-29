import { ResponsablePerson } from './responsable'
import { Institution } from './institution'

export type Notifications = {
  title: string
  body: string
  responsablePerson: ResponsablePerson
  readed: boolean
  deleted: boolean
  institution: Institution
}
