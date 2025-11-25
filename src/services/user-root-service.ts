import { UserRootModel } from '@/models/root-user-model'
import { UpdateUserRootSchema, UserRootSchema } from '@/schemas/user-root-schema'
import { createHash } from '@/utils/encrypt'

class UserRootService {
  createUserRoot = async (payload: UserRootSchema) => {
    const userRoot = await UserRootModel.create(payload)
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
    const userRoots = await UserRootModel.find()
    return userRoots
  }

  login = async (email: string, password: string) => {
    const userRoot = await UserRootModel
      .findOne({ email, password: createHash(password) })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })
    return userRoot
  }
}

export const userRootService = new UserRootService()