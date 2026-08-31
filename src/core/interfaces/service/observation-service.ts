import { ObservationSchema } from '@/infrastructure/schemas/observation-schema'
import { Observations } from '../dtos'

export interface IObservationRepository {
  createObservation(payload: ObservationSchema, teacherId: string): Promise<Observations>
  getObservationsByStudent(studentId: string): Promise<Observations[]>
}
