import Container from 'typedi'
import { Hono } from 'hono'
import { AuthTeacherController } from '@/infrastructure/rest/controllers/auth-teacher-controller'
import { jwtUserInstitution, jwtUserTeacher } from '@/infrastructure/rest/middlewares'

const controller = Container.get(AuthTeacherController)
export const authTeacherRoute = new Hono()

authTeacherRoute.use('/password', jwtUserTeacher)
authTeacherRoute.put('/password', controller.updatePassword)

authTeacherRoute.use('/*', jwtUserInstitution)
authTeacherRoute.post('/', controller.create)
authTeacherRoute.get('/', controller.getAll)

