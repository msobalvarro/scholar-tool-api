import { ObservationSchema } from '@/infrastructure/database/schemas/observation-schema'
import { Observations } from '../dtos'

export interface IObservationRepository {
  createObservation(payload: ObservationSchema, teacherId: string): Promise<Observations>
  getObservationsByStudent(studentId: string): Promise<Observations[]>
}
