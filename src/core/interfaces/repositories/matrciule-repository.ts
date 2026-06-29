import { Matricule as MatriculeSchema, MatriculeUpdate } from '@/infrastructure/database/schemas/matricule-schema'
import { Matricule as MatriculeDto } from '../dtos'

export interface IMatriculeRepository {
  createMatricule(matricule: MatriculeSchema, institutionId: string): Promise<MatriculeDto>
  updateMatricule(matricule: MatriculeUpdate): Promise<any>
  deleteMatricule(_id: string): Promise<any>
  getAllMatricules(institutionId: string): Promise<MatriculeDto[]>
  getMatriculeById(_id: string): Promise<MatriculeDto | null>
}
