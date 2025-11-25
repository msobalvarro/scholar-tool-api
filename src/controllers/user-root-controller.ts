import { Context } from 'hono'
import {
  UpdateUserRootSchema,
  updateUserRootSchema,
  UserRootSchema,
  userRootSchema
} from '@/schemas/user-root-schema'
import { userRootService } from '@/services/user-root-service'
import { ErrorValidator } from '@/utils/error-validator'

class UserRootController {
  createUserRoot = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = userRootSchema.parse(body) as UserRootSchema
      const user = await userRootService.createUserRoot(parsedBody)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  updateUserRoot = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = updateUserRootSchema.parse(body) as UpdateUserRootSchema
      const user = await userRootService.updateUserRoot(parsedBody)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getUserRootById = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const user = await userRootService.getUserRootById(id)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAllUserRoots = async (c: Context) => {
    try {
      const users = await userRootService.getAllUserRoots()
      return c.json(users)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const userRootController = new UserRootController()
