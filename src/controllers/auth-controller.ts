import { AuthSchema, authSchema } from '@/schemas/auth-schema'
import { AuthService } from '@/services/auth-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class AuthController {
  constructor(private authService: AuthService) { }

  authUserInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = authSchema.parse(body) as AuthSchema
      const user = await this.authService.loginUserInstitution(parsedBody.email, parsedBody.password)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  authUserRoot = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = authSchema.parse(body) as AuthSchema
      const user = await this.authService.loginUserRoot(parsedBody.email, parsedBody.password)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  authTeacher = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = authSchema.parse(body) as AuthSchema
      const user = await this.authService.loginTeacher(parsedBody.email, parsedBody.password)
      return c.json(user)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}