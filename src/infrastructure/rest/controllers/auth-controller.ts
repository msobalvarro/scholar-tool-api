import { AuthSchema, authSchema } from '@/infrastructure/database/schemas/auth-schema'
import { AuthRepository } from '@/infrastructure/database/repositories/auth-repository'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class AuthController {
  @Inject(() => AuthRepository)
  private authService!: AuthRepository

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