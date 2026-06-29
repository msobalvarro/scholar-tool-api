import { AssitanceSchema } from '@/infrastructure/database/schemas/assitance-schema'
import { Assistance } from '../dtos'

export interface IAssistanceRepository {
  createAssistance(assitance: AssitanceSchema): Promise<Assistance>
}
