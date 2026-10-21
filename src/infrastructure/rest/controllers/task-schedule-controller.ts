import { Context } from 'hono'
import { Inject, Service } from 'typedi'
import { TaskScheduleService } from '@/core/services/task-schedule-service'
import {
  taskScheduleSchema,
  TaskScheduleSchema
} from '@/infrastructure/schemas/task-schedule-schema'

@Service()
export class TaskScheduleController {
  @Inject(() => TaskScheduleService)
  private taskScheduleService!: TaskScheduleService

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = taskScheduleSchema.parse(body) as TaskScheduleSchema
    const user = c.get('jwtPayload')
    const teacherId = user._id

    return c.json(
      await this.taskScheduleService.createTaskSchedule(parsedBody, user.institutionId, teacherId)
    )
  }

  approve = async (c: Context) => {
    const taskScheduleId = c.req.param('id')
    const user = c.get('jwtPayload')

    return c.json(
      await this.taskScheduleService.approveTaskSchedule(taskScheduleId, user._id)
    )
  }

  getByMonthAndYear = async (c: Context) => {
    const month = Number(c.req.param('month'))
    const year = Number(c.req.param('year'))
    const user = c.get('jwtPayload')

    return c.json(
      await this.taskScheduleService.getTaskScheduleByMonthAndYear(month, year, user.institutionId)
    )
  }

  getScheduleByTeacher = async (c: Context) => {
    const month = Number(c.req.query('month'))
    const year = Number(c.req.query('year'))
    const user = c.get('jwtPayload')

    return c.json(
      await this.taskScheduleService.getScheduleByTeacher({ month, year }, user._id, user.institutionId)
    )
  }
}
