import { AuthSchema, authSchema } from '@/schemas/auth-schema'
import { userInstitutionService } from '@/services/user-institution-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class AuthController {
  authUserInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = authSchema.parse(body) as AuthSchema

      const user = await userInstitutionService.login(parsedBody.email, parsedBody.password)

      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  authUserRoot = async () => { }
}

export const authController = new AuthController()