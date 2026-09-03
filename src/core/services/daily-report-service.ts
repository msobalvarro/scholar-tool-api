import { CreateDailyReportSchema } from '@/infrastructure/schemas/daily-reports-schema'
import { IDailyReportService } from '@/core/interfaces/service/daily-report-service'
import { IDailyReporttDto } from '@/core/interfaces/dtos'
import { Service, Inject } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats'
import { UserInstitutionService } from './user-institution-service'

@Service()
export class DailyReportService implements IDailyReportService {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => DateFormatterAdapter)
  private readonly dateFormatterAdapter!: DateFormatterAdapter

  @Inject(() => UserInstitutionService)
  private readonly userInstitutionService!: UserInstitutionService

  async create(data: CreateDailyReportSchema, institutionId: string, userId: string): Promise<IDailyReporttDto> {
    const user_institution = await this.userInstitutionService.getActiveUserInstitution(userId)
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    return await this.ORM.models.DailyReportModel.create({ ...data, institution, user_institution })
  }

  async getDailyReportsByDate(institutionId: string, from?: string, to?: string): Promise<IDailyReporttDto[]> {
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
