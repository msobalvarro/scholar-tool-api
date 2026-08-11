import { StudentAssistenceSchema } from '@/infrastructure/database/schemas/student-assistence-schema'
import { StudentAssistence } from '../dtos/student-assistence'

export interface IStudentAssistenceRepository {
  createAssitence(assistence: StudentAssistenceSchema, institutionId: string): Promise<StudentAssistence>
  getAllAssitences(insutionId: string): Promise<StudentAssistence[]>
}
