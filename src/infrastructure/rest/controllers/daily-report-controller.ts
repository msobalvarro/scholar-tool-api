import { createDailyReportSchema, CreateDailyReportSchema } from '@/infrastructure/schemas/daily-reports-schema'
import { DailyReportService } from '@/core/services/daily-report-service'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class DailyReportController {
  @Inject(() => DailyReportService)
  dailyReportService!: DailyReportService

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = createDailyReportSchema.parse(body) as CreateDailyReportSchema
    const user = c.get('jwtPayload')

    const data = { ...parsedBody, institution: user.institutionId }
    const report = await this.dailyReportService.create(data)

    return c.json(report)
  }

  getByDate = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { from, to } = c.req.query() as { from: string; to: string }

    const reports = await this.dailyReportService.getDailyReportsByDate(user.institutionId, from, to)

    return c.json(reports)
  }
}
