import { ResponsablePersonSchema, ResponsablePersonUpdate } from '@/infrastructure/database/schemas/responsable-schema'
import { ResponsablePerson } from '../dtos/models'

export interface IResponsableRepository {
  createResponsable(responsable: ResponsablePersonSchema): Promise<ResponsablePerson>
  updateResponsable(responsable: ResponsablePersonUpdate): Promise<void>
  deleteResponsable(id: string): Promise<void>
  getAllResponsables(): Promise<ResponsablePerson[]>
  getResponsableById(id: string): Promise<ResponsablePerson | null>
  searchResponsable(search: string): Promise<ResponsablePerson[]>
}
