import {
  InstitutionSchema,
  UpdateInstitutionSchema,
  DeleteInstitutionSchema,
  AssignUserToInstitutionSchema,
  RemoveUserFromInstitutionSchema
} from '@/infrastructure/database/schemas/institution-schema'
import { Institution } from '../dtos'

export interface IInstitutionRepository {
  getInstitutions(): Promise<Institution[]>
  getInstitutionById(id: string): Promise<Institution | null>
  createInstitution(payload: InstitutionSchema): Promise<Institution>
  updateInstitution(payload: UpdateInstitutionSchema): Promise<Institution | null>
  deleteInstitution(payload: DeleteInstitutionSchema): Promise<Institution | null>
  assignUserToInstitution(payload: AssignUserToInstitutionSchema): Promise<Institution | null>
  removeUserFromInstitution(payload: RemoveUserFromInstitutionSchema): Promise<Institution | null>
}
