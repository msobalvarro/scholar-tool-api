import {
  AssignUserToInstitutionSchema,
  DeleteInstitutionSchema,
  InstitutionSchema,
  RemoveUserFromInstitutionSchema,
  UpdateInstitutionSchema
} from '@/infrastructure/database/schemas/institution-schema'
import { IInstitutionRepository } from '@/core/interfaces/repositories/institution-repository'
import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class InstitutionService implements IInstitutionRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  async getInstitutions() {
    const insitutions = await this.orm.models.InstitutionModel.find()
    return insitutions
  }

  async getInstitutionById(id: string) {
    const institution = await this.orm.models.InstitutionModel.findById(id)
      .populate(
        [
          {
            path: 'users',
            select: {
              password: 0
            }
          }
        ]
      )
    return institution
  }

  async createInstitution(payload: InstitutionSchema) {
    const institution = await this.orm.models.InstitutionModel.create({
      name: payload.name,
      logo: payload.logo
    })

    return institution
  }

  async updateInstitution(payload: UpdateInstitutionSchema) {
    const { _id, ...rest } = payload
    const institution = await this.orm.models.InstitutionModel.findByIdAndUpdate(_id, rest, { new: true })
    return institution
  }

  async deleteInstitution(payload: DeleteInstitutionSchema) {
    const { _id } = payload
    const institution = await this.orm.models.InstitutionModel.findByIdAndDelete(_id)
    return institution
  }

  async assignUserToInstitution(payload: AssignUserToInstitutionSchema) {
    const { userId, institutionId } = payload
    const user = await this.orm.models.UserInstitutionModel.findById(userId)
    const institution = await this.orm.models.InstitutionModel.findById(institutionId)

    if (!user) throw 'Usuario no encontrado'
    if (!institution) throw 'Institucion no encontrada'

    await this.orm.models.UserInstitutionModel.updateOne({ _id: user._id }, { institution })

    return institution
  }

  async removeUserFromInstitution(payload: RemoveUserFromInstitutionSchema) {
    const { userId, institutionId } = payload
    const user = await this.orm.models.UserInstitutionModel.findById(userId)
    const institution = await this.orm.models.InstitutionModel.findById(institutionId)

    if (!user) throw 'Usuario no encontrado'
    if (!institution) throw 'Institución no encontrada'

    await this.orm.models.InstitutionModel.updateOne({ _id: institutionId }, { $pull: { users: { _id: user._id } } })
    return institution
  }
}