import {
  scheduleSchema,
} from '@/infrastructure/schemas/schedule-schema'
import { ClassScheduleService } from '@/core/services/schedule-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class ClassScheduleController {
  constructor(private scheduleService: ClassScheduleService) { }

  createSchedule = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await scheduleSchema.parse(body)

    return c.json(
      await this.scheduleService.createSchedule(parsedBody)
    )
  }

  // getScheduleById = async (c: Context) => {
  //   const id = c.req.param('id')
  //   return c.json(
  //     await this.scheduleService.getScheduleById(id)
  //   )
  // }

  // getScheduleByCourseId = async (c: Context) => {
  //   const courseId = c.req.param('courseId')
  //   return c.json(
  //     await this.scheduleService.getScheduleByCourseId(courseId)
  //   )
  // }

  // getScheduleByTeacherId = async (c: Context) => {
  //   const teacherId = c.req.param('teacherId')
  //   return c.json(
  //     await this.scheduleService.getScheduleByTeacherId(teacherId)
  //   )
  // }

  // getScheduleByAsignatureId = async (c: Context) => {
  //   const asignatureId = c.req.param('asignatureId')
  //   return c.json(
  //     await this.scheduleService.getScheduleByAsignatureId(asignatureId)
  //   )
  // }

  // updateSchedule = async (c: Context) => {
  //   const body = await c.req.json()
  //   const parsedBody = await scheduleUpdateSchema.parse(body) as ScheduleUpdate
  //   return c.json(
  //     await this.scheduleService.updateSchedule(parsedBody)
  //   )
  // }

  // deleteSchedule = async (c: Context) => {
  //   const id = c.req.param('id')
  //   return c.json(
  //     await this.scheduleService.deleteSchedule(id)
  //   )
  // }
}
