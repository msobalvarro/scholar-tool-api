import { ITaskSchema, ITaskUpdate } from '@/infrastructure/database/schemas/task-schema'
import { Task } from '../dtos'

export interface ITaskService {
  /**
   * Crea una nueva tarea y notifica a todos los estudiantes por aula
   * @param payload Datos de la tarea
   * @param institutionId ID de la institución
   * @param teacherId ID del profesor
   */
  createTask(payload: ITaskSchema, institutionId: string, teacherId: string): Promise<Task>
  /**
   * Obtiene todas las tareas de un curso.
   * @param courseId ID del curso
   * @param date Fecha
   */
  getTasksByCourse(courseId: string, date: string): Promise<Task[]>
  /**
   * Obtiene todas las tareas de una asignatura.
   * @param asignatureId ID de la asignatura
   * @param courseId ID del curso
   */
  getTasksByAsignature(asignatureId: string, courseId: string): Promise<Task[]>
}