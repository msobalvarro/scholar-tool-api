import { authTeacherController } from '@/controllers/auth-teacher-controller'
import { Hono } from 'hono'
import { jwtUserInstitution, jwtUserTeacher } from '@/utils/jtw'

export const authTeacherRoute = new Hono()

authTeacherRoute.use('/password', jwtUserTeacher)
authTeacherRoute.put('/password', authTeacherController.updatePassword)

authTeacherRoute.use('/*', jwtUserInstitution)
authTeacherRoute.post('/', authTeacherController.create)
authTeacherRoute.get('/', authTeacherController.getAll)

