import { Context } from 'hono'
import {
  UpdateUserRootSchema,
  updateUserRootSchema,
  UserRootSchema,
  userRootSchema
} from '@/infrastructure/database/schemas/user-root-schema'
import { UserRootService } from '@/core/services/user-root-service'
import { Service } from 'typedi'

@Service()
export class UserRootController {
  constructor(private userRootService: UserRootService) { }

  createUserRoot = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = userRootSchema.parse(body) as UserRootSchema
    const user = await this.userRootService.createUserRoot(parsedBody)
    return c.json(user)
  }

  updateUserRoot = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = updateUserRootSchema.parse(body) as UpdateUserRootSchema
    const user = await this.userRootService.updateUserRoot(parsedBody)
    return c.json(user)
  }

  getUserRootById = async (c: Context) => {
    const id = c.req.param('id')
    const user = await this.userRootService.getUserRootById(id)
    return c.json(user)
  }

  getAllUserRoots = async (c: Context) => {
    const users = await this.userRootService.getAllUserRoots()
    return c.json(users)
  }
}
