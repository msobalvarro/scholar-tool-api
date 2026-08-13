import { AsignatureSchema, AsignatureUpdateSchema } from '@/infrastructure/database/schemas/asignature-schema'
import { IAsignatureRepository } from '@/core/interfaces/repositories/asignature-repository'
import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class AsignatureRepository implements IAsignatureRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  async createAsignature(asignature: AsignatureSchema, institutionId: string) {
    const { name, description, status } = asignature

    const institution = await this.orm.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

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
