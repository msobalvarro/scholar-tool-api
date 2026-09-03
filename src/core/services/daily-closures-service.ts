import { Inject, Service } from 'typedi'
import { IDailyClosuresService } from '../interfaces/service/daily-closures-service'
import { IDailyClosureDto, IDailyReporttDto } from '../interfaces/dtos'
import { ORM } from '@/infrastructure/database'
import { DailyReportService } from './daily-report-service'
import { InstitutionService } from './institution-service'
import { UserInstitutionService } from './user-institution-service'
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats'

@Service()
export class DailyClosuresService implements IDailyClosuresService {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => DailyReportService)
  private readonly dailyReportService!: DailyReportService

  @Inject(() => DateFormatterAdapter)
  private readonly dateFormatterAdapter!: DateFormatterAdapter

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => UserInstitutionService)
  private readonly userInstitutionService!: UserInstitutionService

  private count_balance(dailyReports: IDailyReporttDto[]) {
    let income = 0, expense = 0, income_usd = 0, expense_usd = 0

    for (const dailyReport of dailyReports) {
      income += dailyReport.income_recorded_amount || 0
      expense += dailyReport.expense_amount || 0
      income_usd += dailyReport.income_recorded_amount_usd || 0
      expense_usd += dailyReport.expense_amount_usd || 0
    }

    return {
      income,
      expense,
      income_usd,
      expense_usd,
      difference_amount: income - expense,
      difference_amount_usd: income_usd - expense_usd,
    }
  }

  async create(institutionId: string, userId: string): Promise<IDailyClosureDto> {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const user_institution = await this.userInstitutionService.getActiveUserInstitution(userId)
    const getTodayDailyReports = await this.dailyReportService.getDailyReportsByDate(institutionId)

    const {
      income,
      expense,
      income_usd,
      expense_usd,
      difference_amount,
      difference_amount_usd,
    } = this.count_balance(getTodayDailyReports)


    return await this.ORM.models.DailyClosureModel.create({
      institution,
      user_institution,
      date: this.dateFormatterAdapter.formatToISOString(),
      total_income_recorded_amount: income,
      total_income_recorded_amount_usd: income_usd,
      total_expense_amount: expense,
      total_expense_amount_usd: expense_usd,
      difference: difference_amount,
      difference_usd: difference_amount_usd,
    })
  }

  getDailyClosuresByDate(institutionId: string, from?: string, to?: string): Promise<IDailyClosureDto[]> {
    throw new Error('Method not implemented.')
  }
}