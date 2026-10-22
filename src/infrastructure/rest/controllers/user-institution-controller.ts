import {
  CreateUserInstitutionSchema,
  createUserInstitutionSchema,
  UpdateUserInstitutionSchema,
  updateUserInstitutionSchema
} from '@/infrastructure/schemas/user-institution-schema'
import { UserInstitutionService } from '@/core/services/user-institution-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class UserInstitutionController {
  constructor(private userInstitutionService: UserInstitutionService) { }

  createUserInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = createUserInstitutionSchema.parse(body) as CreateUserInstitutionSchema
    return c.json(
      await this.userInstitutionService.createUserInstitution(parsedBody)
    )
  }

  updateUserInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = updateUserInstitutionSchema.parse(body) as UpdateUserInstitutionSchema
    return c.json(
      await this.userInstitutionService.updateUserInstitution(parsedBody)
    )
  }

  getUserInstitutionById = async (c: Context) => {
    const { id } = c.req.param()
    return c.json(
      await this.userInstitutionService.getUserInstitutionById(id)
    )
  }

  getAllUserInstitutions = async (c: Context) => {
    return c.json(
      await this.userInstitutionService.getAllUserInstitutions()
    )
  }
}
