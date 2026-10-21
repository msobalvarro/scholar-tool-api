import { TaskScheduleSchema } from '@/infrastructure/schemas/task-schedule-schema';
import { TaskSchedule } from '../dtos/task-schedule';

export interface ITaskScheduleService {
  createTaskSchedule(taskSchedule: TaskScheduleSchema, institutionId: string, teacherId: string): Promise<TaskSchedule>
  approveTaskSchedule(taskScheduleId: string, userId: string): Promise<TaskSchedule | null>
  getTaskScheduleByMonthAndYear(month: number, year: number, institutionId: string): Promise<TaskSchedule[]>
  getTaskScheduleByStudentById(id: string): Promise<TaskSchedule>
}
