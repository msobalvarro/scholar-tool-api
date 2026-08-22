import { PeriodUpdate, Period } from '@/infrastructure/database/schemas/period-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'

@Service()
export class PeriodService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  async createPeriod(period: Period, institutionId: string) {
    const institution = await this.institutionService.getActiveInstitution(institutionId)

    return await this.orm.models.PeriodModel.create({ ...period, institution })
  }

  async updatePeriod(period: PeriodUpdate) {
    return await this.orm.models.PeriodModel.findByIdAndUpdate(period._id, period)
  }

  async deletePeriod(periodId: string) {
    return await this.orm.models.PeriodModel.findByIdAndDelete(periodId)
  }

  async getPeriodsByInstitution(institutionId: string) {
    return await this.orm.models.PeriodModel.find({ institution: { _id: institutionId } })
  }

  async getPeriodById(periodId: string) {
    return await this.orm.models.PeriodModel.findById(periodId)
  }
}