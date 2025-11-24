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

    if (!user) throw new Error('Usuario no encontrado')
    if (!institution) throw new Error('Institucion no encontrada')

    await institution.updateOne({ users: { $push: { _id: user._id } } })
    return institution
  }

  async removeUserFromInstitution(payload: RemoveUserFromInstitutionSchema) {
    const { userId, institutionId } = payload
    const user = await UserInstitutionModel.findById(userId)
    const institution = await InstitutionModel.findById(institutionId)

    if (!user) throw new Error('Usuario no encontrado')
    if (!institution) throw new Error('Institución no encontrada')

    await institution.updateOne({ users: { $pull: { _id: user._id } } })
    return institution
  }
}

export const institutionService = new Institution()