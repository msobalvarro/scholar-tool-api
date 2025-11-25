import { UserRootModel } from '@/models/root-user-model'
import { UpdateUserRootSchema, UserRootSchema } from '@/schemas/user-root-schema'
import { createHash } from '@/utils/encrypt'

class UserRootService {
  createUserRoot = async (payload: UserRootSchema) => {
    const userRoot = await UserRootModel.create({ ...payload, password: createHash(payload.password) })

    return userRoot
  }

  updateUserRoot = async (payload: UpdateUserRootSchema) => {
    const { _id, ...rest } = payload
    const userRoot = await UserRootModel.findByIdAndUpdate(_id, rest, { new: true })
    return userRoot
  }

  getUserRootById = async (id: string) => {
    const userRoot = await UserRootModel.findById(id)
    return userRoot
  }

  getAllUserRoots = async () => {
    const userRoots = await UserRootModel.find().select({ password: 0 })
    return userRoots
  }
}

export const userRootService = new UserRootService()