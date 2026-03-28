import {
  Schedule,
  scheduleSchema,
  ScheduleUpdate,
  scheduleUpdateSchema
} from '@/schemas/schedule-schema'
import { ScheduleService } from '@/services/schedule-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) { }
   createSchedule = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = await scheduleSchema.parse(body) as Schedule
      const scheduleCreated = await this.scheduleService.createSchedule(parsedBody)

      return c.json(scheduleCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   getScheduleById = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const schedule = await this.scheduleService.getScheduleById(id)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   getScheduleByCourseId = async (c: Context) => {
    try {
      const courseId = c.req.param('courseId')
      const schedule = await this.scheduleService.getScheduleByCourseId(courseId)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   getScheduleByTeacherId = async (c: Context) => {
    try {
      const teacherId = c.req.param('teacherId')
      const schedule = await this.scheduleService.getScheduleByTeacherId(teacherId)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   getScheduleByAsignatureId = async (c: Context) => {
    try {
      const asignatureId = c.req.param('asignatureId')
      const schedule = await this.scheduleService.getScheduleByAsignatureId(asignatureId)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   updateSchedule = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = await scheduleUpdateSchema.parse(body) as ScheduleUpdate
      const scheduleUpdated = await this.scheduleService.updateSchedule(parsedBody)
      return c.json(scheduleUpdated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   deleteSchedule = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const scheduleDeleted = await this.scheduleService.deleteSchedule(id)
      return c.json(scheduleDeleted)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}
