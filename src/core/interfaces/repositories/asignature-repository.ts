import { AsignatureSchema } from '@/infrastructure/database/schemas/asignature-schema'
import { Asignature } from '../dtos'

export interface IAsignatureRepository {
  createAsignature(asignature: AsignatureSchema, institutionId: string): Promise<Asignature>
  getAsignatureById(id: string): Promise<Asignature | null>
  updateAsignature(asignature: AsignatureSchema, _id: string): Promise<Asignature | null>
  deleteAsignature(id: string): Promise<Asignature | null>
  getAllAsignatures(institutionId: string): Promise<Asignature[]>
}
