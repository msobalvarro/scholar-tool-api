import { ResponsableModel } from '@/models/responsable-model'
import { ResponsablePerson, ResponsablePersonUpdate } from '@/schemas/responsable-schema'
import { Service } from 'typedi'

@Service()
export class ResponsableService {
  async createResponsable(responsable: ResponsablePerson) {
    const createdResponsable = await ResponsableModel.create(responsable)
    return createdResponsable
  }

  async updateResponsable(responsable: ResponsablePersonUpdate) {
    const { _id, ...rest } = responsable

    const responsableUpdated = await ResponsableModel.updateOne({ _id }, rest)
    return responsableUpdated
  }

  async deleteResponsable(_id: string) {
    const deletedResponsable = await ResponsableModel.deleteOne({ _id })
    return deletedResponsable
  }

  async getAllResponsables() {
    const responsables = await ResponsableModel.find()
    return responsables
  }

  async getResponsableById(_id: string) {
    const responsable = await ResponsableModel.findById(_id)
    return responsable
  }
}
