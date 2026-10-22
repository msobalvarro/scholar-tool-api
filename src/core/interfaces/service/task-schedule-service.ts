import { TaskScheduleSchema } from '@/infrastructure/schemas/task-schedule-schema';
import { TaskSchedule } from '../dtos/task-schedule';

export type ScheduleByTeacherQuery = {
  month: number
  year: number
}

export interface ITaskScheduleService {
  createTaskSchedule(taskSchedule: TaskScheduleSchema, institutionId: string, teacherId: string): Promise<TaskSchedule>
  approveTaskSchedule(taskScheduleId: string, userId: string): Promise<TaskSchedule | null>
  getTaskScheduleByMonthAndYear(month: number, year: number, institutionId: string): Promise<TaskSchedule[]>
  getScheduleByTeacher(params: ScheduleByTeacherQuery, teacherId: string, institutionId: string): Promise<TaskSchedule[]>
  getTaskScheduleByStudentById(id: string): Promise<TaskSchedule>
  updateTaskSchedule(taskSchedule: TaskScheduleSchema, institutionId: string, teacherId: string, taskId: string): Promise<TaskSchedule | null>
}
