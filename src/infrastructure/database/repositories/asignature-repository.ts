import { AsignatureModel } from '@/infrastructure/database/models/asignature-model'
import { InstitutionModel } from '@/infrastructure/database/models/institution-model'
import { AsignatureSchema, AsignatureUpdateSchema } from '@/infrastructure/database/schemas/asignature-schema'
import { IAsignatureRepository } from '@/core/interfaces/repositories/asignature-repository'
import { Service } from 'typedi'

@Service()
export class AsignatureRepository implements IAsignatureRepository {
  async createAsignature(asignature: AsignatureSchema, institutionId: string) {
    const { name, description, status } = asignature

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    const asignatureCreated = await AsignatureModel.create({ name, description, status, institution })
    return asignatureCreated
  }

  async getAsignatureById(id: string) {
    const asignature = await AsignatureModel.findById(id)
    return asignature
  }

  async updateAsignature(asignature: AsignatureSchema, _id: string) {
    const { name, description, status } = asignature
    const asignatureUpdated = await AsignatureModel.findByIdAndUpdate(_id, { name, description, status }, { new: true })
    return asignatureUpdated
  }

  async deleteAsignature(id: string) {
    const asignatureDeleted = await AsignatureModel.findByIdAndDelete(id)
    return asignatureDeleted
  }

  async getAllAsignatures(institutionId: string) {
    const asignatures = await AsignatureModel
      .find({ institution: { _id: institutionId } })
      .select('-institution')
    return asignatures
  }

}
