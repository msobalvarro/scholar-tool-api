import { InstitutionModel } from '@/models/institution-model'
import { UserInstitutionModel } from '@/models/user-institution-model'
import {
  AssignUserToInstitutionSchema,
  DeleteInstitutionSchema,
  InstitutionSchema,
  RemoveUserFromInstitutionSchema,
  UpdateInstitutionSchema
} from '@/schemas/institution-schema'

class Institution {
  async getInstitutions() {
    const insitutions = await InstitutionModel.find()
    return insitutions
  }

  async getInstitutionById(id: string) {
    const institution = await InstitutionModel.findById(id)
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
    const institution = await InstitutionModel.create({
      name: payload.name,
      logo: payload.logo,
      users: [],
      teachers: [],
    })

    return institution
  }

  async updateInstitution(payload: UpdateInstitutionSchema) {
    const { _id, ...rest } = payload
    const institution = await InstitutionModel.findByIdAndUpdate(_id, rest, { new: true })
    return institution
  }

  async deleteInstitution(payload: DeleteInstitutionSchema) {
    const { _id } = payload
    const institution = await InstitutionModel.findByIdAndDelete(_id)
    return institution
  }

  async assignUserToInstitution(payload: AssignUserToInstitutionSchema) {
    const { userId, institutionId } = payload
    const user = await UserInstitutionModel.findById(userId)
    const institution = await InstitutionModel.findById(institutionId)

    if (!user) throw 'Usuario no encontrado'
    if (!institution) throw 'Institucion no encontrada'

    await InstitutionModel.updateOne({ _id: institutionId }, { $push: { users: { _id: user._id } } })
    return institution
  }

  async removeUserFromInstitution(payload: RemoveUserFromInstitutionSchema) {
    const { userId, institutionId } = payload
    const user = await UserInstitutionModel.findById(userId)
    const institution = await InstitutionModel.findById(institutionId)

    if (!user) throw 'Usuario no encontrado'
    if (!institution) throw 'Institución no encontrada'

    await InstitutionModel.updateOne({ _id: institutionId }, { $pull: { users: { _id: user._id } } })
    return institution
  }
}

export const institutionService = new Institution()