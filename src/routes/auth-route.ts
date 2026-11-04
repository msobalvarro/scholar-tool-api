import Container from 'typedi'
import { Hono } from 'hono'
import { AuthController } from '@/infrastructure/rest/controllers/auth-controller'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import { environments } from '@/utils/constanst'

const controller = Container.get(AuthController)
export const authRoute = new Hono()

authRoute.post('/root', controller.authUserRoot)
authRoute.post('/institution', controller.authUserInstitution)
authRoute.post('/teacher', controller.authTeacher)
authRoute.post('/logout', controller.logout)

// Middleware para /me: intenta validar cualquiera de las tres cookies de sesión
authRoute.get('/me', async (c, next) => {
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

authRoute.get('/me', controller.me)

