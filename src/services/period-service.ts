import { InstitutionModel } from '@/models/institution-model'
import { PeriodModel } from '@/models/period-model'
import { PeriodUpdate, Period } from '@/schemas/period-schema'
import { Service } from 'typedi'

@Service()
export class PeriodService {
  async createPeriod(period: Period, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    return await PeriodModel.create({ ...period, institution })
  }

  async updatePeriod(period: PeriodUpdate) {
    return await PeriodModel.findByIdAndUpdate(period._id, period)
  }

  async deletePeriod(periodId: string) {
    return await PeriodModel.findByIdAndDelete(periodId)
  }

  async getPeriodsByInstitution(institutionId: string) {
    return await PeriodModel.find({ institution: { _id: institutionId } })
  }

  async getPeriodById(periodId: string) {
    return await PeriodModel.findById(periodId)
  }
}