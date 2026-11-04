import { ClassSchedule } from '../dtos';
import { ClassScheduleSchema } from '../input/class-schedule';

export interface IClassScheduleService {
  /**
   * @description Crea un nuevo registro de horario por curso
   * @param payload Datos del horario
   * @param institutionId ID de la institución
   */
  createClassSchedule(payload: ClassScheduleSchema, institutionId: string): Promise<ClassSchedule>
}