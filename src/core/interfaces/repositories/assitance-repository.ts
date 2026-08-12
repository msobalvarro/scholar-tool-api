import { AssitanceSchema } from '@/infrastructure/database/schemas/assitance-schema'
import { Assistance } from '../dtos'

/**
 * @deprecated
 * se crea para mantener la compatibilidad con el codigo existente.
 * en su lugar usar: student-assistence-repository.ts
 */
export interface IAssistanceRepository {
  /**
   * @deprecated
   * crea una asistencia multimple por clase
   * este metodo va a ser removido en un futuro
   * 
   */
  createAssistance(assitance: AssitanceSchema): Promise<Assistance>
}
