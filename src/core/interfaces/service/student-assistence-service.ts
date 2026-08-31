import { StudentAssistenceSchema } from '@/infrastructure/schemas/student-assistence-schema'
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

  /**
   * Obtiene los ultimos 10 registros de asistencia de todos los estudiantes
   * @param institutionId 
   */
  getLastAssitences(institutionId: string): Promise<StudentAssistence[]>

  /**
   * Obtiene las asistencia del dia o fecha personalizada
   * @param institutionId 
   * @param date 
   */
  getAssitencesByDate(institutionId: string, date?: string): Promise<StudentAssistence[]>

  /**
   * Obtiene las asistencias por curso
   * @param institutionId 
   * @param courseId 
   * @param date fecha en formato string con el formato yyyy-mm-dd
   */
  getAssitencesByCourse(institutionId: string, courseId: string, date: string): Promise<StudentAssistence[]>
}
