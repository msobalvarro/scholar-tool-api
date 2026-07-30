import { AuthSchema, authSchema } from '@/infrastructure/database/schemas/auth-schema'
import { AuthRepository } from '@/infrastructure/database/repositories/auth-repository'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class AuthController {
  @Inject(() => AuthRepository)
  private authService!: AuthRepository

  authUserInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = authSchema.parse(body) as AuthSchema
    const user = await this.authService.loginUserInstitution(parsedBody.email, parsedBody.password)
    return c.json(user)
  }

  authUserRoot = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = authSchema.parse(body) as AuthSchema
    const user = await this.authService.loginUserRoot(parsedBody.email, parsedBody.password)
    return c.json(user)
  }

  authTeacher = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = authSchema.parse(body) as AuthSchema
    const user = await this.authService.loginTeacher(parsedBody.email, parsedBody.password)
    return c.json(user)
  }
}