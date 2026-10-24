import { ResponsablePersonSchema, ResponsablePersonUpdate } from '@/infrastructure/schemas/responsable-schema'
import { ResponsablePerson } from '../dtos'

export interface IResponsableRepository {
  createResponsable(responsable: ResponsablePersonSchema): Promise<ResponsablePerson>
  updateResponsable(responsable: ResponsablePersonUpdate): Promise<void>
  deleteResponsable(id: string): Promise<void>
  getAllResponsables(): Promise<ResponsablePerson[]>
  getResponsableById(id: string): Promise<ResponsablePerson | null>
  getActiveResponsable(id: string): Promise<ResponsablePerson>
  searchResponsable(search: string): Promise<ResponsablePerson[]>

  /**
   * Obtienes todos los responsables por curso
   * @param courseId id del curso
   */
  getResponsablesByCourse(courseId: string): Promise<ResponsablePerson[]>
}
