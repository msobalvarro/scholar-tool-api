import { UpdateUserRootSchema, UserRootSchema } from '@/infrastructure/database/schemas/user-root-schema'
import { createHash } from '@/utils/encrypt'
import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class UserRootService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  createUserRoot = async (payload: UserRootSchema) => {
    const userRoot = await this.orm.models.UserRootModel.create({ ...payload, password: createHash(payload.password) })

    return userRoot
  }

  updateUserRoot = async (payload: UpdateUserRootSchema) => {
    const { _id, ...rest } = payload
    const userRoot = await this.orm.models.UserRootModel.findByIdAndUpdate(_id, rest, { new: true })
    return userRoot
  }

  getUserRootById = async (id: string) => {
    const userRoot = await this.orm.models.UserRootModel.findById(id)
    return userRoot
  }

  getAllUserRoots = async () => {
    const userRoots = await this.orm.models.UserRootModel.find().select({ password: 0 })
    return userRoots
  }
}