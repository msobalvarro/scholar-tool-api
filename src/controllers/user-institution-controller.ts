import { CreateUserInstitutionSchema, createUserInstitutionSchema } from '@/schemas/user-institution-schema'
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