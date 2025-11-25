import { InstitutionModel } from '@/models/institution-model'
import { UserInstitutionModel } from '@/models/user-institution-model'
import {
  CreateUserInstitutionSchema,
  DeleteUserInstitutionSchema,
  UpdateUserInstitutionSchema
} from '@/schemas/user-institution-schema'
import { environments } from '@/utils/constanst'
import { createHash } from '@/utils/encrypt'
import { sign } from 'hono/jwt'

class UserInstitution {
  async createUserInstitution(payload: CreateUserInstitutionSchema) {
    const { institutionId, ...rest } = payload

    const userInstitution = new UserInstitutionModel({ ...rest, password: createHash(rest.password) })
    const institution = await InstitutionModel.findById(institutionId)

    if (!institution) throw new Error('Institucion no encontrada')

    await userInstitution.save()

    await institution.updateOne({
      $push: {
        users: userInstitution
      }
    })

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

  async login(email: string, password: string) {
    const userInstitution = await this.getUserByEmailAndPassword(email, password)
    if (!userInstitution) throw new Error('Usuario no encontrado')

    const token = sign({
      ...userInstitution
    }, environments.JWT_SECRET_USER_INSTITUTION)

    return { userInstitution, token }
  }

  async getAllUserInstitutions() {
    const userInstitutions = await UserInstitutionModel.find()
    return userInstitutions
  }
}

export const userInstitutionService = new UserInstitution()