import {
  CreateUserInstitutionSchema,
  DeleteUserInstitutionSchema,
  UpdateUserInstitutionSchema
} from '@/infrastructure/schemas/user-institution-schema'
import { createHash } from '@/utils/encrypt'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'

@Service()
export class UserInstitutionService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  async createUserInstitution(payload: CreateUserInstitutionSchema) {
    const { institutionId, ...rest } = payload

    const institution = await this.institutionService.getActiveInstitution(institutionId)

    const userEmailExist = await this.orm.models.UserInstitutionModel.findOne({ email: rest.email })
    if (userEmailExist) throw 'Email ya registrado'

    const userInstitution = new this.orm.models.UserInstitutionModel({
      ...rest,
      password: createHash(rest.password),
      institution
    })

    await userInstitution.save()
    return userInstitution
  }

  async updateUserInstitution(payload: UpdateUserInstitutionSchema) {
    const { _id, ...rest } = payload
    const userInstitution = await this.orm.models.UserInstitutionModel.findByIdAndUpdate(_id, rest, { new: true })
    return userInstitution
  }

  async deleteUserInstitution(payload: DeleteUserInstitutionSchema) {
    const { _id } = payload
    const userInstitution = await this.orm.models.UserInstitutionModel.findByIdAndDelete(_id)
    return userInstitution
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    const userInstitution = await this.orm.models.UserInstitutionModel
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
    const userInstitution = await this.orm.models.UserInstitutionModel.findById(id)
    return userInstitution
  }

  async getAllUserInstitutions() {
    const userInstitutions = await this.orm.models.UserInstitutionModel.find()
    return userInstitutions
  }

  async getActiveUserInstitution(userId: string) {
    const user = await this.orm.models.UserInstitutionModel.findById(userId)
    if (!user) throw 'Usuario no encontrado'
    return user
  }
}