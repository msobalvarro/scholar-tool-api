import {
  Schedule,
  scheduleSchema,
  ScheduleUpdate,
  scheduleUpdateSchema
} from '@/infrastructure/database/schemas/schedule-schema'
import { ScheduleService } from '@/core/services/schedule-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) { }

  createSchedule = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await scheduleSchema.parse(body) as Schedule
    const scheduleCreated = await this.scheduleService.createSchedule(parsedBody)

    return c.json(scheduleCreated)
  }

  getScheduleById = async (c: Context) => {
    const id = c.req.param('id')
    const schedule = await this.scheduleService.getScheduleById(id)
    return c.json(schedule)
  }

  getScheduleByCourseId = async (c: Context) => {
    const courseId = c.req.param('courseId')
    const schedule = await this.scheduleService.getScheduleByCourseId(courseId)
    return c.json(schedule)
  }

  getScheduleByTeacherId = async (c: Context) => {
    const teacherId = c.req.param('teacherId')
    const schedule = await this.scheduleService.getScheduleByTeacherId(teacherId)
    return c.json(schedule)
  }

  getScheduleByAsignatureId = async (c: Context) => {
    const asignatureId = c.req.param('asignatureId')
    const schedule = await this.scheduleService.getScheduleByAsignatureId(asignatureId)
    return c.json(schedule)
  }

  updateSchedule = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await scheduleUpdateSchema.parse(body) as ScheduleUpdate
    const scheduleUpdated = await this.scheduleService.updateSchedule(parsedBody)
    return c.json(scheduleUpdated)
  }

  deleteSchedule = async (c: Context) => {
    const id = c.req.param('id')
    const scheduleDeleted = await this.scheduleService.deleteSchedule(id)
    return c.json(scheduleDeleted)
  }
}
