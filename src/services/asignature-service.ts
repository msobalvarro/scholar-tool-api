import { AsignatureModel } from '@/models/asignature-model'
import { InstitutionModel } from '@/models/institution-model'
import { AsignatureSchema, AsignatureUpdateSchema } from '@/schemas/asignature-schema'

class AsignatureService {
  async createAsignature(asignature: AsignatureSchema, institutionId: string) {
    const { name } = asignature

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'

    const asignatureCreated = await AsignatureModel.create({ name, institution })
    return asignatureCreated
  }

  async getAsignatureById(id: string) {
    const asignature = await AsignatureModel.findById(id)
    return asignature
  }

  async updateAsignature(asignature: AsignatureUpdateSchema) {
    const { _id, ...rest } = asignature
    const asignatureUpdated = await AsignatureModel.findByIdAndUpdate(_id, rest, { new: true })
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

export const asignatureService = new AsignatureService()
