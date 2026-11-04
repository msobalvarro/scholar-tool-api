import { environments } from '@/utils/constanst'
import { jwt } from 'hono/jwt'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import { createMiddleware } from 'hono/factory'

const makeJwtCookieMiddleware = (cookieName: string, secret: string) =>
  createMiddleware(async (c, next) => {
    const token = getCookie(c, cookieName)
    if (!token) {
      return c.json({ message: 'No autenticado' }, 401)
    }
    try {
      const payload = await verify(token, secret)
      c.set('jwtPayload', payload)
      await next()
    } catch {
      return c.json({ message: 'Token inválido o expirado' }, 401)
    }
  })

export const jwtUserRoot = makeJwtCookieMiddleware('token_root', environments.JWT_SECRET_ADMIN)
export const jwtUserInstitution = makeJwtCookieMiddleware('token_institution', environments.JWT_SECRET_USER_INSTITUTION)
export const jwtUserTeacher = makeJwtCookieMiddleware('token_teacher', environments.JWT_SECRET_USER_TEACHER)

// Estos roles aún usan el header Authorization estándar
export const jwtUserStudent = jwt({ secret: environments.JWT_SECRET_USER_STUDENT })
export const jwtUserResponsable = jwt({ secret: environments.JWT_SECRET_USER_RESPONSABLE })

export const meAuthMiddleware = createMiddleware(async (c, next) => {
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
})