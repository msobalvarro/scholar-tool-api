import { CreateUserInstitutionSchema, createUserInstitutionSchema, UpdateUserInstitutionSchema, updateUserInstitutionSchema } from '@/schemas/user-institution-schema'
import { userInstitutionService } from '@/services/user-institution-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class UserInstitutionController {
  async createUserInstitution(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = createUserInstitutionSchema.parse(body) as CreateUserInstitutionSchema
      const userInstitution = await userInstitutionService.createUserInstitution(parsedBody)

      return c.json(userInstitution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async updateUserInstitution(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = updateUserInstitutionSchema.parse(body) as UpdateUserInstitutionSchema
      const userInstitution = await userInstitutionService.updateUserInstitution(parsedBody)

      return c.json(userInstitution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getUserInstitutionById(c: Context) {
    try {
      const { id } = c.req.param()
      const userInstitution = await userInstitutionService.getUserInstitutionById(id)
      return c.json(userInstitution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAllUserInstitutions(c: Context) {
    try {
      const userInstitutions = await userInstitutionService.getAllUserInstitutions()
      return c.json(userInstitutions)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async login(c: Context) {
    try {
      const body = await c.req.json()
      const { email, password } = body
      const userInstitution = await userInstitutionService.login(email, password)
      return c.json(userInstitution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const userInstitutionController = new UserInstitutionController()