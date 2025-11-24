import { UserInstitutionModel } from '@/models/user-institution-model'
import {
  CreateUserInstitutionSchema,
  DeleteUserInstitutionSchema,
  UpdateUserInstitutionSchema
} from '@/schemas/user-institution-schema'
import { createHash } from '@/utils/encrypt'

class UserInstitution {
  async createUserInstitution(payload: CreateUserInstitutionSchema) {
    const userInstitution = await UserInstitutionModel.create(payload)
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
    const userInstitution = await UserInstitutionModel.findOne({
      email,
      password: createHash(password)
    })
    return userInstitution
  }

  async getUserInstitutionById(id: string) {
    const userInstitution = await UserInstitutionModel.findById(id)
    return userInstitution
  }
}

export const userInstitutionService = new UserInstitution()