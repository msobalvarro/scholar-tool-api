import Container from 'typedi'
import { Hono } from 'hono'
import { AuthController } from '@/infrastructure/rest/controllers/auth-controller'

const controller = Container.get(AuthController)
export const authRoute = new Hono()

authRoute.post('/root', controller.authUserRoot)
authRoute.post('/institution', controller.authUserInstitution)
authRoute.post('/teacher', controller.authTeacher)

