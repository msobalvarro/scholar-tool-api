import {
  Schedule,
  scheduleSchema,
  ScheduleUpdate,
  scheduleUpdateSchema
} from '@/schemas/schedule-schema'
import { scheduleService } from '@/services/schedule-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class ScheduleController {
  async createSchedule(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = await scheduleSchema.parse(body) as Schedule
      const scheduleCreated = await scheduleService.createSchedule(parsedBody)

      return c.json(scheduleCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getScheduleById(c: Context) {
    try {
      const id = c.req.param('id')
      const schedule = await scheduleService.getScheduleById(id)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getScheduleByCourseId(c: Context) {
    try {
      const courseId = c.req.param('courseId')
      const schedule = await scheduleService.getScheduleByCourseId(courseId)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getScheduleByTeacherId(c: Context) {
    try {
      const teacherId = c.req.param('teacherId')
      const schedule = await scheduleService.getScheduleByTeacherId(teacherId)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getScheduleByAsignatureId(c: Context) {
    try {
      const asignatureId = c.req.param('asignatureId')
      const schedule = await scheduleService.getScheduleByAsignatureId(asignatureId)
      return c.json(schedule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async updateSchedule(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = await scheduleUpdateSchema.parse(body) as ScheduleUpdate
      const scheduleUpdated = await scheduleService.updateSchedule(parsedBody)
      return c.json(scheduleUpdated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async deleteSchedule(c: Context) {
    try {
      const id = c.req.param('id')
      const scheduleDeleted = await scheduleService.deleteSchedule(id)
      return c.json(scheduleDeleted)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const scheduleController = new ScheduleController()
