import { ResponsablePersonSchema, ResponsablePersonUpdate } from '@/infrastructure/database/schemas/responsable-schema'
import { IResponsableRepository } from '@/core/interfaces/repositories/responsable-repository'
import { Inject, Service } from 'typedi'
import { ORM } from '..'
import { ResponsablePerson } from '@/core/interfaces/dtos/models'

@Service()
export class ResponsableRepository implements IResponsableRepository {
  @Inject(() => ORM)
  private ORM!: ORM

  async createResponsable(responsable: ResponsablePersonSchema): Promise<ResponsablePerson> {
    return await this.ORM.models.ResponsableModel.create(responsable)
  }

  async updateResponsable(responsable: ResponsablePersonUpdate) {
    const { _id, ...rest } = responsable
    await this.ORM.models.ResponsableModel.updateOne({ _id }, rest)
  }

  async deleteResponsable(id: string) {
    const deleted = await this.ORM.models.ResponsableModel.findByIdAndDelete(id)
    if (!deleted) throw new Error('Responsable no encontrado')
  }

  async getAllResponsables() {
    return await this.ORM.models.ResponsableModel.find()
  }

  async getResponsableById(_id: string) {
    return await this.ORM.models.ResponsableModel.findById(_id)
  }

  async searchResponsable(search: string): Promise<ResponsablePerson[]> {
    return await this.ORM.models.ResponsableModel.find({
      $or: [
        { fullName: { $regex: search, $options: 'i' } },
        { identification: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ]
    })
  }
}
