import { RootUserModel } from '@/models/root-user-model'
import { UpdateUserRootSchema, UserRootSchema } from '@/schemas/user-root-schema'

class UserRootService {
  createUserRoot = async (payload: UserRootSchema) => {
    const userRoot = await RootUserModel.create(payload)
    return userRoot
  }

  updateUserRoot = async (payload: UpdateUserRootSchema) => {
    const { _id, ...rest } = payload
    const userRoot = await RootUserModel.findByIdAndUpdate(_id, rest, { new: true })
    return userRoot
  }

  getUserRootById = async (id: string) => {
    const userRoot = await RootUserModel.findById(id)
    return userRoot
  }

  getAllUserRoots = async () => {
    const userRoots = await RootUserModel.find()
    return userRoots
  }
}

export const userRootService = new UserRootService()