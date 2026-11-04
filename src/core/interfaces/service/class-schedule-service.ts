import { ClassSchedule } from '../dtos';
import { ClassScheduleSchema } from '../input/class-schedule';

export interface IClassScheduleService {
  /**
   * @description Crea un nuevo registro de horario por curso
   * @param payload Datos del horario
   * @param institutionId ID de la institución
   */
  createClassSchedule(payload: ClassScheduleSchema, institutionId: string): Promise<ClassSchedule>

  /**
   * @description Obtiene todos los horarios de un curso 
   * @param courseId ID del curso
   * @param year Año
   * @param institutionId ID de la institución
   */
  getClassScheduleByCourseAndYear(courseId: string, year: number, institutionId: string): Promise<ClassSchedule[]>
}