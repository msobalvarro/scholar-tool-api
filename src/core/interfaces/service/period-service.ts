import { Period as PeriodSchema, PeriodUpdate } from '@/infrastructure/database/schemas/period-schema'
import { Period as PeriodDto } from '../dtos'

export interface IPeriodRepository {
  createPeriod(period: PeriodSchema, institutionId: string): Promise<PeriodDto>
  updatePeriod(period: PeriodUpdate): Promise<PeriodDto | null>
  deletePeriod(periodId: string): Promise<PeriodDto | null>
  getPeriodsByInstitution(institutionId: string): Promise<PeriodDto[]>
  getPeriodById(periodId: string): Promise<PeriodDto | null>
}
