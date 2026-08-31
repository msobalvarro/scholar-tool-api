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
    const userInstitution = await this.userInstitutionService.createUserInstitution(parsedBody)

    return c.json(userInstitution)
  }

  updateUserInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = updateUserInstitutionSchema.parse(body) as UpdateUserInstitutionSchema
    const userInstitution = await this.userInstitutionService.updateUserInstitution(parsedBody)

    return c.json(userInstitution)
  }

  getUserInstitutionById = async (c: Context) => {
    const { id } = c.req.param()
    const userInstitution = await this.userInstitutionService.getUserInstitutionById(id)
    return c.json(userInstitution)
  }

  getAllUserInstitutions = async (c: Context) => {
    const userInstitutions = await this.userInstitutionService.getAllUserInstitutions()
    return c.json(userInstitutions)
  }
}
