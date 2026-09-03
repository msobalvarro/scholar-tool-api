import { createDailyReportSchema, CreateDailyReportSchema } from '@/infrastructure/schemas/daily-reports-schema'
import { DailyReportService } from '@/core/services/daily-report-service'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'
import { DailyClosuresService } from '@/core/services/daily-closures-service'

@Service()
export class DailyReportController {
  @Inject(() => DailyReportService)
  dailyReportService!: DailyReportService

  @Inject(() => DailyClosuresService)
  dailyClosuresService!: DailyClosuresService

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = createDailyReportSchema.parse(body) as CreateDailyReportSchema
    const user = c.get('jwtPayload')

    return c.json(
      await this.dailyReportService.create(parsedBody, user.institutionId, user.userId)
    )
  }

  getByDate = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { from, to } = c.req.query() as { from: string; to: string }

    return c.json(
      await this.dailyReportService.getDailyReportsByDate(user.institutionId, from, to)
    )
  }

  close = async (c: Context) => {
    const user = c.get('jwtPayload')

    return c.json(
      await this.dailyClosuresService.create(user.institutionId, user.userId)
    )
  }
}
