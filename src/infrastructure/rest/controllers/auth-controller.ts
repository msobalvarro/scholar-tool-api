import { AuthSchema, authSchema } from '@/infrastructure/schemas/auth-schema'
import { AuthRepository } from '@/core/services/auth-service'
import { Context, Next } from 'hono'
import { Inject, Service } from 'typedi'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import { environments } from '@/utils/constanst'

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

  me = async (c: Context, next: Next) => {
    const tokenInstitution = getCookie(c, 'token_institution')
    const tokenTeacher = getCookie(c, 'token_teacher')
    const tokenRoot = getCookie(c, 'token_root')

    const tokenCandidates: Array<{ token: string; secret: string }> = [
      { token: tokenInstitution ?? '', secret: environments.JWT_SECRET_USER_INSTITUTION },
      { token: tokenTeacher ?? '', secret: environments.JWT_SECRET_USER_TEACHER },
      { token: tokenRoot ?? '', secret: environments.JWT_SECRET_ADMIN },
    ]

    for (const { token, secret } of tokenCandidates) {
      if (!token) continue
      try {
        const payload = await verify(token, secret)
        c.set('jwtPayload', payload)
        return next()
      } catch {
        // token inválido o expirado, intentar siguiente
      }
    }

    return c.json({ message: 'No autenticado' }, 401)
  }
}