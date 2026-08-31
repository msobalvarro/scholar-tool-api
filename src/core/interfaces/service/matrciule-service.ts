import { MatriculeSchema as MatriculeSchema, MatriculeUpdateSchema } from '@/infrastructure/schemas/matricule-schema'
import { Matricule as MatriculeDto } from '../dtos'

export interface IMatriculeRepository {
  createMatricule(matricule: MatriculeSchema, institutionId: string): Promise<MatriculeDto>
  updateMatricule(matricule: MatriculeUpdateSchema): Promise<void>
  deleteMatricule(_id: string): Promise<void>
  getAllMatricules(institutionId: string): Promise<MatriculeDto[]>
  getMatriculeById(_id: string): Promise<MatriculeDto | null>
  getActiveMatricule(studentId: string): Promise<MatriculeDto>

  /**
   * Obtiene las matriculas por curso
   * @param institutionId 
   * @param courseId 
   */
  getMatriculesByCourse(institutionId: string, courseId: string): Promise<MatriculeDto[]>
}
