import { InstitutionModel } from '@/models/institution-model'
import { UserInstitutionModel } from '@/models/user-institution-model'
import {
  CreateUserInstitutionSchema,
  DeleteUserInstitutionSchema,
  UpdateUserInstitutionSchema
} from '@/schemas/user-institution-schema'
import { createHash } from '@/utils/encrypt'
import { Service } from 'typedi'

@Service()
export class UserInstitutionService {
  async createUserInstitution(payload: CreateUserInstitutionSchema) {
    const { institutionId, ...rest } = payload

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institucion no encontrada'

    const userEmailExist = await UserInstitutionModel.findOne({ email: rest.email })
    if (userEmailExist) throw 'Email ya registrado'

    const userInstitution = new UserInstitutionModel({
      ...rest,
      password: createHash(rest.password),
      institution
    })

    await userInstitution.save()
    return userInstitution
  }

  async updateUserInstitution(payload: UpdateUserInstitutionSchema) {
    const { _id, ...rest } = payload
    const userInstitution = await UserInstitutionModel.findByIdAndUpdate(_id, rest, { new: true })
    return userInstitution
  }

  async deleteUserInstitution(payload: DeleteUserInstitutionSchema) {
    const { _id } = payload
    const userInstitution = await UserInstitutionModel.findByIdAndDelete(_id)
    return userInstitution
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    const userInstitution = await UserInstitutionModel
      .findOne({
        email,
        password: createHash(password)
      })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })
    return userInstitution
  }

  async getUserInstitutionById(id: string) {
    const userInstitution = await UserInstitutionModel.findById(id)
    return userInstitution
  }

  async getAllUserInstitutions() {
    const userInstitutions = await UserInstitutionModel.find()
    return userInstitutions
  }
}