import { CreateDailyReportSchema } from '@/infrastructure/schemas/daily-reports-schema'
import { IDailyReporttDto } from '../dtos'

export interface IDailyReportService {
  create: (data: CreateDailyReportSchema, institutionId: string, userId: string) => Promise<IDailyReporttDto>
  getDailyReportsByDate: (institutionId: string, from?: string, to?: string) => Promise<IDailyReporttDto[]>
}