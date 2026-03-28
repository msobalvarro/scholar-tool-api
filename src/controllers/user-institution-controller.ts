import {
  CreateUserInstitutionSchema,
  createUserInstitutionSchema,
  UpdateUserInstitutionSchema,
  updateUserInstitutionSchema
} from '@/schemas/user-institution-schema'
import { UserInstitutionService } from '@/services/user-institution-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class UserInstitutionController {
  constructor(private userInstitutionService: UserInstitutionService) { }

   createUserInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = createUserInstitutionSchema.parse(body) as CreateUserInstitutionSchema
      const userInstitution = await this.userInstitutionService.createUserInstitution(parsedBody)

      return c.json(userInstitution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   updateUserInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = updateUserInstitutionSchema.parse(body) as UpdateUserInstitutionSchema
      const userInstitution = await this.userInstitutionService.updateUserInstitution(parsedBody)

      return c.json(userInstitution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   getUserInstitutionById = async (c: Context) => {
    try {
      const { id } = c.req.param()
      const userInstitution = await this.userInstitutionService.getUserInstitutionById(id)
      return c.json(userInstitution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   getAllUserInstitutions = async (c: Context) => {
    try {
      const userInstitutions = await this.userInstitutionService.getAllUserInstitutions()
      return c.json(userInstitutions)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}
