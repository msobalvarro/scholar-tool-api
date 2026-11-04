import { createClassScheduleSchema } from '@/infrastructure/schemas/class-schedule-schema'
import { ClassScheduleService } from '@/core/services/class-schedule-service'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class ClassScheduleController {
  @Inject(() => ClassScheduleService)
  private scheduleService!: ClassScheduleService

  createSchedule = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await createClassScheduleSchema.parse(body)
    const user = c.get('jwtPayload')

    return c.json(
      await this.scheduleService.createClassSchedule(parsedBody, user.institution)
    )
  }

  getAllSchedulesByCourseAndYear = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { courseId, year } = c.req.param()
    return c.json(
      await this.scheduleService.getClassScheduleByCourseAndYear(courseId, +year, user.institution)
    )
  }
}
