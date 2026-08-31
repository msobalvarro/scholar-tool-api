import { AsignatureSchema } from '@/infrastructure/schemas/asignature-schema'
import { IAsignatureRepository } from '@/core/interfaces/service/asignature-service'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'

@Service()
export class AsignatureRepository implements IAsignatureRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  async createAsignature(asignature: AsignatureSchema, institutionId: string) {
    const { name, description, status } = asignature

    const institution = await this.institutionService.getActiveInstitution(institutionId)

    const asignatureCreated = await this.orm.models.AsignatureModel.create({ name, description, status, institution })
    return asignatureCreated
  }

  async getAsignatureById(id: string) {
    const asignature = await this.orm.models.AsignatureModel.findById(id)
    return asignature
  }

  async updateAsignature(asignature: AsignatureSchema, _id: string) {
    const { name, description, status } = asignature
    const asignatureUpdated = await this.orm.models.AsignatureModel.findByIdAndUpdate(_id, { name, description, status }, { new: true })
    return asignatureUpdated
  }

  async deleteAsignature(id: string) {
    const asignatureDeleted = await this.orm.models.AsignatureModel.findByIdAndDelete(id)
    return asignatureDeleted
  }

  async getAllAsignatures(institutionId: string) {
    const asignatures = await this.orm.models.AsignatureModel
      .find({ institution: { _id: institutionId } })
      .select('-institution')
    return asignatures
  }

}
