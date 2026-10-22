import { SearhTaskScheduleByUserInstitutionQuery, TaskScheduleSchema } from '@/infrastructure/schemas/task-schedule-schema';
import { TaskSchedule } from '../dtos/task-schedule';

export type ScheduleByTeacherQuery = {
  month: number
  year: number
}

export interface ITaskScheduleService {
  /**
   * Crea un cronograma de tareas, y lo envia a estado pendiente, es generado por un teacher
   * @param taskSchedule Datos del cronograma de tareas.
   * @param institutionId ID de la institución.
   * @param teacherId ID del profesor.
   */
  createTaskSchedule(taskSchedule: TaskScheduleSchema, institutionId: string, teacherId: string): Promise<TaskSchedule>

  /**
   * Actualiza un cronograma de tareas, solo si el cronograma esta en estado pendiente. este servicio es ejecutado por un usuario de institucion
   * @param taskSchedule Datos del cronograma de tareas.
   * @param institutionId ID de la institución.
   * @param teacherId ID del profesor.
   * @param taskId ID del cronograma de tareas.
   */
  updateTaskSchedule(taskSchedule: TaskScheduleSchema, institutionId: string, teacherId: string, taskId: string): Promise<TaskSchedule | null>

  /**
   * Obtiene todos los cronogramas de tareas por mes y año, este servicio es ejecutado por un usuario de institucion.
   * @param month Mes del cronograma de tareas.
   * @param year Año del cronograma de tareas.
   * @param institutionId ID de la institución.
   */
  getTaskScheduleByMonthAndYear(query: SearhTaskScheduleByUserInstitutionQuery, institutionId: string): Promise<TaskSchedule[]>

  /**
   * Obtiene todos los cronogramas de tareas por profesor, este servicio es ejecutado por un usuario de teacher.
   * @param params Parámetros del cronograma de tareas.
   * @param teacherId ID del profesor.
   * @param institutionId ID de la institución.
   */
  getScheduleByTeacher(params: ScheduleByTeacherQuery, teacherId: string, institutionId: string): Promise<TaskSchedule[]>

  /**
   * Obtiene todos los cronogramas de tareas por estudiante, este servicio es ejecutado por un usuario de padres de familia.
   * @param id ID del estudiante.
   */
  getTaskScheduleByStudentById(id: string): Promise<TaskSchedule>

  /**
   * Actualiza un cronograma de tareas, solo si el cronograma esta en estado pendiente. este servicio es ejecutado por un usuario de teacher.
   * @param taskSchedule Datos del cronograma de tareas.
   * @param institutionId ID de la institución.
   * @param teacherId ID del profesor.
   * @param taskId ID del cronograma de tareas.
   */
  updateTaskSchedule(taskSchedule: TaskScheduleSchema, institutionId: string, teacherId: string, taskId: string): Promise<TaskSchedule | null>
}
