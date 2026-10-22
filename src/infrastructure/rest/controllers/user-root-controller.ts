import { Context } from 'hono'
import {
  UpdateUserRootSchema,
  updateUserRootSchema,
  UserRootSchema,
  userRootSchema
} from '@/infrastructure/schemas/user-root-schema'
import { UserRootService } from '@/core/services/user-root-service'
import { Service } from 'typedi'

@Service()
export class UserRootController {
  constructor(private userRootService: UserRootService) { }

  createUserRoot = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = userRootSchema.parse(body) as UserRootSchema
    return c.json(
      await this.userRootService.createUserRoot(parsedBody)
    )
  }

  updateUserRoot = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = updateUserRootSchema.parse(body) as UpdateUserRootSchema
    return c.json(
      await this.userRootService.updateUserRoot(parsedBody)
    )
  }

  getUserRootById = async (c: Context) => {
    const id = c.req.param('id')
    return c.json(
      await this.userRootService.getUserRootById(id)
    )
  }

  getAllUserRoots = async (c: Context) => {
    return c.json(
      await this.userRootService.getAllUserRoots()
    )
  }
}
