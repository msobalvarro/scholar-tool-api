import { CreateDailyReportSchema } from '@/infrastructure/schemas/daily-reports-schema'
import { IDailyReportService } from '@/core/interfaces/service/daily-report-service'
import { IDailyReportStudentDto } from '@/core/interfaces/dtos'
import { Service, Inject } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats'

@Service()
export class DailyReportService implements IDailyReportService {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => DateFormatterAdapter)
  private readonly dateFormatterAdapter!: DateFormatterAdapter

  async create(data: CreateDailyReportSchema, institutionId: string): Promise<IDailyReportStudentDto> {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    return await this.ORM.models.DailyReportModel.create({ ...data, institution })
  }

  async getDailyReportsByDate(institutionId: string, from?: string, to?: string): Promise<IDailyReportStudentDto[]> {
    await this.institutionService.getActiveInstitution(institutionId)

    const fromDate = this.dateFormatterAdapter.toGteAndLteDate(from).gte
    const toDate = this.dateFormatterAdapter.toGteAndLteDate(to).lte

    return await this.ORM.models.DailyReportModel.find({
      institution: { _id: institutionId },
      date: {
        $gte: fromDate,
        $lte: toDate,
      },
    })
  }
}
