import { StudentAssistenceSchema } from '@/infrastructure/database/schemas/student-assistence-schema'
import { StudentAssistence } from '../dtos/student-assistence'

export interface IStudentAssistenceRepository {
  /**
   * crear una asistencia individual para cada estudiante
   * este metodo se ejecuta cuando la asistencia se de por medio de un código QR
   * @param assistence 
   * @param institutionId 
   */
  createAssitence(assistence: StudentAssistenceSchema, institutionId: string): Promise<StudentAssistence>

  /**
   * obtener todas las asistencias
   * @param studentId 
   * @param institutionId 
   */
  getAllAssitencesByStudent(studentId: string, institutionId: string): Promise<StudentAssistence[]>
}
