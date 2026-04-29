import { Context } from 'hono'
import {
  UpdateUserRootSchema,
  updateUserRootSchema,
  UserRootSchema,
  userRootSchema
} from '@/infrastructure/database/schemas/user-root-schema'
import { UserRootService } from '@/services/user-root-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Service } from 'typedi'

@Service()
export class UserRootController {
  constructor(private userRootService: UserRootService) { }

  createUserRoot = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = userRootSchema.parse(body) as UserRootSchema
      const user = await this.userRootService.createUserRoot(parsedBody)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  updateUserRoot = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = updateUserRootSchema.parse(body) as UpdateUserRootSchema
      const user = await this.userRootService.updateUserRoot(parsedBody)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getUserRootById = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const user = await this.userRootService.getUserRootById(id)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAllUserRoots = async (c: Context) => {
    try {
      const users = await this.userRootService.getAllUserRoots()
      return c.json(users)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}
