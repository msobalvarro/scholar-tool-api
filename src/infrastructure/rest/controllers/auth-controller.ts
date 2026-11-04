import { AuthSchema, authSchema } from '@/infrastructure/schemas/auth-schema'
import { AuthRepository } from '@/core/services/auth-service'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'
import { setCookie, deleteCookie } from 'hono/cookie'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 días
}

@Service()
export class AuthController {
  @Inject(() => AuthRepository)
  private authService!: AuthRepository

  authUserInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = authSchema.parse(body) as AuthSchema
    const result = await this.authService.loginUserInstitution(parsedBody.email, parsedBody.password)

    setCookie(c, 'token_institution', result.token, COOKIE_OPTIONS)

    const { token: _, ...safeResult } = result
    return c.json(safeResult)
  }

  authUserRoot = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = authSchema.parse(body) as AuthSchema
    const result = await this.authService.loginUserRoot(parsedBody.email, parsedBody.password)

    setCookie(c, 'token_root', result.token, COOKIE_OPTIONS)

    const { token: _, ...safeResult } = result
    return c.json(safeResult)
  }

  authTeacher = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = authSchema.parse(body) as AuthSchema
    const result = await this.authService.loginTeacher(parsedBody.email, parsedBody.password)

    setCookie(c, 'token_teacher', result.token, COOKIE_OPTIONS)

    const { token: _, ...safeResult } = result
    return c.json(safeResult)
  }

  logout = async (c: Context) => {
    deleteCookie(c, 'token_institution', { path: '/' })
    deleteCookie(c, 'token_root', { path: '/' })
    deleteCookie(c, 'token_teacher', { path: '/' })
    return c.json({ message: 'Sesión cerrada correctamente' })
  }

  me = async (c: Context) => {
    // El payload JWT ya fue validado por el middleware JWT
    // y está disponible en c.get('jwtPayload')
    const payload = c.get('jwtPayload')
    return c.json({ user: payload })
  }
}