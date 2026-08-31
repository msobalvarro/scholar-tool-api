import { CreateDailyReportSchema } from '@/infrastructure/schemas/daily-reports-schema'
import { IDailyReportStudentDto } from '../dtos'

export interface IDailyReportService {
  create: (data: CreateDailyReportSchema, institutionId: string) => Promise<IDailyReportStudentDto>
  getDailyReportsByDate: (institutionId: string, from?: string, to?: string) => Promise<IDailyReportStudentDto[]>
}