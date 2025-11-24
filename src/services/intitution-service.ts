import { InstitutionModel } from '@/models/institution-model'
import { UserInstitutionModel } from '@/models/user-institution-model'
import { DeleteInstitutionSchema, InstitutionSchema, UpdateInstitutionSchema } from '@/schemas/institution-shcema'

class Institution {
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

  async assignUserToInstitution(userId: string, institutionId: string) {
    const user = await UserInstitutionModel.findById(userId)
    const institution = await InstitutionModel.findById(institutionId)

    if (!user) throw new Error('Usuario no encontrado')
    if (!institution) throw new Error('Institucion no encontrada')

    await institution.updateOne({ users: { $push: { _id: user._id } } })
    return institution
  }

  async removeUserFromInstitution(userId: string, institutionId: string) {
    const user = await UserInstitutionModel.findById(userId)
    const institution = await InstitutionModel.findById(institutionId)

    if (!user) throw new Error('Usuario no encontrado')
    if (!institution) throw new Error('Institucion no encontrada')

    await institution.updateOne({ users: { $pull: { _id: user._id } } })
    return institution
  }
}

export const institutionService = new Institution()