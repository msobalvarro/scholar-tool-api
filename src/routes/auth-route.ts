import Container from 'typedi'
import { Hono } from 'hono'
import { AuthController } from '@/infrastructure/rest/controllers/auth-controller'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import { environments } from '@/utils/constanst'
import { meAuthMiddleware } from '@/infrastructure/rest/middlewares'

const controller = Container.get(AuthController)
export const authRoute = new Hono()

authRoute.post('/root', controller.authUserRoot)
authRoute.post('/institution', controller.authUserInstitution)
authRoute.post('/teacher', controller.authTeacher)
authRoute.post('/logout', controller.logout)

// Middleware para /me: intenta validar cualquiera de las tres cookies de sesión
authRoute.get('/me', meAuthMiddleware)
authRoute.get('/me', controller.me)

